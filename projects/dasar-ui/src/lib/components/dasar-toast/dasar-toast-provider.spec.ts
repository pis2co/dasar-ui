import { Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DasarToastComponent } from './dasar-toast-provider';
import { DasarToastService } from './dasar-toast.service';
import { DASAR_TOAST_NAVIGATOR } from './dasar-toast';
import { DasarToastPlacement } from './dasar-toast.model';

@Component({
  selector: 'test-toast-child',
  standalone: true,
  template: '',
})
class ToastChild {
  readonly toast = inject(DasarToastService);
}

@Component({
  imports: [DasarToastComponent, ToastChild],
  template: `
    <dasar-toast-provider
      [max]="max()"
      [placement]="placement()"
      [scrollable]="scrollable()"
      [blur]="blur()"
      container-class="my-container"
    >
      <test-toast-child />
      <ng-template label-slot let-toast
        ><b class="slot-label">{{ toast.options.label }}!</b></ng-template
      >
    </dasar-toast-provider>
    <ng-template #action let-close="close"
      ><button class="undo" (click)="close()">Undo</button></ng-template
    >
  `,
})
class ProviderHost {
  @ViewChild(ToastChild, { static: true }) child!: ToastChild;
  @ViewChild('action', { static: true }) action!: TemplateRef<any>;
  max = signal(5);
  placement = signal<DasarToastPlacement>('bottom-right');
  scrollable = signal(false);
  blur = signal<string | null>(null);
}

@Component({
  imports: [DasarToastComponent, ToastChild],
  template: `<dasar-toast-provider><test-toast-child /></dasar-toast-provider>`,
})
class PlainHost {
  @ViewChild(ToastChild, { static: true }) child!: ToastChild;
}

@Component({
  imports: [DasarToastComponent, ToastChild],
  template: `
    <dasar-toast-provider>
      <test-toast-child />
      <ng-template caption-slot let-toast
        ><i class="slot-caption">{{ toast.options.caption }}</i></ng-template
      >
      <ng-template closable-slot let-close="close"
        ><button class="my-close" (click)="close()">x</button></ng-template
      >
    </dasar-toast-provider>
  `,
})
class SlotHost {
  @ViewChild(ToastChild, { static: true }) child!: ToastChild;
}

const toastsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('dasar-toast')) as HTMLElement[];

