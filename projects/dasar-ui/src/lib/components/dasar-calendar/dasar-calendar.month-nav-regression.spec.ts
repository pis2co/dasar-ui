import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { expect } from 'vitest';
import { DasarCalendar } from './dasar-calendar';
import { provideDateAdapter, NgpNativeDateAdapter } from 'ng-primitives/date-time';

@Component({
  standalone: true,
  imports: [DasarCalendar, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <dasar-calendar
      [value]="selectedDate()"
    ></dasar-calendar>
  `,
})
class TestCalendarMonthNavHost {
  selectedDate = signal<Date | null>(new Date(2026, 10, 15)); // November 15, 2026
}

describe('DasarCalendar Month Navigation Grid Regression', () => {
  let fixture: ComponentFixture<TestCalendarMonthNavHost>;
  let calendarComp: DasarCalendar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCalendarMonthNavHost, DasarCalendar],
      providers: [provideDateAdapter(NgpNativeDateAdapter)],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCalendarMonthNavHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const calendarEl = fixture.debugElement.query(By.directive(DasarCalendar));
    calendarComp = calendarEl.componentInstance;
  });

  it('updates rendered day-grid cells to December when navigating to next month from November', async () => {
    // 1. Initial state: November 2026
    const headerMonthEl = fixture.debugElement.query(By.css('.current-month'));
    expect(headerMonthEl.nativeElement.textContent.trim()).toBe('November 2026');

    // Helper to get rendered day numbers from the DOM grid
    const getRenderedDayTexts = () => {
      const dayCells = fixture.debugElement.queryAll(By.css('.day-cell'));
      return dayCells.map((cell) => {
        const numEl = cell.nativeElement.querySelector('.day-number, .day-badge-number');
        return (numEl ? numEl.textContent : cell.nativeElement.textContent)?.trim();
      });
    };

    const initialDayTexts = getRenderedDayTexts();

    // 2. Trigger next-month navigation via component method directly (or header action)
    calendarComp.changeMonth(1);
    fixture.detectChanges();
    await fixture.whenStable();

    // 3. Confirm header updated to December 2026
    expect(headerMonthEl.nativeElement.textContent.trim()).toBe('December 2026');
    expect(calendarComp.currentViewDate.getMonth()).toBe(11); // December (0-indexed 11)

    // 4. Assert day cells in DOM show December's dates, not November's
    const newDayTexts = getRenderedDayTexts();

    // In December 2026 with Sunday first-day-of-week:
    // Cell 0 should be 29 (Nov 29), Cell 1 should be 30 (Nov 30), Cell 2 should be 1 (Dec 1).
    // In November 2026, Cell 0 is 1 (Nov 1).
    expect(newDayTexts).not.toEqual(initialDayTexts);
    expect(newDayTexts[0]).toBe('29');
    expect(newDayTexts[1]).toBe('30');
    expect(newDayTexts[2]).toBe('1');
  });
});
