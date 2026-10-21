import {
  DasarComponentConfig,
  DasarThemeConfig,
  DasarThemeColors,
  DasarThemeMode,
  DasarThemeCommon,
} from '@models/theme.model';
import {
  datepickerMap,
  calendarMap,
  dividerMap,
  alertMap,
  checkboxMap,
  radioMap,
  selectMap,
  buttonMap,
  buttonGroupMap,
  commonMap,
  inputMap,
  chipMap,
  cardMap,
  menuMap,
  listMap,
  paginationMap,
  switchMap,
  skeletonMap,
  tableMap,
  tabsMap,
  overlayMap,
  modalMap,
  drawerMap,
} from '../../services/theme.service';
import {
  InjectionToken,
  SimpleChanges,
  ElementRef,
  forwardRef,
  Component,
  OnChanges,
  Input,
  inject,
  effect,
  signal,
} from '@angular/core';
import { dasarVariables, dasarVariablesTypography } from '../../styles/theme';
import { CommonModule } from '@angular/common';

export const DASAR_THEME_PROVIDER = new InjectionToken<DasarThemeProviderComponent>(
  'DASAR_THEME_PROVIDER',
);
export const defaultLightCommonTokens: DasarThemeCommon = {
  ...dasarVariablesTypography,
  primaryColor: dasarVariables.colors.primary.base,
  primaryHoverColor: dasarVariables.colors.primary[700],
  primaryActiveColor: dasarVariables.colors.primary[800],
  primarySurfaceColor: dasarVariables.colors.primary[50],
  textPrimaryColor: dasarVariables.colors.neutral[900],
  textSecondaryColor: dasarVariables.colors.neutral[500],
  textDisabledColor: dasarVariables.colors.neutral[400],
  textInverseColor: dasarVariables.colors.neutral[50],
  bgWindowColor: dasarVariables.colors.neutral[50],
  bgDefaultColor: dasarVariables.colors.neutral[50],
  bgSurfaceColor: dasarVariables.colors.neutral[50],
  bgHoverColor: dasarVariables.colors.neutral[100],
  borderSubtleColor: dasarVariables.colors.neutral[200],
  borderStrongColor: dasarVariables.colors.neutral[300],
};
export const defaultDarkCommonTokens: DasarThemeCommon = {
  ...dasarVariablesTypography,
  primaryColor: dasarVariables.colors.primary[300],
  primaryHoverColor: dasarVariables.colors.primary[200],
  primaryActiveColor: dasarVariables.colors.primary[100],
  primarySurfaceColor: 'rgba(96, 165, 250, 0.1)',
  textPrimaryColor: dasarVariables.colors.neutral[50],
  textSecondaryColor: dasarVariables.colors.neutral[300],
  textDisabledColor: dasarVariables.colors.neutral[500],
  textInverseColor: dasarVariables.colors.neutral[900],
  bgWindowColor: dasarVariables.colors.neutral[900],
  bgDefaultColor: dasarVariables.colors.neutral[900],
  bgSurfaceColor: dasarVariables.colors.neutral[800],
  bgHoverColor: dasarVariables.colors.neutral[700],
  borderSubtleColor: dasarVariables.colors.neutral[700],
  borderStrongColor: dasarVariables.colors.neutral[700],
};

@Component({
  imports: [CommonModule],
  selector: 'dasar-theme-provider',
  standalone: true,
  host: {
    '[attr.data-theme]': 'activeMode()',
  },
  template: `
    <div class="dasar-theme-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        padding: 0;
        margin: 0;
      }
      .dasar-theme-wrapper {
        background-color: var(--theme-bg-window-color);
        font-weight: var(--font-weight-regular);
        line-height: var(--line-height-normal);
        font-size: var(--font-size-base);
        color: var(--theme-text-color);
        font-family: var(--font-sans);
        transition: background-color 0.3s ease;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: block;
        height: 100%;
        padding: 0;
        margin: 0;
      }
    `,
  ],
  providers: [
    {
      provide: DASAR_THEME_PROVIDER,
      useExisting: forwardRef(() => DasarThemeProviderComponent),
    },
  ],
})
export class DasarThemeProviderComponent implements OnChanges {
  private parentProvider = inject(DASAR_THEME_PROVIDER, { optional: true, skipSelf: true });
  public activeMode = signal<DasarThemeMode>('light');
  private previouslyInjectedVars: string[] = [];

