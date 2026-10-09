import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarCard } from './dasar-card';

describe('DasarCard', () => {
  let component: DasarCard;
  let fixture: ComponentFixture<DasarCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
