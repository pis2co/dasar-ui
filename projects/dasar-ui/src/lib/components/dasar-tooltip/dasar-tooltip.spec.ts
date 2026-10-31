import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  DasarTooltip,
  DasarTooltipConfig,
  DasarTooltipPlacementType,
  DasarTooltipAppearanceType,
} from './dasar-tooltip';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  standalone: true,
  imports: [DasarTooltip],
  template: `
    <button
      id="test-trigger"
      [dasarTooltip]="tooltipContent()"
      [dasarTooltipPlacement]="placement()"
      [dasarTooltipDisabled]="disabled()"
      [dasarTooltipShowDelay]="showDelay()"
      [dasarTooltipHideDelay]="hideDelay()"
      [dasarTooltipAppearance]="appearance()"
      [dasarTooltipClass]="customClass()"
      [dasarTooltipStyle]="customStyle()"
    >
      Hover Me
    </button>

    <ng-template #tpl let-context>
      <span class="custom-template-content">Template: {{ context || 'Custom' }}</span>
    </ng-template>
  `,
})
class TestHostComponent {
  @ViewChild('tpl') tpl!: TemplateRef<any>;

  tooltipContent = signal<string | TemplateRef<any>>('Help text');
  placement = signal<DasarTooltipPlacementType>('top');
  disabled = signal<boolean>(false);
  showDelay = signal<number>(0);
  hideDelay = signal<number>(0);
  appearance = signal<DasarTooltipAppearanceType>('solid');
  customClass = signal<any>(null);
  customStyle = signal<any>(null);
}

@Component({
  standalone: true,
  imports: [DasarTooltip],
  template: ` <button id="themed-trigger" dasarTooltip="Themed tooltip">Hover Me</button> `,
})
class ThemedHostComponent {}

describe('DasarTooltip Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let triggerEl: HTMLButtonElement;
  let directiveInstance: DasarTooltip;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    const triggerDebug = fixture.debugElement.query(By.css('#test-trigger'));
    triggerEl = triggerDebug.nativeElement;
    directiveInstance = triggerDebug.injector.get(DasarTooltip);
  });

  afterEach(() => {
    // Clean up any remaining overlay containers in body
    document.querySelectorAll('.dasar-tooltip-content').forEach((el) => el.remove());
  });

  it('should instantiate the directive on trigger element', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should render tooltip text in DOM on mouseenter and dismiss on mouseleave', async () => {
    triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await sleep(20);
    fixture.detectChanges();

    const tooltipEl = document.querySelector('.dasar-tooltip-content');
    expect(tooltipEl).toBeTruthy();
    expect(tooltipEl?.textContent?.trim()).toContain('Help text');
    expect(tooltipEl?.classList.contains('appearance-solid')).toBe(true);

    triggerEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    await sleep(20);
    fixture.detectChanges();

    const tooltipElAfter = document.querySelector('.dasar-tooltip-content');
    expect(tooltipElAfter).toBeNull();
  });

  it('should render projected TemplateRef content correctly', async () => {
    host.tooltipContent.set(host.tpl);
    fixture.detectChanges();

    triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await sleep(20);
    fixture.detectChanges();

    const templateContentEl = document.querySelector('.custom-template-content');
    expect(templateContentEl).toBeTruthy();
    expect(templateContentEl?.textContent?.trim()).toContain('Template: Custom');

    triggerEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    await sleep(20);
  });

  it('should not render tooltip when disabled is true', async () => {
    host.disabled.set(true);
    fixture.detectChanges();

    triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await sleep(20);
    fixture.detectChanges();

    const tooltipEl = document.querySelector('.dasar-tooltip-content');
    expect(tooltipEl).toBeNull();
  });

  it('should respect showDelay and hideDelay timing', async () => {
    host.showDelay.set(100);
    host.hideDelay.set(100);
    fixture.detectChanges();

    triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await sleep(40);
    fixture.detectChanges();
    expect(document.querySelector('.dasar-tooltip-content')).toBeNull();

    await sleep(90);
    fixture.detectChanges();
    expect(document.querySelector('.dasar-tooltip-content')).toBeTruthy();

    triggerEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    await sleep(40);
    fixture.detectChanges();
    expect(document.querySelector('.dasar-tooltip-content')).toBeTruthy();

    await sleep(90);
    fixture.detectChanges();
    expect(document.querySelector('.dasar-tooltip-content')).toBeNull();
  });

  it('should apply appearance-elevated and custom class / style to the tooltip content', async () => {
    host.appearance.set('elevated');
    host.customClass.set('my-custom-tooltip');
    host.customStyle.set({ 'max-width': '300px' });
    fixture.detectChanges();

    triggerEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await sleep(20);
    fixture.detectChanges();

    const tooltipEl = document.querySelector('.dasar-tooltip-content') as HTMLElement;
    expect(tooltipEl).toBeTruthy();
    expect(tooltipEl.classList.contains('appearance-elevated')).toBe(true);
    expect(tooltipEl.classList.contains('my-custom-tooltip')).toBe(true);
    expect(tooltipEl.style.maxWidth).toBe('300px');

    triggerEl.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    fixture.detectChanges();
    await sleep(20);
  });

  it('should resolve defaults from DASAR_THEME_PROVIDER when present', async () => {
    const customThemeConfig = {
      componentConfig: {
        tooltip: {
          placement: 'bottom' as const,
          disabled: true,
          showDelay: 300,
          hideDelay: 200,
          appearance: 'elevated' as const,
        },
      },
    };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ThemedHostComponent],
      providers: [{ provide: DASAR_THEME_PROVIDER, useValue: customThemeConfig }],
    }).compileComponents();

    const themedFixture = TestBed.createComponent(ThemedHostComponent);
    themedFixture.detectChanges();
    await themedFixture.whenStable();

    const triggerDebug = themedFixture.debugElement.query(By.css('#themed-trigger'));
    const instance = triggerDebug.injector.get(DasarTooltip);

    expect(instance.placement).toBe('bottom');
    expect(instance.disabled).toBe(true);
    expect(instance.showDelay).toBe(300);
    expect(instance.hideDelay).toBe(200);
    expect(instance.appearance).toBe('elevated');
  });
});