describe('DasarToastProvider', () => {
  let fixture: ComponentFixture<ProviderHost>;
  let host: ProviderHost;

  const flush = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProviderHost] }).compileComponents();
    fixture = TestBed.createComponent(ProviderHost);
    host = fixture.componentInstance;
    await flush();
  });

  afterEach(() => vi.useRealTimers());

  it('gives children the provider service', () => {
    expect(host.child.toast).toBeInstanceOf(DasarToastService);
  });

  it('renders nothing until a toast is created', () => {
    expect(fixture.nativeElement.querySelector('.dasar-toast-container')).toBeNull();
  });

  it('renders label, caption, description, icon and string content', async () => {
    host.child.toast.create({
      label: 'Event created',
      caption: 'Sunday',
      description: 'Body',
      content: 'Extra',
      icon: 'circle-check',
      duration: 0,
    });
    await flush();
    const el = toastsOf(fixture)[0];
    expect(el.querySelector('.dasar-toast-caption')?.textContent).toContain('Sunday');
    expect(el.querySelector('.dasar-toast-description')?.textContent).toContain('Body');
    expect(el.querySelector('.dasar-toast-content')?.textContent).toContain('Extra');
    expect(el.querySelector('.dasar-toast-header .dasar-toast-icon dasar-icon')).not.toBeNull();
    expect(el.querySelector('.dasar-toast-header .dasar-toast-heading')).not.toBeNull();
  });

  it('uses the provider label slot', async () => {
    host.child.toast.create({ label: 'Hi', duration: 0 });
    await flush();
    expect(toastsOf(fixture)[0].querySelector('.slot-label')?.textContent).toBe('Hi!');
  });

  it('renders template content with a close function', async () => {
    host.child.toast.create({ content: host.action, duration: 0 });
    await flush();
    const undo = toastsOf(fixture)[0].querySelector('.undo') as HTMLButtonElement;
    expect(undo).not.toBeNull();
    undo.click();
    await flush();
    expect(host.child.toast.items()[0].state).toBe('leaving');
  });

  it('shows the close button only when closeable', async () => {
    host.child.toast.create({ label: 'A', duration: 0 });
    host.child.toast.create({ label: 'B', closeable: true, duration: 0 });
    await flush();
    const [b, a] = toastsOf(fixture);
    expect(a.querySelector('.dasar-toast-close')).toBeNull();
    expect(b.querySelector('.dasar-toast-close .dasar-toast-close-button')).not.toBeNull();
  });

  it('applies placement and container class', async () => {
    host.child.toast.create({ label: 'A', duration: 0 });
    host.placement.set('top-left');
    await flush();
    const container = fixture.nativeElement.querySelector('.dasar-toast-container') as HTMLElement;
    expect(container.classList).toContain('placement-top-left');
    expect(container.classList).toContain('top');
    expect(container.classList).toContain('my-container');
  });

  it('limits rendered toasts to max and promotes queued ones', async () => {
    host.max.set(2);
    await flush();
    const refs = [1, 2, 3].map((n) => host.child.toast.create({ label: `T${n}`, duration: 0 }));
    await flush();
    expect(toastsOf(fixture)).toHaveLength(2);
    refs[0].close();
    await flush();
    await new Promise((resolve) => setTimeout(resolve, 450));
    await flush();
    expect(toastsOf(fixture)).toHaveLength(2);
    expect(toastsOf(fixture)[0].textContent).toContain('T3');
  });

  it('closes after the duration with the timeout reason', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    host.child.toast.create({ label: 'A', duration: 1000, onClose });
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(1001);
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'timeout');
  });

  it('pauses on hover when aliveOnHover and resumes after', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    host.child.toast.create({ label: 'A', duration: 1000, onClose });
    fixture.detectChanges();
    const el = toastsOf(fixture)[0].querySelector('.dasar-toast') as HTMLElement;
    await vi.advanceTimersByTimeAsync(500);
    el.dispatchEvent(new Event('mouseenter'));
    await vi.advanceTimersByTimeAsync(5000);
    expect(onClose).not.toHaveBeenCalled();
    el.dispatchEvent(new Event('mouseleave'));
    await vi.advanceTimersByTimeAsync(501);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not pause on hover when aliveOnHover is false', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    host.child.toast.create({ label: 'A', duration: 1000, aliveOnHover: false, onClose });
    fixture.detectChanges();
    const el = toastsOf(fixture)[0].querySelector('.dasar-toast') as HTMLElement;
    el.dispatchEvent(new Event('mouseenter'));
    await vi.advanceTimersByTimeAsync(1001);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps a toast open when the duration is zero', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    host.child.toast.create({ label: 'A', duration: 0, onClose });
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(60000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('fires onEnter, onClose and onLeave in order and removes the toast', async () => {
    const calls: string[] = [];
    host.child.toast.create({
      label: 'A',
      closeable: true,
      duration: 0,
      onEnter: () => calls.push('enter'),
      onClose: (_ref, reason) => calls.push(`close:${reason}`),
      onLeave: () => calls.push('leave'),
    });
    await flush();
    await new Promise((resolve) => setTimeout(resolve, 450));
    await flush();
    const button = fixture.nativeElement.querySelector('.dasar-toast-close-button') as HTMLElement;
    button.click();
    await flush();
    await new Promise((resolve) => setTimeout(resolve, 450));
    await flush();
    expect(calls).toEqual(['enter', 'close:button', 'leave']);
    expect(toastsOf(fixture)).toHaveLength(0);
  });

  it('destroyEverything leaves no toasts', async () => {
    host.child.toast.create({ label: 'A', duration: 0 });
    host.child.toast.create({ label: 'B', duration: 0 });
    await flush();
    host.child.toast.destroyEverything();
    await flush();
    await new Promise((resolve) => setTimeout(resolve, 450));
    await flush();
    expect(toastsOf(fixture)).toHaveLength(0);
  });

  it('closes a focused toast with Escape', async () => {
    host.child.toast.create({ label: 'A', duration: 0 });
    await flush();
    const el = toastsOf(fixture)[0].querySelector('.dasar-toast') as HTMLElement;
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await flush();
    expect(host.child.toast.items()[0].state).toBe('leaving');
  });

  it('sets the blur token on the container', async () => {
    host.child.toast.create({ label: 'A', duration: 0 });
    host.blur.set('8px');
    await flush();
    const container = fixture.nativeElement.querySelector('.dasar-toast-container') as HTMLElement;
    expect(container.style.getPropertyValue('--dasar-toast-blur')).toBe('8px');
    expect(container.classList).toContain('blurred');
  });

  it('renders the newest toast first with index 0 at the front', async () => {
    host.child.toast.create({ label: 'A', duration: 0 });
    host.child.toast.create({ label: 'B', duration: 0 });
    host.child.toast.create({ label: 'C', duration: 0 });
    await flush();
    const toasts = toastsOf(fixture);
    expect(toasts.map((el) => el.textContent?.trim().slice(0, 1))).toEqual(['C', 'B', 'A']);
    expect(toasts.map((el) => el.style.getPropertyValue('--dasar-toast-index'))).toEqual([
      '0',
      '1',
      '2',
    ]);
  });

  it('marks layers deeper than the third as deep', async () => {
    host.max.set(8);
    await flush();
    for (let n = 0; n < 6; n++) host.child.toast.create({ label: `T${n}`, duration: 0 });
    await flush();
    const deep = toastsOf(fixture).map((el) => el.classList.contains('dasar-toast-deep'));
    expect(deep).toEqual([false, false, false, false, true, true]);
  });

  it('uses alert role for danger and warning', async () => {
    host.child.toast.create({ label: 'A', variant: 'danger', duration: 0 });
    host.child.toast.create({ label: 'B', duration: 0 });
    await flush();
    const [b, a] = toastsOf(fixture).map((el) => el.querySelector('.dasar-toast') as HTMLElement);
    expect(a.getAttribute('role')).toBe('alert');
    expect(b.getAttribute('role')).toBe('status');
  });
});

