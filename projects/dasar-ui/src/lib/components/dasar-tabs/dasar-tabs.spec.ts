import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarTabs } from './dasar-tabs';

describe('DasarTabs', () => {
  let component: DasarTabs;
  let fixture: ComponentFixture<DasarTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
