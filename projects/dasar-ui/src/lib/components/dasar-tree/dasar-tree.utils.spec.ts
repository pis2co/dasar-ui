import {
  DasarTreeItem,
  buildIndex,
  checkStateOf,
  checkedKeysFrom,
  collectParentKeys,
  filterTree,
  isDescendant,
  leafKeysOf,
  moveItem,
  normalizeChecked,
  toggleChecked,
} from './dasar-tree.utils';

const sample = (): DasarTreeItem[] => [
  {
    key: 'a',
    label: 'Alpha',
    children: [
      { key: 'a1', label: 'Alpha One' },
      { key: 'a2', label: 'Alpha Two', children: [{ key: 'a2x', label: 'Deep' }] },
    ],
  },
  { key: 'b', label: 'Beta' },
  {
    key: 'c',
    label: 'Gamma',
    children: [
      { key: 'c1', label: 'One', disabled: true },
      { key: 'c2', label: 'Two' },
    ],
  },
];

const keysOf = (items: DasarTreeItem[]): any[] =>
  items.map((item) => (item.children ? [item.key, keysOf(item.children)] : item.key));

describe('dasar-tree utils', () => {
  it('indexes parents and levels', () => {
    const index = buildIndex(sample());

    expect(index.get('a2x')).toMatchObject({ parentKey: 'a2', level: 2 });
    expect(index.get('b')).toMatchObject({ parentKey: null, level: 0 });
    expect(isDescendant(index, 'a', 'a2x')).toBe(true);
    expect(isDescendant(index, 'b', 'a2x')).toBe(false);
  });

  it('lists the keys of the nodes that have children', () => {
    expect(collectParentKeys(sample())).toEqual(['a', 'a2', 'c']);
  });

  it('lists the leaves below a node', () => {
    expect(leafKeysOf(sample()[0])).toEqual(['a1', 'a2x']);
    expect(leafKeysOf(sample()[1])).toEqual(['b']);
  });

  describe('moveItem', () => {
    it('moves a node before and after a sibling', () => {
      expect(keysOf(moveItem(sample(), 'b', 'a', 'before')!)).toEqual([
        'b',
        ['a', ['a1', ['a2', ['a2x']]]],
        ['c', ['c1', 'c2']],
      ]);
      expect(keysOf(moveItem(sample(), 'a', 'b', 'after')!)).toEqual([
        'b',
        ['a', ['a1', ['a2', ['a2x']]]],
        ['c', ['c1', 'c2']],
      ]);
    });

    it('moves a node into another one', () => {
      const result = moveItem(sample(), 'b', 'c', 'inside')!;

      expect(keysOf(result)).toEqual([
        ['a', ['a1', ['a2', ['a2x']]]],
        ['c', ['c1', 'c2', 'b']],
      ]);
    });

    it('turns a leaf into a folder when dropped inside', () => {
      const result = moveItem(sample(), 'c2', 'b', 'inside')!;

      expect(keysOf(result)).toContainEqual(['b', ['c2']]);
    });

    it('reorders inside the same parent', () => {
      const result = moveItem(sample(), 'a1', 'a2', 'after')!;

      expect(keysOf(result)[0]).toEqual(['a', [['a2', ['a2x']], 'a1']]);
    });

    it('does not change the original items', () => {
      const original = sample();
      moveItem(original, 'b', 'c', 'inside');

      expect(keysOf(original)).toEqual(keysOf(sample()));
    });

    it('refuses to move a node onto itself or into its own subtree', () => {
      expect(moveItem(sample(), 'a', 'a', 'inside')).toBeNull();
      expect(moveItem(sample(), 'a', 'a2x', 'inside')).toBeNull();
      expect(moveItem(sample(), 'a', 'a1', 'before')).toBeNull();
    });

    it('returns null for unknown keys', () => {
      expect(moveItem(sample(), 'nope', 'a', 'before')).toBeNull();
      expect(moveItem(sample(), 'a', 'nope', 'before')).toBeNull();
    });
  });

  describe('checking', () => {
    it('checks all leaves below a parent and reports the parent as checked', () => {
      const index = buildIndex(sample());
      const leaves = toggleChecked(index, new Set(), 'a');

      expect([...leaves].sort()).toEqual(['a1', 'a2x']);
      expect(checkedKeysFrom(sample(), leaves)).toEqual(['a', 'a1', 'a2', 'a2x']);
    });

    it('reports a partly checked parent as indeterminate', () => {
      const leaves = new Set(['a1']);

      expect(checkStateOf(sample()[0], leaves)).toBe('indeterminate');
      expect(checkStateOf(sample()[1], leaves)).toBe('unchecked');
    });

    it('unchecks a fully checked parent', () => {
      const index = buildIndex(sample());
      const checked = toggleChecked(index, new Set(), 'a');

      expect(toggleChecked(index, checked, 'a').size).toBe(0);
    });

    it('checks an indeterminate parent', () => {
      const index = buildIndex(sample());

      expect([...toggleChecked(index, new Set(['a1']), 'a')].sort()).toEqual(['a1', 'a2x']);
    });

    it('skips disabled nodes when toggling a parent', () => {
      const index = buildIndex(sample());
      const leaves = toggleChecked(index, new Set(), 'c');

      expect([...leaves]).toEqual(['c2']);
      expect(checkStateOf(sample()[2], leaves)).toBe('indeterminate');
    });

    it('ignores a toggle on a disabled node', () => {
      const index = buildIndex(sample());

      expect(toggleChecked(index, new Set(), 'c1').size).toBe(0);
    });

    it('expands parent keys into leaves', () => {
      const index = buildIndex(sample());

      expect([...normalizeChecked(index, ['a', 'b', 'missing'])].sort()).toEqual([
        'a1',
        'a2x',
        'b',
      ]);
    });
  });

  describe('filterTree', () => {
    it('keeps matches and their ancestors', () => {
      const { visible, parentsOfMatches } = filterTree(sample(), (item) => item.label === 'Deep');

      expect([...visible].sort()).toEqual(['a', 'a2', 'a2x']);
      expect([...parentsOfMatches].sort()).toEqual(['a', 'a2']);
    });

    it('returns nothing when there is no match', () => {
      expect(filterTree(sample(), () => false).visible.size).toBe(0);
    });
  });
});
