import { DasarThemeProviderComponent } from '../components/dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../services/theme.service';
import { DasarComponentCommonConfig, DasarComponentConfig } from '../models/theme.model';
import { ClassType } from '../models/type.model';

export function parseClassesToArray(classes: ClassType): string[] {
  if (!classes) {
    return [];
  }
  if (typeof classes === 'string') {
    return classes.split(/\s+/).filter(Boolean);
  }
  if (Array.isArray(classes)) {
    return classes.flatMap((c) => c.split(/\s+/).filter(Boolean));
  }
  if (classes instanceof Set) {
    return Array.from(classes).flatMap((c) => c.split(/\s+/).filter(Boolean));
  }
  if (typeof classes === 'object') {
    return Object.entries(classes)
      .filter(([_, condition]) => Boolean(condition))
      .map(([className]) => className)
      .flatMap((c) => c.split(/\s+/).filter(Boolean));
  }
  return [];
}
export function safeFormat(date: Date, format: string, locale: string): string {
  if (!date || isNaN(date.getTime())) return '';

  try {
    const year = date.getFullYear().toString();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pad = (num: number) => num.toString().padStart(2, '0');

    const getIntl = (opts: Intl.DateTimeFormatOptions) => {
      try {
        return new Intl.DateTimeFormat(locale, opts).format(date);
      } catch {
        return '';
      }
    };

    const tokens: Record<string, string> = {
      YYYY: year,
      yyyy: year,
      YY: year.slice(-2),
      yy: year.slice(-2),

      MMMM: getIntl({ month: 'long' }),
      LLLL: getIntl({ month: 'long' }),
      MMM: getIntl({ month: 'short' }),

      MM: pad(month),
      M: month.toString(),

      DD: pad(day),
      dd: pad(day),
      D: day.toString(),
      d: day.toString(),

      dddd: getIntl({ weekday: 'long' }),
      ddd: getIntl({ weekday: 'short' }),
      EEEE: getIntl({ weekday: 'long' }),
      EEE: getIntl({ weekday: 'short' }),
      EEEEE: getIntl({ weekday: 'narrow' }),

      HH: pad(hours),
      H: hours.toString(),
      hh: pad(hours % 12 || 12),
      h: (hours % 12 || 12).toString(),
      mm: pad(minutes),
      m: minutes.toString(),
      ss: pad(seconds),
      s: seconds.toString(),

      A: hours >= 12 ? 'PM' : 'AM',
      a: hours >= 12 ? 'pm' : 'am',
    };

    const regex = new RegExp(
      Object.keys(tokens)
        .sort((a, b) => b.length - a.length)
        .join('|'),
      'g',
    );

    return format.replace(regex, (match) => tokens[match] || match);
  } catch (e) {
    return new Intl.DateTimeFormat(locale || 'en-US').format(date);
  }
}
export function parseFormattedStringIntoDate(value: string, format: string): Date | null {
  try {
    let regexStr = format
      .replace('yyyy', '(?<year>\\d{4})')
      .replace('MM', '(?<month>\\d{2})')
      .replace('dd', '(?<day>\\d{2})')
      .replace('HH', '(?<hour>\\d{2})')
      .replace('mm', '(?<minute>\\d{2})')
      .replace('ss', '(?<second>\\d{2})');

    const match = value.match(new RegExp(`^${regexStr}$`));

    if (match && match.groups) {
      const year = parseInt(match.groups['year'], 10);
      const month = parseInt(match.groups['month'], 10) - 1;
      const day = parseInt(match.groups['day'], 10);

      const hour = match.groups['hour'] ? parseInt(match.groups['hour'], 10) : 0;
      const min = match.groups['minute'] ? parseInt(match.groups['minute'], 10) : 0;
      const sec = match.groups['second'] ? parseInt(match.groups['second'], 10) : 0;

      const parsedDate = new Date(year, month, day, hour, min, sec);
      if (!isNaN(parsedDate.getTime())) return parsedDate;
    }
  } catch (e) {
    return null;
  }
  return null;
}
export function resolveThemeDefault<
  T,
  C extends keyof DasarComponentConfig,
  K extends keyof NonNullable<DasarComponentConfig[C]>,
>(
  componentKey: C,
  propKey: K,
  fallback: NonNullable<NonNullable<DasarComponentConfig[C]>[K]> | T,
  provider: DasarThemeProviderComponent | null,
  service: DasarThemeService | null,
): NonNullable<NonNullable<DasarComponentConfig[C]>[K]> | T {
  const providerConfig = provider?.componentConfig as any;
  const serviceConfig = service?.rawThemeVariable()?.components as any;

  if (providerConfig?.[componentKey]?.[propKey] !== undefined) {
    return providerConfig[componentKey]![propKey] as any;
  }
  if (serviceConfig?.[componentKey]?.[propKey] !== undefined) {
    return serviceConfig[componentKey]![propKey] as any;
  }

  const commonKey = propKey as unknown as keyof DasarComponentCommonConfig;
  if (providerConfig?.common?.[commonKey] !== undefined) {
    return providerConfig.common[commonKey] as any;
  }
  if (serviceConfig?.common?.[commonKey] !== undefined) {
    return serviceConfig.common[commonKey] as any;
  }

  return fallback;
}
