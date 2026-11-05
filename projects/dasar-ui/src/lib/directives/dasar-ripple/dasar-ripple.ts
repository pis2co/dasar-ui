import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Directive, ElementRef, PLATFORM_ID, Renderer2, inject } from '@angular/core';

const RIPPLE_STYLES_ID = 'dasar-ripple-styles';
const RIPPLE_STYLES = `
  .dasar-ripple-host[data-dasar-ripple-hover] {
    cursor: pointer;
  }

  .dasar-ripple-effect {
    position: absolute;
    z-index: 1;
    display: block;
    border-radius: 50%;
    pointer-events: none;
    background-color: var(--dasar-ripple-color, currentColor);
    opacity: 0.18;
    transform: scale(0);
    animation: dasar-ripple-expand 500ms ease-out forwards;
  }

  @keyframes dasar-ripple-expand {
    to {
      transform: scale(1);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dasar-ripple-effect {
      animation-duration: 1ms;
    }
  }
`;

@Directive({
  selector: '[dasarRipple]',
  standalone: true,
})
export class DasarRippleDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = this.elementRef.nativeElement;
  private readonly listenerCleanups: Array<() => void> = [];
  private readonly rippleCleanups = new Map<HTMLElement, () => void>();
  private readonly originalPosition: string;
  private readonly originalPositionPriority: string;
  private readonly originalOverflow: string;
  private readonly originalOverflowPriority: string;
  private readonly originalHoverAttribute: string | null;
  private readonly addedHostClass: boolean;

  constructor() {
    this.originalPosition = this.host.style.position;
    this.originalPositionPriority = this.host.style.getPropertyPriority('position');
    this.originalOverflow = this.host.style.overflow;
    this.originalOverflowPriority = this.host.style.getPropertyPriority('overflow');
    this.originalHoverAttribute = this.host.getAttribute('data-dasar-ripple-hover');
    this.addedHostClass = !this.host.classList.contains('dasar-ripple-host');

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ensureStyles();
    this.renderer.addClass(this.host, 'dasar-ripple-host');
    this.prepareHostStyles();
    this.listen('pointerenter', () => this.setHoverState(true));
    this.listen('pointerleave', () => this.setHoverState(false));
    this.listen('pointerdown', (event: PointerEvent) => this.createRipple(event));

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  private ensureStyles(): void {
    if (this.document.getElementById(RIPPLE_STYLES_ID)) {
      return;
    }

    const style = this.renderer.createElement('style') as HTMLStyleElement;
    this.renderer.setAttribute(style, 'id', RIPPLE_STYLES_ID);
    style.textContent = RIPPLE_STYLES;
    this.renderer.appendChild(this.document.head ?? this.document.documentElement, style);
  }

  private prepareHostStyles(): void {
    const view = this.document.defaultView;
    const computed = view?.getComputedStyle(this.host);

    if (!computed || !['relative', 'absolute', 'fixed', 'sticky'].includes(computed.position)) {
      this.host.style.setProperty('position', 'relative', 'important');
    }

    if (!computed || computed.overflow === 'visible' || !computed.overflow) {
      this.host.style.setProperty('overflow', 'hidden', 'important');
    }
  }

  private listen(eventName: string, callback: (event: PointerEvent) => void): void {
    this.listenerCleanups.push(this.renderer.listen(this.host, eventName, callback));
  }

  private setHoverState(hovering: boolean): void {
    if (hovering) {
      this.renderer.setAttribute(this.host, 'data-dasar-ripple-hover', '');
    } else if (this.originalHoverAttribute === null) {
      this.renderer.removeAttribute(this.host, 'data-dasar-ripple-hover');
    } else {
      this.renderer.setAttribute(this.host, 'data-dasar-ripple-hover', this.originalHoverAttribute);
    }
  }

  private createRipple(event: PointerEvent): void {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    const bounds = this.host.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const diameter = Math.max(
      1,
      Math.ceil(
        2 *
          Math.max(
            Math.hypot(x, y),
            Math.hypot(bounds.width - x, y),
            Math.hypot(x, bounds.height - y),
            Math.hypot(bounds.width - x, bounds.height - y),
          ),
      ),
    );

    const ripple = this.renderer.createElement('span') as HTMLSpanElement;
    this.renderer.addClass(ripple, 'dasar-ripple-effect');
    this.renderer.setAttribute(ripple, 'aria-hidden', 'true');
    this.renderer.setStyle(ripple, 'width', `${diameter}px`);
    this.renderer.setStyle(ripple, 'height', `${diameter}px`);
    this.renderer.setStyle(ripple, 'left', `${x - diameter / 2}px`);
    this.renderer.setStyle(ripple, 'top', `${y - diameter / 2}px`);
    this.renderer.appendChild(this.host, ripple);

    const unlisten = this.renderer.listen(ripple, 'animationend', () => removeRipple());
    const timeoutId = view.setTimeout(() => removeRipple(), 600);
    const removeRipple = () => {
      if (!this.rippleCleanups.has(ripple)) {
        return;
      }
      view.clearTimeout(timeoutId);
      unlisten();
      this.renderer.removeChild(this.host, ripple);
      this.rippleCleanups.delete(ripple);
    };
    this.rippleCleanups.set(ripple, removeRipple);
  }

  private cleanup(): void {
    for (const unlisten of this.listenerCleanups) {
      unlisten();
    }
    this.listenerCleanups.length = 0;

    for (const removeRipple of this.rippleCleanups.values()) {
      removeRipple();
    }

    if (isPlatformBrowser(this.platformId)) {
      if (this.originalHoverAttribute === null) {
        this.renderer.removeAttribute(this.host, 'data-dasar-ripple-hover');
      } else {
        this.renderer.setAttribute(
          this.host,
          'data-dasar-ripple-hover',
          this.originalHoverAttribute,
        );
      }

      if (this.addedHostClass) {
        this.renderer.removeClass(this.host, 'dasar-ripple-host');
      }
      this.restoreStyle('position', this.originalPosition, this.originalPositionPriority);
      this.restoreStyle('overflow', this.originalOverflow, this.originalOverflowPriority);
    }
  }

  private restoreStyle(property: string, value: string, priority: string): void {
    if (value) {
      this.host.style.setProperty(property, value, priority);
    } else {
      this.renderer.removeStyle(this.host, property);
    }
  }
}
