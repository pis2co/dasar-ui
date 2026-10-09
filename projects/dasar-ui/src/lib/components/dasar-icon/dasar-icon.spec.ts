import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarIcon } from './dasar-icon';

describe('DasarIcon', () => {
  let component: DasarIcon;
  let fixture: ComponentFixture<DasarIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
