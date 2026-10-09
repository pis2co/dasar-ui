import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  Directive,
  TemplateRef,
  ContentChild,
  booleanAttribute,
  ViewEncapsulation,
  forwardRef,
  ChangeDetectorRef,
  inject,
  HostBinding,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { safeFormat, resolveThemeDefault } from '../../utils/common';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';

export type DasarCalendarSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarCalendarAppearance = 'outline' | 'borderless';
export type DasarCalendarVariant = 'dashboard' | 'dropdown';
export type DasarCalendarRadius = ScaleAttributeType;

export interface DasarCalendarConfig {
  appearance?: 'outline' | 'borderless';
  variant?: 'dashboard' | 'dropdown';
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
}

interface CalendarDay {
  isCurrentMonth: boolean;
  weekdayStr?: string;
  fullDateStr: string;
  isSelected: boolean;
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
  ],
  imports: [CommonModule, DasarButtonComponent, DasarIconComponent],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-calendar.scss'],
  templateUrl: './dasar-calendar.html',
  selector: 'dasar-calendar',
  standalone: true,
})
export class DasarCalendar implements OnInit, OnChanges, ControlValueAccessor {
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
  currentViewDate: Date = new Date();
  calendarDays: CalendarDay[] = [];

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
      this.cdr.markForCheck();

      if (parsedVal) {
        this.currentViewDate = new Date(parsedVal);
      }
      this.generateCalendar();
    }
  }
  @Output() valueChange = new EventEmitter<Date | null>();

  ngOnInit() {
    if (this.value) this.currentViewDate = new Date(this.value);
    this.generateCalendar();
  }
  ngOnChanges() {
    if (this.value) {
      this.currentViewDate = new Date(this.value);
      this.generateCalendar();
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
  get yearsList(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 1999;
    const years: number[] = [];
    for (let y = startYear; y <= currentYear; y++) {
      years.push(y);
    }
    return years;
  }
  get localizedDropdownWeekdays(): string[] {
    const baseDate = new Date(2026, 5, 7); // Sunday
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
      this.viewMode = 'years';
    } else {
      this.viewMode = 'days';
    }
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
    this.cdr.markForCheck();
  }
  getTimeSafe(date: Date | null): number | null {
    return date ? date.getTime() : null;
  }
  changeMonth(offset: number, event?: Event) {
    if (event) event.stopPropagation();
    if (this.disabled) return;
    const oldYear = this.currentViewDate.getFullYear();
    this.currentViewDate = new Date(oldYear, this.currentViewDate.getMonth() + offset, 1);
    this.generateCalendar();
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
    this.value = newDate;
    this.valueChange.emit(newDate);
    this.generateCalendar();
  }
  generateCalendar() {
    const totalCell = 42;
    const year = this.currentViewDate.getFullYear();
    const month = this.currentViewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = this.value ? new Date(this.value) : null;
    if (selected) selected.setHours(0, 0, 0, 0);
    const days: CalendarDay[] = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push(this.createCalendarDay(date, days.length, false, today, selected));
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(this.createCalendarDay(date, days.length, true, today, selected));
    }
    const remainingDays = totalCell - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push(this.createCalendarDay(date, days.length, false, today, selected));
    }
    this.calendarDays = days;
  }
  private createCalendarDay(
    date: Date,
    index: number,
    isCurrentMonth: boolean,
    today: Date,
    selected: Date | null,
  ): CalendarDay {
    return {
      weekdayStr: index < 7 ? safeFormat(date, this.weekdayFormat, this.locale) : undefined,
      isSelected: selected ? date.getTime() === selected.getTime() : false,
      fullDateStr: safeFormat(date, this.valueFormat, this.locale),
      isToday: date.getTime() === today.getTime(),
      dayNumber: date.getDate(),
      isCurrentMonth,
      date,
    };
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
