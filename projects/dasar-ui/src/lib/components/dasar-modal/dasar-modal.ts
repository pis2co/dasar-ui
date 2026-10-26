import {
  booleanAttribute,
  ViewEncapsulation,
  EventEmitter,
  ContentChild,
  HostBinding,
  HostListener,
  Component,
  Directive,
  Output,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DasarOverlayComponent } from '../dasar-overlay/dasar-overlay';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { resolveThemeDefault } from '../../utils/common';

export type DasarModalSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarModalAppearance = 'outline' | 'borderless' | 'elevated';
export type DasarModalSpacing = 'normal' | 'compact';
export type DasarModalRadius = ScaleAttributeType;

export interface DasarModalConfig {
  appearance?: DasarModalAppearance;
  spacing?: DasarModalSpacing;
  radius?: DasarModalRadius;
  size?: DasarModalSize;
  label?: string;
  width?: string;
  containerStyle?: StyleType;
  headerStyle?: StyleType;
  closeStyle?: StyleType;
  bodyStyle?: StyleType;
  actionStyle?: StyleType;
  containerClass?: ClassType;
  headerClass?: ClassType;
  closeClass?: ClassType;
  bodyClass?: ClassType;
  actionClass?: ClassType;
  headerFluid?: boolean;
  bodyFluid?: boolean;
  actionFluid?: boolean;
  fullWidth?: boolean;
  closable?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  overlayBlur?: string;
  overlayBackground?: string;
}

@Directive({ selector: '[header-slot]', standalone: true })
export class DasarModalHeaderSlot {}
@Directive({ selector: '[close-slot]', standalone: true })
export class DasarModalCloseSlot {}
@Directive({ selector: '[action-slot]', standalone: true })
export class DasarModalActionSlot {}

@Component({
  imports: [CommonModule, DasarButtonComponent, DasarIconComponent, DasarOverlayComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-modal.html',
  styleUrls: ['./dasar-modal.scss'],
  selector: 'dasar-modal',
  standalone: true,
})
export class DasarModal implements OnChanges, OnDestroy {
  @ContentChild(DasarModalHeaderSlot) providedHeader?: DasarModalHeaderSlot;
  @ContentChild(DasarModalCloseSlot) providedClose?: DasarModalCloseSlot;
  @ContentChild(DasarModalActionSlot) providedAction?: DasarModalActionSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  @Input({ transform: booleanAttribute }) open = false;

  @Input() appearance = resolveThemeDefault(
    'modal',
    'appearance',
    'elevated',
    this.themeProvider,
    this.themeService,
  );
  @Input() spacing = resolveThemeDefault(
    'modal',
    'spacing',
    'normal',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'modal',
    'radius',
    'lg',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault('modal', 'size', 'md', this.themeProvider, this.themeService);
  @Input() label = resolveThemeDefault(
    'modal',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() width = resolveThemeDefault(
    'modal',
    'width',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'modal',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-style' }) headerStyle = resolveThemeDefault(
    'modal',
    'headerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'close-style' }) closeStyle = resolveThemeDefault(
    'modal',
    'closeStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-style' }) bodyStyle = resolveThemeDefault(
    'modal',
    'bodyStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-style' }) actionStyle = resolveThemeDefault(
    'modal',
    'actionStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'modal',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-class' }) headerClass = resolveThemeDefault(
    'modal',
    'headerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'close-class' }) closeClass = resolveThemeDefault(
    'modal',
    'closeClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-class' }) bodyClass = resolveThemeDefault(
    'modal',
    'bodyClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-class' }) actionClass = resolveThemeDefault(
    'modal',
    'actionClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-fluid', transform: booleanAttribute }) headerFluid = resolveThemeDefault(
    'modal',
    'headerFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-fluid', transform: booleanAttribute }) bodyFluid = resolveThemeDefault(
    'modal',
    'bodyFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-fluid', transform: booleanAttribute }) actionFluid = resolveThemeDefault(
    'modal',
    'actionFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'modal',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) closable = resolveThemeDefault(
    'modal',
    'closable',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'close-on-overlay', transform: booleanAttribute }) closeOnOverlay =
    resolveThemeDefault('modal', 'closeOnOverlay', true, this.themeProvider, this.themeService);
  @Input({ alias: 'close-on-escape', transform: booleanAttribute }) closeOnEscape =
    resolveThemeDefault('modal', 'closeOnEscape', true, this.themeProvider, this.themeService);
  @Input({ alias: 'overlay-blur' }) overlayBlur = resolveThemeDefault(
    'modal',
    'overlayBlur',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'overlay-background' }) overlayBackground = resolveThemeDefault(
    'modal',
    'overlayBackground',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );

  @Output() onClose = new EventEmitter<void>();

  @HostBinding('class.dasar-modal') readonly baseClass = true;
  @HostBinding('class.open') get isOpen(): boolean {
    return this.open;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.toggleScrollLock(this.open);
    }
  }

  ngOnDestroy(): void {
    this.toggleScrollLock(false);
  }

  get hasHeader(): boolean {
    return !!this.providedHeader;
  }
  get hasClose(): boolean {
    return !!this.providedClose;
  }
  get hasAction(): boolean {
    return !!this.providedAction;
  }

  get resolvedWidth(): string | null {
    if (this.fullWidth) return '100%';
    return this.width ?? null;
  }

  close(): void {
    this.onClose.emit();
  }

  handleOverlayClick(): void {
    if (this.closeOnOverlay) this.close();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.open && this.closeOnEscape) this.close();
  }

  private toggleScrollLock(lock: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.document.body.style.overflow = lock ? 'hidden' : '';
  }
}

export const DasarModalComponent = [
  DasarModalHeaderSlot,
  DasarModalCloseSlot,
  DasarModalActionSlot,
  DasarModal,
] as const;
