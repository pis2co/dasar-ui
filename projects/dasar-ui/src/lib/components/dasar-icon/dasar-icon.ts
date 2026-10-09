import {
  ViewEncapsulation,
  ChangeDetectorRef,
  booleanAttribute,
  HostBinding,
  Component,
  inject,
  OnInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../../services/theme.service';
import { ScaleAttributeType } from '../../models/type.model';
import { resolveThemeDefault } from '../../utils/common';
import { ICON_REGISTRY } from './dasar-icon.registry';

export type DasarIconSizeType = ScaleAttributeType | number;

export interface DasarIconConfig {
  size?: DasarIconSizeType;
  stroke?: number;
  fluid?: boolean;
  color?: string;
  name?: string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-icon.scss'],
  templateUrl: './dasar-icon.html',
  imports: [CommonModule],
  selector: 'dasar-icon',
  standalone: true,
})
export class DasarIcon implements OnInit {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private readonly cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'icon',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault('icon', 'size', 'md', this.themeProvider, this.themeService);
  @Input() color = resolveThemeDefault(
    'icon',
    'color',
    'currentColor',
    this.themeProvider,
    this.themeService,
  );
  @Input() stroke = resolveThemeDefault('icon', 'stroke', 2, this.themeProvider, this.themeService);
  @Input() name = resolveThemeDefault('icon', 'name', '', this.themeProvider, this.themeService);

  @HostBinding('class')
  get hostClasses(): string {
    return `dasar-icon size-${this.size}`;
  }
  get computedSize(): string | number {
    switch (this.size) {
      case 'md':
        return 24;
      case 'lg':
        return 32;
      case 'xl':
        return 40;
      default:
        return typeof this.size === 'number' ? this.size : 16; // sm and xs
    }
  }
  get svgContent(): SafeHtml {
    const registry = ICON_REGISTRY;
    const nodes = registry[this.name];
    if (!nodes) return '';
    const inner = nodes
      .map(([tag, attrs]) => {
        const attrsStr = Object.entries(attrs)
          .map(([k, v]) => `${k}="${v}"`)
          .join(' ');
        return `<${tag} ${attrsStr}/>`;
      })
      .join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.computedSize}" height="${+this.computedSize - 4}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="${this.stroke}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
  ngOnInit(): void {}
}

export const DasarIconComponent = [DasarIcon] as const;
