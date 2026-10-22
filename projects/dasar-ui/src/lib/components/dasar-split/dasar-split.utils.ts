export type DasarSplitLength = string | number;

// Converts a number, px string or percent string into pixels against the container size.
export const resolveSplitLength = (
  value: DasarSplitLength | null | undefined,
  containerSize: number,
): number | null => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const text = value.trim();
  const parsed = parseFloat(text);
  if (!Number.isFinite(parsed)) return null;
  return text.endsWith('%') ? (parsed / 100) * containerSize : parsed;
};

// Keeps the first panel size between min and max and never beyond the container.
export const clampSplitSize = (
  size: number,
  min: number | null,
  max: number | null,
  containerSize: number,
): number => {
  const upper = Math.max(0, Math.min(max ?? containerSize, containerSize));
  const lower = Math.min(Math.max(0, min ?? 0), upper);
  return Math.round(Math.min(Math.max(size, lower), upper));
};
