import { ThemingComponentConfigDocPage } from '../pages/theming/theming-component-config.page';
import { ThemingCssVariablesDocPage } from '../pages/theming/theming-css-variables.page';
import { GettingStartedDocPage } from '../pages/getting-started/getting-started.page';
import { IntroductionDocPage } from '../pages/introduction/introduction.page';
import { InstallationDocPage } from '../pages/installation/installation.page';
import { NumberInputDocPage } from '../pages/number-input/number-input.page';
import { ThemingTokensDocPage } from '../pages/theming/theming-tokens.page';
import { DatepickerDocPage } from '../pages/datepicker/datepicker.page';
import { CalendarDocPage } from '../pages/calendar/calendar.page';
import { ThemingDocPage } from '../pages/theming/theming.page';
import { ButtonDocPage } from '../pages/button/button.page';
import { ButtonGroupDocPage } from '../pages/button-group/button-group.page';
import { SelectDocPage } from '../pages/select/select.page';
import { InputDocPage } from '../pages/input/input.page';
import { TableDocPage } from '../pages/table/table.page';
import { ModalDocPage } from '../pages/modal/modal.page';
import { DrawerDocPage } from '../pages/drawer/drawer.page';
import { SplitDocPage } from '../pages/split/split.page';
import { ToastDocPage } from '../pages/toast/toast.page';
import { TreeDocPage } from '../pages/tree/tree.page';
import { ChipDocPage } from '../pages/chip/chip.page';
import { DividerDocPage } from '../pages/divider/divider.page';
import { AlertDocPage } from '../pages/alert/alert.page';
import { CheckboxDocPage } from '../pages/checkbox/checkbox.page';
import { RadioDocPage } from '../pages/radio/radio.page';
import { BreakpointDocPage } from '../pages/breakpoint/breakpoint.page';
import { IconDocPage } from '../pages/icon/icon.page';
import { CardDocPage } from '../pages/card/card.page';
import { MenuDocPage } from '../pages/menu/menu.page';
import { TabsDocPage } from '../pages/tabs/tabs.page';
import { ListDocPage } from '../pages/list/list.page';
import { PaginationDocPage } from '../pages/pagination/pagination.page';
import { SwitchDocPage } from '../pages/switch/switch.page';
import { SkeletonDocPage } from '../pages/skeleton/skeleton.page';
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
    title: 'Introduction | Dasar UI',
  },
  {
    path: 'installation',
    component: InstallationDocPage,
    title: 'Installation | Dasar UI',
  },
  {
    path: 'getting-started',
    component: GettingStartedDocPage,
    title: 'Getting Started | Dasar UI',
  },
  {
    path: 'theming',
    component: ThemingDocPage,
    title: 'Theming | Dasar UI',
  },
  {
    path: 'theming/tokens',
    component: ThemingTokensDocPage,
    title: 'Theme Tokens | Dasar UI',
  },
  {
    path: 'theming/css-variables',
    component: ThemingCssVariablesDocPage,
    title: 'CSS Variables | Dasar UI',
  },
  {
    path: 'theming/component-config',
    component: ThemingComponentConfigDocPage,
    title: 'Component Config | Dasar UI',
  },
  {
    path: 'components/button',
    component: ButtonDocPage,
    title: 'Button Docs | Dasar UI',
  },
  {
    path: 'components/button-group',
    component: ButtonGroupDocPage,
    title: 'Button Group Docs | Dasar UI',
  },
  {
    path: 'components/icon',
    component: IconDocPage,
    title: 'Icon Docs | Dasar UI',
  },
  {
    path: 'components/chip',
    component: ChipDocPage,
    title: 'Chip Docs | Dasar UI',
  },
  {
    path: 'components/divider',
    component: DividerDocPage,
    title: 'Divider Docs | Dasar UI',
  },
  {
    path: 'components/alert',
    component: AlertDocPage,
    title: 'Alert Docs | Dasar UI',
  },
  {
    path: 'components/checkbox',
    component: CheckboxDocPage,
    title: 'Checkbox Docs | Dasar UI',
  },
  {
    path: 'components/radio',
    component: RadioDocPage,
    title: 'Radio Docs | Dasar UI',
  },
  {
    path: 'components/breakpoint',
    component: BreakpointDocPage,
    title: 'Breakpoint Docs | Dasar UI',
  },
  {
    path: 'components/card',
    component: CardDocPage,
    title: 'Card Docs | Dasar UI',
  },
  {
    path: 'components/modal',
    component: ModalDocPage,
    title: 'Modal Docs | Dasar UI',
  },
  {
    path: 'components/drawer',
    component: DrawerDocPage,
    title: 'Drawer Docs | Dasar UI',
  },
  {
    path: 'components/split',
    component: SplitDocPage,
    title: 'Split Docs | Dasar UI',
  },
  {
    path: 'components/toast',
    component: ToastDocPage,
    title: 'Toast Docs | Dasar UI',
  },
  {
    path: 'components/tree',
    component: TreeDocPage,
    title: 'Tree Docs | Dasar UI',
  },
  {
    path: 'components/tabs',
    component: TabsDocPage,
    title: 'Tabs Docs | Dasar UI',
  },
  {
    path: 'components/list',
    component: ListDocPage,
    title: 'List Docs | Dasar UI',
  },
  {
    path: 'components/pagination',
    component: PaginationDocPage,
    title: 'Pagination Docs | Dasar UI',
  },
  {
    path: 'components/switch',
    component: SwitchDocPage,
    title: 'Switch Docs | Dasar UI',
  },
  {
    path: 'components/skeleton',
    component: SkeletonDocPage,
    title: 'Skeleton Docs | Dasar UI',
  },
  {
    path: 'components/calendar',
    component: CalendarDocPage,
    title: 'Calendar Docs | Dasar UI',
  },
  {
    path: 'components/datepicker',
    component: DatepickerDocPage,
    title: 'Datepicker Docs | Dasar UI',
  },
  {
    path: 'components/table',
    component: TableDocPage,
    title: 'Table Docs | Dasar UI',
  },
  {
    path: 'components/select',
    component: SelectDocPage,
    title: 'Select Docs | Dasar UI',
  },
  {
    path: 'components/input',
    component: InputDocPage,
    title: 'Input Docs | Dasar UI',
  },
  {
    path: 'components/number-input',
    component: NumberInputDocPage,
    title: 'Number Input Docs | Dasar UI',
  },
  {
    path: 'components/menu',
    component: MenuDocPage,
    title: 'Menu Docs | Dasar UI',
  },
];
