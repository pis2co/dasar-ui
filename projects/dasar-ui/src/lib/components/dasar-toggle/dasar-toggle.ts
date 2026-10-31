import {
  ViewEncapsulation,
  booleanAttribute,
  HostBinding,
  Component,
  forwardRef,
  inject,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgpToggle } from 'ng-primitives/toggle';
import { NgpButton } from 'ng-primitives/button';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';

export type DasarToggleSizeType = Extract<ScaleAttributeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
export type DasarToggleVariantType =
  'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost';
export type DasarToggleAppearanceType = 'solid' | 'subtle' | 'outline' | 'elevated';
export type DasarToggleType = 'button' | 'submit' | 'reset';
export type DasarToggleRadiusType = ScaleAttributeType;

export interface DasarToggleConfig {
  selected?: boolean;
  disabled?: boolean;
  type?: DasarToggleType;
  appearance?: DasarToggleAppearanceType;
  variant?: DasarToggleVariantType;
  size?: DasarToggleSizeType;
  radius?: DasarToggleRadiusType;
  toggleClass?: ClassType;
  toggleStyle?: StyleType;
  fullWidth?: boolean;
}

@Component({
  selector: 'dasar-toggle',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-toggle.scss'],
  templateUrl: './dasar-toggle.html',
  imports: [CommonModule, NgpToggle, NgpButton],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarToggle),
      multi: true,
    },
  ],
})
export class DasarToggle implements ControlValueAccessor, AfterViewInit {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(NgpToggle) private ngpToggle?: NgpToggle;

  private _selected: boolean = resolveThemeDefault(
    'toggle',
    'selected',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute })
  get selected(): boolean {
    return this._selected;
  }
  set selected(val: boolean) {
    const bool = !!val;
    this._selected = bool;
    (this.ngpToggle as any)?.state?.setSelected(bool, { emit: false });
    this.cdr.markForCheck();
  }

  @Input({ transform: booleanAttribute }) disabled: boolean = resolveThemeDefault(
    'toggle',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input() type: DasarToggleType = resolveThemeDefault(
    'toggle',
    'type',
    'button',
    this.themeProvider,
    this.themeService,
  );

  @Input() appearance: DasarToggleAppearanceType = resolveThemeDefault(
    'toggle',
    'appearance',
    'solid',
    this.themeProvider,
    this.themeService,
  );

  @Input() variant: DasarToggleVariantType = resolveThemeDefault(
    'toggle',
    'variant',
    'primary',
    this.themeProvider,
    this.themeService,
  );

  @Input() size: DasarToggleSizeType = resolveThemeDefault(
    'toggle',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() radius: DasarToggleRadiusType = resolveThemeDefault(
    'toggle',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() toggleClass: ClassType = resolveThemeDefault(
    'toggle',
    'toggleClass',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input() toggleStyle: StyleType = resolveThemeDefault(
    'toggle',
    'toggleStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) fullWidth: boolean = resolveThemeDefault(
    'toggle',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Output() selectedChange = new EventEmitter<boolean>();

  @HostBinding('class.dasar-toggle') readonly hostBaseClass = true;

  @HostBinding('class.full-width')
  get hasFullWidth(): boolean {
    return this.fullWidth;
  }

  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    (this.ngpToggle as any)?.state?.setSelected(this._selected, { emit: false });
    if (this.disabled) {
      (this.ngpToggle as any)?.state?.setDisabled(true);
    }
  }

  onPrimitiveSelectedChange(newSelected: boolean): void {
    this._selected = newSelected;
    this.onChange(newSelected);
    this.selectedChange.emit(newSelected);
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.onTouched();
  }

  get buttonClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.toggleClass);
    const baseClass = {
      [this.appearance]: this.appearance !== 'solid',
      [`radius-${this.radius}`]: !!this.radius,
      [`size-${this.size}`]: true,
      [this.variant]: true,
      selected: this._selected,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  writeValue(val: any): void {
    const bool = !!val;
    this._selected = bool;
    (this.ngpToggle as any)?.state?.setSelected(bool, { emit: false });
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    (this.ngpToggle as any)?.state?.setDisabled(isDisabled);
    this.cdr.markForCheck();
  }
}

export const DasarToggleComponent = [DasarToggle] as const;
