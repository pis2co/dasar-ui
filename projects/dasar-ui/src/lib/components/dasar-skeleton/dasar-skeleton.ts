import {
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';

export type DasarSkeletonType = 'text' | 'box';
export type DasarSkeletonSizeType = Extract<ScaleAttributeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

export interface DasarSkeletonConfig {
  type?: DasarSkeletonType;
  size?: DasarSkeletonSizeType;
  radius?: ScaleAttributeType;
  width?: string | number | null;
  height?: string | number | null;
  fullWidth?: boolean;
  repeat?: number;
  animated?: boolean;
  circle?: boolean;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  itemClass?: ClassType;
  itemStyle?: StyleType;
}

const skeletonTextHeights: Record<DasarSkeletonSizeType, number> = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 20,
};

const skeletonBoxSizes: Record<DasarSkeletonSizeType, { width: number; height: number }> = {
  xs: { width: 60, height: 40 },
  sm: { width: 80, height: 60 },
  md: { width: 120, height: 80 },
  lg: { width: 160, height: 120 },
  xl: { width: 200, height: 160 },
};

const skeletonCircleSizes: Record<DasarSkeletonSizeType, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
};

const toCssValue = (value: string | number): string =>
  typeof value === 'number' ? `${value}px` : value;

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-skeleton.scss'],
  templateUrl: './dasar-skeleton.html',
  selector: 'dasar-skeleton',
  imports: [CommonModule],
  standalone: true,
})
export class DasarSkeleton {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input() type = resolveThemeDefault(
    'skeleton',
    'type',
    'text' as DasarSkeletonType,
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'skeleton',
    'size',
    'md' as DasarSkeletonSizeType,
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'skeleton',
    'radius',
    'md' as ScaleAttributeType,
    this.themeProvider,
    this.themeService,
  );
  @Input() width = resolveThemeDefault(
    'skeleton',
    'width',
    null as string | number | null,
    this.themeProvider,
    this.themeService,
  );
  @Input() height = resolveThemeDefault(
    'skeleton',
    'height',
    null as string | number | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'skeleton',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) animated = resolveThemeDefault(
    'skeleton',
    'animated',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) circle = resolveThemeDefault(
    'skeleton',
    'circle',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: numberAttribute }) repeat = resolveThemeDefault(
    'skeleton',
    'repeat',
    1,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'skeleton',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'skeleton',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'item-class' }) itemClass = resolveThemeDefault(
    'skeleton',
    'itemClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'item-style' }) itemStyle = resolveThemeDefault(
    'skeleton',
    'itemStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  get items(): number[] {
    const count = Math.max(1, Math.floor(this.repeat || 1));
    return Array.from({ length: count }, (_, index) => index);
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass as ClassType);
    const baseClass: Record<string, boolean> = {
      'dasar-skeleton': true,
      [`size-${this.size}`]: !!this.size,
      'full-width': this.fullWidth,
      circle: this.circle,
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get itemClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.itemClass as ClassType);
    const baseClass: Record<string, boolean> = {
      'dasar-skeleton-item': true,
      animated: this.animated,
      circle: this.circle,
      [`type-${this.type}`]: true,
    };
    if (!this.circle && this.radius) {
      baseClass[`radius-${this.radius}`] = true;
    }
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  itemStyleFor(index: number): Record<string, any> {
    const style: Record<string, any> = {};

    if (this.circle) {
      const size = this.circleSize();
      style['width'] = size;
      style['height'] = size;
    } else {
      style['width'] = this.itemWidth(index);
      style['height'] = this.itemHeight();
    }

    return { ...style, ...(this.itemStyle ?? {}) };
  }

  private circleSize(): string {
    if (this.height !== null && this.height !== undefined) return toCssValue(this.height);
    if (this.width !== null && this.width !== undefined) return toCssValue(this.width);
    return toCssValue(skeletonCircleSizes[this.size] ?? skeletonCircleSizes.md);
  }

  private itemHeight(): string {
    if (this.height !== null && this.height !== undefined) return toCssValue(this.height);
    if (this.type === 'box') {
      return toCssValue((skeletonBoxSizes[this.size] ?? skeletonBoxSizes.md).height);
    }
    return toCssValue(skeletonTextHeights[this.size] ?? skeletonTextHeights.md);
  }

  private itemWidth(index: number): string {
    if (this.fullWidth) return '100%';
    if (this.width !== null && this.width !== undefined) return toCssValue(this.width);
    if (this.type === 'box') {
      return toCssValue((skeletonBoxSizes[this.size] ?? skeletonBoxSizes.md).width);
    }
    const lastOfMany = this.items.length > 1 && index === this.items.length - 1;
    return lastOfMany ? '60%' : '100%';
  }
}

export const DasarSkeletonComponent = [DasarSkeleton] as const;
