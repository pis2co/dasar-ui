import {
  DestroyRef,
  Component,
  Input,
  Output,
  EventEmitter,
  booleanAttribute,
  ElementRef,
  HostListener,
  OnInit,
  forwardRef,
  inject,
  ChangeDetectorRef,
  ViewEncapsulation,
  Directive,
  ContentChild,
  HostBinding,
  ViewChild,
} from '@angular/core';
import {
  applyFixedPanelPosition,
  computeSmartPlacement,
  DasarPanelPlacement,
  listenViewportChanges,
  watchPanel,
} from '../../utils/panel-placement';
import { DasarCalendarComponent, DasarCalendarRange } from '../dasar-calendar/dasar-calendar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { resolveThemeDefault, safeFormat } from '../../utils/common';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarNumberInputComponent } from '../dasar-number-input/dasar-number-input';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { fieldIconSize } from '../../utils/icon-size';
import { CommonModule } from '@angular/common';

export type DasarDatepickerSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarDatepickerAppearance = 'outline' | 'filled' | 'subtle' | 'elevated';
export type DasarDatepickerType = 'date' | 'datetime' | 'time';
export type DasarDatepickerPlacement = DasarPanelPlacement;
export type DasarDatepickerRadius = ScaleAttributeType;

export interface DasarDatepickerConfig {
  fullWidth?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  fluid?: boolean;
  error?: boolean;
  range?: boolean;
  displayFormat?: string;
  valueFormat?: string;
  showSeconds?: boolean;
  timeFormat?: '12' | '24';
  placement?: DasarDatepickerPlacement;
  appearance?: DasarDatepickerAppearance;
  extraLabel?: string;
  placeholder?: string;
  radius?: DasarDatepickerRadius;
  type?: DasarDatepickerType;
  size?: DasarDatepickerSize;
  locale?: string;
  label?: string;
  hint?: string;
  containerClass?: ClassType;
  wrapperClass?: ClassType;
  triggerClass?: ClassType;
  dropdownClass?: ClassType;
  labelWrapperClass?: ClassType;
  hintWrapperClass?: ClassType;
  wrapperStyle?: StyleType;
  triggerStyle?: StyleType;
  labelWrapperStyle?: StyleType;
  hintWrapperStyle?: StyleType;
  containerStyle?: StyleType;
  dropdownStyle?: StyleType;
}

@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarDatepickerPrefixSlot {}
@Directive({ selector: '[label-slot]', standalone: true })
export class DasarDatepickerLabelSlot {}
@Directive({ selector: '[extra-label-slot]', standalone: true })
export class DasarDatepickerExtraLabelSlot {}
@Directive({ selector: '[extra-header-slot]', standalone: true })
export class DasarDatepickerExtraHeaderSlot {}
@Directive({ selector: '[extra-footer-slot]', standalone: true })
export class DasarDatepickerExtraFooterSlot {}
@Directive({ selector: '[hint-slot]', standalone: true })
export class DasarDatepickerHintSlot {}

let nextDasarDatepickerId = 0;

