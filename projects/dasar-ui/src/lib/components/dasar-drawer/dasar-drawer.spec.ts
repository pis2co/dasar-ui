import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { DasarDrawerComponent, DasarDrawerPlacement } from './dasar-drawer';

@Component({
  standalone: true,
  imports: [DasarDrawerComponent],
  template: `
    <dasar-drawer
      [show]="show()"
      [placement]="placement()"
      [closable]="closable()"
      [resizable]="resizable()"
      [width]="width()"
      [height]="height()"
      [z-index]="zIndex()"
      label="Title"
      (showChange)="show.set($event)"
      (onUpdateValue)="updates.push($event)"
      (onWidthUpdate)="widths.push($event)"
      (onHeightUpdate)="heights.push($event)"
      (onAfterEnter)="entered = entered + 1"
      (onAfterLeave)="left = left + 1"
    >
      <p class="body-text">Body</p>
      <div action-slot><button class="action-btn">OK</button></div>
    </dasar-drawer>
  `,
})
class DrawerHost {
  show = signal(false);
  placement = signal<DasarDrawerPlacement>('right');
  closable = signal(true);
  resizable = signal(false);
  width = signal<string | number>('378px');
  height = signal<string | number>('378px');
  zIndex = signal(1000);
  updates: boolean[] = [];
  widths: number[] = [];
  heights: number[] = [];
  entered = 0;
  left = 0;
}

@Component({
  standalone: true,
  imports: [DasarDrawerComponent],
  template: `
    <dasar-drawer [show]="true">
      <span header-slot class="custom-header">Header</span>
      <button closeable-slot class="custom-close">x</button>
      <p>Body</p>
    </dasar-drawer>
  `,
})
class DrawerSlotsHost {}

@Component({
  standalone: true,
  imports: [DasarDrawerComponent, FormsModule],
  template: `<dasar-drawer [(ngModel)]="model" label="Model"><p>Body</p></dasar-drawer>`,
})
class DrawerModelHost {
  model = false;
}

const animationEnd = (target: Element, animationName: string) => {
  const event = new Event('animationend', { bubbles: true });
  Object.assign(event, { animationName });
  target.dispatchEvent(event);
};

const pointer = (target: Element, type: string, x: number, y: number) =>
  target.dispatchEvent(
    new MouseEvent(type, { clientX: x, clientY: y, bubbles: true, cancelable: true }),
  );

