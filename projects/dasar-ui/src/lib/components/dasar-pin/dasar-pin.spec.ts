import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarPin } from './dasar-pin';

describe('DasarPin', () => {
  let component: DasarPin;
  let fixture: ComponentFixture<DasarPin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarPin],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarPin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
