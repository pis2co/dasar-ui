import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DasarToggle, DasarToggleConfig } from './dasar-toggle';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';

@Component({
  standalone: true,
  imports: [DasarToggle, FormsModule],
  template: `
    <dasar-toggle
      [(ngModel)]="selected"
      [disabled]="disabled()"
      [appearance]="appearance()"
      [variant]="variant()"
      [size]="size()"
      [radius]="radius()"
      [type]="type()"
      [fullWidth]="fullWidth()"
      [toggleClass]="toggleClass()"
      [toggleStyle]="toggleStyle()"
      (selectedChange)="onSelectedChange($event)"
    >
      Toggle Text
    </dasar-toggle>
  `,
})
class TestHostComponent {
  selected = false;
  disabled = signal(false);
  appearance = signal<'solid' | 'subtle' | 'outline' | 'elevated'>('solid');
  variant = signal<'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'ghost'>('primary');
  size = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  radius = signal<any>('md');
  type = signal<'button' | 'submit' | 'reset'>('button');
  fullWidth = signal(false);
  toggleClass = signal<any>(null);
  toggleStyle = signal<any>(null);

  selectedChangeEvents: boolean[] = [];

  onSelectedChange(val: boolean) {
    this.selectedChangeEvents.push(val);
  }
}

describe('DasarToggle', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let toggleDebug: any;
  let toggleInstance: DasarToggle;
  let buttonNativeEl: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    toggleDebug = fixture.debugElement.query(By.directive(DasarToggle));
    toggleInstance = toggleDebug.componentInstance;
    buttonNativeEl = fixture.debugElement.query(By.css('button.dasar-toggle-native')).nativeElement;
  });

  it('should create and render native button with ngpToggle directive and dasar-toggle class', () => {
    expect(toggleInstance).toBeTruthy();
    expect(toggleDebug.nativeElement.classList.contains('dasar-toggle')).toBe(true);
    expect(buttonNativeEl).toBeTruthy();
    expect(buttonNativeEl.getAttribute('type')).toBe('button');
    expect(buttonNativeEl.textContent?.trim()).toBe('Toggle Text');
  });

  it('should sync selected via writeValue / CVA without double emission', async () => {
    host.selectedChangeEvents = [];
    host.selected = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const updatedButtonNativeEl = fixture.debugElement.query(
      By.css('button.dasar-toggle-native'),
    ).nativeElement;
    expect(toggleInstance.selected).toBe(true);
    expect(updatedButtonNativeEl.classList.contains('selected')).toBe(true);
    expect(updatedButtonNativeEl.getAttribute('data-selected')).not.toBeNull();
    // Setting value programmatically via ngModel / writeValue must not fire selectedChange
    expect(host.selectedChangeEvents.length).toBe(0);
  });

  it('should toggle selected and emit selectedChange exactly once on user click', async () => {
    host.selectedChangeEvents = [];
    expect(toggleInstance.selected).toBe(false);

    buttonNativeEl.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(toggleInstance.selected).toBe(true);
    expect(host.selected).toBe(true);
    expect(host.selectedChangeEvents).toEqual([true]);

    buttonNativeEl.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(toggleInstance.selected).toBe(false);
    expect(host.selected).toBe(false);
    expect(host.selectedChangeEvents).toEqual([true, false]);
  });

  it('should sync disabled state correctly to button native element and host class', async () => {
    host.disabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const updatedButtonNativeEl = fixture.debugElement.query(
      By.css('button.dasar-toggle-native'),
    ).nativeElement;
    expect(updatedButtonNativeEl.disabled).toBe(true);
    expect(toggleDebug.nativeElement.classList.contains('disabled')).toBe(true);

    host.disabled.set(false);
    fixture.detectChanges();
    await fixture.whenStable();

    const reenabledButtonNativeEl = fixture.debugElement.query(
      By.css('button.dasar-toggle-native'),
    ).nativeElement;
    expect(reenabledButtonNativeEl.disabled).toBe(false);
    expect(toggleDebug.nativeElement.classList.contains('disabled')).toBe(false);
  });

  it('should apply appearance-elevated and selected-state classes together correctly', async () => {
    host.appearance.set('elevated');
    host.selected = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const updatedButtonNativeEl = fixture.debugElement.query(
      By.css('button.dasar-toggle-native'),
    ).nativeElement;
    expect(updatedButtonNativeEl.classList.contains('elevated')).toBe(true);
    expect(updatedButtonNativeEl.classList.contains('selected')).toBe(true);
    expect(updatedButtonNativeEl.getAttribute('data-selected')).not.toBeNull();
  });

  it('should apply full-width, variant, radius, size, and custom toggleClass/toggleStyle', async () => {
    host.fullWidth.set(true);
    host.variant.set('danger');
    host.size.set('lg');
    host.radius.set('full');
    host.toggleClass.set('custom-toggle-class');
    host.toggleStyle.set({ 'border-width': '2px' });
    fixture.detectChanges();
    await fixture.whenStable();

    const updatedButtonNativeEl = fixture.debugElement.query(
      By.css('button.dasar-toggle-native'),
    ).nativeElement;
    expect(toggleDebug.nativeElement.classList.contains('full-width')).toBe(true);
    expect(updatedButtonNativeEl.classList.contains('danger')).toBe(true);
    expect(updatedButtonNativeEl.classList.contains('size-lg')).toBe(true);
    expect(updatedButtonNativeEl.classList.contains('radius-full')).toBe(true);
    expect(updatedButtonNativeEl.classList.contains('custom-toggle-class')).toBe(true);
    expect(updatedButtonNativeEl.style.borderWidth).toBe('2px');
  });

  it('should resolve theme defaults from DASAR_THEME_PROVIDER', async () => {
    const customConfig = {
      componentConfig: {
        toggle: {
          appearance: 'outline' as const,
          variant: 'success' as const,
          size: 'sm' as const,
          radius: 'none' as const,
          selected: true,
          disabled: true,
          fullWidth: true,
          type: 'reset' as const,
        },
      },
    };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DasarToggle],
      providers: [{ provide: DASAR_THEME_PROVIDER, useValue: customConfig }],
    }).compileComponents();

    const themedFixture = TestBed.createComponent(DasarToggle);
    themedFixture.detectChanges();
    await themedFixture.whenStable();

    const instance = themedFixture.componentInstance;
    expect(instance.appearance).toBe('outline');
    expect(instance.variant).toBe('success');
    expect(instance.size).toBe('sm');
    expect(instance.radius).toBe('none');
    expect(instance.selected).toBe(true);
    expect(instance.disabled).toBe(true);
    expect(instance.fullWidth).toBe(true);
    expect(instance.type).toBe('reset');
  });
});
