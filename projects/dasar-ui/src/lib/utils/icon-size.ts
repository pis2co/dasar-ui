/**
 * Maps a control size (xs / sm / md / lg / xl) to a pixel size that fits the
 * control height. The library default for `dasar-icon` is `md` (24px), which is
 * too tall for a `xs` (24px) or `sm` (32px) field trigger.
 */
export function fieldIconSize(size: string | number | null | undefined): number {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 14;
    case 'lg':
      return 20;
    case 'xl':
      return 24;
    case 'md':
      return 16;
    default:
      return typeof size === 'number' ? size : 16;
  }
}
