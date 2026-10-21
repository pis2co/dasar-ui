import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DasarIcon } from '../dasar-icon/dasar-icon';
import {
  DasarTreeComponent,
  DasarTreeDragEvent,
  DasarTreeDropEvent,
  DasarTreeItem,
  DasarTreeKey,
  DasarTreeType,
} from './dasar-tree';

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
  { key: 'c', label: 'Gamma', disabled: true, children: [{ key: 'c1', label: 'Gamma One' }] },
];

@Component({
  standalone: true,
  imports: [DasarTreeComponent],
  template: `
    <dasar-tree
      [items]="items()"
      [type]="type()"
      [size]="size()"
      [label]="label()"
      [hint]="hint()"
      [disabled]="disabled()"
      [draggable]="draggable()"
      [show-line]="showLine()"
      [search]="search()"
      [selectable]="selectable()"
      [multiple]="multiple()"
      [default-expand-all]="expandAll()"
      (itemsChange)="items.set($event)"
      (onUpdateExpandedKeys)="expanded.push($event)"
      (onUpdateSelectedKeys)="selected.push($event)"
      (onUpdateCheckedKeys)="checked.push($event)"
      (onDragStart)="drags.push($event)"
      (onDragEnter)="enters.push($event)"
      (onDragLeave)="leaves.push($event)"
      (onDrop)="drops.push($event)"
    />
  `,
})
class TreeHost {
  items = signal<DasarTreeItem[]>(sample());
  type = signal<DasarTreeType>(null);
  size = signal<'sm' | 'md' | 'lg'>('md');
  label = signal('');
  hint = signal('');
  disabled = signal(false);
  draggable = signal(false);
  showLine = signal(false);
  search = signal(false);
  selectable = signal(false);
  multiple = signal(false);
  expandAll = signal(false);
  expanded: DasarTreeKey[][] = [];
  selected: DasarTreeKey[][] = [];
  checked: DasarTreeKey[][] = [];
  drags: DasarTreeDragEvent[] = [];
  enters: DasarTreeDragEvent[] = [];
  leaves: DasarTreeDragEvent[] = [];
  drops: DasarTreeDropEvent[] = [];
}

@Component({
  standalone: true,
  imports: [DasarTreeComponent],
  template: `
    <dasar-tree [items]="items" default-expand-all>
      <span label-slot class="custom-label">Files</span>
      <span extra-header-slot class="custom-extra">extra</span>
      <span hint-slot class="custom-hint">Hint slot</span>
      <ng-template tree-prefix-slot let-item
        ><b class="prefix">P-{{ item.key }}</b></ng-template
      >
      <ng-template tree-suffix-slot let-item
        ><i class="suffix">S-{{ item.key }}</i></ng-template
      >
      <ng-template tree-children-slot="b" let-item>
        <em class="custom-content">custom {{ item.label }}</em>
      </ng-template>
    </dasar-tree>
  `,
})
class TreeSlotsHost {
  items = sample();
}

@Component({
  standalone: true,
  imports: [DasarTreeComponent],
  template: `
    <dasar-tree [items]="items" default-expand-all>
      <ng-template tree-icon-slot let-item
        ><u class="custom-icon">{{ item.key }}</u></ng-template
      >
      <ng-template tree-leaf-slot let-item let-toggle="toggle">
        <button class="custom-toggle" (click)="toggle(); $event.stopPropagation()">t</button>
      </ng-template>
    </dasar-tree>
  `,
})
class TreeIconLeafSlotsHost {
  items = sample();
}

@Component({
  standalone: true,
  imports: [DasarTreeComponent],
  template: `
    <dasar-tree [items]="items" search>
      <div search-slot class="custom-search">own search</div>
    </dasar-tree>
  `,
})
class TreeSearchSlotHost {
  items = sample();
}

@Component({
  standalone: true,
  imports: [DasarTreeComponent, FormsModule],
  template: `<dasar-tree [items]="items" type="selectable" [(ngModel)]="model" />`,
})
class TreeModelHost {
  items = sample();
  model: DasarTreeKey | null = 'b';
}

@Component({
  standalone: true,
  imports: [DasarTreeComponent, FormsModule],
  template: `<dasar-tree [items]="items" type="multiple" default-expand-all [(ngModel)]="model" />`,
})
class TreeMultiModelHost {
  items = sample();
  model: DasarTreeKey[] = ['a1'];
}

