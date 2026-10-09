import {
  Component,
  Input,
  Output,
  EventEmitter,
  booleanAttribute,
  Directive,
  TemplateRef,
  ContentChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  HostBinding,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DasarButtonAppearanceType,
  DasarButtonVariantType,
  DasarButtonRadiusType,
  DasarButtonComponent,
  DasarButtonSizeType,
} from '../dasar-button/dasar-button';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../../services/theme.service';
import { ClassType, StyleType } from '../../models/type.model';
import { resolveThemeDefault } from '../../utils/common';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';

export type DasarChipAppearanceType = DasarButtonAppearanceType;
export type DasarChipVariantType = DasarButtonVariantType;

export interface DasarChipConfig {
  closeIconName?: string;
  appearance?: DasarChipAppearanceType;
  variant?: DasarChipVariantType;
  iconName?: string;
  radius?: DasarButtonRadiusType;
  size?: DasarButtonSizeType;
  label?: string;
  removable?: boolean;
  disabled?: boolean;
  fluid?: boolean;
  containerStyle?: StyleType;
  contentStyle?: StyleType;
  labelStyle?: StyleType;
  containerClass?: ClassType;
  contentClass?: ClassType;
  labelClass?: ClassType;
}

@Directive({ selector: '[chip-label-slot]', standalone: true })
export class DasarChipLabelSlot {}
@Directive({ selector: '[chip-close-slot]', standalone: true })
export class DasarChipCloseSlot {}

@Component({
  imports: [CommonModule, DasarIconComponent, DasarButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-chip.html',
  styleUrls: ['./dasar-chip.scss'],
  selector: 'dasar-chip',
  standalone: true,
})
export class DasarChip {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);

  @Input({ alias: 'close-icon-name' }) closeIconName = resolveThemeDefault(
    'chip',
    'closeIconName',
    'x',
    this.themeProvider,
    this.themeService,
  );
  @Input() appearance = resolveThemeDefault(
    'chip',
    'appearance',
    'solid',
    this.themeProvider,
    this.themeService,
  );
  @Input() variant = resolveThemeDefault(
    'chip',
    'variant',
    'primary',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'icon-name' }) iconName = resolveThemeDefault(
    'chip',
    'iconName',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'chip',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault('chip', 'size', 'xs', this.themeProvider, this.themeService);
  @Input() label = resolveThemeDefault(
    'chip',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'chip',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-style' }) contentStyle = resolveThemeDefault(
    'chip',
    'contentStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-style' }) labelStyle = resolveThemeDefault(
    'chip',
    'labelStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'chip',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-class' }) contentClass = resolveThemeDefault(
    'chip',
    'contentClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-class' }) labelClass = resolveThemeDefault(
    'chip',
    'labelClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) removable = resolveThemeDefault(
    'chip',
    'removable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'chip',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) fluid = resolveThemeDefault(
    'chip',
    'fluid',
    false,
    this.themeProvider,
    this.themeService,
  );

  @ContentChild(DasarChipLabelSlot) labelSlot?: DasarChipLabelSlot;
  @ContentChild(DasarChipCloseSlot) closeSlot?: DasarChipCloseSlot;

  @Output() onClick = new EventEmitter<Event>();
  @Output() onRemove = new EventEmitter<Event>();

  @HostBinding('class.dasar-chip') readonly baseClass = true;
  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    // stop the event from bubbling up to parent elements
    event.stopPropagation();
    // prevent default anchor/button behavior
    event.preventDefault();
  }

  click(event: Event) {
    if (this.disabled) return;
    this.onClick.emit(event);
  }

  remove(event: Event) {
    event.stopPropagation();
    if (this.disabled) return;
    this.onRemove.emit(event);
  }
}

export const DasarChipComponent = [DasarChip, DasarChipLabelSlot, DasarChipCloseSlot] as const;
