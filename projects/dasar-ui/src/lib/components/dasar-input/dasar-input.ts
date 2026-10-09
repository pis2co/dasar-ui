import {
  booleanAttribute,
  Component,
  HostBinding,
  Input,
  forwardRef,
  ViewEncapsulation,
  TemplateRef,
  EventEmitter,
  Output,
  inject,
  ChangeDetectorRef,
  Directive,
  ContentChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';

export type DasarInputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'url' | 'tel';
export type DasarInputMaskType = 'thousand' | 'date' | 'decimal' | ((val: string) => string);
export type DasarInputSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarInputAppearanceType = 'outline' | 'filled';
export type DasarInputRadiusType = ScaleAttributeType;

export interface DasarInputConfig {
  appearance?: DasarInputAppearanceType;
  labelRight?: string;
  radius?: DasarInputRadiusType;
  size?: DasarInputSizeType;
  type?: DasarInputType;
  mask?: DasarInputMaskType;
  hint?: string;
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  fluid?: boolean;
  error?: boolean;
  containerClass?: ClassType;
  inputClass?: ClassType;
  hostClass?: ClassType;
  hintClass?: ClassType;
  containerStyle?: StyleType;
  inputStyle?: StyleType;
  hostStyle?: StyleType;
  hintStyle?: StyleType;
  hideOverflow?: boolean;
}

@Directive({ selector: '[extra-label-slot]', standalone: true })
export class DasarInputExtraLabelSlot {}
@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarInputPrefixSlot {}
@Directive({ selector: '[suffix-slot]', standalone: true })
export class DasarInputSuffixSlot {}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarInput),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  templateUrl: './dasar-input.html',
  styleUrls: ['./dasar-input.scss'],
  selector: 'dasar-input',
  standalone: true,
})
export class DasarInput implements ControlValueAccessor {
  @ContentChild(DasarInputExtraLabelSlot) extraLabelSlot?: DasarInputExtraLabelSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);

  @Input() appearance: DasarInputAppearanceType = resolveThemeDefault(
    'input',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-right' }) labelRight = resolveThemeDefault(
    'input',
    'labelRight',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'input',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault('input', 'size', 'md', this.themeProvider, this.themeService);
  @Input() type = resolveThemeDefault(
    'input',
    'type',
    'text',
    this.themeProvider,
    this.themeService,
  );
  @Input() mask = resolveThemeDefault(
    'input',
    'mask',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() hint = resolveThemeDefault('input', 'hint', '', this.themeProvider, this.themeService);
  @Input() placeholder = resolveThemeDefault(
    'input',
    'placeholder',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault(
    'input',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'input',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'input',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) readonly = resolveThemeDefault(
    'input',
    'readonly',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'input',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error = resolveThemeDefault(
    'input',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'input',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'input-class' }) inputClass = resolveThemeDefault(
    'input',
    'inputClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'host-class' }) hostClass = resolveThemeDefault(
    'input',
    'hostClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-class' }) hintClass = resolveThemeDefault(
    'input',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'input',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'input-style' }) inputStyle = resolveThemeDefault(
    'input',
    'inputStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'host-style' }) hostStyle = resolveThemeDefault(
    'input',
    'hostStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-style' }) hintStyle = resolveThemeDefault(
    'input',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hide-overflow', transform: booleanAttribute }) hideOverflow =
    resolveThemeDefault('card', 'hideOverflow', false, this.themeProvider, this.themeService);

  onTouched: any = () => {};
  onChange: any = () => {};
  private _value: any = '';

  @Input()
  get value(): any {
    return this._value;
  }
  set value(val: any) {
    if (this._value !== val) {
      this._value = val ?? '';
      this.cdr.markForCheck();
    }
  }
  @Output() valueChange = new EventEmitter<any>();

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-input'];
    if (this.fullWidth) classes.push('full-width');
    if (this.disabled) classes.push('disabled');
    return classes.join(' ');
  }

  private formatValue(val: string): string {
    if (!this.mask || val === null || val === undefined) {
      return val;
    }
    const stringVal = String(val);
    if (typeof this.mask === 'function') {
      return this.mask(stringVal);
    }
    if (this.mask === 'thousand') {
      const digits = stringVal.replace(/\D/g, '');
      return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    if (this.mask === 'decimal') {
      let clean = stringVal.replace(/[^0-9,]/g, '');
      const parts = clean.split(',');
      let integerPart = parts[0];
      let decimalPart = parts.length > 1 ? ',' + parts[1].substring(0, 5) : '';
      if (integerPart) {
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      return integerPart + decimalPart;
    }
    if (this.mask === 'date') {
      const digits = stringVal.replace(/\D/g, '').substring(0, 8);
      if (digits.length >= 5) {
        return `${digits.substring(0, 2)}/${digits.substring(2, 4)}/${digits.substring(4)}`;
      } else if (digits.length >= 3) {
        return `${digits.substring(0, 2)}/${digits.substring(2)}`;
      }
      return digits;
    }
    return stringVal;
  }
  writeValue(value: any): void {
    // this.value = value ?? '';
    const rawString = value !== null && value !== undefined ? String(value) : '';
    this._value = this.formatValue(rawString);
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
  }
  onInput(event: Event): void {
    // const val = (event.target as HTMLInputElement).value;
    // this.value = val;
    // this.onChange(val);
    const inputEl = event.target as HTMLInputElement;
    const formattedVal = this.formatValue(inputEl.value);
    inputEl.value = formattedVal;
    this._value = formattedVal;
    this.onChange(formattedVal);
    this.valueChange.emit(formattedVal);
  }
  onBlur(): void {
    this.onTouched();
  }
}

export const DasarInputComponent = [
  DasarInput,
  DasarInputExtraLabelSlot,
  DasarInputPrefixSlot,
  DasarInputSuffixSlot,
] as const;
