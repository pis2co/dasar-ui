import os, re, sys, collections

ROOT = os.getcwd()
SCAN = ['projects/dasar-ui/src', 'projects/documentation/src', 'README.md', 'docs', 'projects/dasar-ui/README.md']
EXTS = ('.scss', '.css', '.ts', '.html', '.md')
EXCLUDE_NAMES = {'--moz-appearance'}
NAME = r'--[a-z0-9][a-z0-9-]*'

def files():
    for target in SCAN:
        p = os.path.join(ROOT, target)
        if os.path.isfile(p):
            yield p
            continue
        for d, dirs, fs in os.walk(p):
            dirs[:] = [x for x in dirs if x not in ('node_modules', 'dist', '.angular')]
            for f in fs:
                if f.endswith(EXTS):
                    yield os.path.join(d, f)

# Collect the variable names that are really used as CSS custom properties
usage = [
    re.compile(r'var\(\s*(' + NAME + r')'),
    re.compile(r'(?<![\w-])(' + NAME + r')\s*:(?!:)'),
    re.compile(r"""['"](""" + NAME + r""")['"]"""),
    re.compile(r'\[style\.(' + NAME + r')\]'),
]
names = set()
for p in files():
    if p.endswith('.md'):
        continue
    text = open(p, errors='ignore').read()
    for rx in usage:
        names.update(rx.findall(text))
names = {n for n in names if not n.startswith('--dasar-') and n not in EXCLUDE_NAMES}
# drop CLI flags that slipped in from quoted strings
names = {n for n in names if n not in ('--release-as', '--watch', '--project')}

pattern = re.compile(r'(?<![\w-])(' + '|'.join(sorted(map(re.escape, names), key=len, reverse=True)) + r')(?![a-z0-9-])')

apply = '--apply' in sys.argv
changed, total = 0, 0
per_name = collections.Counter()
for p in files():
    text = open(p, errors='ignore').read()
    new, n = pattern.subn(lambda m: '--dasar-' + m.group(1)[2:], text)
    if n:
        changed += 1; total += n
        for m in pattern.findall(text):
            per_name[m] += 1
        if apply:
            open(p, 'w').write(new)

print(('APPLIED' if apply else 'DRY RUN'), 'files:', changed, 'replacements:', total, 'distinct names:', len(names))
if '--list' in sys.argv:
    for k in sorted(names): print(k)
