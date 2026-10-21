import {
  booleanAttribute,
  ViewEncapsulation,
  ContentChildren,
  ContentChild,
  ViewChildren,
  HostBinding,
  EventEmitter,
  forwardRef,
  Component,
  Directive,
  QueryList,
  ElementRef,
  Injector,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  computed,
  inject,
  Input,
  signal,
  afterNextRender,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { DasarCheckbox } from '../dasar-checkbox/dasar-checkbox';
import { DasarInput, DasarInputPrefixSlot } from '../dasar-input/dasar-input';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { fieldIconSize } from '../../utils/icon-size';
import { DasarIcon } from '../dasar-icon/dasar-icon';
import {
  DasarTreeCheckState,
  DasarTreeDropPosition,
  DasarTreeItem,
  DasarTreeKey,
  buildIndex,
  checkStateOf,
  checkedKeysFrom,
  collectParentKeys,
  filterTree,
  hasChildren,
  isDescendant,
  moveItem,
  normalizeChecked,
  toggleChecked,
} from './dasar-tree.utils';

export type {
  DasarTreeCheckState,
  DasarTreeDropPosition,
  DasarTreeItem,
  DasarTreeKey,
} from './dasar-tree.utils';

export type DasarTreeType = 'file' | 'selectable' | 'multiple' | null;
export type DasarTreeSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarTreeFilterMethod = (item: DasarTreeItem, query: string) => boolean;

export interface DasarTreeConfig {
  type?: DasarTreeType;
  size?: DasarTreeSize;
  disabled?: boolean;
  label?: string;
  hint?: string;
  draggable?: boolean;
  showLine?: boolean;
  search?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  multiple?: boolean;
  defaultExpandAll?: boolean;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  itemClass?: ClassType;
  itemStyle?: StyleType;
  hintClass?: ClassType;
  hintStyle?: StyleType;
}

export interface DasarTreeRow {
  item: DasarTreeItem;
  level: number;
  parentKey: DasarTreeKey | null;
  hasChildren: boolean;
  isFolder: boolean;
  expanded: boolean;
  isLast: boolean;
  /** One entry per indent column before the row; each carries a vertical guide line. */
  guides: boolean[];
  disabled: boolean;
  selected: boolean;
  checked: boolean;
  indeterminate: boolean;
}

export interface DasarTreeSlotContext {
  $implicit: DasarTreeItem;
  level: number;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  toggle: () => void;
}

export interface DasarTreeDragEvent {
  node: DasarTreeItem;
  dragNode: DasarTreeItem | null;
  position: DasarTreeDropPosition | null;
  event: DragEvent;
}

export interface DasarTreeDropEvent {
  dragNode: DasarTreeItem;
  dropNode: DasarTreeItem;
  position: DasarTreeDropPosition;
  items: DasarTreeItem[];
  event: DragEvent;
}

@Directive({ selector: '[search-slot]', standalone: true })
export class DasarTreeSearchSlot {}
@Directive({ selector: '[hint-slot]', standalone: true })
export class DasarTreeHintSlot {}
@Directive({ selector: '[label-slot]', standalone: true })
export class DasarTreeLabelSlot {}
@Directive({ selector: '[extra-header-slot]', standalone: true })
export class DasarTreeExtraHeaderSlot {}

@Directive({ selector: '[tree-prefix-slot]', standalone: true })
export class DasarTreePrefixSlot {
  constructor(public templateRef: TemplateRef<DasarTreeSlotContext>) {}
}
@Directive({ selector: '[tree-suffix-slot]', standalone: true })
export class DasarTreeSuffixSlot {
  constructor(public templateRef: TemplateRef<DasarTreeSlotContext>) {}
}
@Directive({ selector: '[tree-icon-slot]', standalone: true })
export class DasarTreeIconSlot {
  constructor(public templateRef: TemplateRef<DasarTreeSlotContext>) {}
}
@Directive({ selector: '[tree-leaf-slot]', standalone: true })
export class DasarTreeLeafSlot {
  constructor(public templateRef: TemplateRef<DasarTreeSlotContext>) {}
}
@Directive({ selector: '[tree-children-slot]', standalone: true })
export class DasarTreeChildrenSlot {
  @Input('tree-children-slot') key: DasarTreeKey | '' = '';
  constructor(public templateRef: TemplateRef<DasarTreeSlotContext>) {}
}

let nextDasarTreeId = 0;

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarTree),
      multi: true,
    },
  ],
  imports: [CommonModule, DasarIcon, DasarCheckbox, DasarInput, DasarInputPrefixSlot],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-tree.html',
  styleUrls: ['./dasar-tree.scss'],
  selector: 'dasar-tree',
  host: { '[attr.draggable]': 'null' },
  standalone: true,
})
export class DasarTree implements ControlValueAccessor, OnInit, OnChanges {
  @ContentChild(DasarTreeSearchSlot) providedSearch?: DasarTreeSearchSlot;
  @ContentChild(DasarTreeHintSlot) providedHint?: DasarTreeHintSlot;
  @ContentChild(DasarTreeLabelSlot) providedLabel?: DasarTreeLabelSlot;
  @ContentChild(DasarTreeExtraHeaderSlot) providedExtraHeader?: DasarTreeExtraHeaderSlot;
  @ContentChild(DasarTreePrefixSlot) prefixSlot?: DasarTreePrefixSlot;
  @ContentChild(DasarTreeSuffixSlot) suffixSlot?: DasarTreeSuffixSlot;
  @ContentChild(DasarTreeIconSlot) iconSlot?: DasarTreeIconSlot;
  @ContentChild(DasarTreeLeafSlot) leafSlot?: DasarTreeLeafSlot;
  @ContentChildren(DasarTreeChildrenSlot) childrenSlots?: QueryList<DasarTreeChildrenSlot>;
  @ViewChildren('rowEl') private rowEls?: QueryList<ElementRef<HTMLElement>>;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private injector = inject(Injector);

