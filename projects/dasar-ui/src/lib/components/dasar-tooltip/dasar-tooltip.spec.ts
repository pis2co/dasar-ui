import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarTooltip } from './dasar-tooltip';

describe('DasarTooltip', () => {
  let component: DasarTooltip;
  let fixture: ComponentFixture<DasarTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarTooltip],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarTooltip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
