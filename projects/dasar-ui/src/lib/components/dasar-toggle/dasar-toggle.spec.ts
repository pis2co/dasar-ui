import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarToggle } from './dasar-toggle';

describe('DasarToggle', () => {
  let component: DasarToggle;
  let fixture: ComponentFixture<DasarToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
