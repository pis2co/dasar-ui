import {
  booleanAttribute,
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgpMenu, NgpMenuItem, NgpMenuPlacement, NgpMenuTrigger } from 'ng-primitives/menu';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { resolveThemeDefault } from '../../utils/common';
import { fieldIconSize } from '../../utils/icon-size';

export type DasarMenuPlacementType = NgpMenuPlacement;
export type DasarMenuSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarMenuAppearanceType = 'none' | 'outline' | 'filled' | 'elevated';
export type DasarMenuRadiusType = ScaleAttributeType;

export interface DasarMenuItem {
  label: string;
  value: any;
  iconName?: string;
  disabled?: boolean;
  divider?: boolean;
  [key: string]: any;
}

export interface DasarMenuConfig {
  placement?: DasarMenuPlacementType;
  appearance?: DasarMenuAppearanceType;
  radius?: DasarMenuRadiusType;
  size?: DasarMenuSizeType;
  items?: DasarMenuItem[];
  containerStyle?: StyleType;
  panelStyle?: StyleType;
  itemStyle?: StyleType;
  containerClass?: ClassType;
  panelClass?: ClassType;
  itemClass?: ClassType;
  disabled?: boolean;
  fluid?: boolean;
}

/**
 * Directive applied to a menu trigger element (e.g. `<button [dasarMenuTrigger]="menuTpl">`),
 * backed by `NgpMenuTrigger`.
 */
@Directive({
  selector: '[dasarMenuTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgpMenuTrigger,
      inputs: [
        'ngpMenuTrigger: dasarMenuTrigger',
        'ngpMenuTriggerPlacement: dasarMenuTriggerPlacement',
        'ngpMenuTriggerDisabled: dasarMenuTriggerDisabled',
        'ngpMenuTriggerOffset: dasarMenuTriggerOffset',
      ],
    },
  ],
})
export class DasarMenuTrigger {}

@Directive({ selector: '[menu-item-template]', standalone: true })
export class DasarMenuItemTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  imports: [CommonModule, DasarIconComponent, NgpMenuItem],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-menu.scss'],
  templateUrl: './dasar-menu.html',
  selector: 'dasar-menu',
  standalone: true,
  hostDirectives: [{ directive: NgpMenu }],
})
export class DasarMenu {
  @ContentChild(DasarMenuItemTemplate) providedMenuItem?: DasarMenuItemTemplate;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input() placement: DasarMenuPlacementType = resolveThemeDefault(
    'menu',
    'placement',
    'bottom-start',
    this.themeProvider,
    this.themeService,
  );

  @Input() appearance: DasarMenuAppearanceType = resolveThemeDefault(
    'menu',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );

  @Input() radius: DasarMenuRadiusType = resolveThemeDefault(
    'menu',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() size: DasarMenuSizeType = resolveThemeDefault(
    'menu',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() items: DasarMenuItem[] = resolveThemeDefault(
    'menu',
    'items',
    [],
    this.themeProvider,
    this.themeService,
  );

  @Input() containerStyle: StyleType = resolveThemeDefault(
    'menu',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input() panelStyle: StyleType = resolveThemeDefault(
    'menu',
    'panelStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input() itemStyle: StyleType = resolveThemeDefault(
    'menu',
    'itemStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input() containerClass: ClassType = resolveThemeDefault(
    'menu',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input() panelClass: ClassType = resolveThemeDefault(
    'menu',
    'panelClass',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input() itemClass: ClassType = resolveThemeDefault(
    'menu',
    'itemClass',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) disabled: boolean = resolveThemeDefault(
    'menu',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute }) fluid: boolean = resolveThemeDefault(
    'menu',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Output() onItemClick = new EventEmitter<DasarMenuItem>();

  @HostBinding('class.dasar-menu') readonly baseClass = true;

  get hasMenuItem(): boolean {
    return !!this.providedMenuItem;
  }

  get itemIconSize(): number {
    return fieldIconSize(this.size);
  }

  onItemSelect(item: DasarMenuItem): void {
    if (item.disabled || item.divider || this.disabled) return;
    this.onItemClick.emit(item);
  }
}

export const DasarMenuComponent = [DasarMenuTrigger, DasarMenuItemTemplate, DasarMenu] as const;
