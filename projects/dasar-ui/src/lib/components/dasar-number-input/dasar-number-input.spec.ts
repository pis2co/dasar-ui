import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarNumberInput } from './dasar-number-input';

describe('DasarNumberinput', () => {
  let component: DasarNumberInput;
  let fixture: ComponentFixture<DasarNumberInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarNumberInput],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarNumberInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