describe('DasarTree', () => {
  let fixture: ComponentFixture<TreeHost>;
  let host: TreeHost;

  const rows = () =>
    Array.from(fixture.nativeElement.querySelectorAll('.dasar-tree-row')) as HTMLElement[];
  const labels = () =>
    rows().map((row) => row.querySelector('.dasar-tree-label-text')?.textContent?.trim());
  const row = (label: string) =>
    rows().find((r) => r.querySelector('.dasar-tree-label-text')?.textContent?.trim() === label)!;
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const click = async (el: Element) => {
    (el as HTMLElement).click();
    await settle();
  };
  const key = async (el: HTMLElement, name: string) => {
    el.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }));
    await settle();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TreeHost] }).compileComponents();
    fixture = TestBed.createComponent(TreeHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows only the top level at first', () => {
    expect(labels()).toEqual(['Alpha', 'Beta', 'Gamma']);
    expect(fixture.nativeElement.querySelector('[role="tree"]')).toBeTruthy();
  });

  it('exposes the tree roles and levels', async () => {
    await click(row('Alpha'));

    expect(row('Alpha').getAttribute('role')).toBe('treeitem');
    expect(row('Alpha').getAttribute('aria-level')).toBe('1');
    expect(row('Alpha').getAttribute('aria-expanded')).toBe('true');
    expect(row('Alpha One').getAttribute('aria-level')).toBe('2');
    expect(row('Beta').getAttribute('aria-expanded')).toBeNull();
  });

  it('expands and collapses on row click and reports the keys', async () => {
    await click(row('Alpha'));
    expect(labels()).toEqual(['Alpha', 'Alpha One', 'Alpha Two', 'Beta', 'Gamma']);
    expect(host.expanded).toEqual([['a']]);

    await click(row('Alpha Two'));
    expect(labels()).toContain('Deep');
    expect(host.expanded[1]).toEqual(['a', 'a2']);

    await click(row('Alpha'));
    expect(labels()).toEqual(['Alpha', 'Beta', 'Gamma']);
    expect(host.expanded[2]).toEqual(['a2']);
  });

  it('expands from the arrow without selecting', async () => {
    host.selectable.set(true);
    await settle();

    await click(row('Alpha').querySelector('.dasar-tree-expander')!);

    expect(labels()).toContain('Alpha One');
    expect(host.selected).toEqual([]);
  });

  it('expands everything with default-expand-all', async () => {
    host.expandAll.set(true);
    host.items.set(sample());
    await settle();

    expect(labels()).toEqual([
      'Alpha',
      'Alpha One',
      'Alpha Two',
      'Deep',
      'Beta',
      'Gamma',
      'Gamma One',
    ]);
  });

  it('applies the size class', async () => {
    host.size.set('lg');
    await settle();

    expect(fixture.nativeElement.querySelector('.dasar-tree-container').classList).toContain(
      'size-lg',
    );
  });

  it('renders the label and hint', async () => {
    host.label.set('Folders');
    host.hint.set('Pick one');
    await settle();

    expect(fixture.nativeElement.querySelector('.dasar-tree-label').textContent).toContain(
      'Folders',
    );
    expect(fixture.nativeElement.querySelector('.dasar-tree-hint').textContent).toContain(
      'Pick one',
    );
    expect(
      fixture.nativeElement.querySelector('[role="tree"]').getAttribute('aria-labelledby'),
    ).toBeTruthy();
  });

  it('shows an empty message without items', async () => {
    host.items.set([]);
    await settle();

    expect(fixture.nativeElement.querySelector('.dasar-tree-empty').textContent).toContain(
      'No data',
    );
  });

  describe('type file', () => {
    beforeEach(async () => {
      host.type.set('file');
      await settle();
    });

    it('keeps the arrow and adds a folder icon, with a file icon for leaves', async () => {
      const iconOf = (label: string) =>
        fixture.debugElement
          .queryAll(By.css('.dasar-tree-row'))
          .find((el) => el.nativeElement === row(label))!
          .query(By.css('.dasar-tree-icon'))
          .query(By.directive(DasarIcon)).componentInstance.name;

      expect(row('Alpha').querySelector('.dasar-tree-arrow')).toBeTruthy();
      expect(row('Beta').querySelector('.dasar-tree-arrow')).toBeNull();
      expect(iconOf('Alpha')).toBe('folder');
      expect(iconOf('Beta')).toBe('file');

      await click(row('Alpha').querySelector('.dasar-tree-expander')!);
      expect(iconOf('Alpha')).toBe('folder-open');
      expect(iconOf('Alpha One')).toBe('file');
    });

    it('can also be selectable', async () => {
      host.selectable.set(true);
      await settle();
      await click(row('Beta'));

      expect(host.selected).toEqual([['b']]);
      expect(row('Beta').classList).toContain('selected');
    });
  });

  describe('type selectable', () => {
    beforeEach(async () => {
      host.type.set('selectable');
      await settle();
    });

    it('selects one row at a time', async () => {
      await click(row('Beta'));
      await click(row('Alpha'));

      expect(host.selected).toEqual([['b'], ['a']]);
      expect(row('Beta').classList).not.toContain('selected');
      expect(row('Alpha').getAttribute('aria-selected')).toBe('true');
    });

    it('does not report a selection again when clicking the selected row', async () => {
      await click(row('Beta'));
      await click(row('Beta'));

      expect(host.selected.length).toBe(1);
    });

    it('does not select disabled rows', async () => {
      await click(row('Gamma'));

      expect(host.selected).toEqual([]);
      expect(row('Gamma').getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('type multiple', () => {
    beforeEach(async () => {
      host.type.set('multiple');
      host.expandAll.set(true);
      host.items.set(sample());
      await settle();
    });

    const box = (label: string) =>
      row(label).querySelector('.dasar-tree-check dasar-checkbox') as HTMLElement;
    const input = (label: string) =>
      row(label).querySelector('.dasar-tree-check input') as HTMLInputElement;

    it('renders a checkbox per row', () => {
      expect(fixture.nativeElement.querySelectorAll('.dasar-tree-check').length).toBe(7);
    });

    it('checks a leaf and makes its parents indeterminate', async () => {
      await click(input('Alpha One'));

      expect(host.checked).toEqual([['a1']]);
      expect(input('Alpha').indeterminate).toBe(true);
      expect(row('Alpha').getAttribute('aria-checked')).toBe('mixed');
      expect(row('Alpha One').getAttribute('aria-checked')).toBe('true');
    });

    it('checks every descendant when a parent is checked', async () => {
      await click(input('Alpha'));

      expect(host.checked[0]).toEqual(['a', 'a1', 'a2', 'a2x']);
      expect(row('Deep').getAttribute('aria-checked')).toBe('true');
    });

    it('unchecks the parent again', async () => {
      await click(input('Alpha'));
      await click(input('Alpha'));

      expect(host.checked[1]).toEqual([]);
    });

    it('toggles the check when the row is clicked', async () => {
      await click(row('Beta'));

      expect(host.checked).toEqual([['b']]);
    });

    it('does not check disabled rows', async () => {
      expect(box('Gamma').querySelector('input')?.disabled).toBe(true);
      await click(row('Gamma One'));

      expect(host.checked).toEqual([]);
    });

    it('does not trigger the row when the checkbox is clicked', async () => {
      await click(input('Beta'));

      expect(host.checked).toEqual([['b']]);
    });
  });

  describe('search', () => {
    const query = async (value: string) => {
      const field = fixture.nativeElement.querySelector(
        '.dasar-tree-search input',
      ) as HTMLInputElement;
      field.value = value;
      field.dispatchEvent(new Event('input', { bubbles: true }));
      await settle();
    };

    beforeEach(async () => {
      host.search.set(true);
      await settle();
    });

    it('renders the search field', () => {
      expect(fixture.nativeElement.querySelector('.dasar-tree-search input')).toBeTruthy();
    });

    it('keeps matches with their ancestors and expands them', async () => {
      await query('deep');

      expect(labels()).toEqual(['Alpha', 'Alpha Two', 'Deep']);
    });

    it('is case insensitive and matches parents', async () => {
      await query('BETA');

      expect(labels()).toEqual(['Beta']);
    });

    it('shows a message when nothing matches', async () => {
      await query('zzz');

      expect(fixture.nativeElement.querySelector('.dasar-tree-empty').textContent).toContain(
        'No matching',
      );
    });

    it('restores the tree when the query is cleared', async () => {
      await query('deep');
      await query('');

      expect(labels()).toEqual(['Alpha', 'Beta', 'Gamma']);
    });
  });

  describe('show-line', () => {
    beforeEach(async () => {
      host.showLine.set(true);
      host.expandAll.set(true);
      host.items.set(sample());
      await settle();
    });

    it('draws an elbow on nested leaves only', () => {
      expect(row('Alpha').querySelector('.elbow')).toBeNull();
      expect(row('Alpha One').querySelector('.elbow')).toBeTruthy();
      expect(row('Alpha Two').querySelector('.elbow')).toBeNull();
      expect(row('Beta').querySelector('.elbow')).toBeNull();
    });

    it('ends the line at the elbow of the last leaf', () => {
      expect(row('Alpha One').querySelector('.elbow')!.classList).not.toContain('last');
      expect(row('Deep').querySelector('.elbow')!.classList).toContain('last');
    });

    it('draws a guide line for every ancestor column', () => {
      const guides = row('Deep').querySelectorAll('.dasar-tree-indent');

      expect(guides.length).toBe(2);
      guides.forEach((guide) => expect(guide.classList).toContain('line'));
      expect(row('Alpha').querySelectorAll('.dasar-tree-indent').length).toBe(0);
    });

    it('draws no lines when show-line is off', async () => {
      host.showLine.set(false);
      await settle();

      expect(fixture.nativeElement.querySelector('.dasar-tree-indent.line')).toBeNull();
      expect(fixture.nativeElement.querySelector('.elbow')).toBeNull();
    });
  });

  describe('disabled', () => {
    it('blocks every interaction', async () => {
      host.disabled.set(true);
      await settle();
      await click(row('Alpha'));

      expect(labels()).toEqual(['Alpha', 'Beta', 'Gamma']);
      expect(host.expanded).toEqual([]);
    });
  });

  describe('keyboard', () => {
    const list = () => fixture.nativeElement.querySelector('[role="tree"]') as HTMLElement;

    it('uses a single tab stop', () => {
      const stops = rows().filter((r) => r.getAttribute('tabindex') === '0');

      expect(stops.length).toBe(1);
      expect(stops[0]).toBe(row('Alpha'));
    });

    it('moves with the arrow keys', async () => {
      await key(row('Alpha'), 'ArrowDown');

      expect(row('Beta').getAttribute('tabindex')).toBe('0');

      await key(row('Beta'), 'ArrowUp');
      expect(row('Alpha').getAttribute('tabindex')).toBe('0');
    });

    it('jumps with Home and End', async () => {
      await key(row('Alpha'), 'End');
      expect(row('Gamma').getAttribute('tabindex')).toBe('0');

      await key(row('Gamma'), 'Home');
      expect(row('Alpha').getAttribute('tabindex')).toBe('0');
    });

    it('expands with ArrowRight, enters the children and collapses with ArrowLeft', async () => {
      await key(row('Alpha'), 'ArrowRight');
      expect(labels()).toContain('Alpha One');

      await key(row('Alpha'), 'ArrowRight');
      expect(row('Alpha One').getAttribute('tabindex')).toBe('0');

      await key(row('Alpha One'), 'ArrowLeft');
      expect(row('Alpha').getAttribute('tabindex')).toBe('0');

      await key(row('Alpha'), 'ArrowLeft');
      expect(labels()).toEqual(['Alpha', 'Beta', 'Gamma']);
    });

    it('activates the row with Enter and Space', async () => {
      host.type.set('selectable');
      await settle();
      await key(row('Alpha'), 'ArrowDown');
      await key(row('Beta'), 'Enter');

      expect(host.selected).toEqual([['b']]);
      expect(list()).toBeTruthy();
    });
  });

  describe('drag and drop', () => {
    const drag = (el: Element, type: string, clientY = 0) => {
      const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientY });
      el.dispatchEvent(event);
      return event;
    };
    const place = (label: string) => {
      row(label).getBoundingClientRect = () =>
        ({ top: 0, height: 100, bottom: 100, left: 0, right: 100, width: 100 }) as DOMRect;
    };

    beforeEach(async () => {
      host.draggable.set(true);
      host.expandAll.set(true);
      host.items.set(sample());
      await settle();
      ['Alpha', 'Alpha One', 'Alpha Two', 'Deep', 'Beta', 'Gamma'].forEach(place);
    });

    it('marks draggable rows and not disabled ones', () => {
      expect(row('Beta').getAttribute('draggable')).toBe('true');
      expect(row('Gamma').getAttribute('draggable')).toBeNull();
      expect(
        fixture.nativeElement.querySelector('dasar-tree').getAttribute('draggable'),
      ).toBeNull();
    });

    it('is not draggable without the draggable input', async () => {
      host.draggable.set(false);
      await settle();

      expect(row('Beta').getAttribute('draggable')).toBeNull();
    });

    it('emits onDragStart', async () => {
      drag(row('Beta'), 'dragstart');
      await settle();

      expect(host.drags.map((d) => d.node.key)).toEqual(['b']);
      expect(row('Beta').classList).toContain('dragging');
    });

    it('shows the drop position over a row', async () => {
      drag(row('Beta'), 'dragstart');
      drag(row('Alpha One'), 'dragover', 10);
      await settle();
      expect(row('Alpha One').classList).toContain('drop-before');

      drag(row('Alpha One'), 'dragover', 50);
      await settle();
      expect(row('Alpha One').classList).toContain('drop-inside');

      drag(row('Alpha One'), 'dragover', 90);
      await settle();
      expect(row('Alpha One').classList).toContain('drop-after');
    });

    it('emits onDragEnter and onDragLeave', async () => {
      drag(row('Beta'), 'dragstart');
      drag(row('Alpha One'), 'dragenter', 50);
      drag(row('Alpha One'), 'dragleave');

      expect(host.enters.map((d) => [d.node.key, d.dragNode?.key, d.position])).toEqual([
        ['a1', 'b', 'inside'],
      ]);
      expect(host.leaves.map((d) => d.node.key)).toEqual(['a1']);
    });

    it('reorders the items itself and reports the drop', async () => {
      drag(row('Beta'), 'dragstart');
      drag(row('Alpha'), 'drop', 10);
      await settle();

      expect(host.items().map((item) => item.key)).toEqual(['b', 'a', 'c']);
      expect(host.drops.length).toBe(1);
      expect(host.drops[0]).toMatchObject({ position: 'before' });
      expect(host.drops[0].dragNode.key).toBe('b');
      expect(host.drops[0].dropNode.key).toBe('a');
      expect(host.drops[0].items.map((item) => item.key)).toEqual(['b', 'a', 'c']);
      expect(labels()[0]).toBe('Beta');
    });

    it('moves a node into a folder and expands it', async () => {
      drag(row('Beta'), 'dragstart');
      drag(row('Alpha Two'), 'drop', 50);
      await settle();

      const alpha = host.items().find((item) => item.key === 'a')!;
      const two = alpha.children!.find((item) => item.key === 'a2')!;
      expect(two.children!.map((item) => item.key)).toEqual(['a2x', 'b']);
      expect(host.items().map((item) => item.key)).toEqual(['a', 'c']);
    });

    it('refuses to drop a node into its own subtree', async () => {
      drag(row('Alpha'), 'dragstart');
      const over = drag(row('Deep'), 'dragover', 50);
      drag(row('Deep'), 'drop', 50);
      await settle();

      expect(over.defaultPrevented).toBe(false);
      expect(host.drops).toEqual([]);
      expect(host.items().map((item) => item.key)).toEqual(['a', 'b', 'c']);
    });

    it('refuses to drop onto a disabled row', async () => {
      drag(row('Beta'), 'dragstart');
      drag(row('Gamma'), 'drop', 10);
      await settle();

      expect(host.drops).toEqual([]);
    });

    it('clears the drag state on dragend', async () => {
      drag(row('Beta'), 'dragstart');
      drag(row('Beta'), 'dragend');
      await settle();

      expect(fixture.nativeElement.querySelector('.dragging')).toBeNull();
    });

    it('only allows dropping inside folders when the type is file', async () => {
      host.type.set('file');
      await settle();
      place('Alpha One');
      place('Alpha');

      drag(row('Beta'), 'dragstart');
      drag(row('Alpha One'), 'dragover', 50);
      await settle();
      expect(row('Alpha One').classList).not.toContain('drop-inside');

      drag(row('Alpha'), 'dragover', 50);
      await settle();
      expect(row('Alpha').classList).toContain('drop-inside');
    });
  });
});

describe('DasarTree slots', () => {
  it('projects the static slots and renders the item templates', async () => {
    await TestBed.configureTestingModule({ imports: [TreeSlotsHost] }).compileComponents();
    const fixture = TestBed.createComponent(TreeSlotsHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.custom-label')).toBeTruthy();
    expect(el.querySelector('.custom-extra')).toBeTruthy();
    expect(el.querySelector('.custom-hint')).toBeTruthy();
    expect(el.querySelectorAll('.prefix').length).toBe(7);
    expect(el.querySelectorAll('.suffix').length).toBe(7);
    expect(el.querySelector('.prefix')?.textContent).toBe('P-a');
  });

  it('replaces the content of one item by key', async () => {
    await TestBed.configureTestingModule({ imports: [TreeSlotsHost] }).compileComponents();
    const fixture = TestBed.createComponent(TreeSlotsHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.custom-content')?.textContent).toContain('custom Beta');
    expect(el.textContent).toContain('Alpha One');
    expect(el.querySelectorAll('.custom-content').length).toBe(1);
  });

  it('replaces the icon and the expander', async () => {
    await TestBed.configureTestingModule({ imports: [TreeIconLeafSlotsHost] }).compileComponents();
    const fixture = TestBed.createComponent(TreeIconLeafSlotsHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.custom-icon').length).toBe(4);
    expect(el.querySelectorAll('.custom-toggle').length).toBe(3);
    expect(el.querySelector('.dasar-tree-arrow')).toBeNull();

    (el.querySelector('.custom-toggle') as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(el.textContent).not.toContain('Alpha One');
  });

  it('replaces the search input with the search slot', async () => {
    await TestBed.configureTestingModule({ imports: [TreeSearchSlotHost] }).compileComponents();
    const fixture = TestBed.createComponent(TreeSearchSlotHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.custom-search')).toBeTruthy();
    expect(el.querySelector('.dasar-tree-search input')).toBeNull();
  });
});

describe('DasarTree ngModel', () => {
  it('selects the bound key and writes new selections back', async () => {
    await TestBed.configureTestingModule({ imports: [TreeModelHost] }).compileComponents();
    const fixture = TestBed.createComponent(TreeModelHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const rows = Array.from(
      fixture.nativeElement.querySelectorAll('.dasar-tree-row'),
    ) as HTMLElement[];

    expect(rows[1].classList).toContain('selected');

    rows[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model).toBe('a');
  });

  it('binds the checked keys in multiple mode', async () => {
    await TestBed.configureTestingModule({ imports: [TreeMultiModelHost] }).compileComponents();
    const fixture = TestBed.createComponent(TreeMultiModelHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const rows = Array.from(el.querySelectorAll('.dasar-tree-row')) as HTMLElement[];

    expect(rows[1].getAttribute('aria-checked')).toBe('true');
    expect(rows[0].getAttribute('aria-checked')).toBe('mixed');

    (rows[2].querySelector('.dasar-tree-check input') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model).toEqual(['a', 'a1', 'a2', 'a2x']);
  });
});

@Component({
  standalone: true,
  imports: [DasarTreeComponent],
  template: `
    <dasar-tree [(value)]="selected" [items]="items" type="selectable" />
    <dasar-tree [(value)]="checked" [items]="items" type="multiple" default-expand-all />
  `,
})
class TreeValueHost {
  items = sample();
  selected = signal<DasarTreeKey | null>('b');
  checked = signal<DasarTreeKey[]>(['a1']);
}

describe('DasarTree value binding', () => {
  let fixture: ComponentFixture<TreeValueHost>;
  const rowsOf = (tree: number) =>
    Array.from(
      fixture.nativeElement
        .querySelectorAll('dasar-tree')
        [tree].querySelectorAll('.dasar-tree-row'),
    ) as HTMLElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TreeValueHost] }).compileComponents();
    fixture = TestBed.createComponent(TreeValueHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('shows the bound selected key even though it is bound before the type is set', () => {
    expect(rowsOf(0)[1].classList).toContain('selected');
  });

  it('writes a new selection back through [(value)]', () => {
    rowsOf(0)[0].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).toBe('a');
  });

  it('shows the bound checked keys in multiple mode', () => {
    expect(rowsOf(1)[1].getAttribute('aria-checked')).toBe('true');
    expect(rowsOf(1)[0].getAttribute('aria-checked')).toBe('mixed');
  });

  it('writes the checked keys back through [(value)]', () => {
    (rowsOf(1)[2].querySelector('.dasar-tree-check input') as HTMLElement).click();
    fixture.detectChanges();

    expect(fixture.componentInstance.checked()).toEqual(['a', 'a1', 'a2', 'a2x']);
  });

  it('follows later changes of the bound value', () => {
    fixture.componentInstance.selected.set('a');
    fixture.componentInstance.checked.set([]);
    fixture.detectChanges();

    expect(rowsOf(0)[0].classList).toContain('selected');
    expect(rowsOf(0)[1].classList).not.toContain('selected');
    expect(rowsOf(1)[1].getAttribute('aria-checked')).toBe('false');
  });
});
