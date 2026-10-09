import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Directive,
  ContentChild,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Types ---
export type DasarPivotAggregator = 'sum' | 'count' | 'avg' | 'min' | 'max';
export type DasarPivotTableAppearance = 'outline' | 'filled' | 'elevated' | 'borderless';
export type DasarPivotTableSpacing = 'compact' | 'normal' | 'relaxed';
export type DasarPivotTableSize = 'sm' | 'md' | 'lg';
export type DasarPivotTableSortDirection = 'asc' | 'desc' | null;

export interface DasarPivotTableSortEvent {
  key: string;
  direction: DasarPivotTableSortDirection;
}

@Directive({ selector: '[pivot-cell-template]', standalone: true })
export class DasarPivotCellTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[pivot-row-header-template]', standalone: true })
export class DasarPivotRowHeaderTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[pivot-col-header-template]', standalone: true })
export class DasarPivotColHeaderTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[pivot-header-slot]', standalone: true })
export class DasarPivotTableHeaderSlot {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[pivot-body-slot]', standalone: true })
export class DasarPivotTableBodySlot {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[pivot-empty-slot]', standalone: true })
export class DasarPivotTableEmptySlot {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[pivot-pagination-slot]', standalone: true })
export class DasarPivotTablePaginationSlot {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[pivot-expanded-slot]', standalone: true })
export class DasarPivotTableExpandedSlot {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'dasar-pivot-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dasar-pivot-table.html',
  styleUrls: ['./dasar-pivot-table.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DasarPivotTable implements OnChanges {
  @ContentChild(DasarPivotRowHeaderTemplate) rowHeaderTemplate?: DasarPivotRowHeaderTemplate;
  @ContentChild(DasarPivotColHeaderTemplate) colHeaderTemplate?: DasarPivotColHeaderTemplate;
  @ContentChild(DasarPivotCellTemplate) cellTemplate?: DasarPivotCellTemplate;
  @ContentChild(DasarPivotTableHeaderSlot) providedHeader?: DasarPivotTableHeaderSlot;
  @ContentChild(DasarPivotTableBodySlot) providedBody?: DasarPivotTableBodySlot;
  @ContentChild(DasarPivotTableEmptySlot) providedEmpty?: DasarPivotTableEmptySlot;
  @ContentChild(DasarPivotTablePaginationSlot) providedPagination?: DasarPivotTablePaginationSlot;
  @ContentChild(DasarPivotTableExpandedSlot) providedExpanded?: DasarPivotTableExpandedSlot;

  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) rowField!: string;
  @Input({ required: true }) colField!: string;
  @Input() valField: string = '';
  @Input() aggregator: DasarPivotAggregator = 'sum';
  @Input() rowLabel: string = '';
  @Input() colLabel: string = '';
  @Input() showRowTotals: boolean = true;
  @Input() showColTotals: boolean = true;
  @Input() emptyText: string = '-';
  @Input() appearance: DasarPivotTableAppearance = 'outline';
  @Input() spacing: DasarPivotTableSpacing = 'normal';
  @Input() size: DasarPivotTableSize = 'md';
  @Input() loading: boolean = false;
  @Input() emptyTitle: string = 'Data empty';
  @Input() emptyDescription: string = 'No records found';
  @Input() loadingText: string = 'loading...';
  @Input() sortKey: string | null = null;
  @Input() sortDirection: DasarPivotTableSortDirection = null;
  @Input() cellClassFn?: (
    val: number | null,
    row: string,
    col: string,
  ) => string | string[] | Record<string, boolean>;
  @Input() cellStyleFn?: (val: number | null, row: string, col: string) => Record<string, string>;

