export type DasarPanelPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export type DasarPlacementRect = Pick<
  DOMRect,
  'top' | 'bottom' | 'left' | 'right' | 'width' | 'height'
>;

export interface DasarPlacementTarget {
  getBoundingClientRect(): DasarPlacementRect;
}

export function computeSmartPlacement(
  trigger: DasarPlacementTarget,
  panel: DasarPlacementTarget,
  preferred: DasarPanelPlacement,
  margin = 8,
): DasarPanelPlacement {
  if (typeof window === 'undefined') {
    return preferred;
  }

  const triggerRect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const [preferredVertical, preferredHorizontal] = preferred.split('-') as [
    'bottom' | 'top',
    'start' | 'end',
  ];

  let vertical = preferredVertical;
  let horizontal = preferredHorizontal;

  const spaceBelow = window.innerHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  const requiredVertical = panelRect.height + margin;

  if (vertical === 'bottom' && spaceBelow < requiredVertical && spaceAbove > spaceBelow) {
    vertical = 'top';
  } else if (vertical === 'top' && spaceAbove < requiredVertical && spaceBelow > spaceAbove) {
    vertical = 'bottom';
  }

  const spaceRight = window.innerWidth - triggerRect.left;
  const spaceLeft = triggerRect.right;
  const requiredHorizontal = panelRect.width + margin;

  if (horizontal === 'start' && spaceRight < requiredHorizontal && spaceLeft > spaceRight) {
    horizontal = 'end';
  } else if (horizontal === 'end' && spaceLeft < requiredHorizontal && spaceRight > spaceLeft) {
    horizontal = 'start';
  }

  return `${vertical}-${horizontal}` as DasarPanelPlacement;
}
