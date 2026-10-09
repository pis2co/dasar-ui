import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarToast } from './dasar-toast';

describe('DasarToast', () => {
  let component: DasarToast;
  let fixture: ComponentFixture<DasarToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarToast],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
