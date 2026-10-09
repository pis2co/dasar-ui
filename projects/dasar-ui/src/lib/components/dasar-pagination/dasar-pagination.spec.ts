import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarPagination } from './dasar-pagination';

describe('DasarPagination', () => {
  let component: DasarPagination;
  let fixture: ComponentFixture<DasarPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
