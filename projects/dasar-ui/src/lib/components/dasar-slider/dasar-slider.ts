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
import { NgpSlider, NgpSliderRange, NgpSliderThumb, NgpSliderTrack } from 'ng-primitives/slider';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../../services/theme.service';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { resolveThemeDefault } from '../../utils/common';

export type DasarSliderSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarSliderAppearanceType = 'outline' | 'filled' | 'elevated';

export interface DasarSliderConfig {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: DasarSliderSizeType;
  appearance?: DasarSliderAppearanceType;
  label?: string;
  hint?: string;
  error?: boolean;
  fullWidth?: boolean;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  trackClass?: ClassType;
  trackStyle?: StyleType;
  thumbClass?: ClassType;
  thumbStyle?: StyleType;
}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarSlider),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, NgpSlider, NgpSliderTrack, NgpSliderRange, NgpSliderThumb],
  templateUrl: './dasar-slider.html',
  styleUrls: ['./dasar-slider.scss'],
  selector: 'dasar-slider',
  standalone: true,
})
export class DasarSlider implements ControlValueAccessor, AfterViewInit {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(NgpSlider) private ngpSlider?: NgpSlider;

  private _value: number = resolveThemeDefault(
    'slider',
    'value',
    0,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: numberAttribute })
  get value(): number {
    return this._value;
  }
  set value(val: number) {
    const num = Number.isFinite(val) ? val : 0;
    this._value = num;
    (this.ngpSlider as any)?.state?.setValue(num, { emit: false });
    this.cdr.markForCheck();
  }

  @Input({ transform: numberAttribute }) min: number = resolveThemeDefault(
    'slider',
    'min',
    0,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: numberAttribute }) max: number = resolveThemeDefault(
    'slider',
    'max',
    100,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: numberAttribute }) step: number = resolveThemeDefault(
    'slider',
    'step',
    1,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled: boolean = resolveThemeDefault(
    'slider',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() size: DasarSliderSizeType = resolveThemeDefault(
    'slider',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() appearance: DasarSliderAppearanceType = resolveThemeDefault(
    'slider',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input() label?: string = resolveThemeDefault(
    'slider',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() hint: string = resolveThemeDefault(
    'slider',
    'hint',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error: boolean = resolveThemeDefault(
    'slider',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fullWidth: boolean = resolveThemeDefault(
    'slider',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() containerClass: ClassType = resolveThemeDefault(
    'slider',
    'containerClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() containerStyle: StyleType = resolveThemeDefault(
    'slider',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() trackClass: ClassType = resolveThemeDefault(
    'slider',
    'trackClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() trackStyle: StyleType = resolveThemeDefault(
    'slider',
    'trackStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() thumbClass: ClassType = resolveThemeDefault(
    'slider',
    'thumbClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() thumbStyle: StyleType = resolveThemeDefault(
    'slider',
    'thumbStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Output() valueChange = new EventEmitter<number>();

  @HostBinding('class.dasar-slider') readonly baseClass = true;

  @HostBinding('class.full-width')
  get hasFullWidth(): boolean {
    return this.fullWidth;
  }

  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    (this.ngpSlider as any)?.state?.setValue(this._value, { emit: false });
    if (this.disabled) {
      (this.ngpSlider as any)?.state?.setDisabled(true);
    }
  }

  onPrimitiveValueChange(val: number): void {
    if (this._value === val) return;
    this._value = val;
    this.onChange(val);
    this.valueChange.emit(val);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(val: any): void {
    const num = val !== null && val !== undefined && Number.isFinite(Number(val)) ? Number(val) : 0;
    this._value = num;
    (this.ngpSlider as any)?.state?.setValue(num, { emit: false });
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
    (this.ngpSlider as any)?.state?.setDisabled(isDisabled);
    this.cdr.markForCheck();
  }
}

export const DasarSliderComponent = [DasarSlider] as const;