describe('DasarToastProvider links', () => {
  const navigate = vi.fn();

  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderHost],
      providers: [{ provide: DASAR_TOAST_NAVIGATOR, useValue: navigate }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProviderHost);
    fixture.detectChanges();
    return fixture;
  };

  beforeEach(() => navigate.mockReset());

  it('navigates internal links through the navigator', async () => {
    const fixture = await setup();
    fixture.componentInstance.child.toast.create({ label: 'Go', to: '/inbox', duration: 0 });
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a.dasar-toast-link') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/inbox');
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(navigate).toHaveBeenCalledWith('/inbox');
  });

  it('leaves external links to the browser', async () => {
    const fixture = await setup();
    fixture.componentInstance.child.toast.create({
      label: 'Go',
      to: 'https://example.com',
      duration: 0,
    });
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a.dasar-toast-link') as HTMLAnchorElement;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(navigate).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });
});

describe('DasarToastProvider slots', () => {
  it('renders the caption and closable slots', async () => {
    await TestBed.configureTestingModule({ imports: [SlotHost] }).compileComponents();
    const fixture = TestBed.createComponent(SlotHost);
    fixture.detectChanges();
    fixture.componentInstance.child.toast.create({ label: 'A', caption: 'Cap', duration: 0 });
    fixture.detectChanges();
    const el = toastsOf(fixture)[0];
    expect(el.querySelector('.slot-caption')?.textContent).toBe('Cap');
    expect(el.querySelector('.dasar-toast-close .my-close')).not.toBeNull();
    (el.querySelector('.my-close') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.child.toast.items()[0].state).toBe('leaving');
  });
});
