import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarSelect } from './dasar-select';

describe('DasarSelect', () => {
  let component: DasarSelect;
  let fixture: ComponentFixture<DasarSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
