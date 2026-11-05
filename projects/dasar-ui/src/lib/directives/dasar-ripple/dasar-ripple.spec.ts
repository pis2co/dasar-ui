import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarRippleDirective } from './dasar-ripple';

@Component({
  standalone: true,
  imports: [DasarRippleDirective],
  template: `
    <button id="ripple-button" dasarRipple>Button</button>
    <div id="ripple-div" dasarRipple>Div</div>
  `,
})
class RippleHost {}

@Component({
  standalone: true,
  imports: [DasarRippleDirective],
  template: `<div
    id="important-ripple-host"
    dasarRipple
    style="position: static !important; overflow: visible !important"
  ></div>`,
})
class RippleImportantStylesHost {}

describe('DasarRippleDirective', () => {
  let fixture: ComponentFixture<RippleHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RippleHost] }).compileComponents();
    fixture = TestBed.createComponent(RippleHost);
    fixture.detectChanges();
  });

  it('toggles hover state on button and div hosts', () => {
    for (const selector of ['#ripple-button', '#ripple-div']) {
      const host = fixture.nativeElement.querySelector(selector) as HTMLElement;

      expect(host.hasAttribute('data-dasar-ripple-hover')).toBe(false);
      host.dispatchEvent(new PointerEvent('pointerenter'));
      expect(host.hasAttribute('data-dasar-ripple-hover')).toBe(true);
      host.dispatchEvent(new PointerEvent('pointerleave'));
      expect(host.hasAttribute('data-dasar-ripple-hover')).toBe(false);
    }
  });

  it('creates pointer-positioned ripple elements on button and div hosts', () => {
    for (const selector of ['#ripple-button', '#ripple-div']) {
      const host = fixture.nativeElement.querySelector(selector) as HTMLElement;
      host.getBoundingClientRect = () =>
        ({
          left: 10,
          top: 20,
          right: 110,
          bottom: 60,
          width: 100,
          height: 40,
          x: 10,
          y: 20,
          toJSON: () => ({}),
        }) as DOMRect;

      host.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          clientX: 30,
          clientY: 35,
        }),
      );

      const ripple = host.querySelector('.dasar-ripple-effect') as HTMLElement;
      expect(ripple).toBeTruthy();
      expect(ripple.getAttribute('aria-hidden')).toBe('true');
      expect(parseFloat(ripple.style.width)).toBeGreaterThanOrEqual(160);
      expect(ripple.style.left).toBe('-64px');
      expect(ripple.style.top).toBe('-69px');
      expect(host.style.position).toBe('relative');
      expect(host.style.overflow).toBe('hidden');
    }
  });

  it('installs a theme-driven ripple style and reduced-motion rule', () => {
    const styles = fixture.nativeElement.ownerDocument.getElementById('dasar-ripple-styles');
    expect(styles?.textContent).toContain('var(--dasar-ripple-color, currentColor)');
    expect(styles?.textContent).toContain('@media (prefers-reduced-motion: reduce)');
    expect(styles?.textContent).toContain('animation-duration: 1ms');
  });

  it('removes active ripples and restores host styles on destroy', () => {
    const host = fixture.nativeElement.querySelector('#ripple-div') as HTMLElement;
    host.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
    expect(host.querySelector('.dasar-ripple-effect')).toBeTruthy();

    fixture.destroy();

    expect(host.querySelector('.dasar-ripple-effect')).toBeNull();
    expect(host.style.position).toBe('');
    expect(host.style.overflow).toBe('');
  });

  it('overrides static important positioning and restores original style priorities', async () => {
    const importantFixture = TestBed.createComponent(RippleImportantStylesHost);
    importantFixture.detectChanges();
    await importantFixture.whenStable();

    const host = importantFixture.nativeElement.querySelector(
      '#important-ripple-host',
    ) as HTMLElement;
    expect(host.style.position).toBe('relative');
    expect(host.style.getPropertyPriority('position')).toBe('important');
    expect(host.style.overflow).toBe('hidden');
    expect(host.style.getPropertyPriority('overflow')).toBe('important');

    importantFixture.destroy();

    expect(host.style.position).toBe('static');
    expect(host.style.getPropertyPriority('position')).toBe('important');
    expect(host.style.overflow).toBe('visible');
    expect(host.style.getPropertyPriority('overflow')).toBe('important');
  });
});
