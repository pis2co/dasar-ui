import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarButtonGroup } from './dasar-button-group';

describe('DasarButtonGroup', () => {
  let component: DasarButtonGroup;
  let fixture: ComponentFixture<DasarButtonGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarButtonGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarButtonGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
