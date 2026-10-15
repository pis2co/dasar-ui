import {
  afterNextRender,
  booleanAttribute,
  numberAttribute,
  ViewEncapsulation,
  ChangeDetectorRef,
  ContentChildren,
  ContentChild,
  HostBinding,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  InjectionToken,
  Injector,
  inject,
  Input,
  Output,
  PLATFORM_ID,
  QueryList,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';
import { isEqualValue } from '../dasar-checkbox/dasar-checkbox';

export type DasarListScrollBehavior = 'auto' | 'smooth';
export type DasarListScrollReason = 'init' | 'value' | 'click' | 'keyboard' | 'api';

export interface DasarListItemClickEvent {
  value: any;
  index: number;
  event: MouseEvent | KeyboardEvent;
}

export interface DasarListScrollEvent {
  value: any;
  index: number;
  scrollTop: number;
  reason: DasarListScrollReason;
}

export interface DasarListConfig {
  size?: DasarListSize;
  radius?: DasarListRadiusType;
  bordered?: boolean;
  showDivider?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  selectable?: boolean;
  valueField?: string | null;
  maxHeight?: string | null;
  scrollOffset?: number;
  scrollBehavior?: DasarListScrollBehavior;
  scrollOnInit?: boolean;
  scrollOnClick?: boolean;
  keyboard?: boolean;
  showFocus?: boolean;
  containerClass?: ClassType;
  containerStyle?: StyleType;
}

export interface DasarListItemConfig {
  disabled?: boolean;
  itemClass?: ClassType;
  itemStyle?: StyleType;
}

export type DasarListSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarListRadiusType = ScaleAttributeType;

export const DASAR_LIST = new InjectionToken<any>('DASAR_LIST');

let nextListItemId = 0;

@Directive({ selector: '[header-slot]', standalone: true })
export class DasarListHeaderSlot {}

@Directive({ selector: '[footer-slot]', standalone: true })
export class DasarListFooterSlot {}

@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarListItemPrefixSlot {}

@Directive({ selector: '[suffix-slot]', standalone: true })
export class DasarListItemSuffixSlot {}

@Component({
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-list-item.html',
  selector: 'dasar-list-item',
  standalone: true,
})
export class DasarListItem {
  @ContentChild(DasarListItemPrefixSlot) providedPrefix?: DasarListItemPrefixSlot;
  @ContentChild(DasarListItemSuffixSlot) providedSuffix?: DasarListItemSuffixSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  protected readonly list = inject(DASAR_LIST, { optional: true });
  readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly itemId = `dasar-list-item-${++nextListItemId}`;

  @Input() value: any = undefined;
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'listItem',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'item-class' }) itemClass = resolveThemeDefault(
    'listItem',
    'itemClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'item-style' }) itemStyle = resolveThemeDefault(
    'listItem',
    'itemStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @HostBinding('class.dasar-list-item-wrapper') readonly baseClass = true;

  get hasPrefix(): boolean {
    return !!this.providedPrefix;
  }

  get hasSuffix(): boolean {
    return !!this.providedSuffix;
  }

  get active(): boolean {
    return !!this.list?.isActive(this.value);
  }

  get focused(): boolean {
    const target = this.list;
    const focusedIndex = target?.focusedIndex() ?? -1;
    if (!target || !target.showFocus || focusedIndex < 0) return false;
    return focusedIndex === target.indexOf(this);
  }

  get isItemDisabled(): boolean {
    return this.disabled || !!this.list?.isDisabled;
  }

  onItemClick(event: MouseEvent): void {
    if (this.isItemDisabled) return;
    this.list?.handleItemClick(this, event);
  }
}

