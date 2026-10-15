import {
  booleanAttribute,
  ViewEncapsulation,
  EventEmitter,
  HostBinding,
  Component,
  Output,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';

export interface DasarOverlayConfig {
  blur?: string;
  background?: string;
  zIndex?: number;
  overlayStyle?: StyleType;
  overlayClass?: ClassType;
  closeOnClick?: boolean;
}

@Component({
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-overlay.html',
  styleUrls: ['./dasar-overlay.scss'],
  selector: 'dasar-overlay',
  standalone: true,
})
export class DasarOverlay {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  @Input() blur = resolveThemeDefault(
    'overlay',
    'blur',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input() background = resolveThemeDefault(
    'overlay',
    'background',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'z-index' }) zIndex = resolveThemeDefault(
    'overlay',
    'zIndex',
    1000,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'overlay-style' }) overlayStyle = resolveThemeDefault(
    'overlay',
    'overlayStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'overlay-class' }) overlayClass = resolveThemeDefault(
    'overlay',
    'overlayClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'close-on-click', transform: booleanAttribute }) closeOnClick =
    resolveThemeDefault('overlay', 'closeOnClick', true, this.themeProvider, this.themeService);

  @Output() onClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.dasar-overlay') readonly baseClass = true;

  handleClick(event: MouseEvent): void {
    if (event.target !== event.currentTarget) return;
    this.onClick.emit(event);
  }
}

export const DasarOverlayComponent = [DasarOverlay] as const;
