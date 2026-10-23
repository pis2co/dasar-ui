import {
  booleanAttribute,
  ViewEncapsulation,
  EventEmitter,
  ContentChild,
  HostBinding,
  HostListener,
  forwardRef,
  Component,
  Directive,
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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { resolveThemeDefault } from '../../utils/common';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { DasarOverlayComponent } from '../dasar-overlay/dasar-overlay';

export type DasarDrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
export type DasarDrawerLength = string | number;

export interface DasarDrawerConfig {
  placement?: DasarDrawerPlacement;
  label?: string;
  closable?: boolean;
  resizable?: boolean;
  width?: DasarDrawerLength;
  height?: DasarDrawerLength;
  minWidth?: DasarDrawerLength;
  maxWidth?: DasarDrawerLength;
  minHeight?: DasarDrawerLength;
  maxHeight?: DasarDrawerLength;
  zIndex?: number;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  overlayBlur?: string;
  overlayBackground?: string;
  headerFluid?: boolean;
  bodyFluid?: boolean;
  actionFluid?: boolean;
  containerStyle?: StyleType;
  headerStyle?: StyleType;
  bodyStyle?: StyleType;
  actionStyle?: StyleType;
  containerClass?: ClassType;
  headerClass?: ClassType;
  bodyClass?: ClassType;
  actionClass?: ClassType;
}

@Directive({ selector: '[header-slot]', standalone: true })
export class DasarDrawerHeaderSlot {}
@Directive({ selector: '[closeable-slot]', standalone: true })
export class DasarDrawerCloseableSlot {}
@Directive({ selector: '[action-slot]', standalone: true })
export class DasarDrawerActionSlot {}

const ANIMATION_FALLBACK_MS = 400;
const KEYBOARD_RESIZE_STEP = 16;
const DEFAULT_MIN_SIZE = 200;

const toCssLength = (value: DasarDrawerLength | null | undefined): string | null => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return `${value}px`;
  return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
};

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarDrawer),
      multi: true,
    },
  ],
  imports: [CommonModule, DasarButtonComponent, DasarIconComponent, DasarOverlayComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-drawer.html',
  styleUrls: ['./dasar-drawer.scss'],
  selector: 'dasar-drawer',
  standalone: true,
})
export class DasarDrawer implements ControlValueAccessor, OnDestroy {
  @ContentChild(DasarDrawerHeaderSlot) providedHeader?: DasarDrawerHeaderSlot;
  @ContentChild(DasarDrawerCloseableSlot) providedCloseable?: DasarDrawerCloseableSlot;
  @ContentChild(DasarDrawerActionSlot) providedAction?: DasarDrawerActionSlot;
  @ViewChild('panel') private panelRef?: ElementRef<HTMLElement>;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private injector = inject(Injector);

  private animationTimer: ReturnType<typeof setTimeout> | null = null;
  private previousOverflow: string | null = null;
  private previousFocus: HTMLElement | null = null;
  private entered = false;
  private resizeStart: { pointer: number; size: number } | null = null;
  private _show = false;

  protected readonly rendered = signal(false);
  protected readonly leaving = signal(false);
  protected readonly resizing = signal(false);
  protected readonly resizedWidth = signal<number | null>(null);
  protected readonly resizedHeight = signal<number | null>(null);

