import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DasarCalendar, DasarCalendarComponent, type DasarCalendarRange } from './dasar-calendar';
import { NgpDateRangePicker } from 'ng-primitives/date-picker';
import { NgpNativeDateAdapter, provideDateAdapter } from 'ng-primitives/date-time';

@Component({
  standalone: true,
  imports: [DasarCalendarComponent],
  template: `
    <dasar-calendar
      [range]="true"
      [variant]="'dashboard'"
      [(rangeValue)]="range"
      (rangeValueChange)="onRangeChange($event)"
      (onMonthChange)="onMonth($event)"
      (onYearChange)="onYear($event)"
      (onPrevMonthClick)="onPrevMonth($event)"
      (onNextMonthClick)="onNextMonth($event)"
      (onPrevYearClick)="onPrevYear($event)"
      (onNextYearClick)="onNextYear($event)"
      (onTodayClick)="onToday($event)"
    >
      <ng-template calendar-prev-year-template let-ctx>
        <button class="custom-prev-year">PrevYear</button>
      </ng-template>
      <ng-template calendar-prev-month-template let-ctx>
        <button class="custom-prev-month">PrevMonth</button>
      </ng-template>
      <ng-template calendar-today-template let-ctx>
        <button class="custom-today">TodayBtn</button>
      </ng-template>
      <ng-template calendar-next-month-template let-ctx>
        <button class="custom-next-month">NextMonth</button>
      </ng-template>
      <ng-template calendar-next-year-template let-ctx>
        <button class="custom-next-year">NextYear</button>
      </ng-template>
    </dasar-calendar>
  `,
})
class CalendarRangeCustomSlotsHostComponent {
  range: DasarCalendarRange = [null, null];
  lastRange: DasarCalendarRange | null = null;
  lastMonth: Date | null = null;
  lastYear: Date | null = null;
  prevMonthClicked: Date | null = null;
  nextMonthClicked: Date | null = null;
  prevYearClicked: Date | null = null;
  nextYearClicked: Date | null = null;
  todayClicked: Date | null = null;

  onRangeChange(r: DasarCalendarRange) {
    this.lastRange = r;
  }
  onMonth(d: Date) {
    this.lastMonth = d;
  }
  onYear(d: Date) {
    this.lastYear = d;
  }
  onPrevMonth(d: Date) {
    this.prevMonthClicked = d;
  }
  onNextMonth(d: Date) {
    this.nextMonthClicked = d;
  }
  onPrevYear(d: Date) {
    this.prevYearClicked = d;
  }
  onNextYear(d: Date) {
    this.nextYearClicked = d;
  }
  onToday(d: Date) {
    this.todayClicked = d;
  }
}

@Component({
  standalone: true,
  imports: [DasarCalendarComponent],
  template: `
    <dasar-calendar>
      <ng-template calendar-header-template let-ctx>
        <div class="custom-header">Custom Header</div>
      </ng-template>
    </dasar-calendar>
  `,
})
class CalendarHeaderTemplateHostComponent {}

