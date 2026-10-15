import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarList } from './dasar-list';

describe('DasarList', () => {
  let component: DasarList;
  let fixture: ComponentFixture<DasarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarList],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
