import {
  Directive,
  TemplateRef,
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  HostBinding,
  booleanAttribute,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';
import { DasarButton, DasarButtonSizeType } from '../dasar-button/dasar-button';

export type DasarTabsRadiusType = ScaleAttributeType;
export type DasarTabsAppearanceType = 'solid' | 'subtle' | 'outline';
export type DasarTabsSizeType = ScaleAttributeType;
export type DasarTabsSpacingType = 'compact' | 'normal';

export interface DasarTabsConfig {
  appearance?: DasarTabsAppearanceType;
  radius?: DasarTabsRadiusType;
  size?: DasarTabsSizeType;
  spacing?: DasarTabsSpacingType;
  fluid?: boolean;
  containerClass?: ClassType;
  contentClass?: ClassType;
  listClass?: ClassType;
  containerStyle?: StyleType;
  contentStyle?: StyleType;
  listStyle?: StyleType;
}

@Directive({
  selector: '[tab-item-slot]',
  standalone: true,
})
export class DasarTabItemSlotDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'dasar-tabs',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, DasarButton],
  templateUrl: './dasar-tabs.html',
  styleUrls: ['./dasar-tabs.scss'],
})
export class DasarTabs {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @ContentChildren(DasarTabItemSlotDirective)
  tabItemSlotDirectives!: QueryList<DasarTabItemSlotDirective>;

  @Input() appearance = resolveThemeDefault(
    'tabs',
    'appearance',
    'subtle' as DasarTabsAppearanceType,
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'tabs',
    'radius',
    'md' as DasarTabsRadiusType,
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'tabs',
    'size',
    'md' as DasarTabsSizeType,
    this.themeProvider,
    this.themeService,
  );
  @Input() spacing = resolveThemeDefault(
    'tabs',
    'spacing',
    'normal' as DasarTabsSpacingType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'tabs',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'tabs',
    'containerClass',
    '' as ClassType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-class' }) contentClass = resolveThemeDefault(
    'tabs',
    'contentClass',
    '' as ClassType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'list-class' }) listClass = resolveThemeDefault(
    'tabs',
    'listClass',
    '' as ClassType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'tabs',
    'containerStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-style' }) contentStyle = resolveThemeDefault(
    'tabs',
    'contentStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'list-style' }) listStyle = resolveThemeDefault(
    'tabs',
    'listStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'active-index' }) activeIndex = 0;
  @Input() items: string[] = [];

  @Output() onTabsChange = new EventEmitter<number>();
  @Output() onTabsClick = new EventEmitter<number>();

  @HostBinding('class.dasar-tabs') readonly baseClass = true;

  get buttonSize(): DasarButtonSizeType {
    if (this.size === 'none') return 'xs';
    if (this.size === 'full') return 'xl';
    return this.size as DasarButtonSizeType;
  }

  selectTab(index: number) {
    this.onTabsClick.emit(index);
    if (index === this.activeIndex) return;
    this.activeIndex = index;
    this.onTabsChange.emit(index);
  }
}

export const DasarTabsComponent = [DasarTabs, DasarTabItemSlotDirective] as const;
