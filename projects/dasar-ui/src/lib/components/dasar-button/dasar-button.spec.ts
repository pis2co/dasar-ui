import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarButton } from './dasar-button';

describe('DasarButton', () => {
  let component: DasarButton;
  let fixture: ComponentFixture<DasarButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarButton],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
