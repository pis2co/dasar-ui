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
