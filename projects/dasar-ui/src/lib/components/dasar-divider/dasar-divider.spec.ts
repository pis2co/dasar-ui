import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeConfig } from '../../models/theme.model';
import { DasarThemeProviderComponent } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarDividerComponent } from './dasar-divider';

@Component({
  selector: 'test-divider-host',
  standalone: true,
  imports: [DasarDividerComponent],
  template: `<dasar-divider
    [dashed]="dashed()"
    [vertical]="vertical()"
    [label]="label()"
    [label-placement]="placement()"
  />`,
})
class DividerHost {
  dashed = signal(false);
  vertical = signal(false);
  label = signal<string | null>(null);
  placement = signal<'left' | 'center' | 'right'>('center');
}

@Component({
  selector: 'test-divider-slot-host',
  standalone: true,
  imports: [DasarDividerComponent],
  template: `<dasar-divider>
    <ng-template divider-label-slot><b class="my-label">Custom</b></ng-template>
  </dasar-divider>`,
})
class DividerSlotHost {}

@Component({
  selector: 'test-divider-theme-host',
  standalone: true,
  imports: [DasarDividerComponent],
  template: `<dasar-divider label="OR" />`,
})
class DividerThemeHost {}

@Component({
  selector: 'test-divider-tokens-host',
  standalone: true,
  imports: [DasarThemeProviderComponent, DasarDividerComponent],
  template: `<dasar-theme-provider [tokenConfig]="tokens()">
    <dasar-divider />
  </dasar-theme-provider>`,
})
class DividerTokensHost {
  tokens = signal<DasarThemeConfig['tokens']>({});
}

const hostOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('dasar-divider') as HTMLElement;
const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-divider-container') as HTMLElement;
const linesOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelectorAll('.dasar-divider-line');
const labelOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-divider-label') as HTMLElement | null;

describe('DasarDivider', () => {
  let fixture: ComponentFixture<DividerHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has separator semantics and is horizontal by default', () => {
    const host = hostOf(fixture);
    const container = containerOf(fixture);

    expect(host.getAttribute('role')).toBe('separator');
    expect(host.getAttribute('aria-orientation')).toBe('horizontal');
    expect(host.classList).toContain('dasar-divider');
    expect(container.classList).toContain('horizontal');
  });

  it('renders no label and a single line by default', () => {
    expect(labelOf(fixture)).toBeNull();
    expect(linesOf(fixture).length).toBe(1);
  });

  it('renders a label with two lines', async () => {
    fixture.componentInstance.label.set('OR');
    await fixture.whenStable();

    const label = labelOf(fixture);
    const container = containerOf(fixture);

    expect(label?.textContent?.trim()).toBe('OR');
    expect(linesOf(fixture).length).toBe(2);
    expect(container.classList).toContain('with-label');
    expect(container.classList).toContain('label-center');
  });

  it('switches the label placement class', async () => {
    fixture.componentInstance.label.set('OR');
    await fixture.whenStable();

    fixture.componentInstance.placement.set('left');
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('label-left');

    fixture.componentInstance.placement.set('right');
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('label-right');
  });

  it('adds the dashed class when dashed', async () => {
    fixture.componentInstance.dashed.set(true);
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('dashed');
  });

  it('hides the label in vertical mode', async () => {
    fixture.componentInstance.vertical.set(true);
    fixture.componentInstance.label.set('OR');
    await fixture.whenStable();

    const host = hostOf(fixture);

    expect(host.classList).toContain('vertical');
    expect(host.getAttribute('aria-orientation')).toBe('vertical');
    expect(containerOf(fixture).classList).toContain('vertical');
    expect(labelOf(fixture)).toBeNull();
    expect(linesOf(fixture).length).toBe(1);
  });
});

describe('DasarDivider label slot', () => {
  it('renders the custom template inside the label', async () => {
    await TestBed.configureTestingModule({
      imports: [DividerSlotHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(DividerSlotHost);
    await fixture.whenStable();

    const custom = fixture.nativeElement.querySelector(
      '.dasar-divider-label .my-label',
    ) as HTMLElement;

    expect(custom?.textContent).toBe('Custom');
    expect(linesOf(fixture).length).toBe(2);
  });
});

describe('DasarDivider theme defaults', () => {
  it('reads dashed, label placement and spacing from the component config', async () => {
    await TestBed.configureTestingModule({
      imports: [DividerThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              divider: { dashed: true, labelPlacement: 'left', spacing: 'lg' },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DividerThemeHost);
    await fixture.whenStable();

    const container = containerOf(fixture);

    expect(container.classList).toContain('dashed');
    expect(container.classList).toContain('label-left');
    expect(container.classList).toContain('spacing-lg');
  });
});

describe('DasarDivider theme tokens', () => {
  let fixture: ComponentFixture<DividerTokensHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerTokensHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerTokensHost);
    await fixture.whenStable();
  });

  it('writes the divider tokens on the provider host', async () => {
    fixture.componentInstance.tokens.set({
      light: { divider: { color: 'red', thickness: '2px' } },
    });
    await fixture.whenStable();

    const host = fixture.nativeElement.querySelector('dasar-theme-provider') as HTMLElement;

    expect(host.style.getPropertyValue('--dasar-divider-color')).toBe('red');
    expect(host.style.getPropertyValue('--dasar-divider-thickness')).toBe('2px');
  });
});
