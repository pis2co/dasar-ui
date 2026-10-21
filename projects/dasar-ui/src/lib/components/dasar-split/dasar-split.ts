import {
  booleanAttribute,
  ViewEncapsulation,
  EventEmitter,
  Component,
  Output,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  Input,
  signal,
  afterNextRender,
  PLATFORM_ID,
  Injector,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';
import { clampSplitSize, DasarSplitLength, resolveSplitLength } from './dasar-split.utils';

export type DasarSplitDirection = 'horizontal' | 'vertical';

export interface DasarSplitConfig {
  direction?: DasarSplitDirection;
  size?: DasarSplitLength;
  min?: DasarSplitLength;
  max?: DasarSplitLength;
  containerStyle?: StyleType;
  containerClass?: ClassType;
  firstPanelStyle?: StyleType;
  firstPanelClass?: ClassType;
  secondPanelStyle?: StyleType;
  secondPanelClass?: ClassType;
}

const KEYBOARD_STEP = 10;
const KEYBOARD_STEP_LARGE = 50;

@Component({
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-split.html',
  styleUrls: ['./dasar-split.scss'],
  selector: 'dasar-split',
  standalone: true,
})
export class DasarSplit implements OnDestroy {
  @ViewChild('container', { static: true }) private containerRef!: ElementRef<HTMLElement>;
  @ViewChild('firstPanel', { static: true }) private firstPanelRef!: ElementRef<HTMLElement>;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private platformId = inject(PLATFORM_ID);
  private injector = inject(Injector);

  private observer: ResizeObserver | null = null;
  private dragStart: { pointer: number; size: number } | null = null;
  private _size: DasarSplitLength = '50%';

  protected readonly dragging = signal(false);
  protected readonly pixelSize = signal<number | null>(null);
  private readonly containerSize = signal(0);

  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() direction = resolveThemeDefault(
    'split',
    'direction',
    'horizontal' as DasarSplitDirection,
    this.themeProvider,
    this.themeService,
  );
  @Input() set size(value: DasarSplitLength) {
    this._size = value;
    this.pixelSize.set(null);
  }
  get size(): DasarSplitLength {
    return this._size;
  }
  @Input() min = resolveThemeDefault(
    'split',
    'min',
    0 as DasarSplitLength,
    this.themeProvider,
    this.themeService,
  );
  @Input() max = resolveThemeDefault(
    'split',
    'max',
    '100%' as DasarSplitLength,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'split',
    'containerStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'split',
    'containerClass',
    null as ClassType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'first-panel-style' }) firstPanelStyle = resolveThemeDefault(
    'split',
    'firstPanelStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'first-panel-class' }) firstPanelClass = resolveThemeDefault(
    'split',
    'firstPanelClass',
    null as ClassType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'second-panel-style' }) secondPanelStyle = resolveThemeDefault(
    'split',
    'secondPanelStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'second-panel-class' }) secondPanelClass = resolveThemeDefault(
    'split',
    'secondPanelClass',
    null as ClassType,
    this.themeProvider,
    this.themeService,
  );

  @Output() sizeChange = new EventEmitter<number>();
  @Output() onDragStart = new EventEmitter<number>();
  @Output() onDragEnd = new EventEmitter<number>();
  @Output() onUpdateSize = new EventEmitter<number>();

  constructor() {
    afterNextRender(
      () => {
        if (!isPlatformBrowser(this.platformId)) return;
        this.containerSize.set(this.measureContainer());
        if (typeof ResizeObserver === 'undefined') return;
        this.observer = new ResizeObserver(() => this.containerSize.set(this.measureContainer()));
        this.observer.observe(this.containerRef.nativeElement);
      },
      { injector: this.injector },
    );
  }

  protected get isHorizontal(): boolean {
    return this.direction !== 'vertical';
  }

  protected get firstPanelBasis(): string {
    const px = this.pixelSize();
    if (px !== null) return `${px}px`;
    const raw = this._size;
    return this.toCss(raw);
  }

  protected get minCss(): string {
    return this.toCss(this.min);
  }

  protected get maxCss(): string {
    return this.toCss(this.max);
  }

  protected get currentSize(): number {
    return this.pixelSize() ?? this.resolveInitialSize();
  }

  protected get minPx(): number {
    return resolveSplitLength(this.min, this.containerSize()) ?? 0;
  }

  protected get maxPx(): number {
    return resolveSplitLength(this.max, this.containerSize()) ?? this.containerSize();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  protected onPointerDown(event: PointerEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    const size = this.measureFirstPanel();
    this.dragStart = { pointer: this.isHorizontal ? event.clientX : event.clientY, size };
    this.containerSize.set(this.measureContainer());
    this.dragging.set(true);
    this.onDragStart.emit(size);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragStart) return;
    const pointer = this.isHorizontal ? event.clientX : event.clientY;
    this.applySize(this.dragStart.size + pointer - this.dragStart.pointer);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragStart) return;
    (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.dragStart = null;
    this.dragging.set(false);
    this.onDragEnd.emit(this.currentSize);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled) return;
    const forward = this.isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const backward = this.isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const step = event.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
    const current = this.measureFirstPanel();
    let next: number;
    if (event.key === forward) next = current + step;
    else if (event.key === backward) next = current - step;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = this.containerSize();
    else return;
    event.preventDefault();
    this.containerSize.set(this.measureContainer());
    this.applySize(next);
  }

  private applySize(raw: number): void {
    const container = this.containerSize();
    const next = clampSplitSize(
      raw,
      resolveSplitLength(this.min, container),
      resolveSplitLength(this.max, container),
      container,
    );
    if (next === (this.pixelSize() ?? this.measureFirstPanel())) return;
    this.pixelSize.set(next);
    this.sizeChange.emit(next);
    this.onUpdateSize.emit(next);
  }

  private toCss(value: DasarSplitLength): string {
    if (typeof value === 'number') return `${value}px`;
    return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
  }

  private resolveInitialSize(): number {
    return resolveSplitLength(this._size, this.containerSize()) ?? 0;
  }

  private measureContainer(): number {
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    return this.isHorizontal ? rect.width : rect.height;
  }

  private measureFirstPanel(): number {
    const rect = this.firstPanelRef.nativeElement.getBoundingClientRect();
    return Math.round(this.isHorizontal ? rect.width : rect.height);
  }
}

export const DasarSplitComponent = [DasarSplit] as const;
