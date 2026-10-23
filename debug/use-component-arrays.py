# Replaces raw component classes in the imports array with the matching Component arrays.
import re, sys

ARRAYS = {
    'DasarIcon': 'DasarIconComponent',
    'DasarButton': 'DasarButtonComponent',
    'DasarOverlay': 'DasarOverlayComponent',
    'DasarCheckbox': 'DasarCheckboxComponent',
    'DasarInput': 'DasarInputComponent',
}
SLOTS_COVERED = {'DasarInputPrefixSlot'}
BASE = 'projects/dasar-ui/src/lib/components/'
FILES = [
    'dasar-alert/dasar-alert.ts', 'dasar-card/dasar-card.ts', 'dasar-checkbox/dasar-checkbox.ts',
    'dasar-drawer/dasar-drawer.ts', 'dasar-modal/dasar-modal.ts',
    'dasar-number-input/dasar-number-input.ts', 'dasar-switch/dasar-switch.ts',
    'dasar-tabs/dasar-tabs.ts', 'dasar-toast/dasar-toast.ts', 'dasar-tree/dasar-tree.ts',
]

def transform(text):
    m = re.search(r"(  imports: \[)([^\]]*)(\],)", text)
    names = [n.strip() for n in m.group(2).split(',') if n.strip()]
    used_arrays, new_names = [], []
    for n in names:
        if n in SLOTS_COVERED:
            continue
        if n in ARRAYS:
            used_arrays.append(n)
            new_names.append(ARRAYS[n])
        else:
            new_names.append(n)
    text = text[:m.start(2)] + ', '.join(new_names) + text[m.end(2):]
    body = re.sub(r"^import [\s\S]*?;\n", '', text, flags=re.M)
    body = re.sub(r"  imports: \[[^\]]*\],", '', body)
    def fix(mi):
        names = [n.strip() for n in mi.group(1).split(',') if n.strip()]
        module = mi.group(2)
        out = []
        for n in names:
            if (n in ARRAYS or n in SLOTS_COVERED) and not re.search(r"\b%s\b" % n, body):
                if n in ARRAYS and ARRAYS[n] not in out:
                    out.append(ARRAYS[n])
                continue
            out.append(n)
        for raw in used_arrays:
            if ('../dasar-%s/' % raw[5:].lower()) in module or module.endswith('dasar-%s/dasar-%s' % (raw[5:].lower(), raw[5:].lower())):
                pass
        return "import { %s } from '%s';" % (', '.join(out), module)
    text = re.sub(r"import \{([^}]*)\} from '(\.\./dasar-(?:icon|button|overlay|checkbox|input)/[a-z-]+)';", fix, text)
    return text

for f in FILES:
    p = BASE + f
    s = open(p).read()
    t = transform(s)
    open(p, 'w').write(t)
    print('changed' if s != t else 'same', f)