  readonly labelId = `dasar-tree-label-${++nextDasarTreeId}`;
  readonly hintId = `dasar-tree-hint-${nextDasarTreeId}`;

  private readonly itemsSig = signal<DasarTreeItem[]>([]);
  private readonly expandedSig = signal<ReadonlySet<DasarTreeKey>>(new Set());
  private readonly selectedSig = signal<DasarTreeKey[]>([]);
  private readonly leavesSig = signal<ReadonlySet<DasarTreeKey>>(new Set());
  private readonly querySig = signal('');
  private readonly disabledSig = signal(
    resolveThemeDefault('tree', 'disabled', false, this.themeProvider, this.themeService),
  );
  private readonly filterFnSig = signal<DasarTreeFilterMethod>((item, query) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );
  private expandedControlled = false;
  private defaultExpandApplied = false;
  private rawChecked: DasarTreeKey[] | null = null;
  private rawValue: unknown = undefined;

  protected readonly focusedKey = signal<DasarTreeKey | null>(null);
  protected readonly dragKey = signal<DasarTreeKey | null>(null);
  protected readonly dropTarget = signal<{
    key: DasarTreeKey;
    position: DasarTreeDropPosition;
  } | null>(null);

  private readonly index = computed(() => buildIndex(this.itemsSig()));
  private readonly filter = computed(() => {
    const query = this.querySig().trim();
    if (!query) return null;
    const matches = this.filterFnSig();
    return filterTree(this.itemsSig(), (item) => matches(item, query));
  });

  protected readonly rows = computed<DasarTreeRow[]>(() => {
    const expanded = this.expandedSig();
    const selected = new Set(this.selectedSig());
    const leaves = this.leavesSig();
    const filter = this.filter();
    const treeDisabled = this.disabledSig();
    const rows: DasarTreeRow[] = [];

    const visit = (
      list: DasarTreeItem[],
      level: number,
      parentKey: DasarTreeKey | null,
      lines: boolean[],
      parentDisabled: boolean,
    ) => {
      const shown = filter ? list.filter((item) => filter.visible.has(item.key)) : list;
      shown.forEach((item, position) => {
        const isLast = position === shown.length - 1;
        const parent = hasChildren(item);
        const isExpanded =
          parent && (filter ? filter.parentsOfMatches.has(item.key) : expanded.has(item.key));
        const disabled = treeDisabled || parentDisabled || !!item.disabled;
        const state = checkStateOf(item, leaves);
        rows.push({
          item,
          level,
          parentKey,
          hasChildren: parent,
          isFolder: !!item.children,
          expanded: isExpanded,
          isLast,
          guides: lines,
          disabled,
          selected: selected.has(item.key),
          checked: state === 'checked',
          indeterminate: state === 'indeterminate',
        });
        if (isExpanded) visit(item.children!, level + 1, item.key, [...lines, true], disabled);
      });
    };
    visit(this.itemsSig(), 0, null, [], false);
    return rows;
  });

