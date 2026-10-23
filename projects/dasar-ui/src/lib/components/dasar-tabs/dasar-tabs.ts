import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  Output,
  PLATFORM_ID,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  booleanAttribute,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';
import { DasarButtonComponent, DasarButtonSizeType } from '../dasar-button/dasar-button';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';

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
  scrollLeftIconName?: string;
  scrollRightIconName?: string;
  scrollButtonClass?: ClassType;
  scrollButtonStyle?: StyleType;
}

@Directive({
  selector: '[tab-item-slot]',
  standalone: true,
})
export class DasarTabItemSlotDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[tabs-scroll-left-slot]',
  standalone: true,
})
export class DasarTabsScrollLeftSlotDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[tabs-scroll-right-slot]',
  standalone: true,
})
export class DasarTabsScrollRightSlotDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'dasar-tabs',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, DasarButtonComponent, DasarIconComponent],
  templateUrl: './dasar-tabs.html',
  styleUrls: ['./dasar-tabs.scss'],
})
export class DasarTabs implements OnChanges, AfterViewInit {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private zone = inject(NgZone, { optional: true });
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  @ContentChildren(DasarTabItemSlotDirective)
  tabItemSlotDirectives!: QueryList<DasarTabItemSlotDirective>;

  @ContentChild(DasarTabsScrollLeftSlotDirective) scrollLeftSlot?: DasarTabsScrollLeftSlotDirective;
  @ContentChild(DasarTabsScrollRightSlotDirective)
  scrollRightSlot?: DasarTabsScrollRightSlotDirective;

  @ViewChild('tabsList') tabsList?: ElementRef<HTMLElement>;

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

  @Input({ alias: 'scroll-left-icon-name' }) scrollLeftIconName = resolveThemeDefault(
    'tabs',
    'scrollLeftIconName',
    'chevron-left',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'scroll-right-icon-name' }) scrollRightIconName = resolveThemeDefault(
    'tabs',
    'scrollRightIconName',
    'chevron-right',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'scroll-button-class' }) scrollButtonClass = resolveThemeDefault(
    'tabs',
    'scrollButtonClass',
    '' as ClassType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'scroll-button-style' }) scrollButtonStyle = resolveThemeDefault(
    'tabs',
    'scrollButtonStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'active-index' }) activeIndex = 0;
  @Input() items: string[] = [];

  @Output() onTabsChange = new EventEmitter<number>();
  @Output() onTabsClick = new EventEmitter<number>();

  @HostBinding('class.dasar-tabs') readonly baseClass = true;

  readonly overflowing = signal(false);
  readonly canScrollLeft = signal(false);
  readonly canScrollRight = signal(false);

  private sizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private measureRequest = 0;

  private readonly onScroll = () => this.updateScrollState();

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
    this.scrollActiveIntoView();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (changes['activeIndex'] && !changes['activeIndex'].firstChange) {
      this.scrollActiveIntoView();
    }

    if (
      changes['items'] ||
      changes['size'] ||
      changes['spacing'] ||
      changes['fluid'] ||
      changes['appearance']
    ) {
      this.scheduleMeasure();
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (typeof ResizeObserver !== 'undefined') {
      this.outside(() => {
        this.sizeObserver = new ResizeObserver(() => this.scheduleMeasure());
        this.mutationObserver =
          typeof MutationObserver !== 'undefined'
            ? new MutationObserver(() => this.scheduleMeasure())
            : null;

        if (this.tabsList) {
          this.sizeObserver.observe(this.tabsList.nativeElement);
          this.mutationObserver?.observe(this.tabsList.nativeElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
          });
          this.tabsList.nativeElement.addEventListener('scroll', this.onScroll, { passive: true });
        }
      });
    }

    this.destroyRef.onDestroy(() => {
      this.sizeObserver?.disconnect();
      this.mutationObserver?.disconnect();
      this.tabsList?.nativeElement.removeEventListener('scroll', this.onScroll);
      if (this.measureRequest) cancelAnimationFrame(this.measureRequest);
    });

    this.updateScrollState();
  }

  updateScrollState() {
    const el = this.tabsList?.nativeElement;
    if (!el || this.destroyRef.destroyed) return;

    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;
    const scrollLeft = el.scrollLeft;
    const drift = 2;

    this.overflowing.set(scrollWidth - clientWidth > drift);
    this.canScrollLeft.set(scrollLeft > drift);
    this.canScrollRight.set(scrollLeft + clientWidth < scrollWidth - drift);
    this.cdr.markForCheck();
  }

  scrollBy(direction: -1 | 1) {
    const el = this.tabsList?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  scrollActiveIntoView() {
    const el = this.tabsList?.nativeElement;
    if (!el) return;
    const triggers = el.querySelectorAll<HTMLElement>('.dasar-tab-trigger-btn');
    triggers[this.activeIndex]?.scrollIntoView?.({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }

  private scheduleMeasure() {
    if (!isPlatformBrowser(this.platformId) || this.measureRequest) return;
    this.measureRequest = requestAnimationFrame(() => {
      this.measureRequest = 0;
      this.updateScrollState();
    });
  }

  private outside<T>(fn: () => T): T {
    return this.zone ? this.zone.runOutsideAngular(fn) : fn();
  }
}

export const DasarTabsComponent = [
  DasarTabs,
  DasarTabItemSlotDirective,
  DasarTabsScrollLeftSlotDirective,
  DasarTabsScrollRightSlotDirective,
] as const;
