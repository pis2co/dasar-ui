import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarSlider } from './dasar-slider';

describe('DasarSlider', () => {
  let component: DasarSlider;
  let fixture: ComponentFixture<DasarSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
