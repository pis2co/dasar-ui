import {
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
import { DasarCalendarComponent } from '../dasar-calendar/dasar-calendar';
import { resolveThemeDefault, safeFormat } from '../../utils/common';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { CommonModule } from '@angular/common';

export type DasarDatepickerPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
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
  @ViewChild('dropdownElement') dropdownEl?: ElementRef<HTMLElement>;

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
  @Input() placement = resolveThemeDefault(
    'datepicker',
    'placement',
    'bottom-start',
    this.themeProvider,
    this.themeService,
  );
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
  @Input({ alias: 'hint-wrapper-class' }) hintWrapperClass = resolveThemeDefault(
    'datepicker',
    'hintWrapperClass',
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
  @Input({ alias: 'hint-wrapper-style' }) hintWrapperStyle = resolveThemeDefault(
    'datepicker',
    'hintWrapperStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
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
  isOpen: boolean = false;
  private isFocused: boolean = false;

  @Input()
  get value(): any {
    return this._value;
  }
  set value(val: any) {
    if (this._value !== val) {
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
  get formattedDisplay(): string {
    if (!this.internalDate || isNaN(this.internalDate.getTime())) return '';
    try {
      const formatToUse = () => {
        // return this.type === 'datetime' ? `${this.displayFormat} HH:mm` : this.displayFormat;
        return this.displayFormat;
      };
      return safeFormat(this.internalDate, formatToUse(), this.locale);
    } catch {
      return this.internalDate.toDateString();
    }
  }

  // Control Value Accessor
  writeValue(value: any): void {
    if (this._value === value) return;
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

  // Date Processing
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.onClickOut.emit(event);
      this.setFocus(false, event); // Emits blur and touched automatically
    }
  }
  private syncInternalDate() {
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
        this.onTouched.emit();
      }
    }
  }
  toggleDropdown(event: Event) {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.onClickIn.emit(event);
      this.setFocus(true, event);
      // Reset to user requested placement first
      this.placement = this.placement;
      setTimeout(() => this.calculateSmartPlacement(), 0);
    } else {
      this.onClickOut.emit(event);
      this.setFocus(false, event);
    }
  }
  clearValue(event: Event) {
    event.stopPropagation();
    if (this.disabled) return;
    this._value = null;
    this.internalDate = null;
    this.onChange(null);
    this.valueChange.emit(null);
    this.onCleared.emit();
    this.setFocus(true, event); // Keep focused after clear
    this.cdr.markForCheck();
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
    const triggerRect = this.triggerEl.nativeElement.getBoundingClientRect();
    const dropdownRect = this.dropdownEl.nativeElement.getBoundingClientRect();
    // Calculate available space in the browser window
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    // 16px safety margin so it doesn't touch the exact edge of the screen
    const requiredSpace = dropdownRect.height + 16;
    let newPlacement = this.placement;
    if (
      newPlacement.startsWith('bottom') &&
      spaceBelow < requiredSpace &&
      spaceAbove > requiredSpace
    ) {
      newPlacement = newPlacement.replace('bottom', 'top') as DasarDatepickerPlacement;
    } else if (
      newPlacement.startsWith('top') &&
      spaceAbove < requiredSpace &&
      spaceBelow > requiredSpace
    ) {
      newPlacement = newPlacement.replace('top', 'bottom') as DasarDatepickerPlacement;
    }
    if (this.placement !== newPlacement) {
      this.placement = newPlacement;
      this.cdr.detectChanges();
    }
  }
}

export const DasarDatepickerComponent = [
  DasarDatepicker,
  DasarDatepickerLabelSlot,
  DasarDatepickerExtraLabelSlot,
  DasarDatepickerExtraHeaderSlot,
  DasarDatepickerExtraFooterSlot,
  DasarDatepickerHintSlot,
  DasarDatepickerPrefixSlot,
] as const;
