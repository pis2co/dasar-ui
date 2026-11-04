import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  AfterViewInit,
  Directive,
  TemplateRef,
  ContentChild,
  ViewChild,
  booleanAttribute,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectorRef,
  inject,
  HostBinding,
} from '@angular/core';
import {
  NgpDatePicker,
  NgpDateRangePicker,
  NgpDatePickerGrid,
  NgpDatePickerRowRender,
  NgpDatePickerCellRender,
  NgpDatePickerCell,
  NgpDatePickerDateButton,
} from 'ng-primitives/date-picker';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { NgpDateFnsDateAdapter } from 'ng-primitives/date-time-date-fns';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { safeFormat, resolveThemeDefault } from '../../utils/common';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { provideDateAdapter } from 'ng-primitives/date-time';
import { CommonModule } from '@angular/common';

export type DasarCalendarSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarCalendarAppearance = 'outline' | 'borderless' | 'elevated';
export type DasarCalendarVariant = 'dashboard' | 'dropdown';
export type DasarCalendarRadius = ScaleAttributeType;

export interface DasarCalendarConfig {
  appearance?: DasarCalendarAppearance;
  variant?: DasarCalendarVariant;
  size?: DasarCalendarSizeType;
  radius?: DasarCalendarRadius;
  containerStyle?: StyleType;
  containerClass?: ClassType;
  headerClass?: ClassType;
  headerStyle?: StyleType;
  hideFullDate?: boolean;
  weekdayFormat?: string;
  headerFormat?: string;
  valueFormat?: string;
  hideHeader?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  locale?: string;
  range?: boolean;
}

export type DasarCalendarRange = [Date | null, Date | null];

interface CalendarDay {
  isCurrentMonth: boolean;
  weekdayStr?: string;
  fullDateStr: string;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  dayNumber: number;
  isToday: boolean;
  date: Date;
}

@Directive({ selector: '[calendar-header-template]', standalone: true })
export class DasarCalendarHeaderTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[calendar-prev-year-template]', standalone: true })
export class DasarCalendarPrevYearTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[calendar-prev-month-template]', standalone: true })
export class DasarCalendarPrevMonthTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[calendar-today-template]', standalone: true })
export class DasarCalendarTodayTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[calendar-next-month-template]', standalone: true })
export class DasarCalendarNextMonthTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[calendar-next-year-template]', standalone: true })
export class DasarCalendarNextYearTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[calendar-footer-slot]', standalone: true })
export class DasarCalendarFooterSlot {}

