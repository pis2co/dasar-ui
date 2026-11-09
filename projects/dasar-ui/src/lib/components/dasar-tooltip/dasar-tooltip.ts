import {
  Directive,
  Component,
  Input,
  TemplateRef,
  inject,
  booleanAttribute,
  numberAttribute,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgpTooltip,
  NgpTooltipTrigger,
  injectTooltipTriggerState,
  injectTooltipContext,
} from 'ng-primitives/tooltip';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { ClassType, StyleType } from '../../models/type.model';
import { parseClassesToArray, resolveThemeDefault } from '../../utils/common';
import { DasarThemeService } from '../../services/theme.service';

export type DasarTooltipPlacementType = 'top' | 'bottom' | 'left' | 'right';
export type DasarTooltipAppearanceType = 'solid' | 'elevated';

export interface DasarTooltipConfig {
  placement?: DasarTooltipPlacementType;
  disabled?: boolean;
  showDelay?: number;
  hideDelay?: number;
  appearance?: DasarTooltipAppearanceType;
  contentClass?: ClassType;
  contentStyle?: StyleType;
}

export interface DasarTooltipContextPayload {
  content: string | TemplateRef<any>;
  appearance: DasarTooltipAppearanceType;
  contentClass?: ClassType;
  contentStyle?: StyleType;
}

@Component({
  selector: 'dasar-tooltip-content',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  hostDirectives: [NgpTooltip],
  styleUrls: ['./dasar-tooltip.scss'],
  template: `
    <div
      class="dasar-tooltip-content appearance-{{ payload()?.appearance || 'solid' }}"
      [ngClass]="classes"
      [ngStyle]="payload()?.contentStyle || null"
    >
      @if (isTemplateRef) {
        <ng-container *ngTemplateOutlet="asTemplateRef"></ng-container>
      } @else {
        {{ payload()?.content }}
      }
    </div>
  `,
})
export class DasarTooltipContent {
  protected readonly payload = injectTooltipContext<DasarTooltipContextPayload>();

  get isTemplateRef(): boolean {
    return this.payload()?.content instanceof TemplateRef;
  }

  get asTemplateRef(): TemplateRef<any> {
    return this.payload()?.content as TemplateRef<any>;
  }

  get classes(): Record<string, boolean> {
    const overrideClass = parseClassesToArray(this.payload()?.contentClass);
    if (overrideClass && overrideClass.length > 0) {
      return Object.fromEntries(overrideClass.map((name) => [name, true]));
    }
    return {};
  }
}

@Directive({
  selector: '[dasarTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgpTooltipTrigger,
      inputs: [
        'ngpTooltipTriggerPlacement: dasarTooltipPlacement',
        'ngpTooltipTriggerDisabled: dasarTooltipDisabled',
        'ngpTooltipTriggerShowDelay: dasarTooltipShowDelay',
        'ngpTooltipTriggerHideDelay: dasarTooltipHideDelay',
      ],
    },
  ],
})
export class DasarTooltip {
  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private triggerState = injectTooltipTriggerState<DasarTooltipContextPayload>();

  private _content: string | TemplateRef<any> = '';
  private _appearance: DasarTooltipAppearanceType = resolveThemeDefault(
    'tooltip',
    'appearance',
    'solid',
    this.themeProvider,
    this.themeService,
  );
  private _contentClass?: ClassType = resolveThemeDefault(
    'tooltip',
    'contentClass',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  private _contentStyle?: StyleType = resolveThemeDefault(
    'tooltip',
    'contentStyle',
    undefined,
    this.themeProvider,
    this.themeService,
  );

  @Input('dasarTooltip')
  get content(): string | TemplateRef<any> {
    return this._content;
  }
  set content(val: string | TemplateRef<any>) {
    this._content = val;
    this.updatePayload();
  }

  @Input('dasarTooltipPlacement')
  placement: DasarTooltipPlacementType = resolveThemeDefault(
    'tooltip',
    'placement',
    'top',
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'dasarTooltipDisabled', transform: booleanAttribute })
  disabled: boolean = resolveThemeDefault(
    'tooltip',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'dasarTooltipShowDelay', transform: numberAttribute })
  showDelay: number = resolveThemeDefault(
    'tooltip',
    'showDelay',
    0,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'dasarTooltipHideDelay', transform: numberAttribute })
  hideDelay: number = resolveThemeDefault(
    'tooltip',
    'hideDelay',
    0,
    this.themeProvider,
    this.themeService,
  );

  @Input('dasarTooltipAppearance')
  get appearance(): DasarTooltipAppearanceType {
    return this._appearance;
  }
  set appearance(val: DasarTooltipAppearanceType) {
    this._appearance = val;
    this.updatePayload();
  }

  @Input('dasarTooltipClass')
  get contentClass(): ClassType {
    return this._contentClass;
  }
  set contentClass(val: ClassType) {
    this._contentClass = val;
    this.updatePayload();
  }

  @Input('dasarTooltipStyle')
  get contentStyle(): StyleType | undefined {
    return this._contentStyle;
  }
  set contentStyle(val: StyleType | undefined) {
    this._contentStyle = val;
    this.updatePayload();
  }

  constructor() {
    this.triggerState().setTooltip(DasarTooltipContent);
    this.updatePayload();
  }

  private updatePayload(): void {
    const payload: DasarTooltipContextPayload = {
      content: this._content,
      appearance: this._appearance,
      contentClass: this._contentClass,
      contentStyle: this._contentStyle,
    };
    this.triggerState().setContext(payload);
  }
}
