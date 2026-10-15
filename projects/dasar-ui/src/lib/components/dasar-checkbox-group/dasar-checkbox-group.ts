import {
  ViewEncapsulation,
  booleanAttribute,
  contentChildren,
  HostBinding,
  HostListener,
  EventEmitter,
  Component,
  forwardRef,
  effect,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';
import { DasarCheckbox, DasarCheckboxSizeType } from '../dasar-checkbox/dasar-checkbox';

export type DasarCheckboxGroupDirectionType = 'horizontal' | 'vertical';

export interface DasarCheckboxGroupConfig {
  direction?: DasarCheckboxGroupDirectionType;
  size?: DasarCheckboxSizeType | null;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  valueField?: string | null;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  hintClass?: ClassType;
  hintStyle?: StyleType;
}

const keyOf = (value: any, valueField: string | null): any => {
  if (valueField && value !== null && value !== undefined && typeof value === 'object') {
    return value[valueField];
  }
  return value;
};

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarCheckboxGroup),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-checkbox-group.scss'],
  templateUrl: './dasar-checkbox-group.html',
  selector: 'dasar-checkbox-group',
  imports: [CommonModule],
  standalone: true,
})
export class DasarCheckboxGroup implements ControlValueAccessor {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private checkboxes = contentChildren(DasarCheckbox, { descendants: true });
  private ownDisabled = signal(
    resolveThemeDefault('checkboxGroup', 'disabled', false, this.themeProvider, this.themeService),
  );
  private ownError = signal(
    resolveThemeDefault('checkboxGroup', 'error', false, this.themeProvider, this.themeService),
  );
  private ownSize = signal(
    resolveThemeDefault(
      'checkboxGroup',
      'size',
      null as DasarCheckboxSizeType | null,
      this.themeProvider,
      this.themeService,
    ),
  );
  private values = signal<any[]>([]);

  onTouched: () => void = () => {};
  onChange: (value: any[]) => void = () => {};

  constructor() {
    effect(() => {
      const children = this.checkboxes();
      const current = this.values();
      const disabled = this.ownDisabled();
      const size = this.ownSize();
      const error = this.ownError();
      const valueField = this.valueField;
      for (const child of children) {
        const checked = current.some(
          (v) => keyOf(v, valueField) === keyOf(child.checkedValue, valueField),
        );
        child.applyGroupState(
          { checked, disabled: disabled || child.disabled, error, size },
          this.toggleChild,
        );
      }
    });
  }

  @Input() direction = resolveThemeDefault(
    'checkboxGroup',
    'direction',
    'vertical' as DasarCheckboxGroupDirectionType,
    this.themeProvider,
    this.themeService,
  );
  @Input()
  set size(value: DasarCheckboxSizeType | null) {
    this.ownSize.set(value);
  }
  get size(): DasarCheckboxSizeType | null {
    return this.ownSize();
  }
  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this.ownDisabled.set(value);
  }
  get disabled(): boolean {
    return this.ownDisabled();
  }
  @Input({ transform: booleanAttribute })
  set error(value: boolean) {
    this.ownError.set(value);
  }
  get error(): boolean {
    return this.ownError();
  }
  @Input() hint = resolveThemeDefault(
    'checkboxGroup',
    'hint',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'value-field' }) valueField = resolveThemeDefault(
    'checkboxGroup',
    'valueField',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input()
  set value(val: any) {
    const next = Array.isArray(val) ? val : val === null || val === undefined ? [] : [val];
    this.values.set(next);
  }
  get value(): any[] {
    return this.values();
  }
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'checkboxGroup',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'checkboxGroup',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-class' }) hintClass = resolveThemeDefault(
    'checkboxGroup',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-style' }) hintStyle = resolveThemeDefault(
    'checkboxGroup',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Output() valueChange = new EventEmitter<any[]>();
  @Output() onUpdate = new EventEmitter<any[]>();

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-checkbox-group', this.direction];
    if (this.ownDisabled()) classes.push('disabled');
    if (this.error) classes.push('error');
    return classes.join(' ');
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'group';
  }

  @HostListener('focusout')
  onFocusOut() {
    this.onTouched();
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      'dasar-checkbox-group-container': true,
      [this.direction]: true,
    };
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
      'dasar-checkbox-group-hint': true,
      error: this.error,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  private toggleChild = (checkbox: DasarCheckbox) => {
    this.onTouched();
    const field = this.valueField;
    const target = keyOf(checkbox.checkedValue, field);
    const current = this.values();
    const selected = current.some((v) => keyOf(v, field) === target);
    const next = selected
      ? current.filter((v) => keyOf(v, field) !== target)
      : [...current, checkbox.checkedValue];
    this.values.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
    this.onUpdate.emit(next);
  };

  writeValue(value: any): void {
    const next = Array.isArray(value)
      ? value
      : value === null || value === undefined
        ? []
        : [value];
    this.values.set(next);
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

  ngOnDestroy() {
    for (const child of this.checkboxes()) child.applyGroupState(null, null);
  }
}

export const DasarCheckboxGroupComponent = [DasarCheckboxGroup] as const;
