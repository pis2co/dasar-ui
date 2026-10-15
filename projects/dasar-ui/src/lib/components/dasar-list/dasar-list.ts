import {
  booleanAttribute,
  ViewEncapsulation,
  ChangeDetectorRef,
  ContentChild,
  HostBinding,
  Component,
  Directive,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';

export interface DasarListConfig {
  size?: DasarListSize;
  bordered?: boolean;
  showDivider?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  containerClass?: ClassType;
  containerStyle?: StyleType;
}

export interface DasarListItemConfig {
  itemClass?: ClassType;
  itemStyle?: StyleType;
}

export type DasarListSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;

@Directive({ selector: '[header-slot]', standalone: true })
export class DasarListHeaderSlot {}

@Directive({ selector: '[footer-slot]', standalone: true })
export class DasarListFooterSlot {}

@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarListItemPrefixSlot {}

@Directive({ selector: '[suffix-slot]', standalone: true })
export class DasarListItemSuffixSlot {}

@Component({
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-list.html',
  styleUrls: ['./dasar-list.scss'],
  selector: 'dasar-list',
  standalone: true,
})
export class DasarList {
  @ContentChild(DasarListHeaderSlot) providedHeader?: DasarListHeaderSlot;
  @ContentChild(DasarListFooterSlot) providedFooter?: DasarListFooterSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input() size = resolveThemeDefault('list', 'size', 'md', this.themeProvider, this.themeService);

  @Input({ transform: booleanAttribute }) bordered = resolveThemeDefault(
    'list',
    'bordered',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'show-divider', transform: booleanAttribute }) showDivider = resolveThemeDefault(
    'list',
    'showDivider',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) hoverable = resolveThemeDefault(
    'list',
    'hoverable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) clickable = resolveThemeDefault(
    'list',
    'clickable',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'list',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'list',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @HostBinding('class.dasar-list') readonly baseClass = true;

  get hasHeader(): boolean {
    return !!this.providedHeader;
  }

  get hasFooter(): boolean {
    return !!this.providedFooter;
  }
}

@Component({
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-list-item.html',
  selector: 'dasar-list-item',
  standalone: true,
})
export class DasarListItem {
  @ContentChild(DasarListItemPrefixSlot) providedPrefix?: DasarListItemPrefixSlot;
  @ContentChild(DasarListItemSuffixSlot) providedSuffix?: DasarListItemSuffixSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input({ alias: 'item-class' }) itemClass = resolveThemeDefault(
    'listItem',
    'itemClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'item-style' }) itemStyle = resolveThemeDefault(
    'listItem',
    'itemStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  @HostBinding('class.dasar-list-item-wrapper') readonly baseClass = true;

  get hasPrefix(): boolean {
    return !!this.providedPrefix;
  }

  get hasSuffix(): boolean {
    return !!this.providedSuffix;
  }
}

export const DasarListComponent = [
  DasarListHeaderSlot,
  DasarListFooterSlot,
  DasarListItemPrefixSlot,
  DasarListItemSuffixSlot,
  DasarList,
  DasarListItem,
] as const;
