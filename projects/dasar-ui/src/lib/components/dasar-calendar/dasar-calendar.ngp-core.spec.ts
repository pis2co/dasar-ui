import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { expect } from 'vitest';
import { DasarCalendar, DasarCalendarAppearance } from './dasar-calendar';
import { NgpDatePicker } from 'ng-primitives/date-picker';
import { provideDateAdapter, NgpNativeDateAdapter } from 'ng-primitives/date-time';

@Component({
  standalone: true,
  imports: [DasarCalendar, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <dasar-calendar
      [value]="selectedDate()"
      (valueChange)="onValueChange($event)"
      [min]="minDate()"
      [max]="maxDate()"
      [disabled]="isDisabled()"
      [dateDisabled]="isDateDisabled"
      [appearance]="$any(appearance())"
    ></dasar-calendar>
  `,
})
class TestSingleCalendarHost {
  selectedDate = signal<Date | null>(new Date(2026, 9, 15));
  minDate = signal<Date | undefined>(undefined);
  maxDate = signal<Date | undefined>(undefined);
  isDisabled = signal<boolean>(false);
  appearance = signal<DasarCalendarAppearance>('outline');
  emittedValues: (Date | null)[] = [];

  isDateDisabled = (date: Date): boolean => {
    return date.getDate() === 20;
  };

  onValueChange(val: Date | null) {
    this.emittedValues.push(val);
  }
}

describe('DasarCalendar NgpDatePicker Core Single-Value Migration', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSingleCalendarHost, DasarCalendar],
      providers: [provideDateAdapter(NgpNativeDateAdapter)],
    }).compileComponents();
  });

  describe('Requirement 1: NgpDatePicker primitive hosting and DI integration', () => {
    it('hosts NgpDatePicker directive and resolves via DI without crashing while preserving public API', () => {
      const fixture = TestBed.createComponent(TestSingleCalendarHost);
      fixture.detectChanges();

      const calendarEl = fixture.debugElement.query(By.directive(DasarCalendar));
      expect(calendarEl).toBeTruthy();

      // NgpDatePicker should be present on the host or inside the calendar grid
      const ngpDatePicker =
        calendarEl.injector.get(NgpDatePicker, null) ??
        fixture.debugElement.query(By.directive(NgpDatePicker))?.injector.get(NgpDatePicker, null);

      // Failing assertion: DasarCalendar does not host NgpDatePicker yet
      expect(ngpDatePicker).toBeTruthy();

      const calendarInstance = calendarEl.componentInstance as DasarCalendar;
      expect(calendarInstance.appearance).toBeDefined();
      expect(calendarInstance.variant).toBeDefined();
      expect(calendarInstance.size).toBeDefined();
      expect(calendarInstance.radius).toBeDefined();
      expect(calendarInstance.locale).toBeDefined();
      expect(calendarInstance.headerFormat).toBeDefined();
      expect(calendarInstance.valueFormat).toBeDefined();
      expect(calendarInstance.weekdayFormat).toBeDefined();
      expect(calendarInstance.hideHeader).toBeDefined();
      expect(calendarInstance.hideFullDate).toBeDefined();
      expect(calendarInstance.fullWidth).toBeDefined();
      expect(calendarInstance.disabled).toBeDefined();
    });
  });

  describe('Requirement 2: Single-date selection & controlled-mode dedup', () => {
    it('selects a day cell on click, emits valueChange exactly once, and updates cell visual state', async () => {
      const fixture = TestBed.createComponent(TestSingleCalendarHost);
      fixture.detectChanges();
      await fixture.whenStable();

      const host = fixture.componentInstance;
      host.emittedValues = [];

      // Find date cell for October 18, 2026
      // Under ng-primitives, buttons inside grid cells act as interactive date buttons
      const dayButtons = fixture.debugElement
        .queryAll(By.css('.day-cell, [ngpDatePickerCell], [ngpDatePickerDateButton]'))
        .filter((el) => el.nativeElement.textContent?.trim() === '18');

      expect(dayButtons.length).toBeGreaterThan(0);
      const targetDay = dayButtons[0].nativeElement as HTMLElement;

      targetDay.click();
      fixture.detectChanges();
      await fixture.whenStable();

      // Must emit valueChange exactly once (controlled mode dedup lesson)
      expect(host.emittedValues.length).toBe(1);
      expect(host.emittedValues[0]?.getDate()).toBe(18);

      // Verify visual / aria selection state driven by primitive
      const isSelected =
        targetDay.classList.contains('selected') ||
        targetDay.getAttribute('aria-selected') === 'true' ||
        targetDay.getAttribute('data-selected') !== null;
      expect(isSelected).toBe(true);
    });
  });

  describe('Requirement 3: ControlValueAccessor & programmatic writeValue dedup', () => {
    it('syncs writeValue into state with { emit: false } without double-firing valueChange', async () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const calendarInstance = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();

      const ngpDatePicker =
        fixture.debugElement.injector.get(NgpDatePicker, null) ??
        fixture.debugElement.query(By.directive(NgpDatePicker))?.injector.get(NgpDatePicker, null);

      // NgpDatePicker must be integrated into DasarCalendar
      expect(ngpDatePicker).toBeTruthy();

      let valueChangeCount = 0;
      calendarInstance.valueChange.subscribe(() => {
        valueChangeCount++;
      });

      // Programmatic CVA writeValue must NOT emit valueChange
      calendarInstance.writeValue(new Date(2026, 9, 25));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(valueChangeCount).toBe(0);

      // setDisabledState syncs disabled
      calendarInstance.setDisabledState?.(true);
      fixture.detectChanges();
      expect(calendarInstance.disabled).toBe(true);
      expect(ngpDatePicker?.disabled()).toBe(true);
    });
  });

  describe('Requirement 4: min, max, disabled, and dateDisabled pass-through', () => {
    it('disables appropriate day cells according to min, max, disabled, and dateDisabled', async () => {
      const fixture = TestBed.createComponent(TestSingleCalendarHost);
      const host = fixture.componentInstance;
      host.minDate.set(new Date(2026, 9, 5));
      host.maxDate.set(new Date(2026, 9, 25));
      fixture.detectChanges();
      await fixture.whenStable();

      const calendarDebugEl = fixture.debugElement.query(By.directive(DasarCalendar));
      const ngpDatePicker =
        calendarDebugEl.injector.get(NgpDatePicker, null) ??
        fixture.debugElement.query(By.directive(NgpDatePicker))?.injector.get(NgpDatePicker, null);

      expect(ngpDatePicker).toBeTruthy();

      // Check date disabled via dateDisabled callback (day 20)
      const day20 = fixture.debugElement
        .queryAll(By.css('.day-cell, [ngpDatePickerCell], [ngpDatePickerDateButton]'))
        .find((el) => el.nativeElement.textContent?.trim() === '20')?.nativeElement as HTMLElement;

      expect(day20).toBeTruthy();
      const isDay20Disabled =
        day20.classList.contains('disabled') ||
        day20.getAttribute('aria-disabled') === 'true' ||
        (day20 as HTMLButtonElement).disabled === true;
      expect(isDay20Disabled).toBe(true);

      // Entire calendar disabled
      host.isDisabled.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(ngpDatePicker?.disabled()).toBe(true);
    });
  });

  describe('Requirement 5: Keyboard roving focus', () => {
    it('supports arrow-key roving focus navigation across grid day cells', async () => {
      const fixture = TestBed.createComponent(TestSingleCalendarHost);
      fixture.detectChanges();
      await fixture.whenStable();

      const gridEl = fixture.debugElement.query(By.css('.calendar-grid, [ngpDatePickerGrid]'))
        ?.nativeElement as HTMLElement;
      expect(gridEl).toBeTruthy();

      // Trigger ArrowRight keydown
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
      gridEl.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();

      const calendarDebugEl = fixture.debugElement.query(By.directive(DasarCalendar));
      const ngpDatePicker =
        calendarDebugEl.injector.get(NgpDatePicker, null) ??
        fixture.debugElement.query(By.directive(NgpDatePicker))?.injector.get(NgpDatePicker, null);

      expect(ngpDatePicker).toBeTruthy();
      expect(ngpDatePicker?.focusedDate()).toBeDefined();
    });
  });

  describe('Requirement 6: appearance="elevated" CSS class styling', () => {
    it('applies appearance-elevated class correctly to the container without regression', async () => {
      const fixture = TestBed.createComponent(TestSingleCalendarHost);
      fixture.componentInstance.appearance.set('elevated');
      fixture.detectChanges();
      await fixture.whenStable();

      const containerEl = fixture.debugElement.query(By.css('.dasar-calendar-container'));
      expect(containerEl).toBeTruthy();
      expect(containerEl.nativeElement.classList.contains('appearance-elevated')).toBe(true);
    });
  });
});
