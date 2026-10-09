import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarMenu } from './dasar-menu';

describe('DasarMenu', () => {
  let component: DasarMenu;
  let fixture: ComponentFixture<DasarMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
