import {
  booleanAttribute,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ContentChild,
  Directive,
  HostBinding,
  forwardRef,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { DasarButton } from '../dasar-button/dasar-button';
import { resolveThemeDefault } from '../../utils/common';
import { DasarIcon } from '../dasar-icon/dasar-icon';

export type DasarNumberInputSize = Extract<ScaleAttributeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
export type DasarNumberInputAppearanceType = 'outline' | 'filled';
export type DasarNumberInputRadiusType = ScaleAttributeType;

export interface DasarNumberInputConfig {
  appearance?: DasarNumberInputAppearanceType;
  radius?: DasarNumberInputRadiusType;
  size?: DasarNumberInputSize;
  label?: string;
  labelRight?: string;
  placeholder?: string;
  hint?: string;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  containerClass?: ClassType;
  inputClass?: ClassType;
  hostClass?: ClassType;
  hintClass?: ClassType;
  containerStyle?: StyleType;
  inputStyle?: StyleType;
  hintStyle?: StyleType;
  hideOverflow?: boolean;
}

@Directive({ selector: '[extra-label-slot]', standalone: true })
export class DasarNumberInputExtraLabelSlot {}
@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarNumberInputPrefixSlot {}
@Directive({ selector: '[decrement-slot]', standalone: true })
export class DasarNumberInputDecrementSlot {}
@Directive({ selector: '[increment-slot]', standalone: true })
export class DasarNumberInputIncrementSlot {}

@Component({
  providers: [
    {
      useExisting: forwardRef(() => DasarNumberInput),
      provide: NG_VALUE_ACCESSOR,
      multi: true,
    },
  ],
  imports: [CommonModule, FormsModule, DasarIcon, DasarButton],
  templateUrl: './dasar-number-input.html',
  styleUrls: ['./dasar-number-input.scss'],
  encapsulation: ViewEncapsulation.None,
  selector: 'dasar-number-input',
  standalone: true,
})
export class DasarNumberInput implements ControlValueAccessor {
  @ContentChild(DasarNumberInputExtraLabelSlot)
  providedExtraLabelSlot?: DasarNumberInputExtraLabelSlot;
  @ContentChild(DasarNumberInputDecrementSlot) providedDecrement?: DasarNumberInputDecrementSlot;
  @ContentChild(DasarNumberInputIncrementSlot) providedIncrement?: DasarNumberInputIncrementSlot;
  @ContentChild(DasarNumberInputPrefixSlot) providedPrefix?: DasarNumberInputPrefixSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);

  @Input() appearance = resolveThemeDefault(
    'numberInput',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'numberInput',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'numberInput',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault(
    'numberInput',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() labelRight = resolveThemeDefault(
    'numberInput',
    'labelRight',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() placeholder = resolveThemeDefault(
    'numberInput',
    'placeholder',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() hint = resolveThemeDefault(
    'numberInput',
    'hint',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() step = resolveThemeDefault(
    'numberInput',
    'step',
    1,
    this.themeProvider,
    this.themeService,
  );
  @Input() min = resolveThemeDefault(
    'numberInput',
    'min',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() max = resolveThemeDefault(
    'numberInput',
    'max',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'numberInput',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute, alias: 'full-width' }) fullWidth = resolveThemeDefault(
    'numberInput',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error = resolveThemeDefault(
    'numberInput',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input('container-class') containerClass = resolveThemeDefault(
    'numberInput',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input('input-class') inputClass = resolveThemeDefault(
    'numberInput',
    'inputClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input('host-class') hostClass = resolveThemeDefault(
    'numberInput',
    'hostClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input('hint-class') hintClass = resolveThemeDefault(
    'numberInput',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input('container-style') containerStyle = resolveThemeDefault(
    'numberInput',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input('input-style') inputStyle = resolveThemeDefault(
    'numberInput',
    'inputStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input('hint-style') hintStyle = resolveThemeDefault(
    'numberInput',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hide-overflow', transform: booleanAttribute }) hideOverflow =
    resolveThemeDefault('card', 'hideOverflow', false, this.themeProvider, this.themeService);

  @Output() valueChange = new EventEmitter<number | null>();
  @Output() onIncrementClick = new EventEmitter<number>();
  @Output() onDecrementClick = new EventEmitter<number>();
  @Output() onInputFocus = new EventEmitter<FocusEvent>();
  @Output() onInputBlur = new EventEmitter<FocusEvent>();
  @Output() onInputChange = new EventEmitter<Event>();

  @HostBinding('class.dasar-number-input') readonly baseClass = true;
  @HostBinding('class.full-width') get hasFullWidth(): boolean {
    return this.fullWidth;
  }
  @HostBinding('class.disabled') get isDisabled(): boolean {
    return this.disabled;
  }

  private _value: number | null = null;
  @Input()
  get value(): number | null {
    return this._value;
  }
  set value(val: number | null) {
    if (this._value !== val) {
      this._value = val;
      this.cdr.markForCheck();
    }
  }
  onTouched: any = () => {};
  onChange: any = () => {};

  get hasDecrementSlot(): boolean {
    return !!this.providedDecrement;
  }
  get hasIncrementSlot(): boolean {
    return !!this.providedIncrement;
  }
  get hasExtraLabelSlot(): boolean {
    return !!this.providedExtraLabelSlot;
  }
  get hasPrefixSlot(): boolean {
    return !!this.providedPrefix;
  }

  writeValue(value: any): void {
    const parsedValue =
      value === null || value === undefined || value === '' ? null : Number(value);
    this._value = parsedValue;
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
  onDecrement(event: MouseEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    const currentValue = this.value ?? 0;
    const newValue = currentValue - this.step;
    if (this.min === undefined || newValue >= this.min) {
      this.updateValue(newValue);
      this.onDecrementClick.emit(newValue);
    }
  }
  onIncrement(event: MouseEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    const currentValue = this.value ?? 0;
    const newValue = currentValue + this.step;
    if (this.max === undefined || newValue <= this.max) {
      this.updateValue(newValue);
      this.onIncrementClick.emit(newValue);
    }
  }
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = inputElement.value === '' ? null : Number(inputElement.value);
    this.updateValue(parsedValue);
    this.onInputChange.emit(event);
  }
  onFocus(event: FocusEvent): void {
    this.onInputFocus.emit(event);
  }
  onBlur(event: FocusEvent): void {
    this.onTouched();
    this.onInputBlur.emit(event);
  }
  private updateValue(newValue: number | null): void {
    if (this._value !== newValue) {
      this._value = newValue;
      this.onChange(newValue);
      this.valueChange.emit(newValue);
      this.cdr.markForCheck();
    }
  }
}
export const DasarNumberInputComponent = [
  DasarNumberInputDecrementSlot,
  DasarNumberInputIncrementSlot,
  DasarNumberInputPrefixSlot,
  DasarNumberInput,
] as const;