  @Output() rowClick = new EventEmitter<{ row: any; index: number; event: MouseEvent }>();
  @Output() rowDblclick = new EventEmitter<{ row: any; index: number; event: MouseEvent }>();
  @Output() rowContextMenu = new EventEmitter<{ row: any; index: number; event: MouseEvent }>();
  @Output() sortChange = new EventEmitter<DasarPivotTableSortEvent>();
  @Output() rowExpandChange = new EventEmitter<{ row: any; index: number; expanded: boolean }>();

  rowHeaders: string[] = [];
  colHeaders: string[] = [];
  matrix: Record<string, Record<string, number | null>> = {};
  rowTotals: Record<string, number | null> = {};
  colTotals: Record<string, number | null> = {};
  grandTotal: number | null = null;
  expandedRows = new Set<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['data'] ||
      changes['rowField'] ||
      changes['colField'] ||
      changes['valField'] ||
      changes['aggregator']
    ) {
      this.buildPivotMatrix();
    }
  }

  private buildPivotMatrix() {
    if (!this.data || !this.data.length) {
      this.resetState();
      return;
    }
    const rowSet = new Set<string>();
    const colSet = new Set<string>();
    const grouped = new Map<string, any[]>();

    for (const item of this.data) {
      const rVal = String(item[this.rowField] ?? 'Unknown');
      const cVal = String(item[this.colField] ?? 'Unknown');
      rowSet.add(rVal);
      colSet.add(cVal);
      const key = `${rVal}::${cVal}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(item);
    }

    this.rowHeaders = Array.from(rowSet).sort();
    this.colHeaders = Array.from(colSet).sort();

    this.matrix = {};
    this.rowTotals = {};
    this.colTotals = {};
    const allDataForGrandTotal: any[] = [];

    for (const r of this.rowHeaders) {
      this.matrix[r] = {};
      const rowData: any[] = [];
      for (const c of this.colHeaders) {
        const items = grouped.get(`${r}::${c}`) || [];
        rowData.push(...items);
        allDataForGrandTotal.push(...items);
        this.matrix[r][c] = this.aggregate(items);
        if (!this.colTotals[c]) this.colTotals[c] = 0;
      }
      this.rowTotals[r] = this.aggregate(rowData);
    }

    for (const c of this.colHeaders) {
      const colData = this.data.filter((item) => String(item[this.colField] ?? 'Unknown') === c);
      this.colTotals[c] = this.aggregate(colData);
    }
    this.grandTotal = this.aggregate(allDataForGrandTotal);
  }

  private aggregate(items: any[]): number | null {
    if (!items || items.length === 0) return null;
    if (this.aggregator === 'count') return items.length;
    const values = items.map((i) => Number(i[this.valField]) || 0);
    switch (this.aggregator) {
      case 'sum':
        return values.reduce((a, b) => a + b, 0);
      case 'avg':
        return values.reduce((a, b) => a + b, 0) / values.length;
      case 'max':
        return Math.max(...values);
      case 'min':
        return Math.min(...values);
      default:
        return null;
    }
  }

  private resetState() {
    this.rowHeaders = [];
    this.colHeaders = [];
    this.matrix = {};
    this.rowTotals = {};
    this.colTotals = {};
    this.grandTotal = null;
  }

  // --- Event Handlers ---
  handleRowClick(row: string, index: number, event: MouseEvent) {
    this.rowClick.emit({ row, index, event });
  }

  handleRowDblclick(row: string, index: number, event: MouseEvent) {
    this.rowDblclick.emit({ row, index, event });
  }

  handleRowContextMenu(row: string, index: number, event: MouseEvent) {
    this.rowContextMenu.emit({ row, index, event });
  }
}

export const DasarPivotTableComponent = [
  DasarPivotTable,
  DasarPivotCellTemplate,
  DasarPivotRowHeaderTemplate,
  DasarPivotColHeaderTemplate,
  DasarPivotTableHeaderSlot,
  DasarPivotTableBodySlot,
  DasarPivotTableEmptySlot,
  DasarPivotTablePaginationSlot,
  DasarPivotTableExpandedSlot,
] as const;