  @Input() type = resolveThemeDefault(
    'tree',
    'type',
    null as DasarTreeType,
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'tree',
    'size',
    'md' as DasarTreeSize,
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault('tree', 'label', '', this.themeProvider, this.themeService);
  @Input() hint = resolveThemeDefault('tree', 'hint', '', this.themeProvider, this.themeService);
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this.disabledSig.set(value);
  }
  get disabled(): boolean {
    return this.disabledSig();
  }
  @Input({ transform: booleanAttribute }) draggable = resolveThemeDefault(
    'tree',
    'draggable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'show-line', transform: booleanAttribute }) showLine = resolveThemeDefault(
    'tree',
    'showLine',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) search = resolveThemeDefault(
    'tree',
    'search',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'search-placeholder' }) searchPlaceholder = resolveThemeDefault(
    'tree',
    'searchPlaceholder',
    'Search',
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) selectable = resolveThemeDefault(
    'tree',
    'selectable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) multiple = resolveThemeDefault(
    'tree',
    'multiple',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'default-expand-all', transform: booleanAttribute })
  set defaultExpandAll(value: boolean) {
    this._defaultExpandAll = value;
    this.applyDefaultExpand();
  }
  get defaultExpandAll(): boolean {
    return this._defaultExpandAll;
  }
  private _defaultExpandAll = resolveThemeDefault(
    'tree',
    'defaultExpandAll',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'tree',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'tree',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'item-class' }) itemClass = resolveThemeDefault(
    'tree',
    'itemClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'item-style' }) itemStyle = resolveThemeDefault(
    'tree',
    'itemStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-class' }) hintClass = resolveThemeDefault(
    'tree',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-style' }) hintStyle = resolveThemeDefault(
    'tree',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input()
  set items(value: DasarTreeItem[] | null) {
    this.itemsSig.set(value ?? []);
    if (this.rawChecked) this.leavesSig.set(normalizeChecked(this.index(), this.rawChecked));
    this.applyDefaultExpand();
  }
  get items(): DasarTreeItem[] {
    return this.itemsSig();
  }
  @Input({ alias: 'expanded-keys' })
  set expandedKeys(keys: DasarTreeKey[] | null) {
    this.expandedControlled = !!keys;
    this.expandedSig.set(new Set(keys ?? []));
  }
  get expandedKeys(): DasarTreeKey[] {
    return [...this.expandedSig()];
  }
  @Input({ alias: 'selected-keys' })
  set selectedKeys(keys: DasarTreeKey[] | null) {
    this.selectedSig.set([...(keys ?? [])]);
  }
  get selectedKeys(): DasarTreeKey[] {
    return this.selectedSig();
  }
  @Input({ alias: 'checked-keys' })
  set checkedKeys(keys: DasarTreeKey[] | null) {
    this.rawChecked = keys ?? [];
    this.leavesSig.set(normalizeChecked(this.index(), this.rawChecked));
  }
  get checkedKeys(): DasarTreeKey[] {
    return checkedKeysFrom(this.itemsSig(), this.leavesSig());
  }
  @Input({ alias: 'filter-method' })
  set filterMethod(fn: DasarTreeFilterMethod | null) {
    if (fn) this.filterFnSig.set(fn);
  }
  @Input({ alias: 'search-value' })
  set searchValue(value: string | null) {
    this.querySig.set(value ?? '');
  }
  get searchValue(): string {
    return this.querySig();
  }

  /** Selected key for selectable trees, checked keys for multiple trees. */
  @Input()
  set value(value: unknown) {
    this.rawValue = value;
    this.writeValue(value);
  }
  get value(): unknown {
    return this.isMultiple ? this.checkedKeys : (this.selectedSig()[0] ?? null);
  }
  @Output() valueChange = new EventEmitter<unknown>();
  @Output() itemsChange = new EventEmitter<DasarTreeItem[]>();
  @Output() expandedKeysChange = new EventEmitter<DasarTreeKey[]>();
  @Output() selectedKeysChange = new EventEmitter<DasarTreeKey[]>();
  @Output() checkedKeysChange = new EventEmitter<DasarTreeKey[]>();
  @Output() searchValueChange = new EventEmitter<string>();
  @Output() onUpdateExpandedKeys = new EventEmitter<DasarTreeKey[]>();
  @Output() onUpdateSelectedKeys = new EventEmitter<DasarTreeKey[]>();
  @Output() onUpdateCheckedKeys = new EventEmitter<DasarTreeKey[]>();
  @Output() onDragStart = new EventEmitter<DasarTreeDragEvent>();
  @Output() onDragEnter = new EventEmitter<DasarTreeDragEvent>();
  @Output() onDragLeave = new EventEmitter<DasarTreeDragEvent>();
  @Output() onDrop = new EventEmitter<DasarTreeDropEvent>();

  @HostBinding('class.dasar-tree') readonly baseClass = true;
  @HostBinding('class.disabled') get hostDisabled(): boolean {
    return this.disabledSig();
  }

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  get isFile(): boolean {
    return this.type === 'file';
  }
  get isSelectable(): boolean {
    return this.selectable || this.type === 'selectable';
  }
  get isMultiple(): boolean {
    return this.multiple || this.type === 'multiple';
  }
  get hasSearchSlot(): boolean {
    return !!this.providedSearch;
  }
  get hasHintSlot(): boolean {
    return !!this.providedHint;
  }
  get hasLabelSlot(): boolean {
    return !!this.providedLabel;
  }
  get hasExtraHeaderSlot(): boolean {
    return !!this.providedExtraHeader;
  }
  get iconSize(): number {
    return fieldIconSize(this.size);
  }
  get isDisabled(): boolean {
    return this.disabledSig();
  }
  get isSearching(): boolean {
    return this.querySig().trim().length > 0;
  }
  get visibleRows(): DasarTreeRow[] {
    return this.rows();
  }
  ngOnInit(): void {
    this.applyDefaultExpand();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // The value can be bound before type, multiple or items, so apply it again once they are set.
    if (
      this.rawValue !== undefined &&
      (changes['type'] || changes['multiple'] || changes['items'])
    ) {
      this.writeValue(this.rawValue);
    }
  }

  private applyDefaultExpand(): void {
    if (this.defaultExpandApplied || this.expandedControlled || !this.defaultExpandAll) return;
    const items = this.itemsSig();
    if (!items.length) return;
    this.defaultExpandApplied = true;
    this.expandedSig.set(new Set(collectParentKeys(items)));
  }

  get containerClasses(): Record<string, boolean> {
    return {
      ...Object.fromEntries(parseClassesToArray(this.containerClass).map((name) => [name, true])),
      [`size-${this.size}`]: true,
      'show-line': this.showLine,
      'is-file': this.isFile,
      'is-selectable': this.isSelectable,
      'is-multiple': this.isMultiple,
      'is-draggable': this.draggable,
      disabled: this.isDisabled,
    };
  }

  rowClasses(row: DasarTreeRow): Record<string, boolean> {
    const drop = this.dropTarget();
    const isTarget = !!drop && drop.key === row.item.key;
    return {
      ...Object.fromEntries(parseClassesToArray(this.itemClass).map((name) => [name, true])),
      selected: row.selected,
      disabled: row.disabled,
      expanded: row.expanded,
      dragging: this.dragKey() === row.item.key,
      'drop-before': isTarget && drop!.position === 'before',
      'drop-inside': isTarget && drop!.position === 'inside',
      'drop-after': isTarget && drop!.position === 'after',
    };
  }

  childrenSlotFor(key: DasarTreeKey): DasarTreeChildrenSlot | undefined {
    return this.childrenSlots?.find((slot) => String(slot.key) === String(key));
  }

  slotContext(row: DasarTreeRow): DasarTreeSlotContext {
    return {
      $implicit: row.item,
      level: row.level,
      expanded: row.expanded,
      selected: row.selected,
      checked: row.checked,
      toggle: () => this.toggleExpand(row),
    };
  }

  tabIndexFor(row: DasarTreeRow, position: number): number {
    const focused = this.focusedKey();
    if (focused === null || !this.rows().some((r) => r.item.key === focused)) {
      return position === 0 ? 0 : -1;
    }
    return focused === row.item.key ? 0 : -1;
  }

  get arrowSize(): number {
    return Math.max(10, this.iconSize - 2);
  }

  nodeIcon(row: DasarTreeRow): string {
    if (row.item.iconName) return row.item.iconName;
    if (!row.isFolder) return 'file';
    return row.expanded ? 'folder-open' : 'folder';
  }

  writeValue(value: unknown): void {
    if (this.isMultiple) {
      this.rawChecked = Array.isArray(value) ? value : [];
      this.leavesSig.set(normalizeChecked(this.index(), this.rawChecked));
    } else {
      const key = Array.isArray(value) ? value[0] : value;
      this.selectedSig.set(key === null || key === undefined ? [] : [key as DasarTreeKey]);
    }
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabledSig.set(isDisabled);
  }

  private emitValue(value: unknown): void {
    this.rawValue = undefined;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onSearch(value: string): void {
    this.querySig.set(value ?? '');
    this.searchValueChange.emit(value ?? '');
  }

  toggleExpand(row: DasarTreeRow, event?: Event): void {
    event?.stopPropagation();
    if (row.disabled || !row.hasChildren) return;
    const next = new Set(this.expandedSig());
    if (next.has(row.item.key)) next.delete(row.item.key);
    else next.add(row.item.key);
    this.expandedSig.set(next);
    this.emitExpanded();
  }

  select(row: DasarTreeRow): void {
    if (row.disabled) return;
    if (this.selectedSig().length === 1 && this.selectedSig()[0] === row.item.key) return;
    this.selectedSig.set([row.item.key]);
    const keys = [...this.selectedSig()];
    this.selectedKeysChange.emit(keys);
    this.onUpdateSelectedKeys.emit(keys);
    if (!this.isMultiple) this.emitValue(row.item.key);
    this.onTouched();
  }

  toggleCheck(row: DasarTreeRow): void {
    if (row.disabled) return;
    const leaves = toggleChecked(this.index(), this.leavesSig(), row.item.key);
    this.rawChecked = null;
    this.leavesSig.set(leaves);
    const keys = checkedKeysFrom(this.itemsSig(), leaves);
    this.checkedKeysChange.emit(keys);
    this.onUpdateCheckedKeys.emit(keys);
    if (this.isMultiple) this.emitValue(keys);
    this.onTouched();
  }

  activate(row: DasarTreeRow): void {
    if (row.disabled) return;
    this.focusedKey.set(row.item.key);
    if (this.isSelectable) this.select(row);
    else if (this.isMultiple) this.toggleCheck(row);
    else this.toggleExpand(row);
  }

  onRowClick(row: DasarTreeRow): void {
    this.activate(row);
  }

  onTreeKeydown(event: KeyboardEvent): void {
    const rows = this.rows();
    if (!rows.length || this.isDisabled) return;
    const current = this.focusedKey();
    let at = rows.findIndex((row) => row.item.key === current);
    if (at === -1) at = 0;
    const row = rows[at];
    let target: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
        target = Math.min(at + 1, rows.length - 1);
        break;
      case 'ArrowUp':
        target = Math.max(at - 1, 0);
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = rows.length - 1;
        break;
      case 'ArrowRight':
        if (row.hasChildren && !row.expanded) this.toggleExpand(row);
        else if (row.expanded) target = at + 1;
        break;
      case 'ArrowLeft':
        if (row.expanded) this.toggleExpand(row);
        else if (row.parentKey !== null) {
          target = rows.findIndex((r) => r.item.key === row.parentKey);
        }
        break;
      case 'Enter':
      case ' ':
        this.activate(row);
        break;
      default:
        return;
    }
    event.preventDefault();
    if (target !== null && target >= 0) this.focusRow(rows[target].item.key);
  }

  isDragAllowed(row: DasarTreeRow): boolean {
    return this.draggable && !this.isDisabled && !row.disabled;
  }

  onDragStartRow(row: DasarTreeRow, event: DragEvent): void {
    if (!this.isDragAllowed(row)) {
      event.preventDefault();
      return;
    }
    event.dataTransfer?.setData('text/plain', String(row.item.key));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
    this.dragKey.set(row.item.key);
    this.onDragStart.emit({ node: row.item, dragNode: row.item, position: null, event });
  }

  onDragEnterRow(row: DasarTreeRow, event: DragEvent): void {
    if (this.dragKey() === null) return;
    const position = this.resolveDrop(row, event);
    if (position) event.preventDefault();
    this.onDragEnter.emit({ node: row.item, dragNode: this.dragNode(), position, event });
  }

  onDragOverRow(row: DasarTreeRow, event: DragEvent): void {
    if (this.dragKey() === null) return;
    const position = this.resolveDrop(row, event);
    if (!position) {
      if (this.dropTarget()) this.dropTarget.set(null);
      return;
    }
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    const current = this.dropTarget();
    if (!current || current.key !== row.item.key || current.position !== position) {
      this.dropTarget.set({ key: row.item.key, position });
    }
  }

  onDragLeaveRow(row: DasarTreeRow, event: DragEvent): void {
    if (this.dragKey() === null) return;
    const related = event.relatedTarget as Node | null;
    if (related && (event.currentTarget as HTMLElement).contains(related)) return;
    if (this.dropTarget()?.key === row.item.key) this.dropTarget.set(null);
    this.onDragLeave.emit({
      node: row.item,
      dragNode: this.dragNode(),
      position: null,
      event,
    });
  }

  onDropRow(row: DasarTreeRow, event: DragEvent): void {
    const dragKey = this.dragKey();
    if (dragKey === null) return;
    event.preventDefault();
    const position = this.resolveDrop(row, event);
    const dragNode = this.dragNode();
    this.clearDrag();
    if (!position || !dragNode) return;

    const items = moveItem(this.itemsSig(), dragKey, row.item.key, position);
    if (!items) return;
    this.itemsSig.set(items);
    this.itemsChange.emit(items);
    if (position === 'inside' && !this.expandedSig().has(row.item.key)) {
      this.expandedSig.set(new Set([...this.expandedSig(), row.item.key]));
      this.emitExpanded();
    }
    const dropNode = this.index().get(row.item.key)?.item ?? row.item;
    this.onDrop.emit({ dragNode, dropNode, position, items, event });
  }

  onDragEndRow(): void {
    this.clearDrag();
  }

  private dragNode(): DasarTreeItem | null {
    const key = this.dragKey();
    return key === null ? null : (this.index().get(key)?.item ?? null);
  }

  private clearDrag(): void {
    this.dragKey.set(null);
    this.dropTarget.set(null);
  }

  /** Where a dragged node would land on this row, or null when the drop is not allowed. */
  private resolveDrop(row: DasarTreeRow, event: DragEvent): DasarTreeDropPosition | null {
    const dragKey = this.dragKey();
    if (dragKey === null || row.disabled) return null;
    if (row.item.key === dragKey) return null;
    if (isDescendant(this.index(), dragKey, row.item.key)) return null;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const ratio = rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5;
    const canNest = !this.isFile || row.isFolder;
    if (canNest && ratio > 0.25 && ratio < 0.75) return 'inside';
    return ratio < 0.5 ? 'before' : 'after';
  }

  private emitExpanded(): void {
    const keys = [...this.expandedSig()];
    this.expandedKeysChange.emit(keys);
    this.onUpdateExpandedKeys.emit(keys);
  }

  private focusRow(key: DasarTreeKey): void {
    this.focusedKey.set(key);
    afterNextRender(
      () => {
        const at = this.rows().findIndex((row) => row.item.key === key);
        this.rowEls?.get(at)?.nativeElement.focus();
      },
      { injector: this.injector },
    );
  }
}

export const DasarTreeComponent = [
  DasarTreeSearchSlot,
  DasarTreeHintSlot,
  DasarTreeLabelSlot,
  DasarTreeExtraHeaderSlot,
  DasarTreePrefixSlot,
  DasarTreeSuffixSlot,
  DasarTreeIconSlot,
  DasarTreeLeafSlot,
  DasarTreeChildrenSlot,
  DasarTree,
] as const;
