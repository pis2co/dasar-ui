import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarRadio } from './dasar-radio';

describe('DasarRadio', () => {
  let component: DasarRadio;
  let fixture: ComponentFixture<DasarRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarRadio],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarRadio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
