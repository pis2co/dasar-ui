import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarComponentConfig, DasarThemeConfig } from '../../models/theme.model';
import { DasarThemeProviderComponent } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarButtonGroupComponent } from './dasar-button-group';

@Component({
  selector: 'test-button-group-host',
  standalone: true,
  imports: [DasarButtonGroupComponent, DasarButtonComponent],
  template: `
    <dasar-button-group
      [orientation]="orientation()"
      [size]="size()"
      [variant]="variant()"
      [attached]="attached()"
      [disabled]="disabled()"
    >
      <dasar-button>A</dasar-button>
      <dasar-button size="xl">B</dasar-button>
    </dasar-button-group>
  `,
})
class ButtonGroupHost {
  orientation = signal<'horizontal' | 'vertical'>('horizontal');
  size = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | null>(null);
  variant = signal<'primary' | 'secondary' | null>(null);
  attached = signal(true);
  disabled = signal(false);
}

@Component({
  selector: 'test-button-group-theme-host',
  standalone: true,
  imports: [DasarButtonGroupComponent, DasarButtonComponent],
  template: `
    <dasar-button-group>
      <dasar-button>A</dasar-button>
    </dasar-button-group>
  `,
})
class ButtonGroupThemeHost {}

@Component({
  selector: 'test-button-group-tokens-host',
  standalone: true,
  imports: [DasarThemeProviderComponent, DasarButtonGroupComponent, DasarButtonComponent],
  template: `
    <dasar-theme-provider [tokenConfig]="tokens()">
      <dasar-button-group>
        <dasar-button>A</dasar-button>
      </dasar-button-group>
    </dasar-theme-provider>
  `,
})
class ButtonGroupTokensHost {
  tokens = signal<DasarThemeConfig['tokens']>({});
}

const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-button-group-container') as HTMLElement;
const nativeButtonsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-button-native')) as HTMLButtonElement[];

describe('DasarButtonGroup', () => {
  let fixture: ComponentFixture<ButtonGroupHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGroupHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is horizontal and attached by default', () => {
    const container = containerOf(fixture);

    expect(container.classList).toContain('horizontal');
    expect(container.classList).toContain('attached');
    expect(container.classList).not.toContain('vertical');
  });

  it('switches to vertical', async () => {
    fixture.componentInstance.orientation.set('vertical');
    await fixture.whenStable();

    const container = containerOf(fixture);

    expect(container.classList).toContain('vertical');
    expect(container.classList).not.toContain('horizontal');
  });

  it('keeps each button size when the group size is null', () => {
    const [first, second] = nativeButtonsOf(fixture);

    expect(first.classList).toContain('size-md');
    expect(second.classList).toContain('size-xl');
  });

  it('overrides every button size when the group size is set', async () => {
    fixture.componentInstance.size.set('sm');
    await fixture.whenStable();

    const [first, second] = nativeButtonsOf(fixture);

    expect(first.classList).toContain('size-sm');
    expect(second.classList).toContain('size-sm');
    expect(second.classList).not.toContain('size-xl');
  });

  it('overrides every button variant when the group variant is set', async () => {
    fixture.componentInstance.variant.set('secondary');
    await fixture.whenStable();

    const [first, second] = nativeButtonsOf(fixture);

    expect(first.classList).toContain('secondary');
    expect(second.classList).toContain('secondary');
  });

  it('removes the attached class when detached', async () => {
    fixture.componentInstance.attached.set(false);
    await fixture.whenStable();

    expect(containerOf(fixture).classList).not.toContain('attached');
  });

  it('disables every button when the group is disabled', async () => {
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();

    for (const button of nativeButtonsOf(fixture)) {
      expect(button.disabled).toBe(true);
    }
  });
});

describe('DasarButtonGroup theme defaults', () => {
  let fixture: ComponentFixture<ButtonGroupThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              buttonGroup: {
                orientation: 'vertical',
                size: 'sm',
              } satisfies NonNullable<DasarComponentConfig['buttonGroup']>,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGroupThemeHost);
    await fixture.whenStable();
  });

  it('reads orientation and size from the component config', () => {
    const container = containerOf(fixture);
    const [button] = nativeButtonsOf(fixture);

    expect(container.classList).toContain('vertical');
    expect(button.classList).toContain('size-sm');
  });
});

describe('DasarButtonGroup theme tokens', () => {
  let fixture: ComponentFixture<ButtonGroupTokensHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupTokensHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGroupTokensHost);
    await fixture.whenStable();
  });

  it('writes the button group tokens on the provider host', async () => {
    fixture.componentInstance.tokens.set({
      light: { buttonGroup: { gap: '20px', radius: '999px' } },
    });
    await fixture.whenStable();

    const host = fixture.nativeElement.querySelector('dasar-theme-provider') as HTMLElement;

    expect(host.style.getPropertyValue('--btn-group-gap')).toBe('20px');
    expect(host.style.getPropertyValue('--btn-group-radius')).toBe('999px');
  });
});

describe('DasarButtonGroup restores button inputs', () => {
  it('restores the original size when the group size returns to null', async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(ButtonGroupHost);
    await fixture.whenStable();

    fixture.componentInstance.size.set('sm');
    await fixture.whenStable();
    fixture.componentInstance.size.set(null);
    await fixture.whenStable();

    const [, second] = nativeButtonsOf(fixture);

    expect(second.classList).toContain('size-xl');
    expect(second.classList).not.toContain('size-sm');
  });
});
