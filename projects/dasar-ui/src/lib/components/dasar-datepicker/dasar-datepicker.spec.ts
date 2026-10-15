import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarDatepicker, DasarDatepickerComponent } from './dasar-datepicker';

@Component({
  standalone: true,
  imports: [DasarDatepickerComponent],
  template: `
    <dasar-datepicker
      [size]="size()"
      [radius]="radius()"
      [placement]="placement()"
      [value]="value()"
      [hint]="hint()"
      [error]="error()"
      clearable
      placeholder="Pick a date"
    />
  `,
})
class DatepickerHost {
  size = signal<'sm' | 'md' | 'lg'>('sm');
  radius = signal<'none' | 'md' | 'lg' | 'full'>('lg');
  placement = signal<'bottom-start' | 'top-start'>('bottom-start');
  value = signal<string | null>(null);
  hint = signal<string | undefined>(undefined);
  error = signal(false);
}

describe('DasarDatepicker', () => {
  let component: DasarDatepicker;
  let fixture: ComponentFixture<DatepickerHost>;
  let host: DatepickerHost;

  const trigger = () =>
    fixture.nativeElement.querySelector('.dasar-datepicker-trigger') as HTMLElement;
  const dropdown = () =>
    fixture.nativeElement.querySelector('.dasar-datepicker-dropdown') as HTMLElement;
  const open = async () => {
    trigger().click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerHost);
    host = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calendar icon fits the trigger size', () => {
    const svg = trigger().querySelector('.calendar-icon svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('14');
  });

  it('clear icon fits the trigger size when there is a value', () => {
    host.value.set('2026-01-05');
    fixture.detectChanges();
    const svg = trigger().querySelector('.clear-icon svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('14');
  });

  it('dropdown follows the trigger size and radius', async () => {
    await open();

    expect(dropdown()).toBeTruthy();
    expect(dropdown().classList).toContain('size-sm');
    expect(dropdown().classList).toContain('radius-lg');
    expect(dropdown().classList).toContain('placement-bottom-start');
  });

  it('dropdown starts at the requested placement', async () => {
    host.placement.set('top-start');
    await open();

    expect(dropdown().classList).toContain('placement-top-start');
  });

  it('never writes the flipped placement back to the placement input', async () => {
    await open();

    expect(component.placement).toBe('bottom-start');
    expect(component.currentPlacement).toBe('bottom-start');
  });

  it('renders no dropdown while closed', () => {
    expect(dropdown()).toBeNull();
  });

  it('renders the hint and marks it as an error', async () => {
    host.hint.set('Pick a future date.');
    host.error.set(true);
    await fixture.whenStable();

    const hint = fixture.nativeElement.querySelector('.hint-wrapper') as HTMLElement;
    expect(hint?.textContent).toContain('Pick a future date.');
    expect(hint.classList).toContain('error');
    expect(hint.getAttribute('id')).toBe(component.hintId);
    expect(trigger().getAttribute('aria-invalid')).toBe('true');
    expect(trigger().getAttribute('aria-describedby')).toBe(component.hintId);
  });
});

@Component({
  standalone: true,
  imports: [DasarDatepickerComponent],
  template: `
    <dasar-datepicker>
      <span hint-slot>Business days only.</span>
    </dasar-datepicker>
  `,
})
class DatepickerHintSlotHost {}

describe('DasarDatepicker hint slot', () => {
  it('projects the hint slot content', async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerHintSlotHost],
    }).compileComponents();

    const slotFixture = TestBed.createComponent(DatepickerHintSlotHost);
    await slotFixture.whenStable();

    expect(slotFixture.nativeElement.querySelector('.hint-wrapper')?.textContent).toContain(
      'Business days only.',
    );
  });
});
