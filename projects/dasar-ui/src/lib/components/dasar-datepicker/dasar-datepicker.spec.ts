import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarDatepicker } from './dasar-datepicker';

describe('DasarDatepicker', () => {
  let component: DasarDatepicker;
  let fixture: ComponentFixture<DasarDatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarDatepicker],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarDatepicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
