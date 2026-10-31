import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgpInputOtp, NgpInputOtpInput, NgpInputOtpSlot } from 'ng-primitives/input-otp';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarPin, DasarPinComponent } from './dasar-pin';

@Component({
  standalone: true,
  imports: [DasarPinComponent, FormsModule],
  template: `<dasar-pin
    [value]="value()"
    [length]="length()"
    [appearance]="appearance()"
    [size]="size()"
    [disabled]="disabled()"
    [error]="error()"
    [pattern]="pattern()"
    [placeholder]="placeholder()"
    (valueChange)="valueChanges.set([...valueChanges(), $event])"
    (complete)="completedValues.set([...completedValues(), $event])"
  />`,
})
class PinTestHost {
  value = signal('123');
  length = signal(6);
  appearance = signal<'outline' | 'filled' | 'elevated'>('outline');
  size = signal<'sm' | 'md' | 'lg'>('md');
  disabled = signal(false);
  error = signal(false);
  pattern = signal('[0-9]');
  placeholder = signal('');
  valueChanges = signal<string[]>([]);
  completedValues = signal<string[]>([]);
}

@Component({
  standalone: true,
  imports: [DasarPinComponent, FormsModule],
  template: `<dasar-pin [(ngModel)]="model" (valueChange)="emitted.set([...emitted(), $event])" />`,
})
class PinCvaHost {
  model = signal('456');
  emitted = signal<string[]>([]);
}

@Component({
  standalone: true,
  imports: [DasarPinComponent],
  template: `<dasar-pin />`,
})
class PinThemeDefaultHost {}

describe('DasarPin', () => {
  let component: DasarPin;
  let fixture: ComponentFixture<DasarPin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarPin],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarPin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create with selector dasar-pin and literal defaults', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBe('');
    expect(component.length).toBe(6);
    expect(component.appearance).toBe('outline');
    expect(component.size).toBe('md');
    expect(component.radius).toBe('md');
    expect(component.disabled).toBe(false);
    expect(component.error).toBe(false);
    expect(component.pattern).toBe('[0-9]');
    expect(component.placeholder).toBe('');
    expect(component.inputMode).toBe('numeric');
    expect(component.slots.length).toBe(6);
  });

  it('hosts NgpInputOtp, NgpInputOtpInput, and NgpInputOtpSlot directives', async () => {
    const hostFixture = TestBed.createComponent(PinTestHost);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.debugElement.query(By.directive(NgpInputOtp))).toBeTruthy();
    expect(hostFixture.debugElement.query(By.directive(NgpInputOtpInput))).toBeTruthy();
    const slots = hostFixture.debugElement.queryAll(By.directive(NgpInputOtpSlot));
    expect(slots.length).toBe(6);
  });

  it('renders correct number of slots based on length input', async () => {
    const hostFixture = TestBed.createComponent(PinTestHost);
    hostFixture.componentInstance.length.set(4);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const slots = hostFixture.debugElement.queryAll(By.directive(NgpInputOtpSlot));
    expect(slots.length).toBe(4);
  });

  it('syncs value via writeValue / CVA and setDisabledState without spurious valueChange emissions', async () => {
    const cvaFixture = TestBed.createComponent(PinCvaHost);
    cvaFixture.detectChanges();
    await cvaFixture.whenStable();

    const pinDebug = cvaFixture.debugElement.query(By.directive(DasarPin));
    const pinInstance = pinDebug.componentInstance as DasarPin;
    const ngpInputOtp = cvaFixture.debugElement
      .query(By.directive(NgpInputOtp))
      .injector.get(NgpInputOtp);

    expect(pinInstance.value).toBe('456');
    expect((ngpInputOtp as any).state.value()).toBe('456');
    expect(cvaFixture.componentInstance.emitted()).toEqual([]);

    pinInstance.writeValue('7890');
    cvaFixture.detectChanges();
    await cvaFixture.whenStable();

    expect(pinInstance.value).toBe('7890');
    expect((ngpInputOtp as any).state.value()).toBe('7890');
    expect(cvaFixture.componentInstance.emitted()).toEqual([]);

    pinInstance.setDisabledState(true);
    cvaFixture.detectChanges();
    await cvaFixture.whenStable();

    expect(pinInstance.disabled).toBe(true);
  });

  it('emits valueChange exactly once when typing into native input', async () => {
    const hostFixture = TestBed.createComponent(PinTestHost);
    hostFixture.componentInstance.value.set('');
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    hostFixture.componentInstance.valueChanges.set([]);

    const nativeInput = hostFixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    nativeInput.value = '1';
    nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.componentInstance.valueChanges()).toEqual(['1']);

    nativeInput.value = '12';
    nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.componentInstance.valueChanges()).toEqual(['1', '12']);
  });

  it('applies appearance, size, error, and disabled classes to slots', async () => {
    const hostFixture = TestBed.createComponent(PinTestHost);
    hostFixture.componentInstance.appearance.set('elevated');
    hostFixture.componentInstance.size.set('lg');
    hostFixture.componentInstance.error.set(true);
    hostFixture.componentInstance.disabled.set(true);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const slot = hostFixture.nativeElement.querySelector('.dasar-pin-slot') as HTMLElement;
    expect(slot).toBeTruthy();
    expect(slot.classList).toContain('appearance-elevated');
    expect(slot.classList).toContain('size-lg');
    expect(slot.classList).toContain('error');
    expect(slot.classList).toContain('disabled');
  });

  it('resolves defaults from theme provider when present', async () => {
    const themeConfig = {
      components: {
        pin: {
          length: 4,
          appearance: 'filled',
          size: 'sm',
          radius: 'lg',
          disabled: true,
          error: true,
          pattern: '[A-Z]',
          placeholder: 'X',
          inputMode: 'text',
        },
      },
    };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [PinThemeDefaultHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: { componentConfig: themeConfig.components },
        },
      ],
    }).compileComponents();

    const themed = TestBed.createComponent(PinThemeDefaultHost);
    themed.detectChanges();
    await themed.whenStable();

    const pinDebug = themed.debugElement.query(By.directive(DasarPin));
    const instance = pinDebug.componentInstance as DasarPin;

    expect(instance.length).toBe(4);
    expect(instance.appearance).toBe('filled');
    expect(instance.size).toBe('sm');
    expect(instance.radius).toBe('lg');
    expect(instance.disabled).toBe(true);
    expect(instance.error).toBe(true);
    expect(instance.pattern).toBe('[A-Z]');
    expect(instance.placeholder).toBe('X');
    expect(instance.inputMode).toBe('text');
  });
});