  @Input() componentConfig?: DasarComponentConfig;
  @Input() tokenConfig?: DasarThemeConfig['tokens'];
  @Input() colorConfig?: DasarThemeConfig['colors'];
  @Input() mode: DasarThemeMode = 'light';

  constructor(private el: ElementRef) {
    if (this.parentProvider) {
      effect(() => {
        const parentMode = this.parentProvider!.activeMode();
        const hostElement = this.el.nativeElement;
        this.activeMode.set(parentMode);
        this.applyTokenConfig(hostElement);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const hostElement = this.el.nativeElement;
    if (changes['mode'] && !this.parentProvider) {
      this.activeMode.set(this.mode);
      this.applyTokenConfig(hostElement);
    }
    if (changes['tokenConfig']) {
      this.applyTokenConfig(hostElement);
    }
    if (changes['colorConfig'] && this.colorConfig) {
      this.injectColors(hostElement, this.colorConfig);
    }
  }

  public getResolvedCommonTokens(mode: DasarThemeMode): DasarThemeCommon {
    const baseCommonTokens = mode === 'light' ? defaultLightCommonTokens : defaultDarkCommonTokens;
    const overrideCommonTokens = this.tokenConfig?.[mode]?.common || {};
    return { ...baseCommonTokens, ...overrideCommonTokens };
  }

  private applyTokenConfig(hostElement: any) {
    this.previouslyInjectedVars.forEach((cssVar) => {
      hostElement.style.removeProperty(cssVar);
    });
    this.previouslyInjectedVars = [];

    const currentMode = this.activeMode();

    const baseCommonTokens = this.parentProvider
      ? this.parentProvider.getResolvedCommonTokens(currentMode)
      : currentMode === 'light'
        ? defaultLightCommonTokens
        : defaultDarkCommonTokens;
    const overrideCommonTokens = this.tokenConfig?.[currentMode]?.common || {};
    const commonTokens = { ...baseCommonTokens, ...overrideCommonTokens };
    if (commonTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: commonTokens,
        dictionary: commonMap,
      });
    }

    const buttonTokens = this.tokenConfig?.[currentMode]?.button || this.tokenConfig?.light?.button;
    if (buttonTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: buttonTokens,
        dictionary: buttonMap,
      });
    }
    const buttonGroupTokens =
      this.tokenConfig?.[currentMode]?.buttonGroup || this.tokenConfig?.light?.buttonGroup;
    if (buttonGroupTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: buttonGroupTokens,
        dictionary: buttonGroupMap,
      });
    }
    const inputTokens = this.tokenConfig?.[currentMode]?.input || this.tokenConfig?.light?.input;
    if (inputTokens) {
      this.injectMappedTokens({ element: hostElement, payload: inputTokens, dictionary: inputMap });
    }
    const calendarTokens =
      this.tokenConfig?.[currentMode]?.calendar || this.tokenConfig?.light?.calendar;
    if (calendarTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: calendarTokens,
        dictionary: calendarMap,
      });
    }
    const datepickerTokens =
      this.tokenConfig?.[currentMode]?.datepicker || this.tokenConfig?.light?.datepicker;
    if (datepickerTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: datepickerTokens,
        dictionary: datepickerMap,
      });
    }
    const chipTokens = this.tokenConfig?.[currentMode]?.chip || this.tokenConfig?.light?.chip;
    if (chipTokens) {
      this.injectMappedTokens({ element: hostElement, payload: chipTokens, dictionary: chipMap });
    }
    const dividerTokens =
      this.tokenConfig?.[currentMode]?.divider || this.tokenConfig?.light?.divider;
    if (dividerTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: dividerTokens,
        dictionary: dividerMap,
      });
    }
    const alertTokens = this.tokenConfig?.[currentMode]?.alert || this.tokenConfig?.light?.alert;
    if (alertTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: alertTokens,
        dictionary: alertMap,
      });
    }
    const checkboxTokens =
      this.tokenConfig?.[currentMode]?.checkbox || this.tokenConfig?.light?.checkbox;
    if (checkboxTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: checkboxTokens,
        dictionary: checkboxMap,
      });
    }
    const radioTokens = this.tokenConfig?.[currentMode]?.radio || this.tokenConfig?.light?.radio;
    if (radioTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: radioTokens,
        dictionary: radioMap,
      });
    }

    const selectTokens = this.tokenConfig?.[currentMode]?.select || this.tokenConfig?.light?.select;
    if (selectTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: selectTokens,
        dictionary: selectMap,
      });
    }
    const cardTokens = this.tokenConfig?.[currentMode]?.card || this.tokenConfig?.light?.card;
    if (cardTokens) {
      this.injectMappedTokens({ element: hostElement, payload: cardTokens, dictionary: cardMap });
    }

    const menuTokens = this.tokenConfig?.[currentMode]?.menu || this.tokenConfig?.light?.menu;
    if (menuTokens) {
      this.injectMappedTokens({ element: hostElement, payload: menuTokens, dictionary: menuMap });
    }

    const listTokens = this.tokenConfig?.[currentMode]?.list || this.tokenConfig?.light?.list;
    if (listTokens) {
      this.injectMappedTokens({ element: hostElement, payload: listTokens, dictionary: listMap });
    }

    const paginationTokens =
      this.tokenConfig?.[currentMode]?.pagination || this.tokenConfig?.light?.pagination;
    if (paginationTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: paginationTokens,
        dictionary: paginationMap,
      });
    }

    const switchTokens = this.tokenConfig?.[currentMode]?.switch || this.tokenConfig?.light?.switch;
    if (switchTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: switchTokens,
        dictionary: switchMap,
      });
    }

    const tabsTokens = this.tokenConfig?.[currentMode]?.tabs || this.tokenConfig?.light?.tabs;
    if (tabsTokens) {
      this.injectMappedTokens({ element: hostElement, payload: tabsTokens, dictionary: tabsMap });
    }
    const skeletonTokens =
      this.tokenConfig?.[currentMode]?.skeleton || this.tokenConfig?.light?.skeleton;
    if (skeletonTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: skeletonTokens,
        dictionary: skeletonMap,
      });
    }

    const tableTokens = this.tokenConfig?.[currentMode]?.table || this.tokenConfig?.light?.table;
    if (tableTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: tableTokens,
        dictionary: tableMap,
      });
    }

    const overlayTokens =
      this.tokenConfig?.[currentMode]?.overlay || this.tokenConfig?.light?.overlay;
    if (overlayTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: overlayTokens,
        dictionary: overlayMap,
      });
    }

    const modalTokens = this.tokenConfig?.[currentMode]?.modal || this.tokenConfig?.light?.modal;
    if (modalTokens) {
      this.injectMappedTokens({ element: hostElement, payload: modalTokens, dictionary: modalMap });
    }

    const drawerTokens = this.tokenConfig?.[currentMode]?.drawer || this.tokenConfig?.light?.drawer;
    if (drawerTokens) {
      this.injectMappedTokens({
        element: hostElement,
        payload: drawerTokens,
        dictionary: drawerMap,
      });
    }
  }

  private injectMappedTokens(params: {
    dictionary: Record<string, string>;
    removable?: boolean;
    element: HTMLElement;
    payload: any;
  }) {
    const removable = params.removable ?? true;
    Object.entries(params.payload).forEach(([key, value]) => {
      const cssVar = params.dictionary[key];
      if (cssVar && value !== undefined && value !== null) {
        params.element.style.setProperty(cssVar, String(value));
        if (removable) {
          this.previouslyInjectedVars.push(cssVar);
        }
      }
    });
  }

  private injectColors(element: HTMLElement, colors: DasarThemeColors) {
    Object.entries(colors).forEach(([paletteName, shades]) => {
      if (shades && typeof shades === 'object') {
        Object.entries(shades).forEach(([shadeKey, value]) => {
          if (value !== undefined && value !== null) {
            const cssVar = `--dasar-${paletteName}-${shadeKey}`;
            element.style.setProperty(cssVar, String(value));
            this.previouslyInjectedVars.push(cssVar);
          }
        });
      }
    });
  }
}
