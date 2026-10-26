import {
  ViewEncapsulation,
  booleanAttribute,
  HostBinding,
  EventEmitter,
  Component,
  forwardRef,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DasarThemeService } from '../../services/theme.service';
import { isEqualValue } from '../dasar-checkbox/dasar-checkbox';
import { CommonModule } from '@angular/common';

let nextDasarRadioId = 0;

export type DasarRadioSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;

export interface DasarRadioGroupState {
  checked: boolean;
  disabled: boolean;
  error?: boolean;
  size?: DasarRadioSizeType | null;
  name: string;
}

export interface DasarRadioConfig {
  size?: DasarRadioSizeType;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  circleClass?: ClassType;
  circleStyle?: StyleType;
  labelClass?: ClassType;
  labelStyle?: StyleType;
  hintClass?: ClassType;
  hintStyle?: StyleType;
}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarRadio),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-radio.scss'],
  templateUrl: './dasar-radio.html',
  selector: 'dasar-radio',
  imports: [CommonModule],
  standalone: true,
})
export class DasarRadio implements ControlValueAccessor {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private groupSelectFn: ((radio: DasarRadio) => void) | null = null;
  private ownValue = signal<any>(null);
  private ownDisabled = signal(
    resolveThemeDefault('radio', 'disabled', false, this.themeProvider, this.themeService),
  );
  private groupState = signal<DasarRadioGroupState | null>(null);

  onTouched: () => void = () => {};
  onChange: (value: any) => void = () => {};

  @Input() size = resolveThemeDefault(
    'radio',
    'size',
    'md' as DasarRadioSizeType,
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault('radio', 'label', '', this.themeProvider, this.themeService);
  @Input() hint = resolveThemeDefault('radio', 'hint', '', this.themeProvider, this.themeService);
  @Input() name: string | null = null;
  @Input({ transform: booleanAttribute }) error = resolveThemeDefault(
    'radio',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this.ownDisabled.set(value);
  }
  get disabled(): boolean {
    return this.ownDisabled();
  }
  @Input({ alias: 'checked-value' }) checkedValue: any = true;
  @Input()
  set value(val: any) {
    if (!isEqualValue(this.ownValue(), val)) this.ownValue.set(val);
  }
  get value(): any {
    return this.ownValue();
  }
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'radio',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'radio',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'circle-class' }) circleClass = resolveThemeDefault(
    'radio',
    'circleClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'circle-style' }) circleStyle = resolveThemeDefault(
    'radio',
    'circleStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-class' }) labelClass = resolveThemeDefault(
    'radio',
    'labelClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-style' }) labelStyle = resolveThemeDefault(
    'radio',
    'labelStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-class' }) hintClass = resolveThemeDefault(
    'radio',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-style' }) hintStyle = resolveThemeDefault(
    'radio',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  readonly hintId = `dasar-radio-hint-${++nextDasarRadioId}`;

  @Output() valueChange = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-radio', this.currentSize];
    if (this.isDisabled) classes.push('disabled');
    if (this.hasError) classes.push('error');
    return classes.join(' ');
  }

  get currentSize(): DasarRadioSizeType {
    return this.groupState()?.size ?? this.size;
  }

  get currentName(): string | null {
    return this.groupState()?.name ?? this.name;
  }

  get isDisabled(): boolean {
    return (this.groupState()?.disabled ?? false) || this.ownDisabled();
  }

  get hasError(): boolean {
    return this.error || (this.groupState()?.error ?? false);
  }

  get isChecked(): boolean {
    const group = this.groupState();
    if (group) return group.checked;
    return isEqualValue(this.ownValue(), this.checkedValue);
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      'dasar-radio-container': true,
      checked: this.isChecked,
      disabled: this.isDisabled,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get circleClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.circleClass);
    const baseClass = {
      'dasar-radio-circle': true,
      checked: this.isChecked,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get labelClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.labelClass);
    const baseClass = { 'dasar-radio-label': true };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get hintClasses(): Record<string, boolean> {
    const disabled = this.isDisabled;
    const error = this.hasError;
    const overrideClass = parseClassesToArray(this.hintClass);
    const baseClass = {
      'dasar-radio-hint': true,
      error,
      disabled,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  applyGroupState(
    state: DasarRadioGroupState | null,
    select: ((radio: DasarRadio) => void) | null,
  ) {
    this.groupState.set(state);
    this.groupSelectFn = select;
  }

  select(event?: Event) {
    if (this.isDisabled) {
      if (event) (event.target as HTMLInputElement).checked = this.isChecked;
      return;
    }
    if (this.isChecked) return;
    this.onTouched();
    if (this.groupSelectFn) {
      this.groupSelectFn(this);
      if (event) (event.target as HTMLInputElement).checked = this.isChecked;
      return;
    }
    this.ownValue.set(this.checkedValue);
    this.onChange(this.checkedValue);
    this.valueChange.emit(this.checkedValue);
    this.onUpdate.emit(this.checkedValue);
    if (event) (event.target as HTMLInputElement).checked = this.isChecked;
  }

  writeValue(value: any): void {
    if (!isEqualValue(this.ownValue(), value)) this.ownValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.ownDisabled.set(isDisabled);
  }
}

export const DasarRadioComponent = [DasarRadio] as const;
