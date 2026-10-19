import { DestroyRef } from '@angular/core';

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

/**
 * Positions a panel with `position: fixed` using viewport coordinates, so it is not
 * clipped by ancestors with `overflow: hidden` (e.g. a card with `hide-overflow`).
 * Hides the panel while its trigger is scrolled out of the clipping ancestors.
 */
export function applyFixedPanelPosition(
  trigger: HTMLElement,
  panel: HTMLElement,
  placement: DasarPanelPlacement,
  options: { offset?: number; matchWidth?: boolean } = {},
): void {
  const { offset = 6, matchWidth = false } = options;
  const triggerRect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const [vertical, horizontal] = placement.split('-') as ['bottom' | 'top', 'start' | 'end'];

  const top =
    vertical === 'bottom'
      ? triggerRect.bottom + offset
      : triggerRect.top - panelRect.height - offset;
  const left = horizontal === 'start' ? triggerRect.left : triggerRect.right - panelRect.width;

  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
  panel.style.right = 'auto';
  panel.style.bottom = 'auto';
  if (matchWidth) panel.style.width = `${triggerRect.width}px`;
  panel.style.visibility = isVisibleInClippingAncestors(trigger) ? 'visible' : 'hidden';
}

function isVisibleInClippingAncestors(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    const { overflowX, overflowY } = getComputedStyle(parent);
    if (/(hidden|auto|scroll|clip)/.test(overflowX + overflowY)) {
      const parentRect = parent.getBoundingClientRect();
      if (
        rect.bottom <= parentRect.top ||
        rect.top >= parentRect.bottom ||
        rect.right <= parentRect.left ||
        rect.left >= parentRect.right
      ) {
        return false;
      }
    }
    parent = parent.parentElement;
  }
  return true;
}

/**
 * Calls `callback` on window resize and on any scroll (including scrollable ancestors),
 * until the owning component is destroyed.
 */
export function listenViewportChanges(callback: () => void, destroyRef: DestroyRef): void {
  if (typeof window === 'undefined') return;
  window.addEventListener('resize', callback);
  window.addEventListener('scroll', callback, true);
  destroyRef.onDestroy(() => {
    window.removeEventListener('resize', callback);
    window.removeEventListener('scroll', callback, true);
  });
}
