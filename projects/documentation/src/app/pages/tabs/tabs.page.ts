import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsLayoutComponent, DocApiProperty } from '../../layouts/doc.layout';
import { DocExampleComponent } from '../../components/doc-example.component';

import { TabsBasicExample } from './examples/basic/tabs-basic.example';
import { TabsAppearanceExample } from './examples/appearance/tabs-appearance.example';
import { TabsSizeExample } from './examples/size/tabs-size.example';
import { TabsSpacingExample } from './examples/spacing/tabs-spacing.example';
import { TabsRadiusExample } from './examples/radius/tabs-radius.example';
import { TabsFluidExample } from './examples/fluid/tabs-fluid.example';
import { TabsNoBodyExample } from './examples/no-body/tabs-no-body.example';
import { TabsSlotsExample } from './examples/slots/tabs-slots.example';
import { TabsCustomStyleExample } from './examples/custom-style/tabs-custom-style.example';
import { TabsEventsExample } from './examples/events/tabs-events.example';
import { TabsAdvancedDynamicExample } from './examples/advanced-dynamic/tabs-advanced-dynamic.example';
import { TabsAdvancedFormExample } from './examples/advanced-form/tabs-advanced-form.example';
import { TabsAdvancedThemeExample } from './examples/advanced-theme/tabs-advanced-theme.example';
import { TabsScrollExample } from './examples/scroll/tabs-scroll.example';
import { TabsScrollIconExample } from './examples/scroll-icon/tabs-scroll-icon.example';
import { TabsScrollSlotExample } from './examples/scroll-slot/tabs-scroll-slot.example';

// @ts-ignore
import basicHtml from './examples/basic/tabs-basic.example.html' with { loader: 'text' };
// @ts-ignore
import basicTs from './examples/basic/tabs-basic.example.ts' with { loader: 'text' };
// @ts-ignore
import appearanceHtml from './examples/appearance/tabs-appearance.example.html' with {
  loader: 'text',
};
// @ts-ignore
import appearanceTs from './examples/appearance/tabs-appearance.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import sizeHtml from './examples/size/tabs-size.example.html' with { loader: 'text' };
// @ts-ignore
import sizeTs from './examples/size/tabs-size.example.ts' with { loader: 'text' };
// @ts-ignore
import spacingHtml from './examples/spacing/tabs-spacing.example.html' with { loader: 'text' };
// @ts-ignore
import spacingTs from './examples/spacing/tabs-spacing.example.ts' with { loader: 'text' };
// @ts-ignore
import radiusHtml from './examples/radius/tabs-radius.example.html' with { loader: 'text' };
// @ts-ignore
import radiusTs from './examples/radius/tabs-radius.example.ts' with { loader: 'text' };
// @ts-ignore
import fluidHtml from './examples/fluid/tabs-fluid.example.html' with { loader: 'text' };
// @ts-ignore
import fluidTs from './examples/fluid/tabs-fluid.example.ts' with { loader: 'text' };
// @ts-ignore
import noBodyHtml from './examples/no-body/tabs-no-body.example.html' with { loader: 'text' };
// @ts-ignore
import noBodyTs from './examples/no-body/tabs-no-body.example.ts' with { loader: 'text' };
// @ts-ignore
import slotsHtml from './examples/slots/tabs-slots.example.html' with { loader: 'text' };
// @ts-ignore
import slotsTs from './examples/slots/tabs-slots.example.ts' with { loader: 'text' };
// @ts-ignore
import customStyleHtml from './examples/custom-style/tabs-custom-style.example.html' with {
  loader: 'text',
};
// @ts-ignore
import customStyleTs from './examples/custom-style/tabs-custom-style.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import eventsHtml from './examples/events/tabs-events.example.html' with { loader: 'text' };
// @ts-ignore
import eventsTs from './examples/events/tabs-events.example.ts' with { loader: 'text' };
// @ts-ignore
import advancedDynamicHtml from './examples/advanced-dynamic/tabs-advanced-dynamic.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedDynamicTs from './examples/advanced-dynamic/tabs-advanced-dynamic.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import advancedFormHtml from './examples/advanced-form/tabs-advanced-form.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedFormTs from './examples/advanced-form/tabs-advanced-form.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeHtml from './examples/advanced-theme/tabs-advanced-theme.example.html' with {
  loader: 'text',
};
// @ts-ignore
import advancedThemeTs from './examples/advanced-theme/tabs-advanced-theme.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import scrollHtml from './examples/scroll/tabs-scroll.example.html' with { loader: 'text' };
// @ts-ignore
import scrollTs from './examples/scroll/tabs-scroll.example.ts' with { loader: 'text' };
// @ts-ignore
import scrollIconHtml from './examples/scroll-icon/tabs-scroll-icon.example.html' with {
  loader: 'text',
};
// @ts-ignore
import scrollIconTs from './examples/scroll-icon/tabs-scroll-icon.example.ts' with {
  loader: 'text',
};
// @ts-ignore
import scrollSlotHtml from './examples/scroll-slot/tabs-scroll-slot.example.html' with {
  loader: 'text',
};
// @ts-ignore
import scrollSlotTs from './examples/scroll-slot/tabs-scroll-slot.example.ts' with {
  loader: 'text',
};

