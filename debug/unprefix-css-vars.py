import os, re, subprocess, sys

ROOT = os.getcwd()
SCAN = ('projects/dasar-ui/src/', 'projects/documentation/src/')
EXTS = ('.scss', '.css', '.ts', '.html')
NAME = r'--[a-z0-9][a-z0-9-]*'
usage = [
    re.compile(r'var\(\s*(' + NAME + r')'),
    re.compile(r'(?<![\w-])(' + NAME + r')\s*:(?!:)'),
    re.compile(r"""['"](""" + NAME + r""")['"]"""),
    re.compile(r'\[style\.(' + NAME + r')\]'),
]
head_files = subprocess.run(['git', 'ls-tree', '-r', '--name-only', 'HEAD'], capture_output=True, text=True).stdout.split('\n')
names = set()
for path in head_files:
    if not path.startswith(SCAN) or not path.endswith(EXTS):
        continue
    text = subprocess.run(['git', 'show', 'HEAD:' + path], capture_output=True, text=True).stdout
    for rx in usage:
        names.update(rx.findall(text))
# old names are the ones that did not start with --dasar- at HEAD, excluding the ones the codemod skipped
names = {n for n in names if not n.startswith('--dasar-') and n not in ('--moz-appearance', '--release-as', '--watch', '--project')}
pattern = re.compile(r'(?<![\w-])--dasar-(' + '|'.join(sorted((re.escape(n[2:]) for n in names), key=len, reverse=True)) + r')(?![a-z0-9-])')

apply = '--apply' in sys.argv
changed = total = 0
for d, dirs, fs in os.walk('projects'):
    dirs[:] = [x for x in dirs if x not in ('node_modules', 'dist', '.angular')]
    for f in fs:
        if not f.endswith(EXTS):
            continue
        p = os.path.join(d, f)
        text = open(p, errors='ignore').read()
        new, n = pattern.subn(lambda m: '--' + m.group(1), text)
        if n:
            changed += 1; total += n
            if apply:
                open(p, 'w').write(new)
print('APPLIED' if apply else 'DRY RUN', 'names:', len(names), 'files:', changed, 'replacements:', total)
