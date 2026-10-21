import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DasarLogoVariant = 'icon' | 'horizontal-light' | 'horizontal-dark' | 'monochrome';

/**
 * `<dasar-ui-logo>`
 * Scalable, zero-dependency Angular logo component for the Dasar UI framework.
 * Brand Color: #1b4d8e | Emblem: "D" with 2 foundation lines below.
 *
 * Usage:
 *   <dasar-ui-logo variant="icon" [size]="64"></dasar-ui-logo>
 *   <dasar-ui-logo variant="horizontal-dark" [size]="48"></dasar-ui-logo>
 *   <dasar-ui-logo variant="monochrome" [size]="32"></dasar-ui-logo>
 */
@Component({
  selector: 'dasar-ui-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ICON ONLY -->
    <svg
      *ngIf="variant === 'icon'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      [attr.width]="widthValue"
      [attr.height]="heightValue"
      fill="none"
      role="img"
      [attr.aria-label]="ariaLabel"
    >
      <defs>
        <linearGradient
          id="dasar-left-shield"
          x1="68"
          y1="32"
          x2="256"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#2563B0" />
          <stop offset="50%" stop-color="#1B4D8E" />
          <stop offset="100%" stop-color="#153E75" />
        </linearGradient>
        <linearGradient
          id="dasar-right-shield"
          x1="256"
          y1="32"
          x2="444"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#1B4D8E" />
          <stop offset="55%" stop-color="#143B6E" />
          <stop offset="100%" stop-color="#0D284D" />
        </linearGradient>
        <linearGradient
          id="dasar-d-grad"
          x1="164"
          y1="112"
          x2="364"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E2E8F0" />
        </linearGradient>
        <linearGradient
          id="dasar-line2-grad"
          x1="196"
          y1="362"
          x2="316"
          y2="386"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#7DD3FC" />
          <stop offset="100%" stop-color="#38BDF8" />
        </linearGradient>
        <filter id="dasar-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#06152D" flood-opacity="0.4" />
        </filter>
      </defs>
      <path d="M256 32 L68 112 L100 364 L256 480 Z" fill="url(#dasar-left-shield)" />
      <path d="M256 32 L444 112 L412 364 L256 480 Z" fill="url(#dasar-right-shield)" />
      <path
        d="M256 54 L92 124 L120 350 L256 452 L392 350 L420 124 Z"
        fill="#071936"
        fill-opacity="0.22"
      />
      <g filter="url(#dasar-shadow)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M164 126 C164 118.268 170.268 112 178 112 H264 C317.019 112 360 154.981 360 208 C360 261.019 317.019 304 264 304 H178 C170.268 304 164 297.732 164 290 V126 Z
             M208 152 V264 H264 C294.928 264 320 238.928 320 208 C320 177.072 294.928 152 264 152 H208 Z"
          fill="url(#dasar-d-grad)"
        />
        <rect x="164" y="326" width="184" height="24" rx="12" fill="#FFFFFF" />
        <rect x="196" y="364" width="120" height="24" rx="12" fill="url(#dasar-line2-grad)" />
      </g>
    </svg>

    <!-- HORIZONTAL LOCKUP (LIGHT OR DARK) -->
    <svg
      *ngIf="variant === 'horizontal-light' || variant === 'horizontal-dark'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 360"
      [attr.width]="horizontalWidthValue"
      [attr.height]="heightValue"
      fill="none"
      role="img"
      [attr.aria-label]="ariaLabel"
    >
      <defs>
        <linearGradient
          id="h-left-shield"
          x1="68"
          y1="32"
          x2="256"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#2563B0" />
          <stop offset="50%" stop-color="#1B4D8E" />
          <stop offset="100%" stop-color="#153E75" />
        </linearGradient>
        <linearGradient
          id="h-right-shield"
          x1="256"
          y1="32"
          x2="444"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#1B4D8E" />
          <stop offset="55%" stop-color="#143B6E" />
          <stop offset="100%" stop-color="#0D284D" />
        </linearGradient>
        <linearGradient
          id="h-line2-grad"
          x1="196"
          y1="362"
          x2="316"
          y2="386"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#7DD3FC" />
          <stop offset="100%" stop-color="#38BDF8" />
        </linearGradient>
        <linearGradient
          id="h-badge-grad"
          x1="740"
          y1="108"
          x2="924"
          y2="232"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#2563B0" />
          <stop offset="50%" stop-color="#1B4D8E" />
          <stop offset="100%" stop-color="#0D284D" />
        </linearGradient>
      </defs>
      <g transform="translate(24, 24) scale(0.61)">
        <path d="M256 32 L68 112 L100 364 L256 480 Z" fill="url(#h-left-shield)" />
        <path d="M256 32 L444 112 L412 364 L256 480 Z" fill="url(#h-right-shield)" />
        <path
          d="M256 54 L92 124 L120 350 L256 452 L392 350 L420 124 Z"
          fill="#071936"
          fill-opacity="0.22"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M164 126 C164 118.268 170.268 112 178 112 H264 C317.019 112 360 154.981 360 208 C360 261.019 317.019 304 264 304 H178 C170.268 304 164 297.732 164 290 V126 Z
             M208 152 V264 H264 C294.928 264 320 238.928 320 208 C320 177.072 294.928 152 264 152 H208 Z"
          fill="#FFFFFF"
        />
        <rect x="164" y="326" width="184" height="24" rx="12" fill="#FFFFFF" />
        <rect x="196" y="364" width="120" height="24" rx="12" fill="url(#h-line2-grad)" />
      </g>
      <text
        x="364"
        y="212"
        font-family="system-ui, -apple-system, 'Inter', 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif"
        font-size="128"
        font-weight="800"
        letter-spacing="-4"
        [attr.fill]="variant === 'horizontal-dark' ? '#F8FAFC' : '#0F172A'"
      >
        dasar
      </text>
      <rect x="740" y="108" width="184" height="124" rx="28" fill="url(#h-badge-grad)" />
      <text
        x="832"
        y="204"
        text-anchor="middle"
        font-family="system-ui, -apple-system, 'Inter', 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif"
        font-size="86"
        font-weight="900"
        letter-spacing="-2"
        fill="#FFFFFF"
      >
        UI
      </text>
      <text
        *ngIf="showTagline"
        x="370"
        y="268"
        font-family="system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif"
        font-size="24"
        font-weight="600"
        letter-spacing="6"
        [attr.fill]="variant === 'horizontal-dark' ? '#7DD3FC' : '#1B4D8E'"
      >
        ANGULAR UI FRAMEWORK
      </text>
    </svg>

    <!-- MONOCHROME STENCIL -->
    <svg
      *ngIf="variant === 'monochrome'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      [attr.width]="widthValue"
      [attr.height]="heightValue"
      fill="none"
      role="img"
      [attr.aria-label]="ariaLabel"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M256 32 L68 112 L100 364 L256 480 L412 364 L444 112 L256 32 Z
           M164 126 C164 118.268 170.268 112 178 112 H264 C317.019 112 360 154.981 360 208 C360 261.019 317.019 304 264 304 H178 C170.268 304 164 297.732 164 290 V126 Z
           M208 152 V264 H264 C294.928 264 320 238.928 320 208 C320 177.072 294.928 152 264 152 H208 Z
           M176 326 C169.373 326 164 331.373 164 338 C164 344.627 169.373 350 176 350 H336 C342.627 350 348 344.627 348 338 C348 331.373 342.627 326 336 326 H176 Z
           M208 364 C201.373 364 196 369.373 196 376 C196 382.627 201.373 388 208 388 H304 C310.627 388 316 382.627 316 376 C316 369.373 310.627 364 304 364 H208 Z"
        [attr.fill]="monoColor"
      />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }
    `,
  ],
})
export class DasarUiLogoComponent {
  /** Logo variant: 'icon' | 'horizontal-light' | 'horizontal-dark' | 'monochrome' */
  @Input() variant: DasarLogoVariant = 'icon';

  /** Height in pixels (or CSS string like '100%', '3rem'). Width scales proportionally. */
  @Input() size: number | string = 48;

  /** Fill color for monochrome variant (defaults to #1B4D8E) */
  @Input() monoColor = '#1B4D8E';

  /** Shows the small "ANGULAR UI FRAMEWORK" line of the horizontal lockup */
  @Input() showTagline = true;

  /** Accessible label */
  @Input() ariaLabel = 'Dasar UI Logo';

  get heightValue(): string {
    return typeof this.size === 'number' ? `${this.size}px` : this.size;
  }

  get widthValue(): string {
    return typeof this.size === 'number' ? `${this.size}px` : this.size;
  }

  get horizontalWidthValue(): string {
    if (typeof this.size === 'number') {
      return `${Math.round((this.size * 1200) / 360)}px`;
    }
    return 'auto';
  }
}