@Component({
  imports: [
    CommonModule,
    DocsLayoutComponent,
    DocExampleComponent,
    TabsBasicExample,
    TabsAppearanceExample,
    TabsSizeExample,
    TabsSpacingExample,
    TabsRadiusExample,
    TabsFluidExample,
    TabsNoBodyExample,
    TabsSlotsExample,
    TabsCustomStyleExample,
    TabsEventsExample,
    TabsAdvancedDynamicExample,
    TabsAdvancedFormExample,
    TabsAdvancedThemeExample,
    TabsScrollExample,
    TabsScrollIconExample,
    TabsScrollSlotExample,
  ],
  templateUrl: './tabs.page.html',
  selector: 'app-tabs-page',
  standalone: true,
})
export class TabsDocPage {
  protected basicHtml = basicHtml;
  protected basicTs = basicTs;

  protected appearanceHtml = appearanceHtml;
  protected appearanceTs = appearanceTs;

  protected sizeHtml = sizeHtml;
  protected sizeTs = sizeTs;

  protected spacingHtml = spacingHtml;
  protected spacingTs = spacingTs;

  protected radiusHtml = radiusHtml;
  protected radiusTs = radiusTs;

  protected fluidHtml = fluidHtml;
  protected fluidTs = fluidTs;

  protected noBodyHtml = noBodyHtml;
  protected noBodyTs = noBodyTs;

  protected slotsHtml = slotsHtml;
  protected slotsTs = slotsTs;

  protected customStyleHtml = customStyleHtml;
  protected customStyleTs = customStyleTs;

  protected eventsHtml = eventsHtml;
  protected eventsTs = eventsTs;

  protected advancedDynamicHtml = advancedDynamicHtml;
  protected advancedDynamicTs = advancedDynamicTs;

  protected advancedFormHtml = advancedFormHtml;
  protected advancedFormTs = advancedFormTs;

  protected advancedThemeHtml = advancedThemeHtml;
  protected advancedThemeTs = advancedThemeTs;

  protected scrollHtml = scrollHtml;
  protected scrollTs = scrollTs;

  protected scrollIconHtml = scrollIconHtml;
  protected scrollIconTs = scrollIconTs;

  protected scrollSlotHtml = scrollSlotHtml;
  protected scrollSlotTs = scrollSlotTs;

  protected readonly apiProps: DocApiProperty[] = [
    {
      name: 'items',
      type: 'string[]',
      defaultValue: '[]',
      description:
        'Renders one tab trigger per entry. When it is empty, the component falls back to the [tab-item-slot] templates.',
    },
    {
      name: 'active-index',
      type: 'number',
      defaultValue: '0',
      description: 'The index of the open tab. The component sets it in onTabsChange.',
    },
    {
      name: 'appearance',
      type: "'solid' | 'subtle' | 'outline'",
      defaultValue: "'subtle'",
      description:
        'Visual style of the tab strip. Outline removes the container and draws an underline instead.',
    },
    {
      name: 'size',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description:
        'Sizing of the tab strip and of the trigger buttons. none maps to xs and full maps to xl on the button scale.',
    },
    {
      name: 'spacing',
      type: "'normal' | 'compact'",
      defaultValue: "'normal'",
      description: 'Padding and gap of the tab strip, and the gap above the body content.',
    },
    {
      name: 'radius',
      type: 'ScaleAttributeType',
      defaultValue: "'md'",
      description: 'Border radius of the tab strip. Outline appearance always stays square.',
    },
    {
      name: 'fluid',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Stretches the triggers to fill the strip, so the tabs share the width evenly.',
    },
    {
      name: 'container-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the outer container.',
    },
    {
      name: 'list-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the tab strip.',
    },
    {
      name: 'content-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to the body container.',
    },
    {
      name: 'container-style',
      type: 'object',
      defaultValue: 'null',
      description:
        'Inline style for the outer container. A good place to set the --tabs-* CSS variables.',
    },
    {
      name: 'list-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the tab strip.',
    },
    {
      name: 'content-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style for the body container.',
    },
    {
      name: '(onTabsChange)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description:
        'Fires when the active tab changes. It is not emitted when the active tab is clicked again.',
    },
    {
      name: '(onTabsClick)',
      type: 'EventEmitter<number>',
      defaultValue: '-',
      description: 'Fires on every tab click, including the already active tab.',
    },
    {
      name: 'scroll-left-icon-name',
      type: 'string',
      defaultValue: "'chevron-left'",
      description:
        'Icon name for the left arrow. The arrow only renders while the strip overflows the container.',
    },
    {
      name: 'scroll-right-icon-name',
      type: 'string',
      defaultValue: "'chevron-right'",
      description: 'Icon name for the right arrow.',
    },
    {
      name: 'scroll-button-class',
      type: 'string | object',
      defaultValue: "''",
      description: 'Class applied to both arrow buttons.',
    },
    {
      name: 'scroll-button-style',
      type: 'object',
      defaultValue: 'null',
      description: 'Inline style applied to both arrow buttons.',
    },
    {
      name: '[tabs-scroll-left-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Replaces the content of the left arrow button. The button itself, its disabled edge state and its visibility stay automatic.',
    },
    {
      name: '[tabs-scroll-right-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description: 'Replaces the content of the right arrow button.',
    },
    {
      name: 'theme tokens',
      type: 'DasarThemeTabs',
      defaultValue: '-',
      description:
        'Set through tokens.light.tabs (or tokens.dark.tabs) in DasarThemeService.setGlobalTheme, or [tokenConfig] on dasar-theme-provider. Each key writes one CSS variable, for example gapNormal -> --tabs-gap-normal and scrollFade -> --tabs-scroll-fade.',
    },
    {
      name: '[tab-item-slot]',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'Custom template for one tab trigger. The order of the templates defines the tab order. Used when items is empty.',
    },
    {
      name: 'default slot',
      type: 'Content Slot',
      defaultValue: '-',
      description:
        'The tab body. When nothing is projected, the component renders no body padding at all.',
    },
  ];
}
