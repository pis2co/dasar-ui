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
  NgModule,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasarButton } from '../dasar-button/dasar-button';

export type DasarTabsRadiusType = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DasarTabsAppearanceType = 'solid' | 'subtle' | 'outline';
export type DasarTabsSizeType = 'compact' | 'normal';

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
  imports: [CommonModule, DasarButton],
  templateUrl: './dasar-tabs.html',
  styleUrls: ['./dasar-tabs.scss'],
})
export class DasarTabs {
  @ContentChildren(DasarTabItemSlotDirective)
  tabItemSlotDirectives!: QueryList<DasarTabItemSlotDirective>;

  @Input({ transform: booleanAttribute }) fluid: boolean = false;
  @Input() appearance: DasarTabsAppearanceType = 'subtle';
  @Input() radius: DasarTabsRadiusType = 'md';
  @Input() size: DasarTabsSizeType = 'normal';
  @Input() activeIndex: number = 0;
  @Input() items: string[] = [];

  @Input() containerStyle: Record<string, any> | null = null;
  @Input() contentStyle: Record<string, any> | null = null;
  @Input() listStyle: Record<string, any> | null = null;
  @Input() containerClass: string = '';
  @Input() contentClass: string = '';
  @Input() listClass: string = '';

  @Output() tabsChanged = new EventEmitter<number>();
  @Output() tabsClicked = new EventEmitter<number>();

  @HostBinding('class.dasar-tabs') readonly baseClass = true;

  selectTab(index: number) {
    this.activeIndex = index;
    this.tabsClicked.emit(index);
    this.tabsChanged.emit(index);
  }
}

@NgModule({
  imports: [DasarTabItemSlotDirective, DasarTabs],
  exports: [DasarTabItemSlotDirective, DasarTabs],
})
export class DasarTabsModule {}

export const DasarTabsComponent = [DasarTabs, DasarTabItemSlotDirective] as const;
