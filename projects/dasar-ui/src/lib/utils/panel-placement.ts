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
 * Gives a fixed panel the width of its trigger. Do it before measuring the panel, because a fixed
 * panel is as wide as the viewport until it has a width.
 */
export function matchTriggerWidth(trigger: HTMLElement, panel: HTMLElement): void {
  panel.style.width = `${trigger.getBoundingClientRect().width}px`;
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
  // Apply the width first: a fixed panel is as wide as the viewport until then, and measuring it
  // that way puts end and top placements in the wrong place.
  if (matchWidth) matchTriggerWidth(trigger, panel);
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

/**
 * Keeps a fixed panel positioned while it exists. The first update runs in a microtask, right
 * after the render that created the panel, so it never depends on a timer racing change detection.
 * It repeats when the panel changes size and once more on the next frame if the panel is still
 * hidden. Returns a function that stops watching.
 */
export function watchPanel(panel: HTMLElement, update: () => void): () => void {
  let active = true;
  const run = () => {
    if (active) update();
  };
  queueMicrotask(run);

  let frame: number | null = null;
  if (typeof requestAnimationFrame === 'function') {
    frame = requestAnimationFrame(() => {
      if (getComputedStyle(panel).visibility === 'hidden') run();
    });
  }
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(run) : null;
  observer?.observe(panel);

  return () => {
    active = false;
    if (frame !== null && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(frame);
    observer?.disconnect();
  };
}
