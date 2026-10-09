import { DasarThemeProviderComponent } from '../components/dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../services/theme.service';
import { DasarComponentCommonConfig, DasarComponentConfig } from '../models/theme.model';
import { ClassType } from '../models/type.model';

export function parseClassesToArray(classes: ClassType): string[] {
  if (!classes) {
    return [];
  }
  // Handle String ("class1 class2")
  if (typeof classes === 'string') {
    return classes.split(/\s+/).filter(Boolean);
  }
  // Handle Array (["class1", "class2 class3"])
  if (Array.isArray(classes)) {
    return classes.flatMap((c) => c.split(/\s+/).filter(Boolean));
  }
  // Handle Set (new Set(["class1", "class2"]))
  if (classes instanceof Set) {
    return Array.from(classes).flatMap((c) => c.split(/\s+/).filter(Boolean));
  }
  // Handle Object/Dictionary ({ 'class1': true, 'class2': false })
  if (typeof classes === 'object') {
    return Object.entries(classes)
      .filter(([_, condition]) => Boolean(condition)) // Keep only truthy values
      .map(([className]) => className)
      .flatMap((c) => c.split(/\s+/).filter(Boolean)); // Handle keys with spaces like { 'a b': true }
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

    // Helper to safely grab localized names (months, weekdays)
    const getIntl = (opts: Intl.DateTimeFormatOptions) => {
      try {
        return new Intl.DateTimeFormat(locale, opts).format(date);
      } catch {
        return '';
      }
    };

    const tokens: Record<string, string> = {
      // Year
      YYYY: year,
      yyyy: year,
      YY: year.slice(-2),
      yy: year.slice(-2),

      // Localized Month
      MMMM: getIntl({ month: 'long' }),
      LLLL: getIntl({ month: 'long' }), // Preserved from your original logic
      MMM: getIntl({ month: 'short' }),

      // Numeric Month
      MM: pad(month),
      M: month.toString(),

      // Numeric Day
      DD: pad(day),
      dd: pad(day),
      D: day.toString(),
      d: day.toString(),

      // Localized Weekday
      dddd: getIntl({ weekday: 'long' }),
      ddd: getIntl({ weekday: 'short' }),
      EEEE: getIntl({ weekday: 'long' }),
      EEE: getIntl({ weekday: 'short' }),
      EEEEE: getIntl({ weekday: 'narrow' }),

      // Time
      HH: pad(hours),
      H: hours.toString(),
      hh: pad(hours % 12 || 12),
      h: (hours % 12 || 12).toString(),
      mm: pad(minutes),
      m: minutes.toString(),
      ss: pad(seconds),
      s: seconds.toString(),

      // AM/PM
      A: hours >= 12 ? 'PM' : 'AM',
      a: hours >= 12 ? 'pm' : 'am',
    };

    // Sort by length descending to match longest tokens first (e.g. MMMM before MM)
    const regex = new RegExp(
      Object.keys(tokens)
        .sort((a, b) => b.length - a.length)
        .join('|'),
      'g',
    );

    // Replace all tokens in one pass
    return format.replace(regex, (match) => tokens[match] || match);
  } catch (e) {
    // Fallback if anything crashes
    return new Intl.DateTimeFormat(locale || 'en-US').format(date);
  }
}
export function parseFormattedStringIntoDate(value: string, format: string): Date | null {
  try {
    // Convert format string (e.g., dd-MM-yyyy) into a Regex with named groups
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
      const month = parseInt(match.groups['month'], 10) - 1; // JS Months are 0-11
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
  const serviceConfig = service?.themeVariable()?.components as any;

  // Component-Specific Config (First)
  if (providerConfig?.[componentKey]?.[propKey] !== undefined) {
    return providerConfig[componentKey]![propKey] as any;
  }
  if (serviceConfig?.[componentKey]?.[propKey] !== undefined) {
    return serviceConfig[componentKey]![propKey] as any;
  }

  // Common Config (Applies to all components if the property exists)
  const commonKey = propKey as unknown as keyof DasarComponentCommonConfig;
  if (providerConfig?.common?.[commonKey] !== undefined) {
    return providerConfig.common[commonKey] as any;
  }
  if (serviceConfig?.common?.[commonKey] !== undefined) {
    return serviceConfig.common[commonKey] as any;
  }

  // Component Default Value
  return fallback;
}