  @Input() placement = resolveThemeDefault(
    'drawer',
    'placement',
    'right' as DasarDrawerPlacement,
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault(
    'drawer',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) closable = resolveThemeDefault(
    'drawer',
    'closable',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) resizable = resolveThemeDefault(
    'drawer',
    'resizable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() set width(value: DasarDrawerLength) {
    this._width = value;
    this.resizedWidth.set(null);
  }
  get width(): DasarDrawerLength {
    return this._width;
  }
  private _width: DasarDrawerLength = resolveThemeDefault(
    'drawer',
    'width',
    '378px' as DasarDrawerLength,
    this.themeProvider,
    this.themeService,
  );
  @Input() set height(value: DasarDrawerLength) {
    this._height = value;
    this.resizedHeight.set(null);
  }
  get height(): DasarDrawerLength {
    return this._height;
  }
  private _height: DasarDrawerLength = resolveThemeDefault(
    'drawer',
    'height',
    '378px' as DasarDrawerLength,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'min-width' }) minWidth = resolveThemeDefault(
    'drawer',
    'minWidth',
    DEFAULT_MIN_SIZE as DasarDrawerLength,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'max-width' }) maxWidth = resolveThemeDefault(
    'drawer',
    'maxWidth',
    '100vw' as DasarDrawerLength,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'min-height' }) minHeight = resolveThemeDefault(
    'drawer',
    'minHeight',
    DEFAULT_MIN_SIZE as DasarDrawerLength,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'max-height' }) maxHeight = resolveThemeDefault(
    'drawer',
    'maxHeight',
    '100vh' as DasarDrawerLength,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'z-index' }) zIndex = resolveThemeDefault(
    'drawer',
    'zIndex',
    1000,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'close-on-overlay', transform: booleanAttribute }) closeOnOverlay =
    resolveThemeDefault('drawer', 'closeOnOverlay', true, this.themeProvider, this.themeService);
  @Input({ alias: 'close-on-escape', transform: booleanAttribute }) closeOnEscape =
    resolveThemeDefault('drawer', 'closeOnEscape', true, this.themeProvider, this.themeService);
  @Input({ alias: 'overlay-blur' }) overlayBlur = resolveThemeDefault(
    'drawer',
    'overlayBlur',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'overlay-background' }) overlayBackground = resolveThemeDefault(
    'drawer',
    'overlayBackground',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-fluid', transform: booleanAttribute }) headerFluid = resolveThemeDefault(
    'drawer',
    'headerFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-fluid', transform: booleanAttribute }) bodyFluid = resolveThemeDefault(
    'drawer',
    'bodyFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-fluid', transform: booleanAttribute }) actionFluid = resolveThemeDefault(
    'drawer',
    'actionFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'drawer',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-style' }) headerStyle = resolveThemeDefault(
    'drawer',
    'headerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-style' }) bodyStyle = resolveThemeDefault(
    'drawer',
    'bodyStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-style' }) actionStyle = resolveThemeDefault(
    'drawer',
    'actionStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'drawer',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-class' }) headerClass = resolveThemeDefault(
    'drawer',
    'headerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-class' }) bodyClass = resolveThemeDefault(
    'drawer',
    'bodyClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-class' }) actionClass = resolveThemeDefault(
    'drawer',
    'actionClass',
    null,
    this.themeProvider,
    this.themeService,
  );

  @Input({ transform: booleanAttribute })
  set show(value: boolean) {
    this.applyShow(value);
  }
  get show(): boolean {
    return this._show;
  }

  @Output() showChange = new EventEmitter<boolean>();
  @Output() onUpdateValue = new EventEmitter<boolean>();
  @Output() onWidthUpdate = new EventEmitter<number>();
  @Output() onHeightUpdate = new EventEmitter<number>();
  @Output() onAfterEnter = new EventEmitter<void>();
  @Output() onAfterLeave = new EventEmitter<void>();

  @HostBinding('class.dasar-drawer') readonly baseClass = true;
  @HostBinding('class.open') get isOpen(): boolean {
    return this._show;
  }

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  get hasHeader(): boolean {
    return !!this.providedHeader;
  }
  get hasCloseable(): boolean {
    return !!this.providedCloseable;
  }
  get hasAction(): boolean {
    return !!this.providedAction;
  }
  get isHorizontal(): boolean {
    return this.placement === 'left' || this.placement === 'right';
  }

  get overlayClasses(): Record<string, boolean> {
    return {
      'dasar-drawer-overlay': true,
      [`placement-${this.placement}`]: true,
      leaving: this.leaving(),
    };
  }

  get panelWidth(): string | null {
    if (!this.isHorizontal) return null;
    const resized = this.resizedWidth();
    return resized !== null ? `${resized}px` : toCssLength(this._width);
  }
  get panelHeight(): string | null {
    if (this.isHorizontal) return null;
    const resized = this.resizedHeight();
    return resized !== null ? `${resized}px` : toCssLength(this._height);
  }
  get panelMinWidth(): string | null {
    return this.isHorizontal ? toCssLength(this.minWidth) : null;
  }
  get panelMaxWidth(): string | null {
    return this.isHorizontal ? toCssLength(this.maxWidth) : null;
  }
  get panelMinHeight(): string | null {
    return this.isHorizontal ? null : toCssLength(this.minHeight);
  }
  get panelMaxHeight(): string | null {
    return this.isHorizontal ? null : toCssLength(this.maxHeight);
  }

  writeValue(value: boolean | null): void {
    this.applyShow(!!value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  close(): void {
    if (!this._show) return;
    this.applyShow(false);
    this.showChange.emit(false);
    this.onUpdateValue.emit(false);
    this.onChange(false);
    this.onTouched();
  }

  handleOverlayClick(): void {
    if (this.closeOnOverlay) this.close();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this._show && this.closeOnEscape) this.close();
  }

  onAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget) return;
    if (!(event.animationName ?? '').startsWith('dasar-drawer')) return;
    if (this.leaving()) {
      this.finishLeave();
    } else {
      this.finishEnter();
    }
  }

  onResizeStart(event: PointerEvent): void {
    const panel = this.panelRef?.nativeElement;
    if (!panel || !this.resizable) return;
    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    const rect = panel.getBoundingClientRect();
    this.resizeStart = this.isHorizontal
      ? { pointer: event.clientX, size: rect.width }
      : { pointer: event.clientY, size: rect.height };
    this.resizing.set(true);
  }

  onResizeMove(event: PointerEvent): void {
    if (!this.resizeStart) return;
    const pointer = this.isHorizontal ? event.clientX : event.clientY;
    const delta = pointer - this.resizeStart.pointer;
    const grows = this.placement === 'left' || this.placement === 'top' ? delta : -delta;
    this.setSize(this.resizeStart.size + grows);
  }

  onResizeEnd(event: PointerEvent): void {
    if (!this.resizeStart) return;
    (event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId);
    this.resizeStart = null;
    this.resizing.set(false);
    this.emitSize();
  }

  onResizeKeydown(event: KeyboardEvent): void {
    const panel = this.panelRef?.nativeElement;
    if (!panel || !this.resizable) return;
    const growKey = {
      left: 'ArrowRight',
      right: 'ArrowLeft',
      top: 'ArrowDown',
      bottom: 'ArrowUp',
    }[this.placement];
    const shrinkKey = {
      left: 'ArrowLeft',
      right: 'ArrowRight',
      top: 'ArrowUp',
      bottom: 'ArrowDown',
    }[this.placement];
    if (event.key !== growKey && event.key !== shrinkKey) return;
    event.preventDefault();
    const rect = panel.getBoundingClientRect();
    const current = this.isHorizontal ? rect.width : rect.height;
    this.setSize(current + (event.key === growKey ? KEYBOARD_RESIZE_STEP : -KEYBOARD_RESIZE_STEP));
    this.emitSize();
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.unlockScroll();
  }

  private setSize(size: number): void {
    const axis = this.isHorizontal ? 'width' : 'height';
    const viewport = this.viewportSize();
    const min = this.toPixels(axis === 'width' ? this.minWidth : this.minHeight, viewport) ?? 0;
    const max =
      this.toPixels(axis === 'width' ? this.maxWidth : this.maxHeight, viewport) ?? viewport;
    const clamped = Math.round(Math.min(Math.max(size, min), Math.max(min, max)));
    (axis === 'width' ? this.resizedWidth : this.resizedHeight).set(clamped);
  }

  private emitSize(): void {
    if (this.isHorizontal) {
      const value = this.resizedWidth();
      if (value !== null) this.onWidthUpdate.emit(value);
    } else {
      const value = this.resizedHeight();
      if (value !== null) this.onHeightUpdate.emit(value);
    }
  }

  private viewportSize(): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    const view = this.document.defaultView;
    return (this.isHorizontal ? view?.innerWidth : view?.innerHeight) ?? 0;
  }

  private toPixels(value: DasarDrawerLength | null | undefined, viewport: number): number | null {
    if (typeof value === 'number') return value;
    if (!value) return null;
    const match = /^(\d+(?:\.\d+)?)(px|%|vw|vh)?$/.exec(value.trim());
    if (!match) return null;
    const amount = parseFloat(match[1]);
    return match[2] === '%' || match[2] === 'vw' || match[2] === 'vh'
      ? (amount / 100) * viewport
      : amount;
  }

  private applyShow(value: boolean): void {
    if (value === this._show) return;
    this._show = value;
    this.clearTimer();
    if (value) {
      this.entered = false;
      this.leaving.set(false);
      this.rendered.set(true);
      this.lockScroll();
      this.rememberFocus();
      this.animationTimer = setTimeout(() => this.finishEnter(), ANIMATION_FALLBACK_MS);
      afterNextRender(() => this.panelRef?.nativeElement.focus({ preventScroll: true }), {
        injector: this.injector,
      });
    } else if (this.rendered()) {
      this.unlockScroll();
      this.leaving.set(true);
      this.animationTimer = setTimeout(() => this.finishLeave(), ANIMATION_FALLBACK_MS);
    }
  }

  private finishEnter(): void {
    if (this.entered || !this._show) return;
    this.entered = true;
    this.clearTimer();
    this.onAfterEnter.emit();
  }

  private finishLeave(): void {
    if (!this.leaving()) return;
    this.clearTimer();
    this.leaving.set(false);
    this.rendered.set(false);
    this.restoreFocus();
    this.onAfterLeave.emit();
  }

  private clearTimer(): void {
    if (this.animationTimer) clearTimeout(this.animationTimer);
    this.animationTimer = null;
  }

  private lockScroll(): void {
    if (!isPlatformBrowser(this.platformId) || this.previousOverflow !== null) return;
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    if (!isPlatformBrowser(this.platformId) || this.previousOverflow === null) return;
    this.document.body.style.overflow = this.previousOverflow;
    this.previousOverflow = null;
  }

  private rememberFocus(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const active = this.document.activeElement;
    this.previousFocus = active instanceof HTMLElement ? active : null;
  }

  private restoreFocus(): void {
    this.previousFocus?.focus?.({ preventScroll: true });
    this.previousFocus = null;
  }
}

export const DasarDrawerComponent = [
  DasarDrawerHeaderSlot,
  DasarDrawerCloseableSlot,
  DasarDrawerActionSlot,
  DasarDrawer,
] as const;
