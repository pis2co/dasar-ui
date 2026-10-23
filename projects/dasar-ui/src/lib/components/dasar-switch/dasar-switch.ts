import {
  ViewEncapsulation,
  booleanAttribute,
  ContentChild,
  HostBinding,
  EventEmitter,
  Component,
  Directive,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DasarThemeService } from '../../services/theme.service';
import { isEqualValue } from '../dasar-checkbox/dasar-checkbox';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { CommonModule } from '@angular/common';

export type DasarSwitchSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;

export interface DasarSwitchConfig {
  size?: DasarSwitchSizeType;
  disabled?: boolean;
  error?: boolean;
  checkedValue?: any;
  uncheckedValue?: any;
  defaultValue?: any;
  checkedIconName?: string;
  uncheckedIconName?: string;
  label?: string;
  hint?: string;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  trackClass?: ClassType;
  trackStyle?: StyleType;
  hintClass?: ClassType;
  hintStyle?: StyleType;
}

@Directive({ selector: '[checked-slot]', standalone: true })
export class DasarSwitchCheckedSlot {}

@Directive({ selector: '[unchecked-slot]', standalone: true })
export class DasarSwitchUncheckedSlot {}

@Directive({ selector: '[icon-slot]', standalone: true })
export class DasarSwitchIconSlot {}

@Directive({ selector: '[checked-icon-slot]', standalone: true })
export class DasarSwitchCheckedIconSlot {}

@Directive({ selector: '[unchecked-icon-slot]', standalone: true })
export class DasarSwitchUncheckedIconSlot {}

let nextDasarSwitchId = 0;

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarSwitch),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-switch.scss'],
  templateUrl: './dasar-switch.html',
  selector: 'dasar-switch',
  imports: [CommonModule, DasarIconComponent],
  standalone: true,
})
export class DasarSwitch implements ControlValueAccessor, OnInit {
  @ContentChild(DasarSwitchCheckedSlot) providedChecked?: DasarSwitchCheckedSlot;
  @ContentChild(DasarSwitchUncheckedSlot) providedUnchecked?: DasarSwitchUncheckedSlot;
  @ContentChild(DasarSwitchIconSlot) providedIcon?: DasarSwitchIconSlot;
  @ContentChild(DasarSwitchCheckedIconSlot) providedCheckedIcon?: DasarSwitchCheckedIconSlot;
  @ContentChild(DasarSwitchUncheckedIconSlot) providedUncheckedIcon?: DasarSwitchUncheckedIconSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private ownValue = signal<any>(undefined);
  private ownDisabled = signal(
    resolveThemeDefault('switch', 'disabled', false, this.themeProvider, this.themeService),
  );
  private valueBound = false;

  onTouched: () => void = () => {};
  onChange: (value: any) => void = () => {};

  @Input() size = resolveThemeDefault(
    'switch',
    'size',
    'md' as DasarSwitchSizeType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error = resolveThemeDefault(
    'switch',
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
    'switch',
    'checkedValue',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'unchecked-value' }) uncheckedValue = resolveThemeDefault(
    'switch',
    'uncheckedValue',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'default-value' }) defaultValue = resolveThemeDefault(
    'switch',
    'defaultValue',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input()
  set value(val: any) {
    this.valueBound = true;
    if (!isEqualValue(this.ownValue(), val)) this.ownValue.set(val);
  }
  get value(): any {
    return this.ownValue();
  }
  @Input({ alias: 'checked-icon-name' }) checkedIconName = resolveThemeDefault(
    'switch',
    'checkedIconName',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'unchecked-icon-name' }) uncheckedIconName = resolveThemeDefault(
    'switch',
    'uncheckedIconName',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault(
    'switch',
    'label',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'switch',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'switch',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'track-class' }) trackClass = resolveThemeDefault(
    'switch',
    'trackClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'track-style' }) trackStyle = resolveThemeDefault(
    'switch',
    'trackStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() hint = resolveThemeDefault('switch', 'hint', '', this.themeProvider, this.themeService);
  @Input({ alias: 'hint-class' }) hintClass = resolveThemeDefault(
    'switch',
    'hintClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hint-style' }) hintStyle = resolveThemeDefault(
    'switch',
    'hintStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  readonly hintId = `dasar-switch-hint-${++nextDasarSwitchId}`;

  @Output() valueChange = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-switch', this.size];
    if (this.isChecked) classes.push('checked');
    if (this.isDisabled) classes.push('disabled');
    if (this.error) classes.push('error');
    return classes.join(' ');
  }

  get isChecked(): boolean {
    return isEqualValue(this.ownValue(), this.checkedValue);
  }

  get isDisabled(): boolean {
    return this.ownDisabled();
  }

  get currentIconName(): string {
    return this.isChecked ? this.checkedIconName : this.uncheckedIconName;
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      'dasar-switch-container': true,
      checked: this.isChecked,
      disabled: this.isDisabled,
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

  get hintClasses(): Record<string, boolean> {
    const disabled = this.isDisabled;
    const error = this.error;
    const overrideClass = parseClassesToArray(this.hintClass);
    const baseClass = {
      'dasar-switch-hint': true,
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

  get trackClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.trackClass);
    const baseClass = {
      'dasar-switch-track': true,
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

  ngOnInit(): void {
    if (!this.valueBound && this.ownValue() === undefined) {
      this.ownValue.set(this.defaultValue !== undefined ? this.defaultValue : this.uncheckedValue);
    }
  }

  toggle(event?: Event): void {
    if (this.isDisabled) return;
    this.onTouched();
    const next = this.isChecked ? this.uncheckedValue : this.checkedValue;
    this.ownValue.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
    this.onUpdate.emit(next);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  writeValue(value: any): void {
    this.valueBound = true;
    this.ownValue.set(value ?? this.uncheckedValue);
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

export const DasarSwitchComponent = [
  DasarSwitchCheckedSlot,
  DasarSwitchUncheckedSlot,
  DasarSwitchIconSlot,
  DasarSwitchCheckedIconSlot,
  DasarSwitchUncheckedIconSlot,
  DasarSwitch,
] as const;
