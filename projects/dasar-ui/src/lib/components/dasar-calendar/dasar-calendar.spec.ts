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
});
