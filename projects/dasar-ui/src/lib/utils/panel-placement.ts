export type DasarPanelPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

/** Minimal rectangle needed to decide a placement; lets tests inject fakes. */
export type DasarPlacementRect = Pick<
  DOMRect,
  'top' | 'bottom' | 'left' | 'right' | 'width' | 'height'
>;

export interface DasarPlacementTarget {
  getBoundingClientRect(): DasarPlacementRect;
}

/**
 * Decides where a floating panel (dropdown, menu, datepicker calendar) should
 * open relative to its trigger, based on the space left in the viewport.
 *
 * It always starts from the preferred placement, so a previous flip is never
 * used as the base for the next calculation.
 *
 * @param trigger the element the panel is anchored to
 * @param panel the floating panel element (measured after it is rendered)
 * @param preferred the placement requested by the consumer
 * @param margin minimum distance kept from the viewport edge
 */
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

  // Vertical flip: pick the side with more room when the preferred one is too tight.
  const spaceBelow = window.innerHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  const requiredVertical = panelRect.height + margin;

  if (vertical === 'bottom' && spaceBelow < requiredVertical && spaceAbove > spaceBelow) {
    vertical = 'top';
  } else if (vertical === 'top' && spaceAbove < requiredVertical && spaceBelow > spaceAbove) {
    vertical = 'bottom';
  }

  // Horizontal flip: same rule on the horizontal axis.
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
