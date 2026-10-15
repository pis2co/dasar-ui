import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarButton, DasarButtonComponent } from './dasar-button';

@Component({
  selector: 'test-button-disabled-host',
  standalone: true,
  imports: [DasarButtonComponent],
  template: `<dasar-button>A</dasar-button>`,
})
class DisabledHost {}

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

describe('DasarButton theme defaults', () => {
  it('reads disabled from the component config key', async () => {
    await TestBed.configureTestingModule({
      imports: [DisabledHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: { componentConfig: { button: { disabled: true } } },
        },
      ],
    }).compileComponents();

    const configuredFixture = TestBed.createComponent(DisabledHost);
    await configuredFixture.whenStable();

    const root = configuredFixture.nativeElement as HTMLElement;
    const native = root.querySelector('.dasar-button-native') as HTMLButtonElement;

    expect(native.disabled).toBe(true);
    expect(root.querySelector('.dasar-button')?.classList.contains('disabled')).toBe(true);
  });
});
