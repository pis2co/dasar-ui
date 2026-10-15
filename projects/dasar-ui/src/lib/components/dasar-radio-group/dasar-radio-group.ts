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
import { DasarRadio, DasarRadioSizeType } from '../dasar-radio/dasar-radio';

export type DasarRadioGroupDirectionType = 'horizontal' | 'vertical';

export interface DasarRadioGroupConfig {
  direction?: DasarRadioGroupDirectionType;
  size?: DasarRadioSizeType | null;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  valueField?: string | null;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  hintClass?: ClassType;
  hintStyle?: StyleType;
}

let nextRadioGroupId = 0;

let nextDasarRadioGroupHintId = 0;

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
      useExisting: forwardRef(() => DasarRadioGroup),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-radio-group.scss'],
  templateUrl: './dasar-radio-group.html',
  selector: 'dasar-radio-group',
  imports: [CommonModule],
  standalone: true,
})
export class DasarRadioGroup implements ControlValueAccessor {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private radios = contentChildren(DasarRadio, { descendants: true });
  private ownDisabled = signal(
    resolveThemeDefault('radioGroup', 'disabled', false, this.themeProvider, this.themeService),
  );
  private ownError = signal(
    resolveThemeDefault('radioGroup', 'error', false, this.themeProvider, this.themeService),
  );
  private ownSize = signal(
    resolveThemeDefault(
      'radioGroup',
      'size',
      null as DasarRadioSizeType | null,
      this.themeProvider,
      this.themeService,
    ),
  );
  private ownName = signal<string | null>(null);
  private selected = signal<any>(null);
  private groupName = `dasar-radio-group-${++nextRadioGroupId}`;

  onTouched: () => void = () => {};
  onChange: (value: any) => void = () => {};

  constructor() {
    effect(() => {
      const children = this.radios();
      const current = this.selected();
      const disabled = this.ownDisabled();
      const error = this.ownError();
      const size = this.ownSize();
      const valueField = this.valueField;
      const name = this.ownName() ?? this.groupName;
      for (const child of children) {
        const checked =
          current !== null &&
          current !== undefined &&
          keyOf(current, valueField) === keyOf(child.checkedValue, valueField);
        child.applyGroupState(
          { checked, disabled: disabled || child.disabled, error, size, name },
          this.selectChild,
        );
      }
    });
  }

  @Input() direction = resolveThemeDefault(
    'radioGroup',
    'direction',
    'vertical' as DasarRadioGroupDirectionType,
    this.themeProvider,
    this.themeService,
  );
  @Input()
  set size(value: DasarRadioSizeType | null) {
    this.ownSize.set(value);
  }
  get size(): DasarRadioSizeType | null {
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
  @Input()
  set name(value: string | null) {
    this.ownName.set(value);
  }
  get name(): string | null {
    return this.ownName();
  }
  @Input() hint = resolveThemeDefault(
    'radioGroup',
    'hint',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'value-field' }) valueField = resolveThemeDefault(
    'radioGroup',
    'valueField',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input()
  set value(val: any) {
    this.selected.set(val ?? null);
  }
  get value(): any {
    return this.selected();
  }
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'radioGroup',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'radioGroup',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-class' }) hintClass = resolveThemeDefault(
    'radioGroup',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-style' }) hintStyle = resolveThemeDefault(
    'radioGroup',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  readonly hintId = `dasar-radio-group-hint-${++nextDasarRadioGroupHintId}`;

  @Output() valueChange = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-radio-group', this.direction];
    if (this.ownDisabled()) classes.push('disabled');
    if (this.ownError()) classes.push('error');
    return classes.join(' ');
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'radiogroup';
  }

  @HostBinding('attr.aria-describedby')
  get describedBy(): string | null {
    return this.hint ? this.hintId : null;
  }

  @HostListener('focusout')
  onFocusOut() {
    this.onTouched();
  }

  get hintClasses(): Record<string, boolean> {
    const error = this.ownError();
    const overrideClass = parseClassesToArray(this.hintClass);
    const baseClass = {
      'dasar-radio-group-hint': true,
      error,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      'dasar-radio-group-container': true,
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

  private selectChild = (radio: DasarRadio) => {
    const field = this.valueField;
    const target = keyOf(radio.checkedValue, field);
    const current = this.selected();
    if (current !== null && current !== undefined && keyOf(current, field) === target) return;
    this.onTouched();
    const next = radio.checkedValue;
    this.selected.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
    this.onUpdate.emit(next);
  };

  writeValue(value: any): void {
    this.selected.set(value ?? null);
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
    for (const child of this.radios()) child.applyGroupState(null, null);
  }
}

export const DasarRadioGroupComponent = [DasarRadioGroup] as const;
