import re, subprocess, sys

def sh(*args, input=None):
    return subprocess.run(args, capture_output=True, text=True, input=input, check=True).stdout

def head(path):
    return sh('git', 'show', f'HEAD:{path}')

def work(path):
    return open(path).read()

def stage_blob(path, content):
    sha = sh('git', 'hash-object', '-w', '--stdin', input=content).strip()
    sh('git', 'update-index', '--add', '--cacheinfo', f'100644,{sha},{path}')

def cut(text, start_pattern, end_marker):
    """Remove from the first match of start_pattern through the first end_marker after it."""
    m = re.search(start_pattern, text, re.M)
    assert m, start_pattern
    end = text.index(end_marker, m.start()) + len(end_marker)
    return text[:m.start()] + text[end:]

def drop(text, snippet):
    assert snippet in text, snippet
    return text.replace(snippet, '', 1)

# Remove the tree pieces from the working files
def no_tree(path, text):
    if path.endswith('public-api.ts'):
        return drop(text, "export * from './lib/components/dasar-tree/dasar-tree';\n")
    if path.endswith('theme.model.ts'):
        text = drop(text, "import { DasarTreeConfig } from '../components/dasar-tree/dasar-tree';\n")
        text = cut(text, r'^export interface DasarThemeTree \{', '}\n')
        text = drop(text, "  tree?: DasarTreeConfig;\n")
        text = drop(text, "      tree?: DasarThemeTree;\n")
        return drop(text, "      tree?: DasarThemeTree;\n")
    if path.endswith('theme.service.ts'):
        text = drop(text, "  DasarThemeTree,\n")
        text = cut(text, r'^export const treeMap', '};\n')
        return cut(text, r'^    if \(config\.tokens\?\.\[config\.mode\]\?\.tree\) \{', '    }\n')
    if path.endswith('dasar-theme-provider.ts'):
        text = drop(text, "  treeMap,\n")
        return cut(text, r'^\n    const treeTokens', '    }\n')
    if path.endswith('app.routes.ts'):
        text = drop(text, "import { TreeDocPage } from '../pages/tree/tree.page';\n")
        return cut(text, r"^  \{\n    path: 'components/tree',", "  },\n")
    if path.endswith('theming.data.ts'):
        text = drop(text, "  treeMap,\n")
        text = drop(text, "  { component: 'tree', path: 'tokens.light.tree', map: treeMap },\n")
        return cut(text, r'^  tree: \[', '  ],\n')
    if path.endswith('README.md'):
        return text.replace('Drawer, Tree,', 'Drawer,')
    raise SystemExit('no rule for ' + path)

def no_drawer(path, text):
    assert path.endswith('theming.data.ts')
    text = drop(text, "  drawerMap,\n")
    text = drop(text, "  { component: 'drawer', path: 'tokens.light.drawer', map: drawerMap },\n")
    return cut(text, r'^  drawer: \[', '  ],\n')

SHARED = [
    'projects/dasar-ui/src/public-api.ts',
    'projects/dasar-ui/src/lib/models/theme.model.ts',
    'projects/dasar-ui/src/lib/services/theme.service.ts',
    'projects/dasar-ui/src/lib/components/dasar-theme-provider/dasar-theme-provider.ts',
    'projects/documentation/src/app/routes/app.routes.ts',
    'projects/documentation/src/app/pages/theming/theming.data.ts',
    'README.md',
    'projects/dasar-ui/README.md',
]
NAV = "        { label: 'Modal', route: '/components/modal' },\n"
LAYOUT = 'projects/documentation/src/app/layouts/doc.layout.ts'

def layout_state(with_tree):
    text = head(LAYOUT)
    assert NAV in text, 'modal nav line missing at HEAD'
    add = "        { label: 'Drawer', route: '/components/drawer' },\n"
    if with_tree:
        add += "        { label: 'Tree', route: '/components/tree' },\n"
    return text.replace(NAV, NAV + add, 1)

def stage(step):
    if step == 1:
        paths = ['projects/dasar-ui/src/lib/components/dasar-checkbox/dasar-checkbox.html',
                 'projects/dasar-ui/src/lib/components/dasar-checkbox/dasar-checkbox.scss',
                 'projects/dasar-ui/src/lib/components/dasar-checkbox/dasar-checkbox.spec.ts',
                 'projects/dasar-ui/src/lib/components/dasar-checkbox/dasar-checkbox.ts',
                 'projects/documentation/src/app/pages/checkbox/checkbox.page.ts']
        sh('git', 'add', *paths)
        p = 'projects/documentation/src/app/pages/theming/theming.data.ts'
        stage_blob(p, no_drawer(p, no_tree(p, work(p))))
    elif step == 2:
        sh('git', 'add', 'projects/dasar-ui/src/lib/components/dasar-drawer', 'projects/documentation/src/app/pages/drawer')
        for p in SHARED:
            stage_blob(p, no_tree(p, work(p)))
        stage_blob(LAYOUT, layout_state(False))
    elif step == 3:
        sh('git', 'add', 'projects/dasar-ui/src/lib/components/dasar-tree', 'projects/documentation/src/app/pages/tree')
        for p in SHARED:
            stage_blob(p, work(p))
        stage_blob(LAYOUT, layout_state(True))

if __name__ == '__main__':
    stage(int(sys.argv[1]))
