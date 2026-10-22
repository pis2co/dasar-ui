import {
  ViewEncapsulation,
  EventEmitter,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  inject,
  Input,
  PLATFORM_ID,
  SimpleChanges,
  TemplateRef,
  InjectionToken,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';
import { DasarButton } from '../dasar-button/dasar-button';
import { DasarIcon } from '../dasar-icon/dasar-icon';
import { DasarToastService } from './dasar-toast.service';
import { DasarToastContext, DasarToastItem, DasarToastVariant } from './dasar-toast.model';
import { DasarToastTimer, isInternalLink } from './dasar-toast.utils';

// Optional function that handles internal links, for example with the Angular router.
export const DASAR_TOAST_NAVIGATOR = new InjectionToken<(to: string) => void>(
  'DASAR_TOAST_NAVIGATOR',
);

const ANIMATION_FALLBACK_MS = 400;

@Component({
  imports: [CommonModule, DasarButton, DasarIcon],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-toast.html',
  styleUrls: ['./dasar-toast.scss'],
  selector: 'dasar-toast',
  standalone: true,
  host: {
    '[class.dasar-toast-host]': 'true',
    '[style.--dasar-toast-index]': 'index',
  },
})
export class DasarToast implements OnInit, OnChanges, OnDestroy {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private service = inject(DasarToastService);
  private navigator = inject(DASAR_TOAST_NAVIGATOR, { optional: true });
  private platformId = inject(PLATFORM_ID);

  private timer: DasarToastTimer | null = null;
  private enterTimer: ReturnType<typeof setTimeout> | null = null;
  private leaveTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly defaultDuration = resolveThemeDefault(
    'toast',
    'duration',
    4000,
    this.themeProvider,
    this.themeService,
  );
  private readonly defaultCloseable = resolveThemeDefault(
    'toast',
    'closeable',
    false,
    this.themeProvider,
    this.themeService,
  );
  private readonly defaultVariant = resolveThemeDefault(
    'toast',
    'variant',
    'secondary' as DasarToastVariant,
    this.themeProvider,
    this.themeService,
  );
  private readonly defaultAliveOnHover = resolveThemeDefault(
    'toast',
    'aliveOnHover',
    true,
    this.themeProvider,
    this.themeService,
  );
  protected readonly closeIconName = resolveThemeDefault(
    'toast',
    'closeIconName',
    'x',
    this.themeProvider,
    this.themeService,
  );

  @Input({ required: true }) item!: DasarToastItem;
  @Input() index = 0;
  @Input() labelSlot?: TemplateRef<DasarToastContext>;
  @Input() captionSlot?: TemplateRef<DasarToastContext>;
  @Input() contentSlot?: TemplateRef<DasarToastContext>;
  @Input() closeSlot?: TemplateRef<DasarToastContext>;

  @Output() entered = new EventEmitter<number>();

  protected get duration(): number {
    return this.item.options.duration ?? this.defaultDuration;
  }

  protected get closeable(): boolean {
    return this.item.options.closeable ?? this.defaultCloseable;
  }

  protected get variant(): DasarToastVariant {
    return this.item.options.variant ?? this.defaultVariant;
  }

  protected get aliveOnHover(): boolean {
    return this.item.options.aliveOnHover ?? this.defaultAliveOnHover;
  }

  protected get role(): string {
    return this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status';
  }

  protected get stringContent(): string | null {
    const content = this.item.options.content;
    return typeof content === 'string' ? content : null;
  }

  protected get templateContent(): TemplateRef<DasarToastContext> | null {
    const content = this.item.options.content;
    return content && typeof content !== 'string' ? content : null;
  }

  protected get context(): DasarToastContext {
    return { $implicit: this.item, toast: this.item, close: () => this.closeByButton() };
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.timer = new DasarToastTimer(this.duration, () =>
      this.service.close(this.item.id, 'timeout'),
    );
    this.timer.start();
    this.enterTimer = setTimeout(() => this.markEntered(), ANIMATION_FALLBACK_MS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const item = changes['item'];
    if (!item || item.firstChange) return;
    if (this.item.state === 'leaving' && !this.leaveTimer) {
      this.timer?.clear();
      this.leaveTimer = setTimeout(() => this.finishLeave(), ANIMATION_FALLBACK_MS);
    }
  }

  ngOnDestroy(): void {
    this.timer?.clear();
    if (this.enterTimer) clearTimeout(this.enterTimer);
    if (this.leaveTimer) clearTimeout(this.leaveTimer);
  }

  protected pause(): void {
    if (this.aliveOnHover && this.item.state !== 'leaving') this.timer?.pause();
  }

  protected resume(): void {
    if (this.aliveOnHover && this.item.state !== 'leaving') this.timer?.start();
  }

  protected closeByButton(): void {
    this.service.close(this.item.id, 'button');
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    this.closeByButton();
  }

  protected onAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget) return;
    if (this.item.state === 'leaving') this.finishLeave();
    else this.markEntered();
  }

  protected onLinkClick(event: MouseEvent): void {
    const to = this.item.options.to;
    if (!to || !this.navigator || !isInternalLink(to)) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button > 0) return;
    event.preventDefault();
    this.navigator(to);
  }

  private markEntered(): void {
    if (this.enterTimer) clearTimeout(this.enterTimer);
    this.enterTimer = null;
    this.entered.emit(this.item.id);
    this.service.entered(this.item.id);
  }

  private finishLeave(): void {
    if (this.leaveTimer) clearTimeout(this.leaveTimer);
    this.leaveTimer = null;
    this.service.remove(this.item.id);
  }
}
