import {
  ViewEncapsulation,
  booleanAttribute,
  ContentChild,
  HostBinding,
  Component,
  Directive,
  TemplateRef,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';

export type DasarDividerLabelPlacementType = 'left' | 'center' | 'right';
export type DasarDividerSpacingType = ScaleAttributeType;

export interface DasarDividerConfig {
  dashed?: boolean;
  vertical?: boolean;
  labelPlacement?: DasarDividerLabelPlacementType;
  spacing?: DasarDividerSpacingType;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  labelClass?: ClassType;
  labelStyle?: StyleType;
}

@Directive({ selector: '[divider-label-slot]', standalone: true })
export class DasarDividerLabelTemplate {
  templateRef = inject(TemplateRef);
}

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-divider.scss'],
  templateUrl: './dasar-divider.html',
  selector: 'dasar-divider',
  imports: [CommonModule],
})
export class DasarDivider {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input({ transform: booleanAttribute }) dashed = resolveThemeDefault(
    'divider',
    'dashed',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) vertical = resolveThemeDefault(
    'divider',
    'vertical',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() label: string | null = null;
  @Input({ alias: 'label-placement' }) labelPlacement = resolveThemeDefault(
    'divider',
    'labelPlacement',
    'center' as DasarDividerLabelPlacementType,
    this.themeProvider,
    this.themeService,
  );
  @Input() spacing = resolveThemeDefault(
    'divider',
    'spacing',
    'md' as DasarDividerSpacingType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'divider',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'divider',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-class' }) labelClass = resolveThemeDefault(
    'divider',
    'labelClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-style' }) labelStyle = resolveThemeDefault(
    'divider',
    'labelStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @ContentChild(DasarDividerLabelTemplate) labelTemplate?: DasarDividerLabelTemplate;

  @HostBinding('class')
  get hostClasses(): string {
    return this.vertical ? 'dasar-divider vertical' : 'dasar-divider';
  }

  @HostBinding('attr.role') role = 'separator';

  @HostBinding('attr.aria-orientation')
  get ariaOrientation(): string {
    return this.vertical ? 'vertical' : 'horizontal';
  }

  get hasLabel(): boolean {
    return !this.vertical && (!!this.label || !!this.labelTemplate);
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      horizontal: !this.vertical,
      vertical: this.vertical,
      dashed: this.dashed,
      'with-label': this.hasLabel,
      [`label-${this.labelPlacement}`]: this.hasLabel,
      [`spacing-${this.spacing}`]: !!this.spacing,
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
    const baseClass = { 'dasar-divider-label': true };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }
}

export const DasarDividerComponent = [DasarDivider, DasarDividerLabelTemplate] as const;