@Component({
  providers: [
    {
      useExisting: forwardRef(() => DasarCalendarComponent),
      provide: NG_VALUE_ACCESSOR,
      multi: true,
    },
    provideDateAdapter(NgpDateFnsDateAdapter),
  ],
  imports: [
    CommonModule,
    DasarButtonComponent,
    DasarIconComponent,
    NgpDatePicker,
    NgpDateRangePicker,
    NgpDatePickerGrid,
    NgpDatePickerRowRender,
    NgpDatePickerCellRender,
    NgpDatePickerCell,
    NgpDatePickerDateButton,
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-calendar.scss'],
  templateUrl: './dasar-calendar.html',
  selector: 'dasar-calendar',
  standalone: true,
})
export class DasarCalendar implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @ViewChild(NgpDatePicker)
  private set ngpDatePickerRef(ref: NgpDatePicker<Date> | undefined) {
    this.ngpDatePicker = ref;
    if (ref) {
      this.syncFocusedDateToPrimitive(this._currentViewDate);
      this.syncSinglePrimitiveState(this._value);
    }
  }
  private ngpDatePicker?: NgpDatePicker<Date>;

  @ViewChild(NgpDateRangePicker)
  private set ngpDateRangePickerRef(ref: NgpDateRangePicker<Date> | undefined) {
    this.ngpDateRangePicker = ref;
    if (ref) {
      this.syncFocusedDateToPrimitive(this._currentViewDate);
      this.syncRangePrimitiveState(this._rangeValue[0], this._rangeValue[1]);
    }
  }
  private ngpDateRangePicker?: NgpDateRangePicker<Date>;
  @ContentChild(DasarCalendarPrevMonthTemplate) prevMonthTemplate?: DasarCalendarPrevMonthTemplate;
  @ContentChild(DasarCalendarNextMonthTemplate) nextMonthTemplate?: DasarCalendarNextMonthTemplate;
  @ContentChild(DasarCalendarPrevYearTemplate) prevYearTemplate?: DasarCalendarPrevYearTemplate;
  @ContentChild(DasarCalendarNextYearTemplate) nextYearTemplate?: DasarCalendarNextYearTemplate;
  @ContentChild(DasarCalendarHeaderTemplate) headerTemplate?: DasarCalendarHeaderTemplate;
  @ContentChild(DasarCalendarTodayTemplate) todayTemplate?: DasarCalendarTodayTemplate;
  @ContentChild(DasarCalendarFooterSlot) footerSlot?: DasarCalendarFooterSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input({ alias: 'header-format' }) headerFormat = resolveThemeDefault(
    'calendar',
    'headerFormat',
    'MMMM yyyy',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'value-format' }) valueFormat = resolveThemeDefault(
    'calendar',
    'valueFormat',
    'dd-MM-yyyy',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'select',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'weekday-format' }) weekdayFormat = resolveThemeDefault(
    'calendar',
    'weekdayFormat',
    'dddd',
    this.themeProvider,
    this.themeService,
  );
  @Input() locale = resolveThemeDefault(
    'calendar',
    'locale',
    'en-US',
    this.themeProvider,
    this.themeService,
  );
  @Input() appearance = resolveThemeDefault(
    'calendar',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input() variant = resolveThemeDefault(
    'calendar',
    'variant',
    'dashboard',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'calendar',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'calendar',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'calendar',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-class' }) headerClass = resolveThemeDefault(
    'calendar',
    'headerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-style' }) headerStyle = resolveThemeDefault(
    'calendar',
    'headerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'calendar',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hide-header', transform: booleanAttribute }) hideHeader = resolveThemeDefault(
    'calendar',
    'hideHeader',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'calendar',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hide-full-date', transform: booleanAttribute }) hideFullDate =
    resolveThemeDefault('calendar', 'hideFullDate', false, this.themeProvider, this.themeService);

  @Input({ transform: booleanAttribute }) range = resolveThemeDefault(
    'calendar',
    'range',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() min?: Date;
  @Input() max?: Date;
  @Input() dateDisabled: (date: Date) => boolean = () => false;
  @Input() agendaItems: { title: string; time: string }[] = [];

  @Output() onMonthChange = new EventEmitter<Date>();
  @Output() onYearChange = new EventEmitter<Date>();
  @Output() onPrevMonthClick = new EventEmitter<Date>();
  @Output() onNextMonthClick = new EventEmitter<Date>();
  @Output() onPrevYearClick = new EventEmitter<Date>();
  @Output() onNextYearClick = new EventEmitter<Date>();
  @Output() onTodayClick = new EventEmitter<Date>();

  @HostBinding('class.dasar-calendar') readonly baseClass = true;
  @HostBinding('class.full-width') get hasFullWidth(): boolean {
    return this.fullWidth;
  }

  private _value: Date | null = null;
  private cdr = inject(ChangeDetectorRef);
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  viewMode: 'days' | 'months' | 'years' = 'days';
  private _decadeStart: number | null = null;
  private _currentViewDate: Date = new Date();
  get currentViewDate(): Date {
    return this._currentViewDate;
  }
  set currentViewDate(val: Date) {
    this._currentViewDate = val;
    this.syncFocusedDateToPrimitive(val);
  }
  get calendarDays(): CalendarDay[] {
    const totalCell = 42;
    const year = this._currentViewDate.getFullYear();
    const month = this._currentViewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days: CalendarDay[] = [];
    const pushDay = (date: Date, index: number) => {
      const isRangeStart = this.isRangeStartDate(date);
      const isRangeEnd = this.isRangeEndDate(date);
      days.push({
        weekdayStr: index < 7 ? this.formatWeekday(date) : undefined,
        isSelected: this.isSelectedDate(date),
        isInRange: this.isInRangeDate(date),
        isRangeStart,
        isRangeEnd,
        fullDateStr: this.formatFullDate(date),
        isToday: this.isTodayDate(date),
        dayNumber: date.getDate(),
        isCurrentMonth: this.isCurrentMonthDate(date),
        date,
      });
    };
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      pushDay(new Date(year, month - 1, daysInPrevMonth - i), days.length);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      pushDay(new Date(year, month, i), days.length);
    }
    const remainingDays = totalCell - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      pushDay(new Date(year, month + 1, i), days.length);
    }
    return days;
  }

  onTouched: any = () => {};
  onChange: any = () => {};

  @Input()
  get value(): Date | null {
    return this._value;
  }
  set value(val: Date | null | string | number) {
    const parsedVal = val ? new Date(val) : null;
    if (this.getTimeSafe(this._value) !== this.getTimeSafe(parsedVal)) {
      this._value = parsedVal;
      this.syncSinglePrimitiveState(parsedVal);
      this.cdr.markForCheck();

      if (parsedVal) {
        this.currentViewDate = new Date(parsedVal);
      }
      this.generateCalendar();
    }
  }
  @Output() valueChange = new EventEmitter<Date | null>();

  private _rangeValue: DasarCalendarRange = [null, null];
  @Input()
  get rangeValue(): DasarCalendarRange {
    return this._rangeValue;
  }
  set rangeValue(val: DasarCalendarRange | null | undefined) {
    const start = val?.[0] ? new Date(val[0]) : null;
    const end = val?.[1] ? new Date(val[1]) : null;
    if (
      this.getTimeSafe(this._rangeValue[0]) === this.getTimeSafe(start) &&
      this.getTimeSafe(this._rangeValue[1]) === this.getTimeSafe(end)
    ) {
      return;
    }
    this._rangeValue = [start, end];
    this.syncRangePrimitiveState(start, end);
    if (start) {
      this.currentViewDate = new Date(start);
    }
    this.generateCalendar();
    this.cdr.markForCheck();
  }
  @Output() rangeValueChange = new EventEmitter<DasarCalendarRange>();

  ngOnInit() {
    if (this.range && this.rangeValue[0]) this.currentViewDate = new Date(this.rangeValue[0]);
    else if (this.value) this.currentViewDate = new Date(this.value);
    this.generateCalendar();
  }
  ngAfterViewInit() {
    this.syncPrimitiveState();
  }
  ngOnChanges() {
    if (this.range) {
      this.syncRangePrimitiveState(this._rangeValue[0], this._rangeValue[1]);
      this.generateCalendar();
    } else if (this.value) {
      this.currentViewDate = new Date(this.value);
      this.syncSinglePrimitiveState(this._value);
      this.generateCalendar();
    } else {
      this.syncFocusedDateToPrimitive(this._currentViewDate);
    }
  }

  get currentMonthYear(): string {
    return safeFormat(this.currentViewDate, this.headerFormat, this.locale);
  }
  get monthsList(): { name: string; index: number }[] {
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(this.currentViewDate.getFullYear(), i, 1);
      return {
        name: safeFormat(d, 'LLLL', this.locale),
        index: i,
      };
    });
  }
  get decadeStart(): number {
    if (this._decadeStart === null) {
      this._decadeStart = new Date().getFullYear() - 11;
    }
    return this._decadeStart;
  }
  get decadeLabel(): string {
    return `${this.decadeStart} - ${this.decadeStart + 11}`;
  }
  get yearsList(): number[] {
    const start = this.decadeStart;
    return Array.from({ length: 12 }, (_, i) => start + i);
  }
  get localizedDropdownWeekdays(): string[] {
    const baseDate = new Date(2026, 5, 7);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      return safeFormat(d, this.variant == 'dropdown' ? 'ddd' : this.weekdayFormat, this.locale);
    });
  }

  toggleViewMode() {
    if (this.viewMode === 'days') {
      this.viewMode = 'months';
    } else if (this.viewMode === 'months') {
      this._decadeStart = null;
      this._decadeStart = this.currentViewDate.getFullYear() - 11;
      this.viewMode = 'years';
    } else {
      this.viewMode = 'days';
    }
  }
  changeViewYear(direction: 1 | -1, event: Event): void {
    event.stopPropagation();
    this.currentViewDate = new Date(
      this.currentViewDate.getFullYear() + direction,
      this.currentViewDate.getMonth(),
      1,
    );
    this.generateCalendar();
    this.cdr.markForCheck();
  }
  changeDecade(direction: 1 | -1, event: Event): void {
    event.stopPropagation();
    this._decadeStart = this.decadeStart + direction * 12;
    this.cdr.markForCheck();
  }
  selectMonth(monthIndex: number, event: Event) {
    event.stopPropagation();
    this.currentViewDate = new Date(this.currentViewDate.getFullYear(), monthIndex, 1);
    this.viewMode = 'days';
    this.generateCalendar();
    this.onMonthChange.emit(this.currentViewDate);
  }
  selectYear(year: number, event: Event) {
    event.stopPropagation();
    this.currentViewDate = new Date(year, this.currentViewDate.getMonth(), 1);
    this.viewMode = 'months';
    this.generateCalendar();
    this.onYearChange.emit(this.currentViewDate);
  }
  writeValue(value: any): void {
    const parsedVal = value ? new Date(value) : null;
    this._value = parsedVal;
    this.syncSinglePrimitiveState(parsedVal);
    if (parsedVal) {
      this.currentViewDate = new Date(parsedVal);
    }
    this.generateCalendar();
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    (this.ngpDatePicker as any)?.state?.setDisabled(isDisabled);
    (this.ngpDateRangePicker as any)?.state?.setDisabled(isDisabled);
    this.cdr.markForCheck();
  }
  getTimeSafe(date: Date | null): number | null {
    return date ? date.getTime() : null;
  }
  constructor() {}
  private syncPrimitiveState() {
    this.syncFocusedDateToPrimitive(this._currentViewDate);
    if (this.range) {
      this.syncRangePrimitiveState(this._rangeValue[0], this._rangeValue[1]);
    } else {
      this.syncSinglePrimitiveState(this._value);
    }
  }
  private syncFocusedDateToPrimitive(date: Date) {
    (this.ngpDatePicker as any)?.state?.setFocusedDate(date, 'program', 'forward');
    (this.ngpDateRangePicker as any)?.state?.setFocusedDate(date, 'program', 'forward');
  }
  private syncSinglePrimitiveState(val: Date | null) {
    (this.ngpDatePicker as any)?.state?.select(val ?? undefined, false, { emit: false });
  }
  private syncRangePrimitiveState(start: Date | null, end: Date | null) {
    (this.ngpDateRangePicker as any)?.state?.setStart(start ?? undefined, { emit: false });
    (this.ngpDateRangePicker as any)?.state?.setEnd(end ?? undefined, { emit: false });
  }
  onNgpFocusedDateChange(date: Date) {
    if (!date) return;
    const oldMonth = this._currentViewDate.getMonth();
    const oldYear = this._currentViewDate.getFullYear();
    this._currentViewDate = new Date(date);
    if (date.getMonth() !== oldMonth || date.getFullYear() !== oldYear) {
      this.generateCalendar();
      this.onMonthChange.emit(this._currentViewDate);
      if (oldYear !== this._currentViewDate.getFullYear()) {
        this.onYearChange.emit(this._currentViewDate);
      }
    }
    this.cdr.markForCheck();
  }
  onNgpSingleDateChange(date: Date | undefined) {
    if (!date || this.disabled) return;
    const isCurrentMonth =
      date.getMonth() === this._currentViewDate.getMonth() &&
      date.getFullYear() === this._currentViewDate.getFullYear();
    if (!isCurrentMonth) {
      const oldYear = this._currentViewDate.getFullYear();
      this._currentViewDate = new Date(date);
      this.onMonthChange.emit(this._currentViewDate);
      if (oldYear !== this._currentViewDate.getFullYear()) {
        this.onYearChange.emit(this._currentViewDate);
      }
    }
    const newDate = new Date(date);
    this._value = newDate;
    this.syncFocusedDateToPrimitive(this._currentViewDate);
    this.generateCalendar();
    this.onChange(newDate);
    this.onTouched();
    this.valueChange.emit(newDate);
    this.cdr.markForCheck();
  }
  onCellClick(date: Date, isCellDisabled: boolean, event: MouseEvent) {
    if (this.disabled || isCellDisabled) return;
    if (event.target === event.currentTarget) {
      if (this.range) {
        this.ngpDateRangePicker?.select(date, true);
      } else {
        this.ngpDatePicker?.select(date, true);
      }
    }
  }
  private skipNextRangeEnd = false;
  onNgpRangeStartChange(date: Date | undefined) {
    if (!date || this.disabled) return;
    const prevStart = this._rangeValue[0];
    const prevEnd = this._rangeValue[1];
    if (prevStart && !prevEnd) {
      const clickedTime = new Date(date).setHours(0, 0, 0, 0);
      const startTime = new Date(prevStart).setHours(0, 0, 0, 0);
      if (clickedTime < startTime) {
        this.skipNextRangeEnd = true;
      }
    }
    this.handleRangeSelection(date);
  }
  onNgpRangeEndChange(date: Date | undefined) {
    if (!date || this.disabled) return;
    if (this.skipNextRangeEnd) {
      this.skipNextRangeEnd = false;
      (this.ngpDateRangePicker as any)?.state?.setEnd(undefined, { emit: false });
      return;
    }
    const start = this._rangeValue[0];
    if (!start) return;
    const endTime = new Date(date).setHours(0, 0, 0, 0);
    const startTime = new Date(start).setHours(0, 0, 0, 0);
    if (endTime <= startTime) return;
    this.handleRangeSelection(date);
  }
  private handleRangeSelection(date: Date) {
    const isCurrentMonth =
      date.getMonth() === this._currentViewDate.getMonth() &&
      date.getFullYear() === this._currentViewDate.getFullYear();
    if (!isCurrentMonth) {
      const oldYear = this._currentViewDate.getFullYear();
      this._currentViewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.onMonthChange.emit(this._currentViewDate);
      if (oldYear !== this._currentViewDate.getFullYear()) {
        this.onYearChange.emit(this._currentViewDate);
      }
      this.syncFocusedDateToPrimitive(this._currentViewDate);
    }
    this.selectRangeDate(date);
  }
  onGridKeydown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.hasAttribute('ngpDatePickerDateButton')) return;
    const state = this.range
      ? (this.ngpDateRangePicker as any)?.state
      : (this.ngpDatePicker as any)?.state;
    if (!state) return;
    const focused = state.focusedDate?.() as Date | undefined;
    if (!focused) return;
    let deltaDays = 0;
    if (event.key === 'ArrowRight') deltaDays = 1;
    else if (event.key === 'ArrowLeft') deltaDays = -1;
    else if (event.key === 'ArrowDown') deltaDays = 7;
    else if (event.key === 'ArrowUp') deltaDays = -7;
    if (deltaDays !== 0) {
      event.preventDefault();
      const next = new Date(focused);
      next.setDate(next.getDate() + deltaDays);
      state.setFocusedDate(next, 'keyboard', deltaDays > 0 ? 'forward' : 'backward');
    }
  }
  isFirstRowDate(date: Date): boolean {
    const firstOfMonth = new Date(
      this._currentViewDate.getFullYear(),
      this._currentViewDate.getMonth(),
      1,
    );
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());
    gridStart.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.round((d.getTime() - gridStart.getTime()) / 86400000);
    return diffDays >= 0 && diffDays < 7;
  }
  formatWeekday(date: Date): string {
    return safeFormat(date, this.weekdayFormat, this.locale);
  }
  formatFullDate(date: Date): string {
    return safeFormat(date, this.valueFormat, this.locale);
  }
  isCurrentMonthDate(date: Date): boolean {
    return (
      date.getMonth() === this._currentViewDate.getMonth() &&
      date.getFullYear() === this._currentViewDate.getFullYear()
    );
  }
  isTodayDate(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
  isSelectedDate(date: Date): boolean {
    if (this.range) {
      return this.isRangeStartDate(date) || this.isRangeEndDate(date);
    }
    if (!this._value) return false;
    return (
      date.getDate() === this._value.getDate() &&
      date.getMonth() === this._value.getMonth() &&
      date.getFullYear() === this._value.getFullYear()
    );
  }
  isRangeStartDate(date: Date): boolean {
    if (!this.range || !this._rangeValue[0]) return false;
    const s = this._rangeValue[0];
    return (
      date.getDate() === s.getDate() &&
      date.getMonth() === s.getMonth() &&
      date.getFullYear() === s.getFullYear()
    );
  }
  isRangeEndDate(date: Date): boolean {
    if (!this.range || !this._rangeValue[1]) return false;
    const e = this._rangeValue[1];
    return (
      date.getDate() === e.getDate() &&
      date.getMonth() === e.getMonth() &&
      date.getFullYear() === e.getFullYear()
    );
  }
  isInRangeDate(date: Date): boolean {
    if (!this.range || !this._rangeValue[0] || !this._rangeValue[1]) return false;
    const d = new Date(date).setHours(0, 0, 0, 0);
    const s = new Date(this._rangeValue[0]).setHours(0, 0, 0, 0);
    const e = new Date(this._rangeValue[1]).setHours(0, 0, 0, 0);
    return d > s && d < e;
  }
  changeMonth(offset: number, event?: Event) {
    if (event) event.stopPropagation();
    if (this.disabled) return;
    const oldYear = this.currentViewDate.getFullYear();
    this.currentViewDate = new Date(oldYear, this.currentViewDate.getMonth() + offset, 1);
    this.generateCalendar();
    this.cdr.markForCheck();
    this.onMonthChange.emit(this.currentViewDate);
    if (oldYear !== this.currentViewDate.getFullYear()) {
      this.onYearChange.emit(this.currentViewDate);
    }
    offset > 0
      ? this.onNextMonthClick.emit(this.currentViewDate)
      : this.onPrevMonthClick.emit(this.currentViewDate);
  }
  changeYear(offset: number, event?: Event) {
    if (event) event.stopPropagation();
    if (this.disabled) return;
    const oldYear = this.currentViewDate.getFullYear();
    this.currentViewDate = new Date(oldYear + offset, this.currentViewDate.getMonth(), 1);
    this.generateCalendar();
    this.cdr.markForCheck();
    this.onYearChange.emit(this.currentViewDate);
    offset > 0
      ? this.onNextYearClick.emit(this.currentViewDate)
      : this.onPrevYearClick.emit(this.currentViewDate);
  }
  goToToday(event?: Event) {
    if (event) event.stopPropagation();
    const oldYear = this.currentViewDate.getFullYear();
    this.currentViewDate = new Date();
    this.generateCalendar();
    this.cdr.markForCheck();
    this.onTodayClick.emit(this.currentViewDate);
    this.onMonthChange.emit(this.currentViewDate);
    if (oldYear !== this.currentViewDate.getFullYear()) {
      this.onYearChange.emit(this.currentViewDate);
    }
  }
  selectDate(day: CalendarDay, event: Event) {
    event.stopPropagation();
    if (this.disabled) return;
    if (!day.isCurrentMonth) {
      const oldYear = this.currentViewDate.getFullYear();
      this.currentViewDate = new Date(day.date.getFullYear(), day.date.getMonth(), 1);
      this.onMonthChange.emit(this.currentViewDate);
      if (oldYear !== this.currentViewDate.getFullYear()) {
        this.onYearChange.emit(this.currentViewDate);
      }
    }
    const newDate = new Date(day.date);
    if (this.range) {
      this.selectRangeDate(newDate);
      return;
    }
    this.value = newDate;
    this.valueChange.emit(newDate);
    this.generateCalendar();
  }
  private selectRangeDate(date: Date) {
    const [start, end] = this._rangeValue;
    const clicked = new Date(date);
    clicked.setHours(0, 0, 0, 0);
    const startTime = start ? new Date(start).setHours(0, 0, 0, 0) : null;
    let next: DasarCalendarRange;
    if (!start || end || (startTime !== null && clicked.getTime() < startTime)) {
      next = [clicked, null];
    } else {
      next = [start, clicked];
    }
    this._rangeValue = next;
    this.syncRangePrimitiveState(next[0], next[1]);
    this.cdr.markForCheck();
    this.rangeValueChange.emit(next);
  }
  generateCalendar() {
    this.syncFocusedDateToPrimitive(this._currentViewDate);
  }
}

export const DasarCalendarComponent = [
  DasarCalendar,
  DasarCalendarFooterSlot,
  DasarCalendarHeaderTemplate,
  DasarCalendarPrevYearTemplate,
  DasarCalendarPrevMonthTemplate,
  DasarCalendarTodayTemplate,
  DasarCalendarNextMonthTemplate,
  DasarCalendarNextYearTemplate,
] as const;
