import { NumberInputDocPage } from '../pages/number-input/number-input.page';
import { DatepickerDocPage } from '../pages/datepicker/datepicker.page';
import { CalendarDocPage } from '../pages/calendar/calendar.page';
import { ButtonDocPage } from '../pages/button/button.page';
import { SelectDocPage } from '../pages/select/select.page';
import { InputDocPage } from '../pages/input/input.page';
import { TableDocPage } from '../pages/table/table.page';
import { ChipDocPage } from '../pages/chip/chip.page';
import { IconDocPage } from '../pages/icon/icon.page';
import { CardDocPage } from '../pages/card/card.page';
import { MenuDocPage } from '../pages/menu/menu.page';
import { ModalDocPage } from '../pages/modal/modal.page';
import { TabsDocPage } from '../pages/tabs/tabs.page';
import { ListDocPage } from '../pages/list/list.page';
import { IntroductionDocPage } from '../pages/introduction/introduction.page';
import { InstallationDocPage } from '../pages/installation/installation.page';
import { GettingStartedDocPage } from '../pages/getting-started/getting-started.page';
import { ThemingDocPage } from '../pages/theming/theming.page';
import { ThemingTokensDocPage } from '../pages/theming/theming-tokens.page';
import { ThemingCssVariablesDocPage } from '../pages/theming/theming-css-variables.page';
import { ThemingComponentConfigDocPage } from '../pages/theming/theming-component-config.page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full',
  },
  {
    path: 'introduction',
    component: IntroductionDocPage,
    title: 'Introduction',
  },
  {
    path: 'installation',
    component: InstallationDocPage,
    title: 'Installation',
  },
  {
    path: 'getting-started',
    component: GettingStartedDocPage,
    title: 'Getting Started',
  },
  {
    path: 'theming',
    component: ThemingDocPage,
    title: 'Theming',
  },
  {
    path: 'theming/tokens',
    component: ThemingTokensDocPage,
    title: 'Theme Tokens',
  },
  {
    path: 'theming/css-variables',
    component: ThemingCssVariablesDocPage,
    title: 'CSS Variables',
  },
  {
    path: 'theming/component-config',
    component: ThemingComponentConfigDocPage,
    title: 'Component Config',
  },
  {
    path: 'components/button',
    component: ButtonDocPage,
    title: 'Button Docs',
  },
  {
    path: 'components/icon',
    component: IconDocPage,
    title: 'Icon Docs',
  },
  {
    path: 'components/chip',
    component: ChipDocPage,
    title: 'Chip Docs',
  },
  {
    path: 'components/card',
    component: CardDocPage,
    title: 'Card Docs',
  },
  {
    path: 'components/modal',
    component: ModalDocPage,
    title: 'Modal Docs',
  },
  {
    path: 'components/tabs',
    component: TabsDocPage,
    title: 'Tabs Docs',
  },
  {
    path: 'components/list',
    component: ListDocPage,
    title: 'List Docs',
  },
  {
    path: 'components/calendar',
    component: CalendarDocPage,
    title: 'Calendar Docs',
  },
  {
    path: 'components/datepicker',
    component: DatepickerDocPage,
    title: 'Datepicker Docs',
  },
  {
    path: 'components/table',
    component: TableDocPage,
    title: 'Table Docs',
  },
  {
    path: 'components/select',
    component: SelectDocPage,
    title: 'Select Docs',
  },
  {
    path: 'components/input',
    component: InputDocPage,
    title: 'Input Docs',
  },
  {
    path: 'components/number-input',
    component: NumberInputDocPage,
    title: 'Number Input Docs',
  },
  {
    path: 'components/menu',
    component: MenuDocPage,
    title: 'Menu Docs',
  },
];
