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
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarCalendarComponent, DasarCalendarRange } from '../dasar-calendar/dasar-calendar';
import { resolveThemeDefault, safeFormat } from '../../utils/common';
import {
  applyFixedPanelPosition,
  computeSmartPlacement,
  DasarPanelPlacement,
  listenViewportChanges,
  watchPanel,
} from '../../utils/panel-placement';
import { fieldIconSize } from '../../utils/icon-size';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { CommonModule } from '@angular/common';

export type DasarDatepickerPlacement = DasarPanelPlacement;
export type DasarDatepickerSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarDatepickerAppearance = 'outline' | 'filled' | 'subtle';
export type DasarDatepickerRadius = ScaleAttributeType;
export type DasarDatepickerType = 'date';

export interface DasarDatepickerConfig {
  fullWidth?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  fluid?: boolean;
  error?: boolean;
  range?: boolean;
  displayFormat?: string;
  valueFormat?: string;
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
  private stopWatchingPanel: (() => void) | null = null;
  private readonly watchPanelCleanup = inject(DestroyRef).onDestroy(() =>
    this.stopWatchingPanel?.(),
  );
  @ViewChild('dropdownElement')
  set dropdownElRef(ref: ElementRef<HTMLElement> | undefined) {
    this.stopWatchingPanel?.();
    this.stopWatchingPanel = null;
    this.dropdownEl = ref;
    if (ref)
      this.stopWatchingPanel = watchPanel(ref.nativeElement, () => this.calculateSmartPlacement());
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
  isOpen: boolean = false;
  private isFocused: boolean = false;

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
    return this.range ? !!this.internalRange[0] : !!this.internalDate;
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
      const formatToUse = () => {
        return this.displayFormat;
      };
      return safeFormat(this.internalDate, formatToUse(), this.locale);
    } catch {
      return this.internalDate.toDateString();
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
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
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
    if (!this._value) {
      this.internalDate = null;
      return;
    }
    this.internalDate = new Date(this._value);
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
    this.cdr.detectChanges();
  }
  private formatReturnValue(date: Date): any {
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
