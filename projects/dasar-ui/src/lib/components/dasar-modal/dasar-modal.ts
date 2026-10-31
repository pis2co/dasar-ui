import {
  booleanAttribute,
  ViewEncapsulation,
  ContentChild,
  Component,
  Directive,
  inject,
  Input,
} from '@angular/core';
import {
  NgpDialog,
  NgpDialogOverlay,
  NgpDialogTrigger,
  injectDialogState,
  provideDialogState,
} from 'ng-primitives/dialog';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { resolveThemeDefault } from '../../utils/common';
import { CommonModule } from '@angular/common';

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
  overlayBlur?: string;
  overlayBackground?: string;
}

export interface DasarModalTriggerConfig {
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

@Directive({ selector: '[header-slot]', standalone: true })
export class DasarModalHeaderSlot {}
@Directive({ selector: '[close-slot]', standalone: true })
export class DasarModalCloseSlot {}
@Directive({ selector: '[action-slot]', standalone: true })
export class DasarModalActionSlot {}

/**
 * Applied to a launcher element with a `<ng-template let-close="close">` reference to open
 * a dasar-modal as a dialog, using NgpDialogTrigger's trigger+template lifecycle.
 */
@Directive({
  selector: '[dasarModalTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgpDialogTrigger,
      inputs: [
        'ngpDialogTrigger: dasarModalTrigger',
        'ngpDialogTriggerCloseOnEscape: dasarModalTriggerCloseOnEscape',
        'ngpDialogTriggerCloseOnOutsideClick: dasarModalTriggerCloseOnOutsideClick',
        'ngpDialogTriggerContainer: dasarModalTriggerContainer',
      ],
      outputs: ['ngpDialogTriggerClosed: dasarModalTriggerClosed'],
    },
  ],
})
export class DasarModalTrigger {}

@Component({
  imports: [CommonModule, DasarButtonComponent, DasarIconComponent, NgpDialog],
  providers: [provideDialogState()],
  hostDirectives: [
    { directive: NgpDialogOverlay, inputs: ['ngpDialogOverlayCloseOnClick: close-on-overlay'] },
  ],
  host: {
    class: 'dasar-modal',
    '[style.--dasar-modal-overlay-background]': 'overlayBackground',
    '[style.--dasar-modal-overlay-blur]': 'overlayBlur',
  },
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-modal.html',
  styleUrls: ['./dasar-modal.scss'],
  selector: 'dasar-modal',
  standalone: true,
})
export class DasarModal {
  @ContentChild(DasarModalHeaderSlot) providedHeader?: DasarModalHeaderSlot;
  @ContentChild(DasarModalCloseSlot) providedClose?: DasarModalCloseSlot;
  @ContentChild(DasarModalActionSlot) providedAction?: DasarModalActionSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private dialogState = injectDialogState();

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
    this.dialogState().close();
  }
}

export const DasarModalComponent = [
  DasarModalHeaderSlot,
  DasarModalCloseSlot,
  DasarModalActionSlot,
  DasarModalTrigger,
  DasarModal,
] as const;
