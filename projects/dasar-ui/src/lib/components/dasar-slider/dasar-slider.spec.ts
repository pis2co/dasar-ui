import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgpSlider, NgpSliderRange, NgpSliderThumb, NgpSliderTrack } from 'ng-primitives/slider';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarSlider, DasarSliderComponent } from './dasar-slider';

@Component({
  standalone: true,
  imports: [DasarSliderComponent, FormsModule],
  template: `<dasar-slider
    [value]="value()"
    [min]="min()"
    [max]="max()"
    [step]="step()"
    [disabled]="disabled()"
    [size]="size()"
    [appearance]="appearance()"
    [label]="label()"
    [hint]="hint()"
    [error]="error()"
    [fullWidth]="fullWidth()"
    (valueChange)="valueChanges.set([...valueChanges(), $event])"
  />`,
})
class SliderTestHost {
  value = signal(25);
  min = signal(0);
  max = signal(100);
  step = signal(1);
  disabled = signal(false);
  size = signal<'sm' | 'md' | 'lg'>('md');
  appearance = signal<'outline' | 'filled' | 'elevated'>('outline');
  label = signal<string | undefined>(undefined);
  hint = signal('');
  error = signal(false);
  fullWidth = signal(false);
  valueChanges = signal<number[]>([]);
}

@Component({
  standalone: true,
  imports: [DasarSliderComponent, FormsModule],
  template: `<dasar-slider
    [(ngModel)]="model"
    (valueChange)="emitted.set([...emitted(), $event])"
  />`,
})
class SliderCvaHost {
  model = signal(40);
  emitted = signal<number[]>([]);
}

@Component({
  standalone: true,
  imports: [DasarSliderComponent],
  template: `<dasar-slider />`,
})
class SliderThemeDefaultHost {}

