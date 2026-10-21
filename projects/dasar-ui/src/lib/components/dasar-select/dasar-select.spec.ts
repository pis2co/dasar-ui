import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { FormsModule } from '@angular/forms';
import { DasarSelect, DasarSelectComponent } from './dasar-select';

@Component({
  standalone: true,
  imports: [FormsModule, DasarSelectComponent],
  template: `
    <dasar-select
      [size]="size()"
      [radius]="radius()"
      [placement]="placement()"
      [options]="options"
      [hint]="hint()"
      [error]="error()"
      [ngModel]="value"
    />
  `,
})
class SelectHost {
  size = signal<'sm' | 'md' | 'lg'>('sm');
  radius = signal<'none' | 'md' | 'lg' | 'full'>('lg');
  placement = signal<'bottom-start' | 'bottom-end' | 'top-start'>('bottom-start');
  hint = signal<string | undefined>(undefined);
  error = signal(false);
  value = '';
  options = [
    { label: 'Alpha', value: 'a', iconName: 'info-circle' },
    { label: 'Beta', value: 'b' },
  ];
}

describe('DasarSelect', () => {
  let component: DasarSelect;
  let fixture: ComponentFixture<SelectHost>;
  let host: SelectHost;

  const container = () =>
    fixture.nativeElement.querySelector('.dasar-select-container') as HTMLElement;
  const panel = () =>
    fixture.nativeElement.querySelector('.dasar-select-dropdown-panel') as HTMLElement;
  const open = async () => {
    container().click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectHost);
    host = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders no panel while closed', () => {
    expect(panel()).toBeNull();
  });

  it('panel follows size and radius of the trigger', async () => {
    await open();

    expect(panel()).toBeTruthy();
    expect(panel().classList).toContain('size-sm');
    expect(panel().classList).toContain('radius-lg');
    expect(panel().classList).toContain('placement-bottom-start');
  });

  it('panel reflects a radius change', async () => {
    host.radius.set('none');
    await open();

    expect(panel().classList).toContain('radius-none');
  });

  it('panel starts at the requested placement', async () => {
    const roomy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 400,
      right: 300,
      bottom: 430,
      width: 200,
      height: 30,
    } as DOMRect);
    host.placement.set('top-start');
    await open();

    expect(panel().classList).toContain('placement-top-start');
    roomy.mockRestore();
  });

  it('positions the panel on the first open without waiting for a scroll', async () => {
    const triggerRect = { left: 600, top: 400, width: 389, height: 35, right: 989, bottom: 435 };
    const measure = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        if (this.classList.contains('dasar-select-dropdown-panel')) {
          const width = parseFloat(this.style.width) || 1024;
          return { left: 0, top: 0, right: width, bottom: 86, width, height: 86 } as DOMRect;
        }
        return triggerRect as DOMRect;
      });
    host.placement.set('bottom-end');
    await open();
    await fixture.whenStable();

    expect(panel().style.width).toBe('389px');
    expect(panel().style.left).toBe('600px');
    expect(panel().style.top).toBe('439px');
    expect(panel().style.visibility).toBe('visible');
    measure.mockRestore();
  });

  it('does not flip a start placement just because the panel was measured at viewport width', async () => {
    const measure = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        if (this.classList.contains('dasar-select-dropdown-panel')) {
          const width = parseFloat(this.style.width) || 1024;
          return { left: 0, top: 0, right: width, bottom: 86, width, height: 86 } as DOMRect;
        }
        return { left: 600, top: 300, width: 389, height: 35, right: 989, bottom: 335 } as DOMRect;
      });
    await open();
    await fixture.whenStable();

    expect(panel().classList).toContain('placement-bottom-start');
    expect(panel().style.left).toBe('600px');
    measure.mockRestore();
  });

  it('arrow icon scales with the select size', () => {
    const svg = container().querySelector('.dasar-select-arrow-btn dasar-icon svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('14');
  });

  it('option icons scale with the select size', async () => {
    await open();

    const svg = panel().querySelector('.dasar-select-option dasar-icon svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('14');
  });

  it('renders the hint and marks it as an error', async () => {
    host.hint.set('Pick a valid option.');
    host.error.set(true);
    await fixture.whenStable();

    const hint = fixture.nativeElement.querySelector('.dasar-select-hint') as HTMLElement;
    expect(hint?.textContent).toContain('Pick a valid option.');
    expect(hint.classList).toContain('error');
    expect(hint.getAttribute('id')).toBe(component.hintId);
    expect(container().getAttribute('aria-invalid')).toBe('true');
    expect(container().getAttribute('aria-describedby')).toBe(component.hintId);
  });
});
