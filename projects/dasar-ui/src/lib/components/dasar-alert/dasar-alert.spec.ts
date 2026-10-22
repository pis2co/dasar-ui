import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeConfig } from '../../models/theme.model';
import { DasarThemeProviderComponent } from '../dasar-theme-provider/dasar-theme-provider';
import { alertMap } from '../../services/theme.service';
import { DasarAlertComponent, DasarAlertRadiusType, DasarAlertVariantType } from './dasar-alert';

@Component({
  selector: 'test-alert-host',
  standalone: true,
  imports: [DasarAlertComponent],
  template: `<dasar-alert
    [variant]="variant()"
    [bordered]="bordered()"
    [closeable]="closeable()"
    [title]="title()"
    [icon-name]="iconName()"
    [(visible)]="visible"
    (onClose)="closed.set(closed() + 1)"
    (onAfterLeave)="left.set(left() + 1)"
    >Body text</dasar-alert
  >`,
})
class AlertHost {
  variant = signal<DasarAlertVariantType>('primary');
  bordered = signal(true);
  closeable = signal(false);
  title = signal<string | null>(null);
  iconName = signal<string | null>(null);
  visible = signal(true);
  closed = signal(0);
  left = signal(0);
}

@Component({
  selector: 'test-alert-slot-host',
  standalone: true,
  imports: [DasarAlertComponent],
  template: `<dasar-alert title="ignored">
    <span icon-slot class="my-icon">!</span>
    <b header-slot class="my-header">Custom header</b>
    Body
  </dasar-alert>`,
})
class AlertSlotHost {}

@Component({
  selector: 'test-alert-close-slot-host',
  standalone: true,
  imports: [DasarAlertComponent],
  template: `<dasar-alert [closeable]="closeable()">
    <button closeable-slot class="my-close">Dismiss</button>
    Body
  </dasar-alert>`,
})
class AlertCloseSlotHost {
  closeable = signal(false);
}

@Component({
  selector: 'test-alert-theme-host',
  standalone: true,
  imports: [DasarAlertComponent],
  template: `<dasar-alert>Body</dasar-alert>`,
})
class AlertThemeHost {}

@Component({
  selector: 'test-alert-tokens-host',
  standalone: true,
  imports: [DasarThemeProviderComponent, DasarAlertComponent],
  template: `<dasar-theme-provider [tokenConfig]="tokens()">
    <dasar-alert>Body</dasar-alert>
  </dasar-theme-provider>`,
})
class AlertTokensHost {
  tokens = signal<DasarThemeConfig['tokens']>({});
}

@Component({
  selector: 'test-alert-radius-host',
  standalone: true,
  imports: [DasarAlertComponent],
  template: `<dasar-alert [radius]="radius()">Body</dasar-alert>`,
})
class AlertRadiusHost {
  radius = signal<DasarAlertRadiusType>('md');
}

const hostOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('dasar-alert') as HTMLElement;
const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-alert-container') as HTMLElement | null;
const closeOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-alert-close') as HTMLButtonElement | null;
const contentTextOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-alert-content')?.textContent ?? '';

const closeAlert = async (fixture: ComponentFixture<AlertHost>) => {
  fixture.componentInstance.closeable.set(true);
  await fixture.whenStable();
  closeOf(fixture)?.click();
  await fixture.whenStable();
};