@Component({
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-list.html',
  styleUrls: ['./dasar-list.scss'],
  selector: 'dasar-list',
  standalone: true,
  providers: [
    { provide: DASAR_LIST, useExisting: forwardRef(() => DasarList) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DasarList), multi: true },
  ],
})
export class DasarList implements ControlValueAccessor {
  @ContentChild(DasarListHeaderSlot) providedHeader?: DasarListHeaderSlot;
  @ContentChild(DasarListFooterSlot) providedFooter?: DasarListFooterSlot;
  @ContentChildren(DasarListItem, { descendants: true }) items!: QueryList<DasarListItem>;
  @ViewChild('contentRef') contentRef?: ElementRef<HTMLElement>;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private platformId = inject(PLATFORM_ID);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef, { optional: true });

  private innerValue = signal<any>(null);
  private innerDisabled = signal(false);
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private pendingScroll = false;
  private initialized = false;
  private scrolledOnce = false;
  private rafId: number | null = null;
  private scrollHandler: ((event: Event) => void) | null = null;

  readonly focusedIndex = signal(-1);

  constructor() {
    afterNextRender(() => {
      this.initialized = true;
      if (this.scrollOnInit || this.pendingScroll) this.scrollToActive(this.scrollBehavior, 'init');
      this.pendingScroll = false;
      if (this.items) {
        this.items.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          if (!this.scrolledOnce && this.innerValue() !== null && this.innerValue() !== undefined) {
            this.requestScroll('value');
          }
        });
      }
      const container = this.contentRef?.nativeElement;
      if (container && this.onUserScroll.observed) {
        this.scrollHandler = (event: Event) => {
          if (this.rafId !== null) return;
          this.rafId = requestAnimationFrame(() => {
            this.rafId = null;
            this.onUserScroll.emit(event);
          });
        };
        container.addEventListener('scroll', this.scrollHandler, { passive: true });
      }
    });
    this.destroyRef.onDestroy(() => {
      const container = this.contentRef?.nativeElement;
      if (container && this.scrollHandler)
        container.removeEventListener('scroll', this.scrollHandler);
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    });
  }

  @Input() size = resolveThemeDefault('list', 'size', 'md', this.themeProvider, this.themeService);

  @Input() radius: DasarListRadiusType = resolveThemeDefault(
    'list',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) bordered = resolveThemeDefault(
    'list',
    'bordered',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'show-divider', transform: booleanAttribute }) showDivider = resolveThemeDefault(
    'list',
    'showDivider',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) hoverable = resolveThemeDefault(
    'list',
    'hoverable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) clickable = resolveThemeDefault(
    'list',
    'clickable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) selectable = resolveThemeDefault(
    'list',
    'selectable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'value-field' }) valueField = resolveThemeDefault(
    'list',
    'valueField',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'max-height' }) maxHeight = resolveThemeDefault(
    'list',
    'maxHeight',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'scroll-offset', transform: numberAttribute }) scrollOffset = resolveThemeDefault(
    'list',
    'scrollOffset',
    0,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'scroll-behavior' }) scrollBehavior = resolveThemeDefault(
    'list',
    'scrollBehavior',
    'auto' as DasarListScrollBehavior,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'scroll-on-init', transform: booleanAttribute }) scrollOnInit =
    resolveThemeDefault('list', 'scrollOnInit', true, this.themeProvider, this.themeService);
  @Input({ alias: 'scroll-on-click', transform: booleanAttribute }) scrollOnClick =
    resolveThemeDefault('list', 'scrollOnClick', true, this.themeProvider, this.themeService);
  @Input({ transform: booleanAttribute }) keyboard = resolveThemeDefault(
    'list',
    'keyboard',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'show-focus', transform: booleanAttribute }) showFocus = resolveThemeDefault(
    'list',
    'showFocus',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input()
  set value(val: any) {
    if (isEqualValue(this.innerValue(), val)) return;
    this.innerValue.set(val);
    this.requestScroll('value');
  }
  get value(): any {
    return this.innerValue();
  }

  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'list',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'list',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Output() valueChange = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();
  @Output() onItemClick = new EventEmitter<DasarListItemClickEvent>();
  @Output() onScroll = new EventEmitter<DasarListScrollEvent>();
  @Output() onUserScroll = new EventEmitter<Event>();

  @HostBinding('class.dasar-list') readonly baseClass = true;

  get hasHeader(): boolean {
    return !!this.providedHeader;
  }

  get hasFooter(): boolean {
    return !!this.providedFooter;
  }

  get isDisabled(): boolean {
    return this.innerDisabled();
  }

  get activeDescendantId(): string | null {
    const current = this.items?.get(this.focusedIndex());
    return current ? current.itemId : null;
  }

  private keyOf(value: any): any {
    const field = this.valueField;
    if (field && value !== null && value !== undefined && typeof value === 'object') {
      return value[field];
    }
    return value;
  }

  isActive(itemValue: any): boolean {
    if (itemValue === undefined) return false;
    const current = this.innerValue();
    if (current === null || current === undefined) return false;
    return isEqualValue(this.keyOf(current), this.keyOf(itemValue));
  }

  indexOf(item: DasarListItem): number {
    if (!this.items) return -1;
    return this.items.toArray().indexOf(item);
  }

  private commit(item: DasarListItem, event: MouseEvent | KeyboardEvent): void {
    const index = this.indexOf(item);
    this.focusedIndex.set(index);
    this.onItemClick.emit({ value: item.value, index, event });
    if (!this.selectable || this.innerDisabled() || item.value === undefined) return;
    const changed = !this.isActive(item.value);
    if (changed) {
      this.innerValue.set(item.value);
      this.onChange(item.value);
      this.valueChange.emit(item.value);
      this.onUpdate.emit(item.value);
    }
    this.onTouched();
    if (this.scrollOnClick) this.scrollToItem(item, this.scrollBehavior, 'click');
  }

  handleItemClick(item: DasarListItem, event: MouseEvent): void {
    this.commit(item, event);
  }

  writeValue(val: any): void {
    if (isEqualValue(this.innerValue(), val)) return;
    this.innerValue.set(val);
    this.requestScroll('value');
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.innerDisabled.set(disabled);
  }

  private requestScroll(reason: DasarListScrollReason): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.initialized) {
      this.pendingScroll = true;
      return;
    }
    afterNextRender(() => this.scrollToActive(this.scrollBehavior, reason), {
      injector: this.injector,
    });
  }

  private scrollToItem(
    item: DasarListItem,
    behavior: DasarListScrollBehavior = this.scrollBehavior,
    reason: DasarListScrollReason = 'api',
  ): boolean {
    const container = this.contentRef?.nativeElement;
    if (!container || !this.items) return false;
    const index = this.indexOf(item);
    if (index < 0) return false;
    const itemEl = item.elementRef.nativeElement as HTMLElement;
    const delta = itemEl.getBoundingClientRect().top - container.getBoundingClientRect().top;
    const target = container.scrollTop + delta - (Number(this.scrollOffset) || 0);
    const max = Math.max(0, container.scrollHeight - container.clientHeight);
    const top = Math.min(Math.max(0, target), max);
    if (typeof container.scrollTo === 'function') {
      container.scrollTo({ top, behavior });
    } else {
      container.scrollTop = top;
    }
    this.scrolledOnce = true;
    this.onScroll.emit({ value: item.value, index, scrollTop: top, reason });
    return true;
  }

  scrollToActive(
    behavior: DasarListScrollBehavior = this.scrollBehavior,
    reason: DasarListScrollReason = 'api',
  ): boolean {
    if (!this.items) return false;
    const active = this.items.find((item) => this.isActive(item.value));
    if (!active) return false;
    return this.scrollToItem(active, behavior, reason);
  }

  scrollToValue(
    value: any,
    behavior: DasarListScrollBehavior = this.scrollBehavior,
    reason: DasarListScrollReason = 'api',
  ): boolean {
    if (!this.items) return false;
    const current = this.keyOf(value);
    const found = this.items.find((item) => {
      if (item.value === undefined) return false;
      return isEqualValue(this.keyOf(item.value), current);
    });
    if (!found) return false;
    return this.scrollToItem(found, behavior, reason);
  }

  onFocus(): void {
    if (this.focusedIndex() >= 0) return;
    if (!this.items) return;
    const arr = this.items.toArray();
    const activeIdx = arr.findIndex((item) => this.isActive(item.value) && !item.isItemDisabled);
    if (activeIdx >= 0) {
      this.focusedIndex.set(activeIdx);
      return;
    }
    const first = arr.findIndex((item) => !item.isItemDisabled);
    this.focusedIndex.set(first);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.selectable || !this.keyboard || this.innerDisabled()) return;
    if (!this.items) return;
    const arr = this.items.toArray();
    const enabled = arr
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.isItemDisabled);
    if (enabled.length === 0) return;
    const currentPos = enabled.findIndex(({ index }) => index === this.focusedIndex());
    const move = (pos: number) => {
      const target = enabled[Math.min(Math.max(0, pos), enabled.length - 1)];
      this.focusedIndex.set(target.index);
      this.scrollToItem(target.item, this.scrollBehavior, 'keyboard');
    };
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        move(currentPos < 0 ? 0 : currentPos + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        move(currentPos < 0 ? enabled.length - 1 : currentPos - 1);
        break;
      case 'Home':
        event.preventDefault();
        move(0);
        break;
      case 'End':
        event.preventDefault();
        move(enabled.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        {
          const focused = arr[this.focusedIndex()];
          if (focused && !focused.isItemDisabled) this.commit(focused, event);
        }
        break;
    }
  }
}

export const DasarListComponent = [
  DasarListHeaderSlot,
  DasarListFooterSlot,
  DasarListItemPrefixSlot,
  DasarListItemSuffixSlot,
  DasarList,
  DasarListItem,
] as const;
