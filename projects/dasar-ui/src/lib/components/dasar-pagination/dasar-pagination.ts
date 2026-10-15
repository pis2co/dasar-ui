import {
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  ContentChild,
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';
import { DasarButtonComponent, DasarButtonVariantType } from '../dasar-button/dasar-button';
import type { DasarButtonAppearanceType } from '../dasar-button/dasar-button';
import { DasarSelectComponent, DasarSelectOption } from '../dasar-select/dasar-select';
import { DasarMenuComponent, DasarMenuItem } from '../dasar-menu/dasar-menu';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';

export type DasarPaginationSizeType = Extract<ScaleAttributeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
export type DasarPaginationRadiusType = ScaleAttributeType;
export type DasarPaginationAppearanceType = 'ghost' | 'solid' | 'subtle' | 'outline';
export type DasarPaginationSpacingType = Extract<
  ScaleAttributeType,
  'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
>;
export type DasarPaginationDisplayItem = 'pages' | 'size-picker' | 'quick-jumper-dropdown';
export type DasarPaginationItem =
  { type: 'page'; page: number } | { type: 'ellipsis'; key: 'left' | 'right'; pages: number[] };

export interface DasarPaginationConfig {
  defaultPage?: number;
  pageCount?: number;
  pageSizes?: number;
  pageSizeOptions?: number[];
  pageSlot?: number;
  displayOrder?: DasarPaginationDisplayItem[];
  disabled?: boolean;
  size?: DasarPaginationSizeType;
  radius?: DasarPaginationRadiusType;
  appearance?: DasarPaginationAppearanceType;
  label?: string | null;
  spacing?: DasarPaginationSpacingType;
  prevIcon?: string;
  nextIcon?: string;
  fluid?: boolean;
  containerClass?: ClassType;
  containerStyle?: StyleType;
}

@Directive({ selector: 'ng-template[label-slot]', standalone: true })
export class DasarPaginationLabelSlot {
  readonly templateRef = inject(TemplateRef<any>);
}

@Directive({ selector: '[prev-slot]', standalone: true })
export class DasarPaginationPrevSlot {}

@Directive({ selector: '[next-slot]', standalone: true })
export class DasarPaginationNextSlot {}

@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarPaginationPrefixSlot {}

@Directive({ selector: '[suffix-slot]', standalone: true })
export class DasarPaginationSuffixSlot {}

const DEFAULT_DISPLAY_ORDER: DasarPaginationDisplayItem[] = [
  'pages',
  'size-picker',
  'quick-jumper-dropdown',
];

@Component({
  imports: [
    CommonModule,
    FormsModule,
    DasarButtonComponent,
    DasarSelectComponent,
    DasarMenuComponent,
    DasarIconComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-pagination.html',
  styleUrls: ['./dasar-pagination.scss'],
  selector: 'dasar-pagination',
  standalone: true,
})
export class DasarPagination implements OnInit {
  @ContentChild(DasarPaginationLabelSlot) labelSlot?: DasarPaginationLabelSlot;
  @ContentChild(DasarPaginationPrevSlot) providedPrev?: DasarPaginationPrevSlot;
  @ContentChild(DasarPaginationNextSlot) providedNext?: DasarPaginationNextSlot;
  @ContentChild(DasarPaginationPrefixSlot) providedPrefix?: DasarPaginationPrefixSlot;
  @ContentChild(DasarPaginationSuffixSlot) providedSuffix?: DasarPaginationSuffixSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  private innerPage = signal(1);
  private innerPageSize = signal(10);
  private innerPageCount = signal(1);
  private pageBound = false;
  private sizeOptionsInner = signal<number[]>([10, 20, 30, 40]);
  private readonly labelDefault = resolveThemeDefault(
    'pagination',
    'label',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  private labelText = signal<string | null>(this.labelDefault);

  @Input()
  set page(value: number | null | undefined) {
    if (value === null || value === undefined) return;
    this.pageBound = true;
    this.innerPage.set(this.clamp(value));
  }
  get page(): number {
    return this.innerPage();
  }

  @Input({ alias: 'default-page', transform: numberAttribute }) defaultPage = resolveThemeDefault(
    'pagination',
    'defaultPage',
    1,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'page-count', transform: numberAttribute })
  set pageCount(value: number) {
    const count = Math.max(1, Math.floor(Number(value) || 1));
    this.innerPageCount.set(count);
    this.innerPage.set(this.clamp(this.innerPage()));
  }
  get pageCount(): number {
    return this.innerPageCount();
  }

  @Input({ alias: 'page-sizes', transform: numberAttribute })
  set pageSizes(value: number) {
    const size = Math.floor(Number(value));
    if (!Number.isFinite(size) || size < 1) return;
    this.innerPageSize.set(size);
  }
  get pageSizes(): number {
    return this.innerPageSize();
  }

  @Input({ alias: 'page-size-options' })
  set pageSizeOptions(value: number[] | null | undefined) {
    if (!Array.isArray(value) || value.length === 0) return;
    const cleaned = value
      .map((n) => Math.floor(Number(n)))
      .filter((n) => Number.isFinite(n) && n > 0);
    if (cleaned.length === 0) return;
    this.sizeOptionsInner.set([...new Set(cleaned)].sort((a, b) => a - b));
  }
  get pageSizeOptions(): number[] {
    return this.sizeOptionsInner();
  }

  @Input({ alias: 'page-slot', transform: numberAttribute }) pageSlot = resolveThemeDefault(
    'pagination',
    'pageSlot',
    9,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'display-order' }) displayOrder = resolveThemeDefault(
    'pagination',
    'displayOrder',
    DEFAULT_DISPLAY_ORDER,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'pagination',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input() size = resolveThemeDefault(
    'pagination',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() radius: DasarPaginationRadiusType = resolveThemeDefault(
    'pagination',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() appearance: DasarPaginationAppearanceType = resolveThemeDefault(
    'pagination',
    'appearance',
    'ghost',
    this.themeProvider,
    this.themeService,
  );

  @Input()
  set label(value: string | null | undefined) {
    this.labelText.set(value ?? this.labelDefault);
  }
  get label(): string | null {
    return this.labelText();
  }

  @Input() spacing: DasarPaginationSpacingType = resolveThemeDefault(
    'pagination',
    'spacing',
    'xs',
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'prev-icon' }) prevIcon = resolveThemeDefault(
    'pagination',
    'prevIcon',
    'chevron-left',
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'next-icon' }) nextIcon = resolveThemeDefault(
    'pagination',
    'nextIcon',
    'chevron-right',
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'pagination',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'pagination',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'pagination',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Output() onUpdatePage = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() onUpdatePageSize = new EventEmitter<number>();
  @Output('page-sizesChange') pageSizesChange = new EventEmitter<number>();

  @HostBinding('class.dasar-pagination') readonly baseClass = true;

  ngOnInit(): void {
    if (!this.pageBound) this.innerPage.set(this.clamp(this.defaultPage));
  }

  get hasPrev(): boolean {
    return !!this.providedPrev;
  }

  get hasNext(): boolean {
    return !!this.providedNext;
  }

  get hasPrefix(): boolean {
    return !!this.providedPrefix;
  }

  get hasSuffix(): boolean {
    return !!this.providedSuffix;
  }

  get controlSize(): 'sm' | 'md' | 'lg' {
    if (this.size === 'xs') return 'sm';
    if (this.size === 'xl') return 'lg';
    return this.size;
  }

  get itemVariant(): DasarButtonVariantType {
    return this.appearance === 'outline' ? 'secondary' : 'ghost';
  }

  get itemAppearance(): DasarButtonAppearanceType {
    return this.appearance === 'outline' ? 'outline' : 'solid';
  }

  get activeVariant(): DasarButtonVariantType {
    return 'primary';
  }

  get activeAppearance(): DasarButtonAppearanceType {
    if (this.appearance === 'solid') return 'solid';
    if (this.appearance === 'outline') return 'outline';
    return 'subtle';
  }

  get order(): DasarPaginationDisplayItem[] {
    const seen = new Set<DasarPaginationDisplayItem>();
    for (const part of this.displayOrder ?? []) {
      if (part === 'pages' || part === 'size-picker' || part === 'quick-jumper-dropdown') {
        seen.add(part);
      }
    }
    return [...seen];
  }

  get showSizePicker(): boolean {
    return this.order.includes('size-picker');
  }

  get showEllipsisDropdown(): boolean {
    return this.order.includes('quick-jumper-dropdown');
  }

  get summary(): string | null {
    const template = this.labelText();
    if (template === null || template === undefined) return null;
    return template
      .replace(/\{page\}/g, String(this.innerPage()))
      .replace(/\{count\}/g, String(this.innerPageCount()));
  }

  get sizeOptions(): DasarSelectOption[] {
    const merged = new Set([...this.sizeOptionsInner(), this.innerPageSize()]);
    return [...merged].sort((a, b) => a - b).map((n) => ({ label: `${n} / page`, value: n }));
  }

  get items(): DasarPaginationItem[] {
    const count = this.innerPageCount();
    const current = this.innerPage();
    const slot = Math.max(5, Math.floor(Number(this.pageSlot)) || 9);
    if (count <= slot) return this.range(1, count).map((page) => ({ type: 'page', page }));
    const middle = slot - 4;
    let start = current - Math.floor((middle - 1) / 2);
    let end = start + middle - 1;
    if (start <= 3) {
      start = 2;
      end = slot - 2;
    } else if (end >= count - 2) {
      end = count - 1;
      start = count - slot + 3;
    }
    const out: DasarPaginationItem[] = [{ type: 'page', page: 1 }];
    if (start > 2) out.push({ type: 'ellipsis', key: 'left', pages: this.range(2, start - 1) });
    else {
      for (const page of this.range(2, start - 1)) out.push({ type: 'page', page });
    }
    for (const page of this.range(start, end)) out.push({ type: 'page', page });
    if (end < count - 1)
      out.push({ type: 'ellipsis', key: 'right', pages: this.range(end + 1, count - 1) });
    else {
      for (const page of this.range(end + 1, count - 1)) out.push({ type: 'page', page });
    }
    out.push({ type: 'page', page: count });
    return out;
  }

  ellipsisItems(item: Extract<DasarPaginationItem, { type: 'ellipsis' }>): DasarMenuItem[] {
    return item.pages.map((page) => ({ label: String(page), value: page }));
  }

  private clamp(page: number): number {
    const count = this.innerPageCount();
    const p = Math.floor(Number(page));
    if (!Number.isFinite(p)) return this.innerPage();
    return Math.min(Math.max(1, p), count);
  }

  private range(start: number, end: number): number[] {
    if (end < start) return [];
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goTo(page: number): void {
    if (this.disabled) return;
    const target = this.clamp(page);
    if (target === this.innerPage()) return;
    this.innerPage.set(target);
    this.onUpdatePage.emit(target);
    this.pageChange.emit(target);
  }

  prev(): void {
    this.goTo(this.innerPage() - 1);
  }

  next(): void {
    this.goTo(this.innerPage() + 1);
  }

  onEllipsisPick(item: DasarMenuItem): void {
    this.goTo(Number(item.value));
  }

  changePageSize(size: number): void {
    if (this.disabled) return;
    const next = Math.floor(Number(size));
    if (!Number.isFinite(next) || next < 1 || next === this.innerPageSize()) return;
    this.innerPageSize.set(next);
    this.onUpdatePageSize.emit(next);
    this.pageSizesChange.emit(next);
    this.goTo(this.innerPage());
  }

  get isFirstPage(): boolean {
    return this.innerPage() <= 1;
  }

  get isLastPage(): boolean {
    return this.innerPage() >= this.innerPageCount();
  }
}

export const DasarPaginationComponent = [
  DasarPaginationLabelSlot,
  DasarPaginationPrevSlot,
  DasarPaginationNextSlot,
  DasarPaginationPrefixSlot,
  DasarPaginationSuffixSlot,
  DasarPagination,
] as const;
