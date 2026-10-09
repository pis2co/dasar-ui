import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarTextarea } from './dasar-textarea';

describe('DasarTextarea', () => {
  let component: DasarTextarea;
  let fixture: ComponentFixture<DasarTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarTextarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
