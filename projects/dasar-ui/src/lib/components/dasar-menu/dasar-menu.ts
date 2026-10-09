import {
  booleanAttribute,
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  TemplateRef,
  ChangeDetectorRef,
  inject,
  HostListener,
  ElementRef,
  signal,
  Directive,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { resolveThemeDefault } from '../../utils/common';

export type DasarMenuPlacementType = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type DasarMenuSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarMenuAppearanceType = 'none' | 'outline' | 'filled';
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
  label?: string;
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

@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarMenuPrefixSlot {}
@Directive({ selector: '[suffix-slot]', standalone: true })
export class DasarMenuSuffixSlot {}
@Directive({ selector: '[menu-label-slot]', standalone: true })
export class DasarMenuLabelSlot {}
@Directive({ selector: '[menu-item-template]', standalone: true })
export class DasarMenuItemTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Component({
  imports: [CommonModule, DasarIconComponent],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-menu.scss'],
  templateUrl: './dasar-menu.html',
  selector: 'dasar-menu',
  standalone: true,
})
export class DasarMenu {
  @ContentChild(DasarMenuItemTemplate) providedMenuItem?: DasarMenuItemTemplate;
  @ContentChild(DasarMenuLabelSlot) providedMenuLabel?: DasarMenuLabelSlot;
  @ContentChild(DasarMenuPrefixSlot) providedMenuPrefix?: DasarMenuPrefixSlot;
  @ContentChild(DasarMenuSuffixSlot) providedMenuSuffix?: DasarMenuSuffixSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  isOpen = signal<boolean>(false);

  @Input() placement = resolveThemeDefault(
    'menu',
    'placement',
    'bottom-start',
    this.themeProvider,
    this.themeService,
  );

  @Input() appearance = resolveThemeDefault(
    'menu',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );

  @Input() radius = resolveThemeDefault(
    'menu',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );

  @Input() size = resolveThemeDefault('menu', 'size', 'md', this.themeProvider, this.themeService);
  @Input() label = resolveThemeDefault(
    'menu',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() items = resolveThemeDefault('menu', 'items', [], this.themeProvider, this.themeService);
  @Input() containerStyle = resolveThemeDefault(
    'menu',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() panelStyle = resolveThemeDefault(
    'menu',
    'panelStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() itemStyle = resolveThemeDefault(
    'menu',
    'itemStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() containerClass = resolveThemeDefault(
    'menu',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() panelClass = resolveThemeDefault(
    'menu',
    'panelClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input() itemClass = resolveThemeDefault(
    'menu',
    'itemClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'menu',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'menu',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Output() onItemClick = new EventEmitter<DasarMenuItem>();
  @Output() onPanelOpen = new EventEmitter<void>();
  @Output() onPanelClose = new EventEmitter<void>();

  @HostBinding('class.dasar-menu') readonly baseClass = true;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen()) {
        this.close();
      }
    }
  }
  @HostListener('document:dasar-menu:opened', ['$event'])
  onGlobalSelectOpened(event: any): void {
    if (event.detail !== this && this.isOpen()) {
      this.close();
    }
  }

  get hasMenuLabel(): boolean {
    return !!this.providedMenuLabel;
  }
  get hasMenuItem(): boolean {
    return !!this.providedMenuItem;
  }

  toggle(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.disabled) return;
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }
  open(): void {
    if (this.disabled || this.isOpen()) return;
    this.isOpen.set(true);
    this.onPanelClose.emit();
    // Broadcast globally that this menu instance just opened
    const openEvent = new CustomEvent('dasar-menu:opened', { detail: this });
    document.dispatchEvent(openEvent);
  }
  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.onPanelClose.emit();
  }
  onItemSelect(item: DasarMenuItem, event: Event): void {
    event.stopPropagation();
    if (item.disabled || item.divider) return;
    this.onItemClick.emit(item);
    this.close();
  }
}

export const DasarMenuComponent = [
  DasarMenuLabelSlot,
  DasarMenuItemTemplate,
  DasarMenuPrefixSlot,
  DasarMenuSuffixSlot,
  DasarMenu,
] as const;
