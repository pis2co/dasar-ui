import {
  booleanAttribute,
  ViewEncapsulation,
  ChangeDetectorRef,
  EventEmitter,
  ContentChild,
  HostBinding,
  Component,
  Directive,
  Output,
  inject,
  signal,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { DasarButton } from '../dasar-button/dasar-button';
import { resolveThemeDefault } from '../../utils/common';
import { DasarIcon } from '../dasar-icon/dasar-icon';

export type DasarCardSize = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarCardAppearance = 'outline' | 'borderless' | 'elevated';
export type DasarCardSpacing = 'normal' | 'compact';
export type DasarCardRadius = ScaleAttributeType;

export interface DasarCardConfig {
  appearance?: 'outline' | 'borderless' | 'elevated';
  spacing?: 'normal' | 'compact';
  radius?: ScaleAttributeType; // Or DasarCardRadius
  size?: Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>; // Or DasarCardSize
  label?: string;
  contentHeaderStyle?: StyleType;
  extraHeaderStyle?: StyleType;
  containerStyle?: StyleType;
  captionStyle?: StyleType;
  headerStyle?: StyleType;
  actionStyle?: StyleType;
  bodyStyle?: StyleType;
  contentHeaderClass?: ClassType;
  extraHeaderClass?: ClassType;
  containerClass?: ClassType;
  captionClass?: ClassType;
  actionClass?: ClassType;
  headerClass?: ClassType;
  bodyClass?: ClassType;
  captionFluid?: boolean;
  hideOverflow?: boolean;
  headerFluid?: boolean;
  actionFluid?: boolean;
  bodyFluid?: boolean;
  fullWidth?: boolean;
  closable?: boolean;
  fluid?: boolean;
}

@Directive({ selector: '[extra-header-slot]', standalone: true })
export class DasarCardExtraHeaderSlot {}
@Directive({ selector: '[caption-slot]', standalone: true })
export class DasarCardCaptionSlot {}
@Directive({ selector: '[header-slot]', standalone: true })
export class DasarCardHeaderSlot {}
@Directive({ selector: '[action-slot]', standalone: true })
export class DasarCardActionSlot {}

@Component({
  imports: [CommonModule, DasarButton, DasarIcon],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-card.html',
  styleUrls: ['./dasar-card.scss'],
  selector: 'dasar-card',
  standalone: true,
})
export class DasarCard {
  @ContentChild(DasarCardExtraHeaderSlot) providedExtraHeader?: DasarCardExtraHeaderSlot;
  @ContentChild(DasarCardCaptionSlot) providedCaption?: DasarCardCaptionSlot;
  @ContentChild(DasarCardHeaderSlot) providedHeader?: DasarCardHeaderSlot;
  @ContentChild(DasarCardActionSlot) providedAction?: DasarCardActionSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });

  private cdr = inject(ChangeDetectorRef);
  isClosed = signal<boolean>(false);

  @Input() appearance = resolveThemeDefault(
    'card',
    'appearance',
    'elevated',
    this.themeProvider,
    this.themeService,
  );
  @Input() spacing = resolveThemeDefault(
    'card',
    'spacing',
    'normal',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'card',
    'radius',
    'lg',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault('card', 'size', 'md', this.themeProvider, this.themeService);
  @Input() label = resolveThemeDefault(
    'card',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-header-style' }) contentHeaderStyle = resolveThemeDefault(
    'card',
    'contentHeaderStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'extra-header-style' }) extraHeaderStyle = resolveThemeDefault(
    'card',
    'extraHeaderStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'card',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'caption-style' }) captionStyle = resolveThemeDefault(
    'card',
    'captionStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-style' }) headerStyle = resolveThemeDefault(
    'card',
    'headerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-style' }) actionStyle = resolveThemeDefault(
    'card',
    'actionStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-style' }) bodyStyle = resolveThemeDefault(
    'card',
    'bodyStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-header-class' }) contentHeaderClass = resolveThemeDefault(
    'card',
    'contentHeaderClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'extra-header-class' }) extraHeaderClass = resolveThemeDefault(
    'card',
    'extraHeaderClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'card',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'caption-class' }) captionClass = resolveThemeDefault(
    'card',
    'captionClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-class' }) actionClass = resolveThemeDefault(
    'card',
    'actionClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-class' }) headerClass = resolveThemeDefault(
    'card',
    'headerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-class' }) bodyClass = resolveThemeDefault(
    'card',
    'bodyClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) closable = resolveThemeDefault(
    'card',
    'closable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'card',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'header-fluid', transform: booleanAttribute }) headerFluid = resolveThemeDefault(
    'card',
    'headerFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'action-fluid', transform: booleanAttribute }) actionFluid = resolveThemeDefault(
    'card',
    'actionFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'body-fluid', transform: booleanAttribute }) bodyFluid = resolveThemeDefault(
    'card',
    'bodyFluid',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'card',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'caption-fluid', transform: booleanAttribute }) captionFluid =
    resolveThemeDefault('card', 'captionFluid', false, this.themeProvider, this.themeService);
  @Input({ alias: 'hide-overflow', transform: booleanAttribute }) hideOverflow =
    resolveThemeDefault('card', 'hideOverflow', false, this.themeProvider, this.themeService);

  @Output() onClose = new EventEmitter<void>();

  @HostBinding('class.dasar-card') readonly baseClass = true;
  @HostBinding('class.full-width') get hasFullWidth(): boolean {
    return this.fullWidth;
  }

  get hasExtraHeader(): boolean {
    return !!this.providedExtraHeader;
  }
  get hasHeader(): boolean {
    return !!this.providedHeader;
  }
  get hasCaption(): boolean {
    return !!this.providedCaption;
  }
  get hasAction(): boolean {
    return !!this.providedAction;
  }

  closeCard(): void {
    this.isClosed.set(true);
    this.onClose.emit();
  }
}

export const DasarCardComponent = [
  DasarCardExtraHeaderSlot,
  DasarCardCaptionSlot,
  DasarCardHeaderSlot,
  DasarCardActionSlot,
  DasarCard,
] as const;
