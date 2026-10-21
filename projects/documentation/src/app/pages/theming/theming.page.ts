import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { ThemingCustomTokensExample } from './examples/custom-tokens/theming-custom-tokens.example';
import { ThemingComponentConfigExample } from './examples/component-config/theming-component-config.example';
import { ThemingLightDarkExample } from './examples/light-dark/theming-light-dark.example';
import { ThemingGlobalThemeExample } from './examples/global-theme/theming-global-theme.example';
import { ThemingCssOverrideExample } from './examples/css-override/theming-css-override.example';

// @ts-ignore
import customTokensHtml from './examples/custom-tokens/theming-custom-tokens.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customTokensTs from './examples/custom-tokens/theming-custom-tokens.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import componentConfigHtml from './examples/component-config/theming-component-config.example.html' with {
  loader: 'text',
};
// @ts-ignore
import componentConfigTs from './examples/component-config/theming-component-config.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import lightDarkHtml from './examples/light-dark/theming-light-dark.example.html' with {
  loader: 'text',
};
// @ts-ignore
import lightDarkTs from './examples/light-dark/theming-light-dark.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import globalThemeHtml from './examples/global-theme/theming-global-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import globalThemeTs from './examples/global-theme/theming-global-theme.example.ts' with {
  loader: 'text',
};

// @ts-ignore
import cssOverrideHtml from './examples/css-override/theming-css-override.example.html' with {
  loader: 'text',
};
// @ts-ignore
import cssOverrideTs from './examples/css-override/theming-css-override.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import cssOverrideCss from './examples/css-override/theming-css-override.example.scss' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    ThemingCustomTokensExample,
    ThemingComponentConfigExample,
    ThemingLightDarkExample,
    ThemingGlobalThemeExample,
    ThemingCssOverrideExample,
  ],
  templateUrl: './theming.page.html',
  selector: 'app-theming-page',
  standalone: true,
})
export class ThemingDocPage {
  protected customTokensHtml = customTokensHtml;
  protected customTokensTs = customTokensTs;

  protected componentConfigHtml = componentConfigHtml;
  protected componentConfigTs = componentConfigTs;

  protected lightDarkHtml = lightDarkHtml;
  protected lightDarkTs = lightDarkTs;

  protected globalThemeHtml = globalThemeHtml;
  protected globalThemeTs = globalThemeTs;

  protected cssOverrideHtml = cssOverrideHtml;
  protected cssOverrideTs = cssOverrideTs;
  protected cssOverrideCss = cssOverrideCss as unknown as string;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'CSS variables',
      type: 'layer 1',
      defaultValue: '-',
      description:
        'Lowest level. Every component reads var(--<component>-*) with a fallback. Override them in plain CSS, optionally scoped to a wrapper class. Full list on the CSS Variables page.',
    },
    {
      name: 'theme tokens',
      type: 'layer 2',
      defaultValue: '-',
      description:
        'Middle level. Token keys map to CSS variables through the *Map objects (for example listMap). Set them per mode with tokens.light / tokens.dark in setGlobalTheme or [tokenConfig]. Full list on the Theme Tokens page.',
    },
    {
      name: 'component config',
      type: 'layer 3',
      defaultValue: '-',
      description:
        'Highest level. Defaults for inputs such as size, appearance or bordered, set with components in setGlobalTheme or [componentConfig]. Explicit inputs on a component always win. Full list on the Component Config page.',
    },
    {
      name: '[tokenConfig]',
      type: "DasarThemeConfig['tokens']",
      defaultValue: '-',
      description:
        'On dasar-theme-provider. Scoped tokens: { light: { button: { ... } }, dark: { ... } }.',
    },
    {
      name: '[componentConfig]',
      type: 'DasarComponentConfig',
      defaultValue: '-',
      description:
        'On dasar-theme-provider. Scoped defaults: { button: { appearance: "outline" } }.',
    },
    {
      name: '[mode]',
      type: "'light' | 'dark'",
      defaultValue: "'light', or the parent provider's mode",
      description:
        'On dasar-theme-provider. Picks the light or dark token set and sets data-theme. A provider inside another provider follows its parent unless it sets its own mode.',
    },
    {
      name: 'setGlobalTheme',
      type: 'DasarThemeService method',
      defaultValue: '-',
      description:
        'Global theming: setGlobalTheme({ mode, colors, components, tokens }, targetElement?). Writes variables onto document.documentElement by default.',
    },
  ];
}
