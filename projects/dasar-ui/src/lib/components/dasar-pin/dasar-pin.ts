import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  inject,
  Input,
  numberAttribute,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpInputOtp, NgpInputOtpInput, NgpInputOtpSlot } from 'ng-primitives/input-otp';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../../services/theme.service';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';

export type DasarPinSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarPinAppearanceType = 'outline' | 'filled' | 'elevated';
export type DasarPinInputModeType =
  'numeric' | 'text' | 'decimal' | 'tel' | 'search' | 'email' | 'url';

export interface DasarPinConfig {
  value?: string;
  length?: number;
  appearance?: DasarPinAppearanceType;
  size?: DasarPinSizeType;
  radius?: ScaleAttributeType;
  disabled?: boolean;
  error?: boolean;
  pattern?: string;
  placeholder?: string;
  inputMode?: DasarPinInputModeType;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  hostClass?: ClassType;
  hostStyle?: StyleType;
}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarPin),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, NgpInputOtp, NgpInputOtpInput, NgpInputOtpSlot],
  templateUrl: './dasar-pin.html',
  styleUrls: ['./dasar-pin.scss'],
  selector: 'dasar-pin',
  standalone: true,
})
export class DasarPin implements ControlValueAccessor, AfterViewInit {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(NgpInputOtp) private ngpInputOtp?: NgpInputOtp;

  private _value: string = resolveThemeDefault(
    'pin',
    'value',
    '',
    this.themeProvider,
    this.themeService,
  );

  @Input()
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    const str = val !== null && val !== undefined ? String(val) : '';
    this._value = str;
    (this.ngpInputOtp as any)?.state?.updateValue(str);
    this.cdr.markForCheck();
  }

  @Input({ transform: numberAttribute }) length: number = resolveThemeDefault(
    'pin',
    'length',
    6,
    this.themeProvider,
    this.themeService,
  );

  @Input() appearance: DasarPinAppearanceType = resolveThemeDefault(
    'pin',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );

  @Input() size: DasarPinSizeType = resolveThemeDefault(
    'pin',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() radius: ScaleAttributeType = resolveThemeDefault(
    'pin',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) disabled: boolean = resolveThemeDefault(
    'pin',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) error: boolean = resolveThemeDefault(
    'pin',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input() pattern: string = resolveThemeDefault(
    'pin',
    'pattern',
    '[0-9]',
    this.themeProvider,
    this.themeService,
  );

  @Input() placeholder: string = resolveThemeDefault(
    'pin',
    'placeholder',
    '',
    this.themeProvider,
    this.themeService,
  );

  @Input() inputMode: DasarPinInputModeType = resolveThemeDefault(
    'pin',
    'inputMode',
    'numeric',
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'container-class' }) containerClass: ClassType = resolveThemeDefault(
    'pin',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'container-style' }) containerStyle: StyleType = resolveThemeDefault(
    'pin',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'host-class' }) hostClass: ClassType = resolveThemeDefault(
    'pin',
    'hostClass',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'host-style' }) hostStyle: StyleType = resolveThemeDefault(
    'pin',
    'hostStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Output() valueChange = new EventEmitter<string>();
  @Output() complete = new EventEmitter<string>();

  @HostBinding('class.dasar-pin') readonly baseClass = true;

  @HostBinding('class')
  get hostClasses(): string {
    const extra = parseClassesToArray(this.hostClass);
    return ['dasar-pin', ...extra].filter(Boolean).join(' ');
  }

  @HostBinding('style')
  get hostStyles(): StyleType {
    return this.hostStyle;
  }

  get slots(): number[] {
    const count = Number.isInteger(this.length) && this.length > 0 ? this.length : 6;
    return Array.from({ length: count }, (_, i) => i);
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    if (this._value) {
      (this.ngpInputOtp as any)?.state?.updateValue(this._value);
    }
  }

  onPrimitiveValueChange(val: string): void {
    if (this._value === val) return;
    this._value = val;
    this.onChange(val);
    this.valueChange.emit(val);
    this.cdr.markForCheck();
  }

  onPrimitiveComplete(val: string): void {
    this.complete.emit(val);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(val: any): void {
    const str = val !== null && val !== undefined ? String(val) : '';
    this._value = str;
    (this.ngpInputOtp as any)?.state?.updateValue(str);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}

export const DasarPinComponent = [DasarPin] as const;
