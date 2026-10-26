# Sorts the import block of each component file by statement length, longest first.
import re, glob, sys

BASE = 'projects/dasar-ui/src/lib/components/'
SKIP = set()

def one_line(stmt):
    s = re.sub(r'\s+', ' ', stmt.strip())
    s = re.sub(r',\s*}', ' }', s)
    s = re.sub(r'{\s+', '{ ', s)
    s = re.sub(r'\s+}', ' }', s)
    return s

def split_block(text):
    # returns (head_comments, statements, rest) when the file starts with a clean import block
    pos = 0
    stmts = []
    pat = re.compile(r"import [\s\S]*?;[ \t]*\n")
    while True:
        m = pat.match(text, pos)
        if m:
            stmts.append(m.group(0))
            pos = m.end()
            continue
        b = re.compile(r"\n+").match(text, pos)
        if b and pat.match(text, b.end()):
            pos = b.end()
            continue
        break
    return stmts, text[pos:]

changed, skipped = 0, []
for p in sorted(glob.glob(BASE + '*/*.ts')):
    rel = p[len(BASE):]
    if p.endswith('.spec.ts') or rel in SKIP:
        continue
    text = open(p).read()
    if not text.startswith('import'):
        skipped.append((rel, 'does not start with an import'))
        continue
    stmts, rest = split_block(text)
    if len(stmts) < 2:
        continue
    # a comment or other code between imports would have ended the block early
    leftover = re.search(r"^\s*import\b", rest, flags=re.M)
    if leftover:
        skipped.append((rel, 'import after other code'))
        continue
    ordered = sorted(stmts, key=lambda s: -len(one_line(s)))
    before = sorted(one_line(s) for s in stmts)
    after = sorted(one_line(s) for s in ordered)
    assert before == after, rel
    new = ''.join(ordered).rstrip('\n') + '\n\n' + rest.lstrip('\n')
    if new != text:
        open(p, 'w').write(new)
        changed += 1
print('changed', changed)
for rel, why in skipped:
    print('skipped', rel, why)