describe('DasarAlert', () => {
  let fixture: ComponentFixture<AlertHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertHost],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is a bordered primary status by default', () => {
    const container = containerOf(fixture);

    expect(contentTextOf(fixture)).toContain('Body text');
    expect(container?.classList).toContain('primary');
    expect(container?.classList).toContain('bordered');
    expect(hostOf(fixture).getAttribute('role')).toBe('status');
  });

  it('removes the border when bordered is false', async () => {
    fixture.componentInstance.bordered.set(false);
    await fixture.whenStable();

    expect(containerOf(fixture)?.classList).not.toContain('bordered');
  });

  it('renders no icon, title or close button by default', () => {
    expect(fixture.nativeElement.querySelector('.dasar-alert-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('.dasar-alert-title')).toBeNull();
    expect(closeOf(fixture)).toBeNull();
  });

  it('renders an icon when icon-name is set', async () => {
    fixture.componentInstance.iconName.set('info-circle');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.dasar-alert-icon dasar-icon')).not.toBeNull();
  });

  it('renders the title text', async () => {
    fixture.componentInstance.title.set('Heads up');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.dasar-alert-title')?.textContent?.trim()).toBe(
      'Heads up',
    );
  });

  it('switches variant and role for danger', async () => {
    fixture.componentInstance.variant.set('danger');
    await fixture.whenStable();

    expect(containerOf(fixture)?.classList).toContain('danger');
    expect(hostOf(fixture).getAttribute('role')).toBe('alert');
  });

  it('closes with animationend and fires each event once', async () => {
    await closeAlert(fixture);

    expect(fixture.componentInstance.closed()).toBe(1);
    expect(containerOf(fixture)?.classList).toContain('leaving');

    containerOf(fixture)?.dispatchEvent(new Event('animationend'));
    await fixture.whenStable();

    expect(fixture.componentInstance.left()).toBe(1);
    expect(fixture.componentInstance.visible()).toBe(false);
    expect(containerOf(fixture)).toBeNull();
    expect(hostOf(fixture).classList).toContain('hidden');

    await new Promise((resolve) => setTimeout(resolve, 450));

    expect(fixture.componentInstance.left()).toBe(1);
  });

  it('closes with the fallback timer when animationend never fires', async () => {
    await closeAlert(fixture);
    await new Promise((resolve) => setTimeout(resolve, 450));
    await fixture.whenStable();

    expect(fixture.componentInstance.left()).toBe(1);
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('shows the alert again when visible is set to true', async () => {
    await closeAlert(fixture);
    await new Promise((resolve) => setTimeout(resolve, 450));
    await fixture.whenStable();

    fixture.componentInstance.visible.set(true);
    await fixture.whenStable();

    const container = containerOf(fixture);

    expect(container).not.toBeNull();
    expect(container?.classList).not.toContain('leaving');
    expect(hostOf(fixture).classList).not.toContain('hidden');
    expect(contentTextOf(fixture)).toContain('Body text');
  });

  it('hides immediately without events when the parent sets visible to false', async () => {
    fixture.componentInstance.visible.set(false);
    await fixture.whenStable();

    expect(containerOf(fixture)).toBeNull();
    expect(fixture.componentInstance.closed()).toBe(0);
    expect(fixture.componentInstance.left()).toBe(0);
  });
});

describe('DasarAlert slots', () => {
  it('renders the icon and header slots instead of the inputs', async () => {
    await TestBed.configureTestingModule({
      imports: [AlertSlotHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(AlertSlotHost);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.dasar-alert-icon .my-icon')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.dasar-alert-title .my-header')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.dasar-alert-title')?.textContent).not.toContain(
      'ignored',
    );
    expect(contentTextOf(fixture)).toContain('Body');
  });
});

describe('DasarAlert theme defaults', () => {
  it('reads variant, bordered, closeable and icon name from the component config', async () => {
    await TestBed.configureTestingModule({
      imports: [AlertThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              alert: {
                variant: 'success',
                bordered: false,
                closeable: true,
                iconName: 'circle-check',
              },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AlertThemeHost);
    await fixture.whenStable();

    const container = containerOf(fixture);

    expect(container?.classList).toContain('success');
    expect(container?.classList).not.toContain('bordered');
    expect(closeOf(fixture)).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.dasar-alert-icon')).not.toBeNull();
  });
});

describe('DasarAlert theme tokens', () => {
  let fixture: ComponentFixture<AlertTokensHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertTokensHost],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertTokensHost);
    await fixture.whenStable();
  });

  it('writes the alert tokens on the provider host', async () => {
    fixture.componentInstance.tokens.set({
      light: { alert: { padding: '20px', dangerBg: 'red' } },
    });
    await fixture.whenStable();

    const host = fixture.nativeElement.querySelector('dasar-theme-provider') as HTMLElement;

    expect(host.style.getPropertyValue('--dasar-alert-padding')).toBe('20px');
    expect(host.style.getPropertyValue('--dasar-alert-danger-bg')).toBe('red');
  });
});

describe('DasarAlert radius', () => {
  let fixture: ComponentFixture<AlertRadiusHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertRadiusHost],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertRadiusHost);
    await fixture.whenStable();
  });

  it('defaults to radius-md', () => {
    expect(containerOf(fixture)?.classList).toContain('radius-md');
  });

  it('radius drives the container class', async () => {
    for (const value of ['none', 'sm', 'lg', 'full'] as DasarAlertRadiusType[]) {
      fixture.componentInstance.radius.set(value);
      await fixture.whenStable();

      expect(containerOf(fixture)?.classList).toContain(`radius-${value}`);
    }
  });
});

describe('DasarAlert radius theme default', () => {
  let fixture: ComponentFixture<AlertThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: { componentConfig: { alert: { radius: 'none' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertThemeHost);
    await fixture.whenStable();
  });

  it('reads radius from the component config', () => {
    expect(containerOf(fixture)?.classList).toContain('radius-none');
  });
});

describe('alertMap radius tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('maps the per-size radius tokens', () => {
    expect(alertMap.radiusNone).toBe('--dasar-alert-radius-none');
    expect(alertMap.radiusXs).toBe('--dasar-alert-radius-xs');
    expect(alertMap.radiusSm).toBe('--dasar-alert-radius-sm');
    expect(alertMap.radiusMd).toBe('--dasar-alert-radius-md');
    expect(alertMap.radiusLg).toBe('--dasar-alert-radius-lg');
    expect(alertMap.radiusXl).toBe('--dasar-alert-radius-xl');
    expect(alertMap.radiusFull).toBe('--dasar-alert-radius-full');
  });
});

describe('DasarAlert close button', () => {
  it('renders a ghost default close button', async () => {
    const fixture = TestBed.createComponent(AlertHost);
    fixture.componentInstance.closeable.set(true);
    await fixture.whenStable();

    const close = closeOf(fixture);
    expect(close).not.toBeNull();
    expect(close?.querySelector('.dasar-button-native')?.classList).toContain('ghost');
  });

  it('replaces the default button with the closeable slot, even when not closeable', async () => {
    const fixture = TestBed.createComponent(AlertCloseSlotHost);
    await fixture.whenStable();

    expect(
      fixture.nativeElement.querySelector('.dasar-alert-close-section .my-close'),
    ).not.toBeNull();
    expect(closeOf(fixture)).toBeNull();

    fixture.componentInstance.closeable.set(true);
    await fixture.whenStable();

    expect(closeOf(fixture)).toBeNull();
  });
});
