import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarCalendar } from './dasar-calendar';

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
});
