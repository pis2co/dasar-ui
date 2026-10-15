import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarBreakpointComponent } from './dasar-breakpoint';
import { DasarBreakpointService, DasarBreakpointState } from '../../services/breakpoint.service';

@Component({
  selector: 'test-breakpoint-host',
  standalone: true,
  imports: [DasarBreakpointComponent],
  template: `<dasar-breakpoint
    [hidden-at]="hidden()"
    [show-at]="show()"
    (onMediaUpdate)="media.set([...media(), $event])"
    (onShow)="shown.set([...shown(), $event])"
    (onHidden)="concealed.set([...concealed(), $event])"
    ><span class="bp-content">Content</span></dasar-breakpoint
  >`,
})
class BreakpointHost {
  hidden = signal<any>(null);
  show = signal<any>(null);
  media = signal<DasarBreakpointState[]>([]);
  shown = signal<DasarBreakpointState[]>([]);
  concealed = signal<DasarBreakpointState[]>([]);
}

@Component({
  selector: 'test-breakpoint-theme-host',
  standalone: true,
  imports: [DasarBreakpointComponent],
  template: `<dasar-breakpoint><span class="bp-content">Content</span></dasar-breakpoint>`,
})
class BreakpointThemeHost {}

const setWidth = (value: number) => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
};

const resizeTo = async (fixture: ComponentFixture<unknown>, width: number) => {
  setWidth(width);
  window.dispatchEvent(new Event('resize'));
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  fixture.detectChanges();
  await fixture.whenStable();
};

const hasContent = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.bp-content') !== null;

describe('DasarBreakpoint', () => {
  let fixture: ComponentFixture<BreakpointHost>;

  beforeEach(async () => {
    setWidth(900);
    await TestBed.configureTestingModule({
      imports: [BreakpointHost],
    }).compileComponents();

    fixture = TestBed.createComponent(BreakpointHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows content when neither input is set', () => {
    expect(hasContent(fixture)).toBe(true);
  });

  it('hides content matching hidden-at and shows it again on resize', async () => {
    fixture.componentInstance.hidden.set('sm');
    fixture.detectChanges();
    await fixture.whenStable();
    await resizeTo(fixture, 700);
    expect(hasContent(fixture)).toBe(false);
    await resizeTo(fixture, 900);
    expect(hasContent(fixture)).toBe(true);
    expect(fixture.componentInstance.shown().length).toBe(1);
  });

  it('restricts content to show-at list', async () => {
    fixture.componentInstance.show.set(['lg', 'xl']);
    fixture.detectChanges();
    await fixture.whenStable();
    await resizeTo(fixture, 700);
    expect(hasContent(fixture)).toBe(false);
    await resizeTo(fixture, 1100);
    expect(hasContent(fixture)).toBe(true);
  });

  it('normalizes a comma string', async () => {
    fixture.componentInstance.hidden.set('sm, md');
    fixture.detectChanges();
    await fixture.whenStable();
    await resizeTo(fixture, 700);
    expect(hasContent(fixture)).toBe(false);
    await resizeTo(fixture, 1100);
    expect(hasContent(fixture)).toBe(true);
  });

  it('prefers show-at when both inputs are set', async () => {
    fixture.componentInstance.hidden.set('lg');
    fixture.componentInstance.show.set('lg');
    fixture.detectChanges();
    await fixture.whenStable();
    await resizeTo(fixture, 1100);
    expect(hasContent(fixture)).toBe(true);
    await resizeTo(fixture, 700);
    expect(hasContent(fixture)).toBe(false);
  });

  it('emits onMediaUpdate on breakpoint change only', async () => {
    fixture.componentInstance.media.set([]);
    await resizeTo(fixture, 700);
    const afterFirst = fixture.componentInstance.media().length;
    await resizeTo(fixture, 710);
    expect(fixture.componentInstance.media().length).toBe(afterFirst);
    await resizeTo(fixture, 1100);
    expect(fixture.componentInstance.media().length).toBe(afterFirst + 1);
    expect(fixture.componentInstance.media().at(-1)?.name).toBe('lg');
  });

  it('emits onHidden on the visible to hidden transition only', async () => {
    fixture.componentInstance.hidden.set('md');
    fixture.componentInstance.concealed.set([]);
    fixture.detectChanges();
    await fixture.whenStable();
    await resizeTo(fixture, 900);
    expect(fixture.componentInstance.concealed().length).toBe(1);
    await resizeTo(fixture, 950);
    expect(fixture.componentInstance.concealed().length).toBe(1);
  });
});

describe('DasarBreakpoint theme defaults', () => {
  it('reads hiddenAt from the component config', async () => {
    setWidth(600);
    await TestBed.configureTestingModule({
      imports: [BreakpointThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: { componentConfig: { breakpoint: { hiddenAt: ['xs', 'sm'] } } },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(BreakpointThemeHost);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.bp-content')).toBeNull();
    const service = TestBed.inject(DasarBreakpointService);
    expect(service.name()).toBe('xs');
  });
});