describe('DasarCalendar NgpDateRangePicker and View-Switcher Integration', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DasarCalendar,
        CalendarRangeCustomSlotsHostComponent,
        CalendarHeaderTemplateHostComponent,
      ],
      providers: [provideDateAdapter(NgpNativeDateAdapter)],
    }).compileComponents();
  });

  describe('Requirement 1 & Primitive Wiring: NgpDateRangePicker integration in range mode', () => {
    it('hosts NgpDateRangePicker directive in the DOM when range mode is enabled', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.range = true;
      fixture.detectChanges();

      const rangeDirectiveEl = fixture.debugElement.query(By.directive(NgpDateRangePicker));
      expect(rangeDirectiveEl).not.toBeNull();
    });

    it('emits rangeValueChange and sets rangeValue to [start, end] when selecting two days via primitive date range selection', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.range = true;
      comp.rangeValue = [null, null];
      comp.currentViewDate = new Date(2026, 9, 1);
      fixture.detectChanges();

      const rangeDirDebug = fixture.debugElement.query(By.directive(NgpDateRangePicker));
      expect(rangeDirDebug).not.toBeNull();

      const rangeDir = rangeDirDebug.injector.get(NgpDateRangePicker);
      const emitted: DasarCalendarRange[] = [];
      comp.rangeValueChange.subscribe((val) => emitted.push(val));

      // Select start date: Oct 5, 2026
      rangeDir.select(new Date(2026, 9, 5));
      fixture.detectChanges();

      // Select end date: Oct 9, 2026
      rangeDir.select(new Date(2026, 9, 9));
      fixture.detectChanges();

      expect(emitted.length).toBe(2);
      expect(comp.rangeValue[0]?.getDate()).toBe(5);
      expect(comp.rangeValue[1]?.getDate()).toBe(9);
      expect(emitted[1][0]?.getDate()).toBe(5);
      expect(emitted[1][1]?.getDate()).toBe(9);
    });

    it('restarts the range when re-clicking a date earlier than start date in range mode', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.range = true;
      comp.rangeValue = [null, null];
      comp.currentViewDate = new Date(2026, 9, 1);
      fixture.detectChanges();

      const rangeDirDebug = fixture.debugElement.query(By.directive(NgpDateRangePicker));
      expect(rangeDirDebug).not.toBeNull();
      const rangeDir = rangeDirDebug.injector.get(NgpDateRangePicker);

      const emitted: DasarCalendarRange[] = [];
      comp.rangeValueChange.subscribe((val) => emitted.push(val));

      // Click Oct 9, 2026
      rangeDir.select(new Date(2026, 9, 9));
      fixture.detectChanges();

      // Click Oct 5, 2026 (earlier than start date -> restart range with Oct 5 as start)
      rangeDir.select(new Date(2026, 9, 5));
      fixture.detectChanges();

      expect(emitted.length).toBe(2);
      expect(emitted[1][0]?.getDate()).toBe(5);
      expect(emitted[1][1]).toBeNull();
      expect(comp.rangeValue[0]?.getDate()).toBe(5);
      expect(comp.rangeValue[1]).toBeNull();
    });
  });

  describe('Requirement 2: Month/year view-switcher independent of primitive days grid', () => {
    it('cycles viewMode days -> months -> years -> days via toggleViewMode and renders custom picker grids', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.variant = 'dropdown';
      comp.viewMode = 'days';
      fixture.detectChanges();

      expect(comp.viewMode).toBe('days');
      expect(fixture.debugElement.query(By.css('.picker-grid.months-grid'))).toBeNull();

      const titleWrapper = fixture.debugElement.query(By.css('.header-title-wrapper'));
      expect(titleWrapper).not.toBeNull();
      titleWrapper.nativeElement.click();
      fixture.detectChanges();
      expect(comp.viewMode).toBe('months');
      const monthsGrid = fixture.debugElement.query(By.css('.picker-grid.months-grid'));
      expect(monthsGrid).not.toBeNull();
      expect(monthsGrid.queryAll(By.css('.picker-cell')).length).toBe(12);

      titleWrapper.nativeElement.click();
      fixture.detectChanges();
      expect(comp.viewMode).toBe('years');
      const yearsGrid = fixture.debugElement.query(By.css('.picker-grid.years-grid'));
      expect(yearsGrid).not.toBeNull();

      titleWrapper.nativeElement.click();
      fixture.detectChanges();
      expect(comp.viewMode).toBe('days');
    });

    it('navigates view date and switches to days when selecting a month', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.variant = 'dropdown';
      comp.currentViewDate = new Date(2026, 0, 1);
      comp.viewMode = 'months';
      fixture.detectChanges();

      let emittedDate: Date | null = null;
      comp.onMonthChange.subscribe((d) => (emittedDate = d));

      const monthButtons = fixture.debugElement.queryAll(By.css('.months-grid .picker-cell'));
      expect(monthButtons.length).toBe(12);

      // Select May (index 4)
      monthButtons[4].nativeElement.click();
      fixture.detectChanges();

      expect(comp.viewMode).toBe('days');
      expect(comp.currentViewDate.getMonth()).toBe(4);
      expect(emittedDate).not.toBeNull();
      expect((emittedDate as unknown as Date).getMonth()).toBe(4);
    });

    it('navigates view date and switches to months when selecting a year', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.variant = 'dropdown';
      comp.currentViewDate = new Date(2026, 4, 1);
      comp.viewMode = 'years';
      fixture.detectChanges();

      let emittedDate: Date | null = null;
      comp.onYearChange.subscribe((d) => (emittedDate = d));

      const yearButtons = fixture.debugElement.queryAll(By.css('.years-grid .picker-cell'));
      expect(yearButtons.length).toBeGreaterThan(0);

      // Select year 2024
      const y2024 = yearButtons.find((el) => el.nativeElement.textContent.trim() === '2024');
      expect(y2024).toBeDefined();
      y2024!.nativeElement.click();
      fixture.detectChanges();

      expect(comp.viewMode).toBe('months');
      expect(comp.currentViewDate.getFullYear()).toBe(2024);
      expect(emittedDate).not.toBeNull();
      expect((emittedDate as unknown as Date).getFullYear()).toBe(2024);
    });
  });

  describe('Requirement 3: Header/nav template slots projection', () => {
    it('renders projected content for all 6 header/nav template slots instead of default buttons', () => {
      const headerFixture = TestBed.createComponent(CalendarHeaderTemplateHostComponent);
      headerFixture.detectChanges();
      expect(headerFixture.debugElement.query(By.css('.custom-header'))).not.toBeNull();

      const fixture = TestBed.createComponent(CalendarRangeCustomSlotsHostComponent);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.custom-prev-year'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.custom-prev-month'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.custom-today'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.custom-next-month'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.custom-next-year'))).not.toBeNull();
    });
  });

  describe('Requirement 4: Dashboard vs Dropdown variants layout', () => {
    it('applies variant-dashboard class and renders full-size cell structure', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.variant = 'dashboard';
      comp.viewMode = 'days';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.dasar-calendar-container'));
      expect(container.nativeElement.classList.contains('variant-dashboard')).toBe(true);
      expect(fixture.debugElement.query(By.css('.calendar-grid-wrapper'))).not.toBeNull();
    });

    it('applies variant-dropdown class and renders compact weekdays header without a chevron', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.variant = 'dropdown';
      comp.viewMode = 'days';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.dasar-calendar-container'));
      expect(container.nativeElement.classList.contains('variant-dropdown')).toBe(true);
      expect(fixture.debugElement.query(By.css('.header-chevron'))).toBeNull();
      const label = fixture.debugElement.query(By.css('.header-title-wrapper'));
      expect(label).not.toBeNull();
      label.triggerEventHandler('click');
      expect(comp.viewMode).toBe('months');
      expect(fixture.debugElement.queryAll(By.css('.weekday-header')).length).toBe(7);
    });
  });

  describe('Requirement 5: Locale and formatting strings in days grid and month/year pickers', () => {
    it('formats localized dropdown weekdays and month picker cell labels according to locale', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.locale = 'fr-FR';
      comp.variant = 'dropdown';
      comp.currentViewDate = new Date(2026, 0, 1);
      fixture.detectChanges();

      const dropdownWeekdays = comp.localizedDropdownWeekdays;
      expect(dropdownWeekdays.length).toBe(7);

      // In French locale, monthsList should be in French (e.g. 'janvier' or 'Janvier')
      const months = comp.monthsList;
      expect(months[0].name.toLowerCase()).toContain('janv');
    });
  });

  describe('Requirement 6: Navigation events', () => {
    it('emits onMonthChange, onNextMonthClick, and onPrevMonthClick when navigating months', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.currentViewDate = new Date(2026, 5, 1);
      fixture.detectChanges();

      let monthEvent: Date | null = null;
      let nextMonthEvent: Date | null = null;
      let prevMonthEvent: Date | null = null;

      comp.onMonthChange.subscribe((d) => (monthEvent = d));
      comp.onNextMonthClick.subscribe((d) => (nextMonthEvent = d));
      comp.onPrevMonthClick.subscribe((d) => (prevMonthEvent = d));

      comp.changeMonth(1);
      expect(comp.currentViewDate.getMonth()).toBe(6);
      expect(monthEvent).not.toBeNull();
      expect(nextMonthEvent).not.toBeNull();

      comp.changeMonth(-1);
      expect(comp.currentViewDate.getMonth()).toBe(5);
      expect(prevMonthEvent).not.toBeNull();
    });

    it('emits onYearChange, onNextYearClick, onPrevYearClick, and onTodayClick', () => {
      const fixture = TestBed.createComponent(DasarCalendar);
      const comp = fixture.componentInstance;
      comp.currentViewDate = new Date(2026, 5, 1);
      fixture.detectChanges();

      let yearEvent: Date | null = null;
      let nextYearEvent: Date | null = null;
      let prevYearEvent: Date | null = null;
      let todayEvent: Date | null = null;

      comp.onYearChange.subscribe((d) => (yearEvent = d));
      comp.onNextYearClick.subscribe((d) => (nextYearEvent = d));
      comp.onPrevYearClick.subscribe((d) => (prevYearEvent = d));
      comp.onTodayClick.subscribe((d) => (todayEvent = d));

      comp.changeYear(1);
      expect(comp.currentViewDate.getFullYear()).toBe(2027);
      expect(yearEvent).not.toBeNull();
      expect(nextYearEvent).not.toBeNull();

      comp.changeYear(-1);
      expect(comp.currentViewDate.getFullYear()).toBe(2026);
      expect(prevYearEvent).not.toBeNull();

      comp.goToToday();
      const currentYear = new Date().getFullYear();
      expect(comp.currentViewDate.getFullYear()).toBe(currentYear);
      expect(todayEvent).not.toBeNull();
    });
  });
});
