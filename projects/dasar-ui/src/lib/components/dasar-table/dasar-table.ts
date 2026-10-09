import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ContentChildren,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  HostBinding,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarChipComponent, DasarChipVariantType } from '../dasar-chip/dasar-chip';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { resolveThemeDefault } from '../../utils/common';

export type DasarTableAppearance = 'outline' | 'filled' | 'elevated' | 'borderless';
export type DasarTableSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarTableSpacing = 'compact' | 'normal' | 'relaxed';
export type DasarTableSortDirection = 'asc' | 'desc' | null;
export interface DasarTableColumn {
  cellClass?: ClassType | ((row: any, index: number) => ClassType);
  cellStyle?: StyleType | ((row: any, index: number) => StyleType);
  align?: 'left' | 'center' | 'right';
  headerClass?: ClassType;
  headerStyle?: StyleType;
  sortable?: boolean;
  width?: string;
  label?: string;
  key: string;
}
export interface DasarTableSortEvent {
  column: string;
  direction: DasarTableSortDirection;
}
export interface DasarTableConfig {
  data?: any[];
  columns?: DasarTableColumn[];
  fluid?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  expandable?: boolean;
  appearance?: DasarTableAppearance;
  spacing?: DasarTableSpacing;
  size?: DasarTableSize;
  sortKey?: string | null;
  sortDirection?: DasarTableSortDirection;
  emptyTitle?: string;
  emptyDescription?: string;
  loadingText?: string;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  wrapperClass?: ClassType;
  wrapperStyle?: StyleType;
  tableClass?: ClassType;
  tableStyle?: StyleType;
  headerClass?: ClassType;
  headerStyle?: StyleType;
  bodyClass?: ClassType;
  bodyStyle?: StyleType;
  paginationClass?: ClassType;
  paginationStyle?: StyleType;
}

