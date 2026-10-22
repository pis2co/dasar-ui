import {
  booleanAttribute,
  ViewEncapsulation,
  ContentChild,
  Component,
  Directive,
  computed,
  effect,
  inject,
  Input,
  signal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType } from '../../models/type.model';
import { DasarThemeService } from '../../services/theme.service';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarToast } from './dasar-toast';
import { DasarToastService } from './dasar-toast.service';
import { DasarToastContext, DasarToastPlacement } from './dasar-toast.model';

@Directive({ selector: 'ng-template[label-slot]', standalone: true })
export class DasarToastLabelSlot {
  readonly templateRef = inject(TemplateRef<DasarToastContext>);
}

@Directive({ selector: 'ng-template[caption-slot]', standalone: true })
export class DasarToastCaptionSlot {
  readonly templateRef = inject(TemplateRef<DasarToastContext>);
}

@Directive({ selector: 'ng-template[content-slot]', standalone: true })
export class DasarToastContentSlot {
  readonly templateRef = inject(TemplateRef<DasarToastContext>);
}

@Directive({
  selector: 'ng-template[closeable-slot], ng-template[closable-slot]',
  standalone: true,
})
export class DasarToastCloseableSlot {
  readonly templateRef = inject(TemplateRef<DasarToastContext>);
}

@Component({
  imports: [CommonModule, DasarToast],
  providers: [DasarToastService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-toast-provider.html',
  styleUrls: ['./dasar-toast-provider.scss'],
  selector: 'dasar-toast-provider',
  standalone: true,
})
export class DasarToastProvider {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  protected readonly service = inject(DasarToastService);
  private _max = 5;

  protected readonly expanded = signal(false);

  @ContentChild(DasarToastLabelSlot) labelSlot?: DasarToastLabelSlot;
  @ContentChild(DasarToastCaptionSlot) captionSlot?: DasarToastCaptionSlot;
  @ContentChild(DasarToastContentSlot) contentSlot?: DasarToastContentSlot;
  @ContentChild(DasarToastCloseableSlot) closeableSlot?: DasarToastCloseableSlot;

  @Input()
  set max(value: number) {
    this._max = Math.max(1, Math.floor(Number(value)) || 1);
    this.service.max.set(this._max);
  }
  get max(): number {
    return this._max;
  }
  @Input() placement = resolveThemeDefault(
    'toast',
    'placement',
    'bottom-right' as DasarToastPlacement,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) scrollable = resolveThemeDefault(
    'toast',
    'scrollable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input() blur = resolveThemeDefault(
    'toast',
    'blur',
    null as string | null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'toast',
    'containerClass',
    null as ClassType,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'toast',
    'containerStyle',
    null as StyleType,
    this.themeProvider,
    this.themeService,
  );

  protected readonly visibleItems = computed(() =>
    this.service.items().slice(0, this.service.max()),
  );

  // Newest first, so index 0 is the front of the stack and the scroll starts at the newest toast.
  protected readonly renderItems = computed(() => [...this.visibleItems()].reverse());

  constructor() {
    // The container is removed with its last toast, so the hover state would never reset on its own.
    effect(() => {
      if (this.visibleItems().length === 0) this.expanded.set(false);
    });
    this.service.max.set(
      resolveThemeDefault('toast', 'max', 5, this.themeProvider, this.themeService),
    );
  }

  protected get isTop(): boolean {
    return this.placement.startsWith('top');
  }

  protected get containerClasses(): Record<string, boolean> {
    const base: Record<string, boolean> = {
      [`placement-${this.placement}`]: true,
      top: this.isTop,
      scrollable: this.scrollable,
      expanded: this.scrollable || this.expanded(),
      blurred: !!this.blur,
    };
    for (const name of parseClassesToArray(this.containerClass)) base[name] = true;
    return base;
  }
}

export const DasarToastComponent = [
  DasarToastProvider,
  DasarToastLabelSlot,
  DasarToastCaptionSlot,
  DasarToastContentSlot,
  DasarToastCloseableSlot,
] as const;
