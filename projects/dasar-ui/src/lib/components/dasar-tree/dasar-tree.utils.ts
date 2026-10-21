export type DasarTreeKey = string | number;
export type DasarTreeDropPosition = 'before' | 'inside' | 'after';
export type DasarTreeCheckState = 'checked' | 'unchecked' | 'indeterminate';

export interface DasarTreeItem {
  key: DasarTreeKey;
  label: string;
  children?: DasarTreeItem[];
  disabled?: boolean;
  iconName?: string;
  data?: unknown;
}

export interface DasarTreeMeta {
  item: DasarTreeItem;
  parentKey: DasarTreeKey | null;
  level: number;
}

export const hasChildren = (item: DasarTreeItem): boolean => !!item.children?.length;

export function buildIndex(items: DasarTreeItem[]): Map<DasarTreeKey, DasarTreeMeta> {
  const index = new Map<DasarTreeKey, DasarTreeMeta>();
  const visit = (list: DasarTreeItem[], parentKey: DasarTreeKey | null, level: number) => {
    for (const item of list) {
      index.set(item.key, { item, parentKey, level });
      if (item.children) visit(item.children, item.key, level + 1);
    }
  };
  visit(items, null, 0);
  return index;
}

export function collectKeys(items: DasarTreeItem[]): DasarTreeKey[] {
  const keys: DasarTreeKey[] = [];
  const visit = (list: DasarTreeItem[]) => {
    for (const item of list) {
      keys.push(item.key);
      if (item.children) visit(item.children);
    }
  };
  visit(items);
  return keys;
}

/** Keys of the nodes that have children, used for expand all. */
export function collectParentKeys(items: DasarTreeItem[]): DasarTreeKey[] {
  const keys: DasarTreeKey[] = [];
  const visit = (list: DasarTreeItem[]) => {
    for (const item of list) {
      if (hasChildren(item)) {
        keys.push(item.key);
        visit(item.children!);
      }
    }
  };
  visit(items);
  return keys;
}

export function isDescendant(
  index: Map<DasarTreeKey, DasarTreeMeta>,
  ancestorKey: DasarTreeKey,
  key: DasarTreeKey,
): boolean {
  let parent = index.get(key)?.parentKey ?? null;
  while (parent !== null) {
    if (parent === ancestorKey) return true;
    parent = index.get(parent)?.parentKey ?? null;
  }
  return false;
}

/** The node itself when it is a leaf, otherwise every leaf below it. */
export function leafKeysOf(item: DasarTreeItem): DasarTreeKey[] {
  if (!hasChildren(item)) return [item.key];
  return item.children!.flatMap(leafKeysOf);
}

/** Leaves below a node that the user can change: skips disabled nodes and their subtrees. */
function enabledLeafKeysOf(item: DasarTreeItem): DasarTreeKey[] {
  if (item.disabled) return [];
  if (!hasChildren(item)) return [item.key];
  return item.children!.flatMap(enabledLeafKeysOf);
}

export function checkStateOf(
  item: DasarTreeItem,
  leaves: ReadonlySet<DasarTreeKey>,
): DasarTreeCheckState {
  const keys = leafKeysOf(item);
  const checked = keys.filter((key) => leaves.has(key)).length;
  if (checked === 0) return 'unchecked';
  return checked === keys.length ? 'checked' : 'indeterminate';
}

/** Turns a list of checked keys (leaves and/or parents) into the set of checked leaves. */
export function normalizeChecked(
  index: Map<DasarTreeKey, DasarTreeMeta>,
  keys: readonly DasarTreeKey[],
): Set<DasarTreeKey> {
  const leaves = new Set<DasarTreeKey>();
  for (const key of keys) {
    const meta = index.get(key);
    if (meta) leafKeysOf(meta.item).forEach((leaf) => leaves.add(leaf));
  }
  return leaves;
}

