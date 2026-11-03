import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
      [appearance]="appearance()"
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
  appearance = signal<'outline' | 'filled' | 'subtle' | 'elevated'>('outline');
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

    expect(dropdown().classList).toContain('placement-top-start');
    roomy.mockRestore();
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

  it("applies 'appearance-elevated' class when appearance is set to 'elevated'", async () => {
    host.appearance.set('elevated');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(trigger().classList.contains('appearance-elevated')).toBe(true);
    expect(trigger().classList.contains('appearance-outline')).toBe(false);
  });
});

describe('DasarDatepicker datetime mode logic', () => {
  let component: DasarDatepicker;
  let fixture: ComponentFixture<DatepickerHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerHost);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('type defaults to date and existing date-only behavior is unchanged', () => {
    expect(component.type).toBe('date');
    expect(component.showTimeSection).toBe(false);
    expect(component.showMeridiemToggle).toBe(false);
    component.value = '2026-05-15';
    fixture.detectChanges();
    expect(component.displayText).toBe('15-05-2026');
  });

  it("setting type = 'datetime' makes showTimeSection return true; leaving it 'date' makes it false", () => {
    expect(component.type).toBe('date');
    expect(component.showTimeSection).toBe(false);

    component.type = 'datetime';
    expect(component.showTimeSection).toBe(true);

    component.type = 'date';
    expect(component.showTimeSection).toBe(false);
  });

  it('onHoursChange/onMinutesChange/onSecondsChange correctly update time and merge into internalDate without changing date portion', () => {
    component.type = 'datetime';
    component.value = '2026-07-20';
    fixture.detectChanges();

    expect(component.internalDate).not.toBeNull();
    const initialDate = component.internalDate!;
    expect(initialDate.getFullYear()).toBe(2026);
    expect(initialDate.getMonth()).toBe(6); // 0-indexed: July
    expect(initialDate.getDate()).toBe(20);

    component.timeFormat = '24';
    component.onHoursChange(14);
    component.onMinutesChange(35);
    component.onSecondsChange(42);

    expect(component.timeHours).toBe(14);
    expect(component.timeMinutes).toBe(35);
    expect(component.timeSeconds).toBe(42);
    expect(component.timeMeridiem).toBe('PM');

    const merged = component.internalDate!;
    expect(merged.getFullYear()).toBe(2026);
    expect(merged.getMonth()).toBe(6);
    expect(merged.getDate()).toBe(20);
    expect(merged.getHours()).toBe(14);
    expect(merged.getMinutes()).toBe(35);
    expect(merged.getSeconds()).toBe(42);
  });

  it('onMeridiemToggle correctly shifts timeHours by 12 in the right direction and updates timeMeridiem', () => {
    component.type = 'datetime';
    component.timeFormat = '12';
    component.timeHours = 9;
    component.timeMeridiem = 'AM';

    component.onMeridiemToggle('PM');
    expect(component.timeHours).toBe(21);
    expect(component.timeMeridiem).toBe('PM');

    component.onMeridiemToggle('PM');
    expect(component.timeHours).toBe(21);
    expect(component.timeMeridiem).toBe('PM');

    component.onMeridiemToggle('AM');
    expect(component.timeHours).toBe(9);
    expect(component.timeMeridiem).toBe('AM');
  });

  it('displayHours getter correctly converts between 24h internal storage and 12h display', () => {
    component.timeFormat = '12';

    component.timeHours = 0;
    expect(component.displayHours).toBe(12);

    component.timeHours = 12;
    expect(component.displayHours).toBe(12);

    component.timeHours = 13;
    expect(component.displayHours).toBe(1);

    component.timeHours = 23;
    expect(component.displayHours).toBe(11);

    component.timeHours = 5;
    expect(component.displayHours).toBe(5);

    component.timeFormat = '24';
    component.timeHours = 0;
    expect(component.displayHours).toBe(0);

    component.timeHours = 13;
    expect(component.displayHours).toBe(13);
  });

  it('confirmDateTime() closes the dropdown and the final internalDate includes the merged time', () => {
    component.type = 'datetime';
    component.value = '2026-08-10';
    component.isOpen = true;
    fixture.detectChanges();

    let emittedValue: any = null;
    component.valueChange.subscribe((val) => {
      emittedValue = val;
    });

    component.timeHours = 16;
    component.timeMinutes = 45;
    component.timeSeconds = 0;

    component.confirmDateTime();

    expect(component.isOpen).toBe(false);
    expect(component.internalDate?.getHours()).toBe(16);
    expect(component.internalDate?.getMinutes()).toBe(45);
    expect(emittedValue).toBeDefined();
  });

  it('in datetime mode onCalendarSelect does NOT emit valueChange, while in date mode it does', () => {
    // 1. datetime mode
    component.type = 'datetime';
    component.timeHours = 10;
    component.timeMinutes = 15;
    let datetimeEmitted = false;
    component.valueChange.subscribe(() => {
      datetimeEmitted = true;
    });
    component.onCalendarSelect(new Date(2026, 5, 20));
    expect(datetimeEmitted).toBe(false);
    expect(component.internalDate?.getFullYear()).toBe(2026);
    expect(component.internalDate?.getHours()).toBe(10);
    expect(component.internalDate?.getMinutes()).toBe(15);

    // 2. date mode (regression check)
    component.type = 'date';
    let dateEmitted: any = null;
    component.valueChange.subscribe((val) => {
      dateEmitted = val;
    });
    component.onCalendarSelect(new Date(2026, 5, 21));
    expect(dateEmitted).toBeDefined();
  });

  it('in 12h mode onHoursChange treats 0 as 12', () => {
    component.type = 'datetime';
    component.timeFormat = '12';
    component.timeMeridiem = 'AM';
    component.onHoursChange(0);
    expect(component.timeHours).toBe(0); // 12 AM is hour 0 internally
    expect(component.displayHours).toBe(12);

    component.timeMeridiem = 'PM';
    component.onHoursChange(0);
    expect(component.timeHours).toBe(12); // 12 PM is hour 12 internally
    expect(component.displayHours).toBe(12);
  });

  it('mergeTimeIntoInternalDate does nothing when internalDate is null', () => {
    component.internalDate = null;
    component.timeHours = 10;
    component.timeMinutes = 30;

    expect(() => component.mergeTimeIntoInternalDate()).not.toThrow();
    expect(component.internalDate).toBeNull();
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

@Component({
  standalone: true,
  imports: [DasarDatepickerComponent],
  template: `
    <dasar-datepicker
      range
      clearable
      value-format="yyyy-MM-dd"
      display-format="dd-MM-yyyy"
      [value]="value()"
      (valueChange)="changes.push($event)"
    />
  `,
})
class DatepickerRangeHost {
  value = signal<string[] | null>(null);
  changes: unknown[] = [];
}

describe('DasarDatepicker range', () => {
  let fixture: ComponentFixture<DatepickerRangeHost>;
  let host: DatepickerRangeHost;

  const trigger = () =>
    fixture.nativeElement.querySelector('.dasar-datepicker-trigger') as HTMLElement;
  const dropdown = () =>
    fixture.nativeElement.querySelector('.dasar-datepicker-dropdown') as HTMLElement;
  const currentMonthDay = (day: number) =>
    (
      Array.from(
        fixture.nativeElement.querySelectorAll('.day-cell:not(.other-month)'),
      ) as HTMLElement[]
    )[day - 1];
  const open = async () => {
    trigger().click();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DatepickerRangeHost] }).compileComponents();
    fixture = TestBed.createComponent(DatepickerRangeHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the range placeholder', () => {
    expect(trigger().textContent).toContain('Select date range');
  });

  it('emits an array of two values only when both dates are picked', async () => {
    host.value.set(['2026-10-01', '2026-10-02']);
    fixture.detectChanges();
    host.value.set(null);
    fixture.detectChanges();
    host.changes.length = 0;

    await open();
    currentMonthDay(3).click();
    fixture.detectChanges();
    expect(host.changes).toEqual([]);
    expect(dropdown()).toBeTruthy();

    currentMonthDay(8).click();
    fixture.detectChanges();
    expect(host.changes.length).toBe(1);
    const [start, end] = host.changes[0] as string[];
    expect(start.endsWith('-03')).toBe(true);
    expect(end.endsWith('-08')).toBe(true);
    expect(dropdown()).toBeNull();
  });

  it('starts over when the second click is before the start', async () => {
    host.changes.length = 0;
    await open();
    currentMonthDay(10).click();
    fixture.detectChanges();
    currentMonthDay(4).click();
    fixture.detectChanges();
    expect(host.changes).toEqual([]);
    currentMonthDay(6).click();
    fixture.detectChanges();
    const [start, end] = host.changes[0] as string[];
    expect(start.endsWith('-04')).toBe(true);
    expect(end.endsWith('-06')).toBe(true);
  });

  it('displays both ends of a written range', () => {
    host.value.set(['2026-10-01', '2026-10-07']);
    fixture.detectChanges();
    expect(trigger().textContent).toContain('01-10-2026 – 07-10-2026');
  });

  it('clears the range with null', () => {
    host.value.set(['2026-10-01', '2026-10-07']);
    fixture.detectChanges();
    host.changes.length = 0;
    (fixture.nativeElement.querySelector('.clear-icon') as HTMLElement).click();
    fixture.detectChanges();
    expect(host.changes).toEqual([null]);
  });
});
