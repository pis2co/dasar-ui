import {
  ViewEncapsulation,
  booleanAttribute,
  HostBinding,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';

export type DasarButtonSizeType = Extract<ScaleAttributeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
export type DasarButtonVariantType =
  'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost';
export type DasarButtonAppearanceType = 'solid' | 'subtle' | 'outline';
export type DasarButtonType = 'button' | 'submit' | 'reset';
export type DasarButtonRadiusType = ScaleAttributeType;

export interface DasarButtonConfig {
  appearance?: DasarButtonAppearanceType;
  variant?: DasarButtonVariantType;
  radius?: DasarButtonRadiusType;
  size?: DasarButtonSizeType;
  buttonStyle?: StyleType;
  buttonClass?: ClassType;
  type?: DasarButtonType;
  fullWidth?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  fluid?: boolean;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-button.scss'],
  templateUrl: './dasar-button.html',
  selector: 'dasar-button',
  imports: [CommonModule],
})
export class DasarButton {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input() appearance = resolveThemeDefault(
    'button',
    'appearance',
    'solid',
    this.themeProvider,
    this.themeService,
  );
  @Input() variant = resolveThemeDefault(
    'button',
    'variant',
    'primary',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'button',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'button',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'button-style' }) buttonStyle = resolveThemeDefault(
    'button',
    'buttonStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'button-class' }) buttonClass = resolveThemeDefault(
    'button',
    'buttonClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() type = resolveThemeDefault(
    'button',
    'type',
    'button',
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'button',
    'iconOnly',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'button',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'button',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'icon-only', transform: booleanAttribute }) iconOnly = resolveThemeDefault(
    'button',
    'iconOnly',
    false,
    this.themeProvider,
    this.themeService,
  );

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-button'];
    if (this.fullWidth) classes.push('full-width');
    if (this.disabled) classes.push('disabled');
    return classes.join(' ');
  }

  get buttonClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.buttonClass);
    const baseClass = {
      [this.appearance]: this.appearance !== 'solid',
      [`radius-${this.radius}`]: !!this.radius,
      [`size-${this.size}`]: true,
      [this.variant]: true,
      'icon-only': this.iconOnly,
      fluid: this.fluid,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }
}

export const DasarButtonComponent = [DasarButton] as const;
