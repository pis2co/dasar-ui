import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarOverlay } from './dasar-overlay';

@Component({
  standalone: true,
  imports: [DasarOverlay],
  template: `<dasar-overlay
    [blur]="blur()"
    (onClick)="clicked.set(clicked() + 1)"
  ></dasar-overlay>`,
})
class OverlayHost {
  blur = signal('4px');
  clicked = signal(0);
}

@Component({
  standalone: true,
  imports: [DasarOverlay],
  template: `<dasar-overlay><div class="panel">child</div></dasar-overlay>`,
})
class OverlayContentHost {}

describe('DasarOverlay', () => {
  let component: DasarOverlay;
  let fixture: ComponentFixture<DasarOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarOverlay],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies the dasar-overlay host class', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('dasar-overlay');
  });

  it('leaves the backdrop tokens free when no blur or background is set', () => {
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.dasar-overlay-backdrop') as HTMLElement;

    expect(backdrop.style.getPropertyValue('--overlay-blur')).toBe('');
    expect(backdrop.style.getPropertyValue('--overlay-background')).toBe('');
  });
});

describe('DasarOverlay interactions', () => {
  const backdrop = (f: ComponentFixture<unknown>) =>
    f.nativeElement.querySelector('.dasar-overlay-backdrop') as HTMLElement;

  it('reflects the blur input into a CSS custom property', async () => {
    await TestBed.configureTestingModule({ imports: [OverlayHost] }).compileComponents();
    const fixture: ComponentFixture<OverlayHost> = TestBed.createComponent(OverlayHost);
    fixture.detectChanges();

    expect(backdrop(fixture).style.getPropertyValue('--overlay-blur')).toBe('4px');

    fixture.componentInstance.blur.set('10px');
    await fixture.whenStable();

    expect(backdrop(fixture).style.getPropertyValue('--overlay-blur')).toBe('10px');
  });

  it('reflects the background input into a CSS custom property', async () => {
    await TestBed.configureTestingModule({ imports: [OverlayHost] }).compileComponents();
    const fixture: ComponentFixture<OverlayHost> = TestBed.createComponent(OverlayHost);
    fixture.detectChanges();

    fixture.componentInstance.blur.set('0px');
    await fixture.whenStable();

    expect(backdrop(fixture).style.getPropertyValue('--overlay-blur')).toBe('0px');
  });

  it('emits onClick when the backdrop itself is clicked', async () => {
    await TestBed.configureTestingModule({ imports: [OverlayHost] }).compileComponents();
    const fixture: ComponentFixture<OverlayHost> = TestBed.createComponent(OverlayHost);
    fixture.detectChanges();

    backdrop(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.clicked()).toBe(1);
  });

  it('does not emit onClick when projected content is clicked', async () => {
    await TestBed.configureTestingModule({ imports: [OverlayContentHost] }).compileComponents();
    const fixture = TestBed.createComponent(OverlayContentHost);
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(
      (node) => node.componentInstance instanceof DasarOverlay,
    );
    let emitted = false;
    overlay.componentInstance.onClick.subscribe(() => (emitted = true));

    fixture.nativeElement.querySelector('.panel').click();
    await fixture.whenStable();

    expect(emitted).toBe(false);
  });
});
