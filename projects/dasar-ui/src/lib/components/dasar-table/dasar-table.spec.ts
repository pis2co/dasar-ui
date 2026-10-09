import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarTable } from './dasar-table';

describe('DasarTable', () => {
  let component: DasarTable;
  let fixture: ComponentFixture<DasarTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