export function toggleChecked(
  index: Map<DasarTreeKey, DasarTreeMeta>,
  leaves: ReadonlySet<DasarTreeKey>,
  key: DasarTreeKey,
): Set<DasarTreeKey> {
  const meta = index.get(key);
  const next = new Set(leaves);
  if (!meta || meta.item.disabled) return next;
  const target = checkStateOf(meta.item, leaves) !== 'checked';
  for (const leaf of enabledLeafKeysOf(meta.item)) {
    if (target) next.add(leaf);
    else next.delete(leaf);
  }
  return next;
}

/** Keys of every node that is fully checked, in tree order (parents included). */
export function checkedKeysFrom(
  items: DasarTreeItem[],
  leaves: ReadonlySet<DasarTreeKey>,
): DasarTreeKey[] {
  const keys: DasarTreeKey[] = [];
  const visit = (list: DasarTreeItem[]) => {
    for (const item of list) {
      if (checkStateOf(item, leaves) === 'checked') keys.push(item.key);
      if (item.children) visit(item.children);
    }
  };
  visit(items);
  return keys;
}

/** Keys that match the query plus all of their ancestors, so matches stay reachable. */
export function filterTree(
  items: DasarTreeItem[],
  matches: (item: DasarTreeItem) => boolean,
): { visible: Set<DasarTreeKey>; parentsOfMatches: Set<DasarTreeKey> } {
  const visible = new Set<DasarTreeKey>();
  const parentsOfMatches = new Set<DasarTreeKey>();
  const visit = (item: DasarTreeItem): boolean => {
    const childMatched = (item.children ?? []).map(visit).some(Boolean);
    const selfMatched = matches(item);
    if (selfMatched || childMatched) visible.add(item.key);
    if (childMatched) parentsOfMatches.add(item.key);
    return selfMatched || childMatched;
  };
  items.forEach(visit);
  return { visible, parentsOfMatches };
}

function removeItem(
  items: DasarTreeItem[],
  key: DasarTreeKey,
): { items: DasarTreeItem[]; removed: DasarTreeItem | null } {
  let removed: DasarTreeItem | null = null;
  const next: DasarTreeItem[] = [];
  for (const item of items) {
    if (item.key === key) {
      removed = item;
      continue;
    }
    if (item.children) {
      const result = removeItem(item.children, key);
      if (result.removed) {
        removed = result.removed;
        next.push({ ...item, children: result.items });
        continue;
      }
    }
    next.push(item);
  }
  return { items: next, removed };
}

function insertItem(
  items: DasarTreeItem[],
  targetKey: DasarTreeKey,
  moved: DasarTreeItem,
  position: DasarTreeDropPosition,
): { items: DasarTreeItem[]; inserted: boolean } {
  const at = items.findIndex((item) => item.key === targetKey);
  if (at !== -1) {
    const next = [...items];
    if (position === 'inside') {
      next[at] = { ...next[at], children: [...(next[at].children ?? []), moved] };
    } else {
      next.splice(position === 'before' ? at : at + 1, 0, moved);
    }
    return { items: next, inserted: true };
  }
  for (let i = 0; i < items.length; i++) {
    const children = items[i].children;
    if (!children) continue;
    const result = insertItem(children, targetKey, moved, position);
    if (result.inserted) {
      const next = [...items];
      next[i] = { ...items[i], children: result.items };
      return { items: next, inserted: true };
    }
  }
  return { items, inserted: false };
}

/** Moves a node next to or into another one without changing the input. */
export function moveItem(
  items: DasarTreeItem[],
  dragKey: DasarTreeKey,
  targetKey: DasarTreeKey,
  position: DasarTreeDropPosition,
): DasarTreeItem[] | null {
  if (dragKey === targetKey) return null;
  const index = buildIndex(items);
  if (!index.has(dragKey) || !index.has(targetKey)) return null;
  if (isDescendant(index, dragKey, targetKey)) return null;
  const { items: withoutDrag, removed } = removeItem(items, dragKey);
  if (!removed) return null;
  const result = insertItem(withoutDrag, targetKey, removed, position);
  return result.inserted ? result.items : null;
}