@Directive({ selector: '[header-slot]', standalone: true })
export class DasarTableHeaderSlot {}
@Directive({ selector: '[body-slot]', standalone: true })
export class DasarTableBodySlot {}
@Directive({ selector: '[empty-slot]', standalone: true })
export class DasarTableEmptySlot {}
@Directive({ selector: '[pagination-slot]', standalone: true })
export class DasarTablePaginationSlot {}
@Directive({ selector: '[expanded-slot]', standalone: true })
export class DasarTableExpandedSlot {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[cell-slot]', standalone: true })
export class DasarTableCellDirective {
  @Input('cell-slot') columnName!: string;
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  imports: [CommonModule, DasarButtonComponent, DasarIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-table.html',
  styleUrls: ['./dasar-table.scss'],
  selector: 'dasar-table',
  standalone: true,
})
export class DasarTable {
  @ContentChildren(DasarTableCellDirective) cellTemplates!: QueryList<DasarTableCellDirective>;
  @ContentChild(DasarTablePaginationSlot) providedPagination?: DasarTablePaginationSlot;
  @ContentChild(DasarTableExpandedSlot) providedExpanded?: DasarTableExpandedSlot;
  @ContentChild(DasarTableHeaderSlot) providedHeader?: DasarTableHeaderSlot;
  @ContentChild(DasarTableEmptySlot) providedEmpty?: DasarTableEmptySlot;
  @ContentChild(DasarTableBodySlot) providedBody?: DasarTableBodySlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input() data = resolveThemeDefault('table', 'data', [], this.themeProvider, this.themeService);
  @Input() columns = resolveThemeDefault(
    'table',
    'columns',
    [],
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'table',
    'fluid',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) striped = resolveThemeDefault(
    'table',
    'striped',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) hoverable = resolveThemeDefault(
    'table',
    'hoverable',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) loading = resolveThemeDefault(
    'table',
    'loading',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) expandable = resolveThemeDefault(
    'table',
    'expandable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() appearance = resolveThemeDefault(
    'table',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input() spacing = resolveThemeDefault(
    'table',
    'spacing',
    'normal',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault('table', 'size', 'md', this.themeProvider, this.themeService);
  @Input() sortKey = resolveThemeDefault(
    'table',
    'sortKey',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() sortDirection: DasarTableSortDirection = resolveThemeDefault(
    'table',
    'sortDirection',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input() emptyTitle = resolveThemeDefault(
    'table',
    'emptyTitle',
    'Data empty',
    this.themeProvider,
    this.themeService,
  );
  @Input() emptyDescription = resolveThemeDefault(
    'table',
    'emptyDescription',
    'No records found',
    this.themeProvider,
    this.themeService,
  );
  @Input() loadingText = resolveThemeDefault(
    'table',
    'loadingText',
    'loading...',
    this.themeProvider,
    this.themeService,
  );
  @Input() containerClass = resolveThemeDefault(
    'table',
    'containerClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() wrapperClass = resolveThemeDefault(
    'table',
    'wrapperClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() tableClass = resolveThemeDefault(
    'table',
    'tableClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() headerClass = resolveThemeDefault(
    'table',
    'headerClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() bodyClass = resolveThemeDefault(
    'table',
    'bodyClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() paginationClass = resolveThemeDefault(
    'table',
    'paginationClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() containerStyle = resolveThemeDefault(
    'table',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() wrapperStyle = resolveThemeDefault(
    'table',
    'wrapperStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() tableStyle = resolveThemeDefault(
    'table',
    'tableStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() headerStyle = resolveThemeDefault(
    'table',
    'headerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() bodyStyle = resolveThemeDefault(
    'table',
    'bodyStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() paginationStyle = resolveThemeDefault(
    'table',
    'paginationStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Output() onRowClick = new EventEmitter<{ row: any; index: number; event: MouseEvent }>();
  @Output() onRowDblClick = new EventEmitter<{ row: any; index: number; event: MouseEvent }>();
  @Output() onRowContextMenu = new EventEmitter<{ row: any; index: number; event: MouseEvent }>();
  @Output() onSortChange = new EventEmitter<DasarTableSortEvent>();
  @Output() onRowExpandChange = new EventEmitter<{ row: any; index: number; expanded: boolean }>();

  @HostBinding('class.dasar-table') readonly baseClass = true;
  expandedRows = new Set<number>();

  get hasHeader(): boolean {
    return !!this.providedHeader;
  }
  get hasBody(): boolean {
    return !!this.providedBody;
  }
  get hasEmpty(): boolean {
    return !!this.providedEmpty;
  }
  get hasPagination(): boolean {
    return !!this.providedPagination;
  }
  get hasExpanded(): boolean {
    return !!this.providedExpanded;
  }

  getColHeaderClass(col: DasarTableColumn): ClassType {
    return col.headerClass || '';
  }
  getColHeaderStyle(col: DasarTableColumn): StyleType {
    return { ...(col.headerStyle as object) };
  }
  getColCellClass(col: DasarTableColumn, row: any, index: number): ClassType {
    const dynamicClass =
      typeof col.cellClass === 'function' ? col.cellClass(row, index) : col.cellClass;
    return dynamicClass || '';
  }
  getColCellStyle(col: DasarTableColumn, row: any, index: number): StyleType {
    const dynamicStyle =
      typeof col.cellStyle === 'function' ? col.cellStyle(row, index) : col.cellStyle;
    return { ...(dynamicStyle as object) };
  }
  getCellTemplate(columnName: string): TemplateRef<any> | null {
    const directive = this.cellTemplates?.find((t) => t.columnName === columnName);
    return directive ? directive.templateRef : null;
  }
  onSort(columnKey: string): void {
    if (this.sortKey === columnKey) {
      this.sortDirection =
        this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? null : 'asc';
      if (this.sortDirection === null) this.sortKey = null;
    } else {
      this.sortKey = columnKey;
      this.sortDirection = 'asc';
    }
    this.onSortChange.emit({ column: columnKey, direction: this.sortDirection });
  }
  toggleExpand(row: any, index: number, event: MouseEvent): void {
    event.stopPropagation();
    const isExpanded = this.expandedRows.has(index);
    if (isExpanded) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
    this.expandedRows = new Set(this.expandedRows);
    this.onRowExpandChange.emit({ row, index, expanded: !isExpanded });
  }
  isExpanded(index: number): boolean {
    return this.expandedRows.has(index);
  }
  rowClick(row: any, index: number, event: MouseEvent): void {
    this.onRowClick.emit({ row, index, event });
  }
  rowDblClick(row: any, index: number, event: MouseEvent): void {
    this.onRowDblClick.emit({ row, index, event });
  }
  rowContextMenu(row: any, index: number, event: MouseEvent): void {
    this.onRowContextMenu.emit({ row, index, event });
  }
}

export const DasarTableComponent = [
  DasarTablePaginationSlot,
  DasarTableCellDirective,
  DasarTableExpandedSlot,
  DasarTableHeaderSlot,
  DasarTableEmptySlot,
  DasarTableBodySlot,
  DasarTable,
] as const;
