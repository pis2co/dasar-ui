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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIcon } from '../dasar-icon/dasar-icon';

export type DasarCheckboxSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;

export interface DasarCheckboxGroupState {
  checked: boolean;
  disabled: boolean;
  error?: boolean;
  size?: DasarCheckboxSizeType | null;
}

export interface DasarCheckboxConfig {
  size?: DasarCheckboxSizeType;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
  checkedValue?: any;
  uncheckedValue?: any;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  boxClass?: ClassType;
  boxStyle?: StyleType;
  labelClass?: ClassType;
  labelStyle?: StyleType;
  hintClass?: ClassType;
  hintStyle?: StyleType;
}

export const isEqualValue = (first: any, second: any): boolean => {
  if (first === second) return true;
  if (
    first !== null &&
    second !== null &&
    typeof first === 'object' &&
    typeof second === 'object'
  ) {
    try {
      return JSON.stringify(first) === JSON.stringify(second);
    } catch {
      return false;
    }
  }
  return false;
};

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarCheckbox),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-checkbox.scss'],
  templateUrl: './dasar-checkbox.html',
  selector: 'dasar-checkbox',
  imports: [CommonModule, DasarIcon],
  standalone: true,
})
export class DasarCheckbox implements ControlValueAccessor {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private groupToggleFn: ((checkbox: DasarCheckbox) => void) | null = null;
  private ownValue = signal<any>(false);
  private ownDisabled = signal(
    resolveThemeDefault('checkbox', 'disabled', false, this.themeProvider, this.themeService),
  );
  private groupState = signal<DasarCheckboxGroupState | null>(null);

  onTouched: () => void = () => {};
  onChange: (value: any) => void = () => {};

  @Input() size = resolveThemeDefault(
    'checkbox',
    'size',
    'md' as DasarCheckboxSizeType,
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault(
    'checkbox',
    'label',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() hint = resolveThemeDefault(
    'checkbox',
    'hint',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error = resolveThemeDefault(
    'checkbox',
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
  @Input({ alias: 'checked-value' }) checkedValue = resolveThemeDefault(
    'checkbox',
    'checkedValue',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'unchecked-value' }) uncheckedValue = resolveThemeDefault(
    'checkbox',
    'uncheckedValue',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input()
  set value(val: any) {
    if (!isEqualValue(this.ownValue(), val)) this.ownValue.set(val);
  }
  get value(): any {
    return this.ownValue();
  }
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'checkbox',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'checkbox',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'box-class' }) boxClass = resolveThemeDefault(
    'checkbox',
    'boxClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'box-style' }) boxStyle = resolveThemeDefault(
    'checkbox',
    'boxStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-class' }) labelClass = resolveThemeDefault(
    'checkbox',
    'labelClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-style' }) labelStyle = resolveThemeDefault(
    'checkbox',
    'labelStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-class' }) hintClass = resolveThemeDefault(
    'checkbox',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-style' }) hintStyle = resolveThemeDefault(
    'checkbox',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Output() valueChange = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-checkbox', this.currentSize];
    if (this.isDisabled) classes.push('disabled');
    if (this.hasError) classes.push('error');
    return classes.join(' ');
  }

  get currentSize(): DasarCheckboxSizeType {
    return this.groupState()?.size ?? this.size;
  }

  get hasError(): boolean {
    return this.error || (this.groupState()?.error ?? false);
  }

  get isDisabled(): boolean {
    return (this.groupState()?.disabled ?? false) || this.ownDisabled();
  }

  get isChecked(): boolean {
    const group = this.groupState();
    if (group) return group.checked;
    return isEqualValue(this.ownValue(), this.checkedValue);
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      'dasar-checkbox-container': true,
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

  get boxClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.boxClass);
    const baseClass = {
      'dasar-checkbox-box': true,
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
    const baseClass = { 'dasar-checkbox-label': true };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get hintClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.hintClass);
    const baseClass = {
      'dasar-checkbox-hint': true,
      error: this.hasError,
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

  applyGroupState(
    state: DasarCheckboxGroupState | null,
    toggle: ((cb: DasarCheckbox) => void) | null,
  ) {
    this.groupState.set(state);
    this.groupToggleFn = toggle;
  }

  toggle(event?: Event) {
    if (this.isDisabled) {
      if (event) (event.target as HTMLInputElement).checked = this.isChecked;
      return;
    }
    this.onTouched();
    if (this.groupToggleFn) {
      this.groupToggleFn(this);
      if (event) (event.target as HTMLInputElement).checked = this.isChecked;
      return;
    }
    const next = this.isChecked ? this.uncheckedValue : this.checkedValue;
    this.ownValue.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
    this.onUpdate.emit(next);
    if (event) (event.target as HTMLInputElement).checked = this.isChecked;
  }

  writeValue(value: any): void {
    if (!isEqualValue(this.ownValue(), value)) this.ownValue.set(value ?? this.uncheckedValue);
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

export const DasarCheckboxComponent = [DasarCheckbox] as const;