@Component({
  selector: 'dasar-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DasarCalendarComponent,
    DasarIconComponent,
    DasarButtonComponent,
    DasarNumberInputComponent,
  ],
  templateUrl: './dasar-datepicker.html',
  styleUrls: ['./dasar-datepicker.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarDatepicker),
      multi: true,
    },
  ],
})
export class DasarDatepicker implements OnInit, ControlValueAccessor {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);

  @ContentChild(DasarDatepickerExtraHeaderSlot) extraHeaderSlot?: DasarDatepickerExtraHeaderSlot;
  @ContentChild(DasarDatepickerExtraFooterSlot) extraFooterSlot?: DasarDatepickerExtraFooterSlot;
  @ContentChild(DasarDatepickerExtraLabelSlot) extraLabelSlot?: DasarDatepickerExtraLabelSlot;
  @ContentChild(DasarDatepickerLabelSlot) labelSlot?: DasarDatepickerLabelSlot;
  @ContentChild(DasarDatepickerHintSlot) hintSlot?: DasarDatepickerHintSlot;
  @ContentChild(DasarDatepickerPrefixSlot) prefixSlot?: DasarDatepickerPrefixSlot;

  @ViewChild('triggerElement') triggerEl?: ElementRef<HTMLElement>;
  dropdownEl?: ElementRef<HTMLElement>;
  private dropdownOrigin: { parent: Node; nextSibling: Node | null } | null = null;
  private portalTokenProperties = new Set<string>();
  private originalPanelFontFamily: { value: string; priority: string } | null = null;
  private stopWatchingPanel: (() => void) | null = null;
  private readonly watchPanelCleanup = inject(DestroyRef).onDestroy(() => {
    this.stopWatchingPanel?.();
    this.restoreDropdown();
  });
  @ViewChild('dropdownElement')
  set dropdownElRef(ref: ElementRef<HTMLElement> | undefined) {
    this.stopWatchingPanel?.();
    this.stopWatchingPanel = null;
    if (!ref) this.restoreDropdown();
    this.dropdownEl = ref;
    if (ref) {
      this.portalDropdownIfNeeded(ref.nativeElement);
      this.stopWatchingPanel = watchPanel(ref.nativeElement, () => this.calculateSmartPlacement());
    }
  }

  @Input({ alias: 'display-format' }) displayFormat = resolveThemeDefault(
    'datepicker',
    'displayFormat',
    'DD-MM-YYYY',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'value-format' }) valueFormat = resolveThemeDefault(
    'datepicker',
    'valueFormat',
    'yyyy-MM-dd',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'show-seconds', transform: booleanAttribute }) showSeconds = resolveThemeDefault(
    'datepicker',
    'showSeconds',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'time-format' }) timeFormat: '12' | '24' = resolveThemeDefault(
    'datepicker',
    'timeFormat',
    '24',
    this.themeProvider,
    this.themeService,
  );
  @Input() locale = resolveThemeDefault(
    'datepicker',
    'locale',
    'en-US',
    this.themeProvider,
    this.themeService,
  );
  private _placement: DasarDatepickerPlacement = resolveThemeDefault(
    'datepicker',
    'placement',
    'bottom-start',
    this.themeProvider,
    this.themeService,
  );
  @Input()
  set placement(value: DasarDatepickerPlacement) {
    this._placement = value;
    this.currentPlacement = value;
  }
  get placement(): DasarDatepickerPlacement {
    return this._placement;
  }
  currentPlacement: DasarDatepickerPlacement = this._placement;
  @Input() appearance = resolveThemeDefault(
    'datepicker',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'datepicker',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() type = resolveThemeDefault(
    'datepicker',
    'type',
    'date',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'datepicker',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() placeholder = resolveThemeDefault(
    'datepicker',
    'placeholder',
    'Select date',
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault(
    'datepicker',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'extra-label' }) extraLabel = resolveThemeDefault(
    'datepicker',
    'extraLabel',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() hint = resolveThemeDefault(
    'datepicker',
    'hint',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'datepicker',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'wrapper-class' }) wrapperClass = resolveThemeDefault(
    'datepicker',
    'wrapperClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'trigger-class' }) triggerClass = resolveThemeDefault(
    'datepicker',
    'triggerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'dropdown-class' }) dropdownClass = resolveThemeDefault(
    'datepicker',
    'dropdownClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-wrapper-class' }) labelWrapperClass = resolveThemeDefault(
    'datepicker',
    'labelWrapperClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'datepicker',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'wrapper-style' }) wrapperStyle = resolveThemeDefault(
    'datepicker',
    'wrapperStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'trigger-style' }) triggerStyle = resolveThemeDefault(
    'datepicker',
    'triggerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'dropdown-style' }) dropdownStyle = resolveThemeDefault(
    'datepicker',
    'dropdownStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-wrapper-style' }) labelWrapperStyle = resolveThemeDefault(
    'datepicker',
    'labelWrapperStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-wrapper-class' }) hintWrapperClass = resolveThemeDefault(
    'datepicker',
    'hintWrapperClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-wrapper-style' }) hintWrapperStyle = resolveThemeDefault(
    'datepicker',
    'hintWrapperStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  readonly hintId = `dasar-datepicker-hint-${++nextDasarDatepickerId}`;
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'datepicker',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) clearable = resolveThemeDefault(
    'datepicker',
    'clearable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'datepicker',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'datepicker',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) range = resolveThemeDefault(
    'datepicker',
    'range',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error = resolveThemeDefault(
    'datepicker',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Output() valueChange = new EventEmitter<any>();
  @Output() onDateSelected = new EventEmitter<any>();
  @Output() onInitialized = new EventEmitter<void>();
  @Output() onClickIn = new EventEmitter<Event>();
  @Output() onClickOut = new EventEmitter<Event>();

  @Output() onNextMonthClick = new EventEmitter<void>();
  @Output() onPrevMonthClick = new EventEmitter<void>();
  @Output() onNextYearClick = new EventEmitter<void>();
  @Output() onPrevYearClick = new EventEmitter<void>();

  @Output() onCleared = new EventEmitter<void>();
  @Output() onCouched = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<Event | void>();
  @Output() onBlur = new EventEmitter<Event | void>();

  @HostBinding('class.dasar-datepicker') readonly baseClass = true;
  @HostBinding('class.full-width') get hasFullWidth(): boolean {
    return this.fullWidth;
  }
  @HostBinding('class.disabled') get isDisabled(): boolean {
    return this.disabled;
  }

  private _value: any = null;
  internalDate: Date | null = null;
  internalRange: DasarCalendarRange = [null, null];
  private _isOpen = false;
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(open: boolean) {
    if (!open) this.restoreDropdown();
    this._isOpen = open;
  }
  private isFocused: boolean = false;

  timeHours: number = 0;
  timeMinutes: number = 0;
  timeSeconds: number = 0;
  timeMeridiem: 'AM' | 'PM' = 'AM';

  @Input()
  get value(): any {
    return this._value;
  }
  set value(val: any) {
    if (!this.isSameValue(this._value, val)) {
      this._value = val ?? null;
      this.syncInternalDate();
      this.cdr.markForCheck();
    }
  }

  onTouched: any = () => {};
  onChange: any = () => {};

  ngOnInit() {
    this.syncInternalDate();
    this.onInitialized.emit();
  }

  get hasLabelRow(): boolean {
    return !!(this.label || this.labelSlot || this.extraLabel || this.extraLabelSlot);
  }
  get hasHintRow(): boolean {
    return !!(this.hint || this.hintSlot);
  }
  get hasValue(): boolean {
    if (this.range) return !!this.internalRange[0];
    if (this.type === 'time') {
      return this._value !== null && this._value !== undefined && this._value !== '';
    }
    return !!this.internalDate;
  }
  get displayText(): string {
    if (!this.hasValue) {
      return this.range && this.placeholder === 'Select date'
        ? 'Select date range'
        : this.placeholder;
    }
    if (!this.range) return this.formattedDisplay;
    const [start, end] = this.internalRange;
    return `${this.formatDisplayDate(start)} –${end ? ` ${this.formatDisplayDate(end)}` : ''}`;
  }
  private formatDisplayDate(date: Date | null): string {
    if (!date || isNaN(date.getTime())) return '';
    try {
      return safeFormat(date, this.displayFormat, this.locale);
    } catch {
      return date.toDateString();
    }
  }
  private isSameValue(a: any, b: any): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((item, index) => item === b[index]);
    }
    return a === b;
  }
  get formattedDisplay(): string {
    if (!this.internalDate || isNaN(this.internalDate.getTime())) return '';
    try {
      if (this.type === 'time') {
        return safeFormat(this.internalDate, this.timeValueFormat, this.locale);
      }
      const formatToUse = () => {
        if (this.type === 'datetime') {
          const timePart =
            this.timeFormat === '12'
              ? this.showSeconds
                ? 'h:mm:ss A'
                : 'h:mm A'
              : this.showSeconds
                ? 'HH:mm:ss'
                : 'HH:mm';
          return `${this.displayFormat} ${timePart}`;
        }
        return this.displayFormat;
      };
      return safeFormat(this.internalDate, formatToUse(), this.locale);
    } catch {
      return this.type === 'time'
        ? this.formatTimeFallback(this.internalDate)
        : this.internalDate.toDateString();
    }
  }

  writeValue(value: any): void {
    if (this.isSameValue(this._value, value)) return;
    this._value = value ?? null;
    this.syncInternalDate();
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
    this.cdr.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as Node | null;
    const clickedInsideHost = !!target && this.elementRef.nativeElement.contains(target);
    const clickedInsidePanel = !!target && !!this.dropdownEl?.nativeElement.contains(target);
    if (this.isOpen && !clickedInsideHost && !clickedInsidePanel) {
      this.isOpen = false;
      if (this.range) this.syncInternalDate();
      this.onClickOut.emit(event);
      this.setFocus(false, event);
    }
  }
  private syncInternalDate() {
    if (this.range) {
      this.internalDate = null;
      const [start, end] = Array.isArray(this._value) ? this._value : [null, null];
      this.internalRange = [start ? new Date(start) : null, end ? new Date(end) : null];
      return;
    }
    this.internalRange = [null, null];
    if (this.type === 'time') {
      const now = new Date();
      const parsed =
        this._value == null || this._value === '' ? null : this.parseTimeValue(this._value);
      this.timeHours = parsed?.hours ?? now.getHours();
      this.timeMinutes = parsed?.minutes ?? now.getMinutes();
      this.timeSeconds = parsed?.seconds ?? now.getSeconds();
      this.timeMeridiem = this.timeHours >= 12 ? 'PM' : 'AM';
      this.internalDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        this.timeHours,
        this.timeMinutes,
        this.timeSeconds,
        0,
      );
      return;
    }
    if (!this._value) {
      this.internalDate = null;
      return;
    }
    this.internalDate = new Date(this._value);
    if (!isNaN(this.internalDate.getTime())) {
      this.timeHours = this.internalDate.getHours();
      this.timeMinutes = this.internalDate.getMinutes();
      this.timeSeconds = this.internalDate.getSeconds();
      this.timeMeridiem = this.timeHours >= 12 ? 'PM' : 'AM';
    }
  }
  private setFocus(state: boolean, event?: Event) {
    if (this.disabled) return;
    if (state !== this.isFocused) {
      this.isFocused = state;
      if (state) {
        this.onFocus.emit(event);
      } else {
        this.onBlur.emit(event);
        this.onTouched();
        this.onCouched.emit();
      }
    }
  }
  get iconSize(): number {
    return fieldIconSize(this.size);
  }

  get displayHours(): number {
    if (this.timeFormat === '12') {
      return this.timeHours % 12 || 12;
    }
    return this.timeHours;
  }

  get showTimeSection(): boolean {
    return this.type === 'datetime' || this.type === 'time';
  }

  get showCalendar(): boolean {
    return this.type !== 'time';
  }

  get modalTitle(): string {
    if (this.type === 'time') return 'Select Time';
    if (this.type === 'datetime') return 'Select Date & Time';
    return 'Select Date';
  }

  private get timeValueFormat(): string {
    if (this.timeFormat === '12') return this.showSeconds ? 'h:mm:ss A' : 'h:mm A';
    return this.showSeconds ? 'HH:mm:ss' : 'HH:mm';
  }

  private parseTimeValue(value: any): { hours: number; minutes: number; seconds: number } | null {
    if (value instanceof Date && !isNaN(value.getTime())) {
      return {
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      };
    }
    const text = String(value).trim();
    const match = text.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
    if (match) {
      let hours = Number(match[1]);
      const minutes = Number(match[2]);
      const seconds = Number(match[3] ?? 0);
      const meridiem = match[4]?.toUpperCase();
      if (minutes > 59 || seconds > 59) return null;
      if (meridiem) {
        if (hours < 1 || hours > 12) return null;
        hours = (hours % 12) + (meridiem === 'PM' ? 12 : 0);
      }
      if (hours > 23) return null;
      return { hours, minutes, seconds };
    }
    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) return null;
    return {
      hours: parsedDate.getHours(),
      minutes: parsedDate.getMinutes(),
      seconds: parsedDate.getSeconds(),
    };
  }

  private formatTimeFallback(date: Date): string {
    const pad = (value: number) => String(value).padStart(2, '0');
    const hours = this.timeFormat === '12' ? date.getHours() % 12 || 12 : date.getHours();
    const time = `${this.timeFormat === '12' ? hours : pad(hours)}:${pad(date.getMinutes())}${
      this.showSeconds ? `:${pad(date.getSeconds())}` : ''
    }`;
    return this.timeFormat === '12' ? `${time} ${date.getHours() >= 12 ? 'PM' : 'AM'}` : time;
  }

  get showSecondsSection(): boolean {
    return this.showSeconds;
  }

  get showMeridiemToggle(): boolean {
    return this.timeFormat === '12';
  }

  onHoursChange(value: number | null): void {
    if (value === null) return;
    if (this.timeFormat === '12') {
      const normalizedValue = value === 0 ? 12 : value;
      const clampedDisplay = Math.min(12, Math.max(1, normalizedValue));
      if (this.timeMeridiem === 'AM') {
        this.timeHours = clampedDisplay === 12 ? 0 : clampedDisplay;
      } else {
        this.timeHours = clampedDisplay === 12 ? 12 : clampedDisplay + 12;
      }
    } else {
      this.timeHours = Math.min(23, Math.max(0, value));
      this.timeMeridiem = this.timeHours >= 12 ? 'PM' : 'AM';
    }
    this.mergeTimeIntoInternalDate();
    this.cdr.markForCheck();
  }

  onMinutesChange(value: number | null): void {
    if (value === null) return;
    this.timeMinutes = Math.min(59, Math.max(0, value));
    this.mergeTimeIntoInternalDate();
    this.cdr.markForCheck();
  }

  onSecondsChange(value: number | null): void {
    if (value === null) return;
    this.timeSeconds = Math.min(59, Math.max(0, value));
    this.mergeTimeIntoInternalDate();
    this.cdr.markForCheck();
  }

  onMeridiemToggle(value: 'AM' | 'PM'): void {
    if (value === this.timeMeridiem) return;
    if (value === 'PM' && this.timeHours < 12) {
      this.timeHours += 12;
    } else if (value === 'AM' && this.timeHours >= 12) {
      this.timeHours -= 12;
    }
    this.timeMeridiem = value;
    this.mergeTimeIntoInternalDate();
    this.cdr.markForCheck();
  }

  confirmDateTime(): void {
    this.mergeTimeIntoInternalDate();
    if (this.internalDate) {
      const returnValue = this.formatReturnValue(this.internalDate);
      this._value = returnValue;
      this.onChange(returnValue);
      this.valueChange.emit(returnValue);
      this.onDateSelected.emit(returnValue);
    }
    this.isOpen = false;
    this.setFocus(false);
    this.cdr.detectChanges();
  }

  selectToday(): void {
    const now = new Date();
    if (this.type === 'time') {
      this.timeHours = now.getHours();
      this.timeMinutes = now.getMinutes();
      this.timeSeconds = now.getSeconds();
      this.timeMeridiem = this.timeHours >= 12 ? 'PM' : 'AM';
    }
    this.internalDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      this.timeHours,
      this.timeMinutes,
      this.timeSeconds,
      0,
    );
    this.cdr.markForCheck();
  }

  mergeTimeIntoInternalDate(): void {
    if (!this.internalDate && this.type !== 'time') return;
    const updated = this.internalDate ? new Date(this.internalDate.getTime()) : new Date();
    updated.setHours(this.timeHours, this.timeMinutes, this.timeSeconds, 0);
    this.internalDate = updated;
  }

  toggleDropdown(event: Event) {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.onClickIn.emit(event);
      this.setFocus(true, event);
      this.currentPlacement = this.placement;
    } else {
      if (this.range) this.syncInternalDate();
      this.onClickOut.emit(event);
      this.setFocus(false, event);
    }
  }
  private viewportListener = listenViewportChanges(() => {
    if (this.isOpen) this.calculateSmartPlacement();
  }, inject(DestroyRef));
  clearValue(event: Event) {
    event.stopPropagation();
    if (this.disabled) return;
    this._value = null;
    this.internalDate = null;
    this.internalRange = [null, null];
    this.onChange(null);
    this.valueChange.emit(null);
    this.onCleared.emit();
    this.setFocus(true, event);
    this.cdr.markForCheck();
  }
  onRangeSelect(range: DasarCalendarRange) {
    this.internalRange = range;
    const [start, end] = range;
    if (!start || !end) return;

    const returnValue = [this.formatReturnValue(start), this.formatReturnValue(end)];
    this._value = returnValue;

    this.onChange(returnValue);
    this.valueChange.emit(returnValue);
    this.onDateSelected.emit(returnValue);

    this.isOpen = false;
    this.setFocus(false);
    this.cdr.detectChanges();
  }
  onCalendarSelect(date: Date | null) {
    if (!date) return;
    if (this.type === 'datetime') {
      const merged = new Date(date.getTime());
      merged.setHours(this.timeHours, this.timeMinutes, this.timeSeconds, 0);
      this.internalDate = merged;
      const returnValue = this.formatReturnValue(merged);
      this._value = returnValue;
      this.onDateSelected.emit(returnValue);
    } else {
      this.internalDate = date;

      const returnValue = this.formatReturnValue(date);
      this._value = returnValue;

      this.onChange(returnValue);
      this.valueChange.emit(returnValue);
      this.onDateSelected.emit(returnValue);

      if (this.type === 'date') {
        this.isOpen = false;
        this.setFocus(false);
      }
    }
    this.cdr.detectChanges();
  }
  private formatReturnValue(date: Date): any {
    if (this.type === 'time') {
      try {
        return safeFormat(date, this.timeValueFormat, this.locale);
      } catch {
        return this.formatTimeFallback(date);
      }
    }
    if (!this.valueFormat) return date;
    if (this.valueFormat === 'timestamp') return date.getTime();
    if (this.valueFormat === 'iso') return date.toISOString();
    try {
      return safeFormat(date, this.valueFormat, this.locale);
    } catch {
      return date;
    }
  }
  private calculateSmartPlacement() {
    if (!this.triggerEl?.nativeElement || !this.dropdownEl?.nativeElement) return;
    const newPlacement = computeSmartPlacement(
      this.triggerEl.nativeElement,
      this.dropdownEl.nativeElement,
      this.placement,
    );
    if (this.currentPlacement !== newPlacement) {
      this.currentPlacement = newPlacement;
      this.cdr.detectChanges();
    }
    applyFixedPanelPosition(
      this.triggerEl.nativeElement,
      this.dropdownEl.nativeElement,
      newPlacement,
      { offset: 4 },
    );
  }

  private portalDropdownIfNeeded(panel: HTMLElement): void {
    const trigger =
      this.triggerEl?.nativeElement ??
      (this.elementRef.nativeElement.querySelector(
        '.dasar-datepicker-wrapper',
      ) as HTMLElement | null);
    if (!trigger || typeof document === 'undefined' || !document.body) return;

    let parent: HTMLElement | null = trigger;
    let needsPortal = false;
    while (parent && parent !== document.body) {
      const style = getComputedStyle(parent);
      const clipsOverflow = /(hidden|auto|scroll|clip)/.test(
        style.overflow + style.overflowX + style.overflowY,
      );
      const establishesFixedContainingBlock =
        (style.transform !== 'none' && !!style.transform) ||
        (style.filter !== 'none' && !!style.filter) ||
        (style.perspective !== 'none' && !!style.perspective) ||
        /(layout|paint|strict|content)/.test(style.contain) ||
        /(transform|filter|perspective)/.test(style.willChange);
      if (clipsOverflow || establishesFixedContainingBlock) {
        needsPortal = true;
        break;
      }
      parent = parent.parentElement;
    }

    if (!needsPortal || !panel.parentNode) return;
    this.dropdownOrigin = { parent: panel.parentNode, nextSibling: panel.nextSibling };
    this.originalPanelFontFamily = {
      value: panel.style.getPropertyValue('font-family'),
      priority: panel.style.getPropertyPriority('font-family'),
    };
    panel.style.fontFamily = getComputedStyle(trigger).fontFamily;
    this.inheritThemeProperties(trigger, panel);
    document.body.appendChild(panel);
  }

  private inheritThemeProperties(source: HTMLElement, panel: HTMLElement): void {
    const ancestors: HTMLElement[] = [];
    const originalProperties = new Set<string>();
    for (let index = 0; index < panel.style.length; index++) {
      originalProperties.add(panel.style.item(index));
    }
    for (let element: HTMLElement | null = source; element; element = element.parentElement) {
      ancestors.push(element);
    }
    for (const element of ancestors.reverse()) {
      const computed = getComputedStyle(element);
      for (let index = 0; index < computed.length; index++) {
        const property = computed.item(index);
        if (!property.startsWith('--') || originalProperties.has(property)) continue;
        const value = computed.getPropertyValue(property);
        if (value) {
          panel.style.setProperty(property, value);
          this.portalTokenProperties.add(property);
        }
      }
    }
  }

  private restoreDropdown(): void {
    const panel = this.dropdownEl?.nativeElement;
    const origin = this.dropdownOrigin;
    if (panel && origin) {
      if (origin.nextSibling?.parentNode === origin.parent) {
        origin.parent.insertBefore(panel, origin.nextSibling);
      } else {
        origin.parent.appendChild(panel);
      }
    }
    if (panel) {
      for (const property of this.portalTokenProperties) panel.style.removeProperty(property);
      if (this.originalPanelFontFamily?.value) {
        panel.style.setProperty(
          'font-family',
          this.originalPanelFontFamily.value,
          this.originalPanelFontFamily.priority,
        );
      } else {
        panel.style.removeProperty('font-family');
      }
    }
    this.portalTokenProperties.clear();
    this.originalPanelFontFamily = null;
    this.dropdownOrigin = null;
  }
}

export const DasarDatepickerComponent = [
  DasarDatepicker,
  DasarDatepickerHintSlot,
  DasarDatepickerLabelSlot,
  DasarDatepickerExtraLabelSlot,
  DasarDatepickerExtraHeaderSlot,
  DasarDatepickerExtraFooterSlot,
  DasarDatepickerPrefixSlot,
] as const;
