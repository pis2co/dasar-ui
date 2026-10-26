import {
  ViewEncapsulation,
  booleanAttribute,
  ContentChild,
  HostBinding,
  EventEmitter,
  Component,
  Directive,
  OnDestroy,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, ScaleAttributeType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { CommonModule } from '@angular/common';

export type DasarAlertVariantType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type DasarAlertRadiusType = ScaleAttributeType;

export interface DasarAlertConfig {
  variant?: DasarAlertVariantType;
  radius?: DasarAlertRadiusType;
  bordered?: boolean;
  closeable?: boolean;
  iconName?: string | null;
  closeIconName?: string;
  containerClass?: ClassType;
  containerStyle?: StyleType;
  titleClass?: ClassType;
  titleStyle?: StyleType;
  contentClass?: ClassType;
  contentStyle?: StyleType;
}

@Directive({ selector: '[header-slot]', standalone: true })
export class DasarAlertHeaderSlot {}

@Directive({ selector: '[icon-slot]', standalone: true })
export class DasarAlertIconSlot {}

@Directive({ selector: '[closeable-slot]', standalone: true })
export class DasarAlertCloseableSlot {}

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dasar-alert.scss'],
  templateUrl: './dasar-alert.html',
  selector: 'dasar-alert',
  imports: [CommonModule, DasarIconComponent, DasarButtonComponent],
})
export class DasarAlert implements OnDestroy {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private leaveTimer: ReturnType<typeof setTimeout> | null = null;
  protected shown = signal(true);
  protected leaving = signal(false);

  @Input() variant = resolveThemeDefault(
    'alert',
    'variant',
    'primary' as DasarAlertVariantType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) bordered = resolveThemeDefault(
    'alert',
    'bordered',
    true,
    this.themeProvider,
    this.themeService,
  );
  @Input() radius: DasarAlertRadiusType = resolveThemeDefault(
    'alert',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) closeable = resolveThemeDefault(
    'alert',
    'closeable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() title: string | null = null;
  @Input({ alias: 'icon-name' }) iconName = resolveThemeDefault(
    'alert',
    'iconName',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'close-icon-name' }) closeIconName = resolveThemeDefault(
    'alert',
    'closeIconName',
    'x',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'alert',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'alert',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'title-class' }) titleClass = resolveThemeDefault(
    'alert',
    'titleClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'title-style' }) titleStyle = resolveThemeDefault(
    'alert',
    'titleStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-class' }) contentClass = resolveThemeDefault(
    'alert',
    'contentClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'content-style' }) contentStyle = resolveThemeDefault(
    'alert',
    'contentStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute })
  set visible(value: boolean) {
    this.clearLeaveTimer();
    this.leaving.set(false);
    this.shown.set(value);
  }
  get visible(): boolean {
    return this.shown();
  }

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<MouseEvent>();
  @Output() onAfterLeave = new EventEmitter<void>();

  @ContentChild(DasarAlertHeaderSlot) headerSlot?: DasarAlertHeaderSlot;
  @ContentChild(DasarAlertIconSlot) iconSlot?: DasarAlertIconSlot;
  @ContentChild(DasarAlertCloseableSlot) closeableSlot?: DasarAlertCloseableSlot;

  @HostBinding('class')
  get hostClasses(): string {
    return this.shown() ? 'dasar-alert' : 'dasar-alert hidden';
  }

  @HostBinding('attr.role')
  get role(): string {
    return this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status';
  }

  get hasIcon(): boolean {
    return !!this.iconSlot || !!this.iconName;
  }

  get hasHeader(): boolean {
    return !!this.headerSlot || !!this.title;
  }

  get containerClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.containerClass);
    const baseClass = {
      [this.variant]: true,
      bordered: this.bordered,
      [`radius-${this.radius}`]: !!this.radius,
      closeable: this.closeable,
      'with-icon': this.hasIcon,
      'with-header': this.hasHeader,
      leaving: this.leaving(),
    };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get titleClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.titleClass);
    const baseClass = { 'dasar-alert-title': true };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  get contentClasses(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.contentClass);
    const baseClass = { 'dasar-alert-content': true };
    if (overrideClass && overrideClass?.length > 0) {
      return {
        ...baseClass,
        ...Object.fromEntries(overrideClass.map((name) => [name, true])),
      };
    }
    return baseClass;
  }

  close(event: MouseEvent) {
    if (this.leaving() || !this.shown()) return;
    this.onClose.emit(event);
    this.leaving.set(true);
    this.leaveTimer = setTimeout(() => this.finishLeave(), 400);
  }

  onAnimationEnd(event: Event) {
    if (event.target !== event.currentTarget || !this.leaving()) return;
    this.finishLeave();
  }

  private finishLeave() {
    if (!this.leaving()) return;
    this.clearLeaveTimer();
    this.leaving.set(false);
    this.shown.set(false);
    this.visibleChange.emit(false);
    this.onAfterLeave.emit();
  }

  private clearLeaveTimer() {
    if (this.leaveTimer) clearTimeout(this.leaveTimer);
    this.leaveTimer = null;
  }

  ngOnDestroy() {
    this.clearLeaveTimer();
  }
}

export const DasarAlertComponent = [
  DasarAlert,
  DasarAlertHeaderSlot,
  DasarAlertIconSlot,
  DasarAlertCloseableSlot,
] as const;
