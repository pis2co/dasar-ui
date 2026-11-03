import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarCalendar, DasarCalendarRange } from './dasar-calendar';

describe('DasarCalendar', () => {
  let component: DasarCalendar;
  let fixture: ComponentFixture<DasarCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('range', () => {
    let emitted: DasarCalendarRange[];
    const clickDay = (day: number) => {
      const cell = component.calendarDays.find((d) => d.isCurrentMonth && d.dayNumber === day)!;
      component.selectDate(cell, new Event('click'));
    };

    beforeEach(() => {
      emitted = [];
      component.range = true;
      component.rangeValue = [new Date(2026, 9, 1), null];
      component.rangeValue = [null, null];
      component.currentViewDate = new Date(2026, 9, 1);
      component.generateCalendar();
      component.rangeValueChange.subscribe((r) => emitted.push(r));
    });

    it('emits start then end', () => {
      clickDay(5);
      clickDay(9);
      expect(emitted.length).toBe(2);
      expect(emitted[0][1]).toBeNull();
      expect(emitted[1][0]!.getDate()).toBe(5);
      expect(emitted[1][1]!.getDate()).toBe(9);
    });

    it('marks days between the ends as in range', () => {
      clickDay(5);
      clickDay(9);
      const inRange = component.calendarDays.filter((d) => d.isInRange).map((d) => d.dayNumber);
      expect(inRange).toEqual([6, 7, 8]);
    });

    it('uses an earlier second click as the new start', () => {
      clickDay(9);
      clickDay(5);
      expect(emitted[1][0]!.getDate()).toBe(5);
      expect(emitted[1][1]).toBeNull();
    });

    it('restarts after a complete range', () => {
      clickDay(5);
      clickDay(9);
      clickDay(12);
      expect(emitted[2][0]!.getDate()).toBe(12);
      expect(emitted[2][1]).toBeNull();
    });
  });

  describe('decade and view navigation', () => {
    it('yearsList returns exactly 12 consecutive years starting at decadeStart', () => {
      const list = component.yearsList;
      expect(list.length).toBe(12);
      expect(list[0]).toBe(component.decadeStart);
      expect(list[11]).toBe(component.decadeStart + 11);
      for (let i = 0; i < 12; i++) {
        expect(list[i]).toBe(component.decadeStart + i);
      }
    });

    it('decadeStart defaults lazily on first access with no prior navigation to currentYear - 11', () => {
      const currentYear = new Date().getFullYear();
      expect(component.decadeStart).toBe(currentYear - 11);
    });

    it('decadeLabel matches expected format', () => {
      const start = component.decadeStart;
      expect(component.decadeLabel).toBe(`${start} - ${start + 11}`);
    });

    it('changeDecade(1, event) and changeDecade(-1, event) shift decade window by 12 and stop propagation', () => {
      const initialStart = component.decadeStart;
      const eventForward = new Event('click');
      let forwardStopped = false;
      eventForward.stopPropagation = () => {
        forwardStopped = true;
      };

      component.changeDecade(1, eventForward);
      expect(forwardStopped).toBe(true);
      expect(component.decadeStart).toBe(initialStart + 12);
      expect(component.decadeLabel).toBe(`${initialStart + 12} - ${initialStart + 23}`);

      const eventBack = new Event('click');
      let backStopped = false;
      eventBack.stopPropagation = () => {
        backStopped = true;
      };

      component.changeDecade(-1, eventBack);
      expect(backStopped).toBe(true);
      expect(component.decadeStart).toBe(initialStart);
    });

    it('changeViewYear(1, event) and changeViewYear(-1, event) step currentViewDate year by +-1 and stop propagation', () => {
      component.currentViewDate = new Date(2024, 4, 15);
      const eventForward = new Event('click');
      let forwardStopped = false;
      eventForward.stopPropagation = () => {
        forwardStopped = true;
      };

      component.changeViewYear(1, eventForward);
      expect(forwardStopped).toBe(true);
      expect(component.currentViewDate.getFullYear()).toBe(2025);
      expect(component.currentViewDate.getMonth()).toBe(4);

      const eventBack = new Event('click');
      let backStopped = false;
      eventBack.stopPropagation = () => {
        backStopped = true;
      };

      component.changeViewYear(-1, eventBack);
      expect(backStopped).toBe(true);
      expect(component.currentViewDate.getFullYear()).toBe(2024);
      expect(component.currentViewDate.getMonth()).toBe(4);
    });

    it('entering years view via toggleViewMode() resets the decade window to contain currentViewDate year as the last year', () => {
      component.currentViewDate = new Date(1985, 2, 10);
      expect(component.viewMode).toBe('days');

      component.toggleViewMode(); // days -> months
      expect(component.viewMode).toBe('months');

      component.toggleViewMode(); // months -> years
      expect(component.viewMode).toBe('years');
      expect(component.decadeStart).toBe(1985 - 11);
      expect(component.yearsList[11]).toBe(1985);
      expect(component.decadeLabel).toBe('1974 - 1985');
    });

    it('regression: viewMode starts at days, selectMonth and selectYear behave as before', () => {
      expect(component.viewMode).toBe('days');

      let emittedMonth: Date | null = null;
      component.onMonthChange.subscribe((d) => (emittedMonth = d));
      let emittedYear: Date | null = null;
      component.onYearChange.subscribe((d) => (emittedYear = d));

      component.currentViewDate = new Date(2026, 0, 1);
      const event = new Event('click');

      component.selectMonth(5, event);
      expect(component.currentViewDate.getMonth()).toBe(5);
      expect(component.viewMode).toBe('days');
      expect(emittedMonth).not.toBeNull();
      expect((emittedMonth as any)?.getMonth()).toBe(5);

      component.selectYear(2030, event);
      expect(component.currentViewDate.getFullYear()).toBe(2030);
      expect(component.viewMode).toBe('months');
      expect(emittedYear).not.toBeNull();
      expect((emittedYear as any)?.getFullYear()).toBe(2030);
    });

    it('template integration: cycles viewMode via header click and renders decade buttons and labels in the DOM', () => {
      component.variant = 'dropdown';
      component.currentViewDate = new Date(2026, 4, 15);
      fixture.detectChanges();

      const headerTitleWrapper = fixture.nativeElement.querySelector(
        '.header-title-wrapper',
      ) as HTMLElement;
      expect(headerTitleWrapper).toBeTruthy();

      // In days view: header shows currentMonthYear
      const currentMonthSpan = fixture.nativeElement.querySelector('.current-month') as HTMLElement;
      expect(currentMonthSpan.textContent?.trim()).toBe(component.currentMonthYear);
      expect(component.viewMode).toBe('days');

      // 1. Click header -> months view
      headerTitleWrapper.click();
      fixture.detectChanges();
      expect(component.viewMode).toBe('months');
      expect(currentMonthSpan.textContent?.trim()).toBe('2026');

      // Month view header actions has 2 buttons (prev/next year)
      let headerActionButtons = fixture.nativeElement.querySelectorAll(
        '.header-actions dasar-button',
      );
      expect(headerActionButtons.length).toBe(2);

      // 2. Click next-year button in DOM -> year advances to 2027
      const nextYearBtn = headerActionButtons[1] as HTMLElement;
      nextYearBtn.click();
      fixture.detectChanges();
      expect(component.currentViewDate.getFullYear()).toBe(2027);
      expect(currentMonthSpan.textContent?.trim()).toBe('2027');

      // Click prev-year button in DOM -> year steps back to 2026
      headerActionButtons = fixture.nativeElement.querySelectorAll('.header-actions dasar-button');
      const prevYearBtn = headerActionButtons[0] as HTMLElement;
      prevYearBtn.click();
      fixture.detectChanges();
      expect(component.currentViewDate.getFullYear()).toBe(2026);
      expect(currentMonthSpan.textContent?.trim()).toBe('2026');

      // 3. Click header again -> years view
      headerTitleWrapper.click();
      fixture.detectChanges();
      expect(component.viewMode).toBe('years');
      expect(component.decadeStart).toBe(2026 - 11); // 2015
      expect(currentMonthSpan.textContent?.trim()).toBe('2015 - 2026');

      // Decade view header actions has 2 buttons (prev/next decade)
      headerActionButtons = fixture.nativeElement.querySelectorAll('.header-actions dasar-button');
      expect(headerActionButtons.length).toBe(2);

      // 12 year cells rendered in the DOM
      const yearCells = fixture.nativeElement.querySelectorAll('.picker-grid .picker-cell');
      expect(yearCells.length).toBe(12);
      expect(yearCells[0].textContent?.trim()).toBe('2015');
      expect(yearCells[11].textContent?.trim()).toBe('2026');

      // Click next-decade button in DOM -> decade advances by 12
      const nextDecadeBtn = headerActionButtons[1] as HTMLElement;
      nextDecadeBtn.click();
      fixture.detectChanges();
      expect(component.decadeStart).toBe(2015 + 12); // 2027
      expect(currentMonthSpan.textContent?.trim()).toBe('2027 - 2038');

      const updatedYearCells = fixture.nativeElement.querySelectorAll('.picker-grid .picker-cell');
      expect(updatedYearCells[0].textContent?.trim()).toBe('2027');
      expect(updatedYearCells[11].textContent?.trim()).toBe('2038');

      // Click prev-decade button in DOM -> decade steps back
      headerActionButtons = fixture.nativeElement.querySelectorAll('.header-actions dasar-button');
      const prevDecadeBtn = headerActionButtons[0] as HTMLElement;
      prevDecadeBtn.click();
      fixture.detectChanges();
      expect(component.decadeStart).toBe(2015);
      expect(currentMonthSpan.textContent?.trim()).toBe('2015 - 2026');
    });

    it('template integration regression: dashboard variant days view header buttons work via DOM click', () => {
      component.variant = 'dashboard';
      component.currentViewDate = new Date(2026, 4, 15);
      fixture.detectChanges();

      expect(component.viewMode).toBe('days');
      const buttons = fixture.nativeElement.querySelectorAll('.header-actions dasar-button');
      // Dashboard has 5 buttons: prevYear, prevMonth, Today, nextMonth, nextYear
      expect(buttons.length).toBe(5);

      // Prev Month click
      (buttons[1] as HTMLElement).click();
      fixture.detectChanges();
      expect(component.currentViewDate.getMonth()).toBe(3); // April

      // Next Month click
      (buttons[3] as HTMLElement).click();
      fixture.detectChanges();
      expect(component.currentViewDate.getMonth()).toBe(4); // May

      // Prev Year click
      (buttons[0] as HTMLElement).click();
      fixture.detectChanges();
      expect(component.currentViewDate.getFullYear()).toBe(2025);

      // Next Year click
      (buttons[4] as HTMLElement).click();
      fixture.detectChanges();
      expect(component.currentViewDate.getFullYear()).toBe(2026);

      // Today button click
      (buttons[2] as HTMLElement).click();
      fixture.detectChanges();
      const today = new Date();
      expect(component.currentViewDate.getFullYear()).toBe(today.getFullYear());
      expect(component.currentViewDate.getMonth()).toBe(today.getMonth());
    });
  });
});
