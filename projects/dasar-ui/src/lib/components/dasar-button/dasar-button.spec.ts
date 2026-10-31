import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgpButton } from 'ng-primitives/button';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarButton, DasarButtonComponent } from './dasar-button';

@Component({
  selector: 'test-button-disabled-host',
  standalone: true,
  imports: [DasarButtonComponent],
  template: `<dasar-button>A</dasar-button>`,
})
class DisabledHost {}

@Component({
  selector: 'test-button-host',
  standalone: true,
  imports: [DasarButtonComponent],
  template: `<dasar-button [disabled]="disabled" [appearance]="appearance">A</dasar-button>`,
})
class TestButtonHost {
  disabled = false;
  appearance: any = 'solid';
}

describe('DasarButton', () => {
  let component: DasarButton;
  let fixture: ComponentFixture<DasarButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarButton, TestButtonHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hosts the NgpButton directive on the native button element', () => {
    const ngpButtonDebugEl = fixture.debugElement.query(By.directive(NgpButton));
    expect(ngpButtonDebugEl).not.toBeNull();
    expect(ngpButtonDebugEl.nativeElement.tagName.toLowerCase()).toBe('button');
  });

  it('reflects disabled state to NgpButton directive and attributes when disabled is true', async () => {
    const hostFixture = TestBed.createComponent(TestButtonHost);
    hostFixture.componentInstance.disabled = true;
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const ngpButtonDebugEl = hostFixture.debugElement.query(By.directive(NgpButton));
    expect(ngpButtonDebugEl).not.toBeNull();

    const ngpButton = ngpButtonDebugEl.injector.get(NgpButton);
    expect(ngpButton.disabled()).toBe(true);

    const buttonEl = ngpButtonDebugEl.nativeElement as HTMLButtonElement;
    expect(buttonEl.disabled || buttonEl.getAttribute('aria-disabled') === 'true').toBe(true);
  });

  it("applies 'elevated' class to native button when appearance is 'elevated'", async () => {
    const hostFixture = TestBed.createComponent(TestButtonHost);
    hostFixture.componentInstance.appearance = 'elevated';
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const nativeBtn = hostFixture.nativeElement.querySelector(
      '.dasar-button-native',
    ) as HTMLButtonElement;
    expect(nativeBtn.classList.contains('elevated')).toBe(true);
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
