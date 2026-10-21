import type { ThemingTokenRow } from './theming.data';

const FOUNDATION_PATH = 'theme.scss (override in plain CSS)';

const row = (component: string, cssVar: string): ThemingTokenRow => ({
  token: cssVar.replace(/^--/, ''),
  path: FOUNDATION_PATH,
  component,
  cssVar,
});

const palette = (name: string, shades: string[]) =>
  shades.map((shade) => row('palette', `--dasar-${name}-${shade}`));

const spacing = [
  '0',
  '0-5',
  '1',
  'base',
  '3',
  '4',
  '5',
  '6',
  '8',
  '10',
  '12',
  '16',
  '18',
  '24',
  '32',
  '40',
  '48',
  '56',
  '64',
  '80',
  '96',
  '120',
];

const radius = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];

const colors = [
  '--dasar-text-white-color',
  '--dasar-text-black-color',
  '--dasar-theme-text-color',
  '--dasar-theme-success-color',
  '--dasar-theme-success-surface-color',
  '--dasar-theme-danger-color',
  '--dasar-theme-danger-surface-color',
  '--dasar-theme-warning-color',
  '--dasar-theme-warning-surface-color',
];

/** Variables defined in `theme.scss` that no theme token map writes. */
export const FOUNDATION_ROWS: ThemingTokenRow[] = [
  ...spacing.map((step) => row('spacing', `--dasar-space-${step}`)),
  ...radius.map((step) => row('radius', `--dasar-radius-${step}`)),
  ...colors.map((cssVar) => row('colors', cssVar)),
  ...palette('primary', ['900', '800', '700', 'base', '500', '300', '200', '100', '50']),
  ...palette('neutral', ['900', '800', '700', 'base', '500', '400', '300', '200', '100', '50']),
  ...palette('success', ['800', '500', 'base', '200', '50']),
  ...palette('danger', ['800', '500', 'base', '200', '50']),
  ...palette('warning', ['800', '500', 'base', '200', '50']),
];
