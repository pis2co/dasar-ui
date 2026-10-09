import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarInput } from './dasar-input';

describe('DasarInput', () => {
  let component: DasarInput;
  let fixture: ComponentFixture<DasarInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarInput],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