describe('DasarDrawer', () => {
  let fixture: ComponentFixture<DrawerHost>;
  let host: DrawerHost;

  const query = <T extends Element = HTMLElement>(selector: string) =>
    fixture.nativeElement.querySelector(selector) as T;
  const panel = () => query('.dasar-drawer-container');
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const open = async () => {
    host.show.set(true);
    await settle();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DrawerHost] }).compileComponents();
    fixture = TestBed.createComponent(DrawerHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  it('renders nothing while closed', () => {
    expect(panel()).toBeNull();
    expect(query('.dasar-overlay-backdrop')).toBeNull();
  });

  it('renders the panel with the label and body when shown', async () => {
    await open();

    expect(panel()).toBeTruthy();
    expect(panel().getAttribute('role')).toBe('dialog');
    expect(panel().getAttribute('aria-label')).toBe('Title');
    expect(query('.dasar-drawer-title').textContent).toContain('Title');
    expect(query('.body-text')).toBeTruthy();
    expect(query('.action-btn')).toBeTruthy();
  });

  it.each(['top', 'right', 'bottom', 'left'] as DasarDrawerPlacement[])(
    'aligns the %s placement on the overlay',
    async (placement) => {
      host.placement.set(placement);
      await open();

      expect(panel().classList).toContain(`placement-${placement}`);
      expect(query('.dasar-drawer-overlay').classList).toContain(`placement-${placement}`);
    },
  );

  it('uses the width for left and right and the height for top and bottom', async () => {
    host.width.set(300);
    host.height.set('40%');
    await open();
    expect(panel().style.width).toBe('300px');
    expect(panel().style.height).toBe('');

    host.placement.set('bottom');
    await settle();
    expect(panel().style.height).toBe('40%');
    expect(panel().style.width).toBe('');
  });

  it('passes the z-index to the overlay', async () => {
    host.zIndex.set(2500);
    await open();

    expect(query('.dasar-overlay-backdrop').style.zIndex).toBe('2500');
  });

  it('hides the close button when not closable', async () => {
    host.closable.set(false);
    await open();

    expect(query('.dasar-drawer-close')).toBeNull();
  });

  it('closes with the close button and reports the new value', async () => {
    await open();
    (query('.dasar-drawer-close dasar-button') as HTMLElement).click();
    await settle();

    expect(host.show()).toBe(false);
    expect(host.updates).toEqual([false]);
    expect(panel().classList).toContain('leaving');
  });

  it('closes when the overlay is clicked', async () => {
    await open();
    query('.dasar-overlay-backdrop').click();
    await settle();

    expect(host.show()).toBe(false);
  });

  it('closes on Escape', async () => {
    await open();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await settle();

    expect(host.show()).toBe(false);
  });

  it('emits onAfterEnter once when the enter animation ends', async () => {
    await open();
    animationEnd(panel(), 'dasar-drawer-in-right');
    animationEnd(panel(), 'dasar-drawer-in-right');

    expect(host.entered).toBe(1);
  });

  it('ignores animations that bubble up from the drawer content', async () => {
    await open();
    animationEnd(query('.body-text'), 'dasar-skeleton-shimmer');

    expect(host.entered).toBe(0);
  });

  it('emits onAfterLeave and removes the panel after the leave animation', async () => {
    await open();
    host.show.set(false);
    await settle();
    expect(panel().classList).toContain('leaving');

    animationEnd(panel(), 'dasar-drawer-out-right');
    await settle();

    expect(host.left).toBe(1);
    expect(panel()).toBeNull();
  });

  it('falls back to a timer when no animation event arrives', async () => {
    vi.useFakeTimers();
    host.show.set(true);
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    expect(host.entered).toBe(1);

    host.show.set(false);
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();

    expect(host.left).toBe(1);
    expect(panel()).toBeNull();
  });

  it('locks body scroll while open and restores it afterwards', async () => {
    document.body.style.overflow = 'scroll';
    await open();
    expect(document.body.style.overflow).toBe('hidden');

    host.show.set(false);
    await settle();
    expect(document.body.style.overflow).toBe('scroll');
  });

  describe('resizable', () => {
    const handle = () => query('.dasar-drawer-resize-handle');

    beforeEach(async () => {
      host.resizable.set(true);
      await open();
      panel().getBoundingClientRect = () => ({ width: 400, height: 500 }) as DOMRect;
    });

    it('renders a separator handle only when resizable', async () => {
      expect(handle().getAttribute('role')).toBe('separator');
      expect(handle().getAttribute('aria-orientation')).toBe('vertical');

      host.resizable.set(false);
      await settle();
      expect(handle()).toBeNull();
    });

    it('grows a right drawer when dragged to the left and reports the width on release', () => {
      pointer(handle(), 'pointerdown', 600, 100);
      pointer(handle(), 'pointermove', 500, 100);
      fixture.detectChanges();
      expect(panel().style.width).toBe('500px');
      expect(panel().classList).toContain('resizing');
      expect(host.widths).toEqual([]);

      pointer(handle(), 'pointerup', 500, 100);
      expect(host.widths).toEqual([500]);
      fixture.detectChanges();
      expect(panel().classList).not.toContain('resizing');
    });

    it('clamps to the minimum width', () => {
      pointer(handle(), 'pointerdown', 600, 100);
      pointer(handle(), 'pointermove', 1000, 100);
      pointer(handle(), 'pointerup', 1000, 100);

      expect(host.widths).toEqual([200]);
    });

    it('resizes a bottom drawer by height', async () => {
      host.placement.set('bottom');
      await settle();
      panel().getBoundingClientRect = () => ({ width: 800, height: 300 }) as DOMRect;

      expect(handle().getAttribute('aria-orientation')).toBe('horizontal');
      pointer(handle(), 'pointerdown', 100, 400);
      pointer(handle(), 'pointermove', 100, 350);
      pointer(handle(), 'pointerup', 100, 350);

      expect(host.heights).toEqual([350]);
      expect(host.widths).toEqual([]);
    });

    it('resizes with the arrow keys', () => {
      handle().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      fixture.detectChanges();

      expect(panel().style.width).toBe('416px');
      expect(host.widths).toEqual([416]);
    });

    it('resets the dragged size when the width input changes', async () => {
      pointer(handle(), 'pointerdown', 600, 100);
      pointer(handle(), 'pointermove', 500, 100);
      pointer(handle(), 'pointerup', 500, 100);

      host.width.set(320);
      await settle();
      expect(panel().style.width).toBe('320px');
    });
  });
});

describe('DasarDrawer slots', () => {
  it('projects the header and closeable slots', async () => {
    await TestBed.configureTestingModule({ imports: [DrawerSlotsHost] }).compileComponents();
    const fixture = TestBed.createComponent(DrawerSlotsHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.custom-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.custom-close')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.dasar-drawer-title')).toBeNull();
    expect(fixture.nativeElement.querySelector('.dasar-drawer-close dasar-button')).toBeNull();
  });
});

describe('DasarDrawer ngModel', () => {
  it('opens and closes through the bound value', async () => {
    await TestBed.configureTestingModule({ imports: [DrawerModelHost] }).compileComponents();
    const fixture = TestBed.createComponent(DrawerModelHost);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.dasar-drawer-container')).toBeNull();

    fixture.componentInstance.model = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dasar-drawer-container')).toBeTruthy();

    (
      fixture.nativeElement.querySelector('.dasar-drawer-close dasar-button') as HTMLElement
    ).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.model).toBe(false);
  });
});
