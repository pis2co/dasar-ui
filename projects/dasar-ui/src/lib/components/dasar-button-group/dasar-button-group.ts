import {
  ViewEncapsulation,
  booleanAttribute,
  AfterContentInit,
  HostBinding,
  Component,
  OnChanges,
  inject,
  Input,
  contentChildren,
} from '@angular/core';
import {
  DasarButtonAppearanceType,
  DasarButtonSizeType,
  DasarButtonVariantType,
  DasarButton,
} from '../dasar-button/dasar-button';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

export type DasarButtonGroupOrientationType = 'horizontal' | 'vertical';
export type DasarButtonGroupRadiusType = ScaleAttributeType;

export interface DasarButtonGroupConfig {
  orientation?: DasarButtonGroupOrientationType;
  attached?: boolean;
  size?: DasarButtonSizeType | null;
  variant?: DasarButtonVariantType | null;
  appearance?: DasarButtonAppearanceType | null;
  radius?: DasarButtonGroupRadiusType;
  fullWidth?: boolean;
  disabled?: boolean;
  containerClass?: ClassType;
  containerStyle?: StyleType;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-button-group.scss'],
  templateUrl: './dasar-button-group.html',
  selector: 'dasar-button-group',
  imports: [CommonModule],
})
export class DasarButtonGroup implements AfterContentInit, OnChanges {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private buttons = contentChildren(DasarButton);
  private originals = new WeakMap<
    DasarButton,
    {
      size: DasarButtonSizeType;
      variant: DasarButtonVariantType;
      appearance: DasarButtonAppearanceType;
      disabled: boolean;
    }
  >();

  @Input() orientation = resolveThemeDefault(
    'buttonGroup',
    'orientation',
    'horizontal' as DasarButtonGroupOrientationType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) attached = resolveThemeDefault(
    'buttonGroup',
    'attached',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'buttonGroup',
    'size',
    null as DasarButtonSizeType | null,
    this.themeProvider,
    this.themeService,
  );
  @Input() variant = resolveThemeDefault(
    'buttonGroup',
    'variant',
    null as DasarButtonVariantType | null,
    this.themeProvider,
    this.themeService,
  );
  @Input() appearance = resolveThemeDefault(
    'buttonGroup',
    'appearance',
    null as DasarButtonAppearanceType | null,
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'buttonGroup',
    'radius',
    'md' as DasarButtonGroupRadiusType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'buttonGroup',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'buttonGroup',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'buttonGroup',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'buttonGroup',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['dasar-button-group'];
    if (this.fullWidth) classes.push('full-width');
    return classes.join(' ');
  }

  ngAfterContentInit() {
    this.applyGroupContext();
  }

  ngOnChanges() {
    this.applyGroupContext();
  }

  private applyGroupContext() {
    for (const button of this.buttons()) {
      let original = this.originals.get(button);
      if (!original) {
        original = {
          size: button.size,
          variant: button.variant,
          appearance: button.appearance,
          disabled: button.disabled,
        };
        this.originals.set(button, original);
      }
      button.applyGroupState({
        size: this.size ?? original.size,
        variant: this.variant ?? original.variant,
        appearance: this.appearance ?? original.appearance,
        disabled: this.disabled || original.disabled,
      });
    }
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      [this.orientation]: true,
      attached: this.attached,
      [`radius-${this.radius}`]: !!this.radius,
      [`size-${this.size}`]: !!this.size,
      'full-width': this.fullWidth,
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

export const DasarButtonGroupComponent = [DasarButtonGroup] as const;