describe('DasarSlider', () => {
  let component: DasarSlider;
  let fixture: ComponentFixture<DasarSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create with selector dasar-slider and literal defaults', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBe(0);
    expect(component.min).toBe(0);
    expect(component.max).toBe(100);
    expect(component.step).toBe(1);
    expect(component.disabled).toBe(false);
    expect(component.size).toBe('md');
    expect(component.appearance).toBe('outline');
    expect(component.label).toBeUndefined();
    expect(component.hint).toBe('');
    expect(component.error).toBe(false);
    expect(component.fullWidth).toBe(false);
  });

  it('hosts NgpSlider, NgpSliderTrack, NgpSliderRange, and NgpSliderThumb directives', async () => {
    const hostFixture = TestBed.createComponent(SliderTestHost);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.debugElement.query(By.directive(NgpSlider))).toBeTruthy();
    expect(hostFixture.debugElement.query(By.directive(NgpSliderTrack))).toBeTruthy();
    expect(hostFixture.debugElement.query(By.directive(NgpSliderRange))).toBeTruthy();
    expect(hostFixture.debugElement.query(By.directive(NgpSliderThumb))).toBeTruthy();
  });

  it('syncs value via writeValue / CVA and setDisabledState without spurious valueChange emissions', async () => {
    const cvaFixture = TestBed.createComponent(SliderCvaHost);
    cvaFixture.detectChanges();
    await cvaFixture.whenStable();

    const sliderDebug = cvaFixture.debugElement.query(By.directive(DasarSlider));
    const sliderInstance = sliderDebug.componentInstance as DasarSlider;
    const ngpSlider = cvaFixture.debugElement
      .query(By.directive(NgpSlider))
      .injector.get(NgpSlider);

    expect(sliderInstance.value).toBe(40);
    expect((ngpSlider as any).state.value()).toBe(40);
    expect(cvaFixture.componentInstance.emitted()).toEqual([]);

    sliderInstance.writeValue(75);
    cvaFixture.detectChanges();
    await cvaFixture.whenStable();

    expect(sliderInstance.value).toBe(75);
    expect((ngpSlider as any).state.value()).toBe(75);
    expect(cvaFixture.componentInstance.emitted()).toEqual([]);

    sliderInstance.setDisabledState(true);
    cvaFixture.detectChanges();
    await cvaFixture.whenStable();

    expect(sliderInstance.disabled).toBe(true);
    expect((ngpSlider as any).state.disabled()).toBe(true);
  });

  it('passes min, max, step, and disabled through to the NgpSlider primitive and ARIA attributes', async () => {
    const hostFixture = TestBed.createComponent(SliderTestHost);
    hostFixture.componentInstance.min.set(10);
    hostFixture.componentInstance.max.set(50);
    hostFixture.componentInstance.step.set(5);
    hostFixture.componentInstance.value.set(25);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const ngpSlider = hostFixture.debugElement
      .query(By.directive(NgpSlider))
      .injector.get(NgpSlider);
    const thumbEl = hostFixture.debugElement.query(By.directive(NgpSliderThumb))
      .nativeElement as HTMLElement;

    expect((ngpSlider as any).state.min()).toBe(10);
    expect((ngpSlider as any).state.max()).toBe(50);
    expect((ngpSlider as any).state.step()).toBe(5);
    expect(thumbEl.getAttribute('aria-valuemin')).toBe('10');
    expect(thumbEl.getAttribute('aria-valuemax')).toBe('50');
    expect(thumbEl.getAttribute('aria-valuenow')).toBe('25');

    hostFixture.componentInstance.disabled.set(true);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect((ngpSlider as any).state.disabled()).toBe(true);
    expect(thumbEl.hasAttribute('data-disabled')).toBe(true);
  });

  it('steps value on keyboard ArrowRight / ArrowLeft and emits valueChange exactly once per key press', async () => {
    const hostFixture = TestBed.createComponent(SliderTestHost);
    hostFixture.componentInstance.min.set(0);
    hostFixture.componentInstance.max.set(100);
    hostFixture.componentInstance.step.set(5);
    hostFixture.componentInstance.value.set(20);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    hostFixture.componentInstance.valueChanges.set([]);

    const thumbEl = hostFixture.debugElement.query(By.directive(NgpSliderThumb))
      .nativeElement as HTMLElement;

    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.componentInstance.valueChanges()).toEqual([25]);

    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.componentInstance.valueChanges()).toEqual([25, 20]);
  });

  it('applies appearance-elevated and size classes to the container', async () => {
    const hostFixture = TestBed.createComponent(SliderTestHost);
    hostFixture.componentInstance.appearance.set('elevated');
    hostFixture.componentInstance.size.set('lg');
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const container = hostFixture.nativeElement.querySelector(
      '.dasar-slider-container',
    ) as HTMLElement;
    expect(container).toBeTruthy();
    expect(container.classList).toContain('appearance-elevated');
    expect(container.classList).toContain('size-lg');
  });

  it('resolves defaults from theme provider when present', async () => {
    const themeConfig = {
      components: {
        slider: {
          min: 5,
          max: 80,
          step: 5,
          disabled: true,
          size: 'sm',
          appearance: 'elevated',
          label: 'Volume',
          hint: 'Adjust volume level',
          error: true,
          fullWidth: true,
        },
      },
    };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [SliderThemeDefaultHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: { componentConfig: themeConfig.components },
        },
      ],
    }).compileComponents();

    const themed = TestBed.createComponent(SliderThemeDefaultHost);
    themed.detectChanges();
    await themed.whenStable();

    const sliderDebug = themed.debugElement.query(By.directive(DasarSlider));
    const instance = sliderDebug.componentInstance as DasarSlider;

    expect(instance.min).toBe(5);
    expect(instance.max).toBe(80);
    expect(instance.step).toBe(5);
    expect(instance.disabled).toBe(true);
    expect(instance.size).toBe('sm');
    expect(instance.appearance).toBe('elevated');
    expect(instance.label).toBe('Volume');
    expect(instance.hint).toBe('Adjust volume level');
    expect(instance.error).toBe(true);
    expect(instance.fullWidth).toBe(true);
  });
});
