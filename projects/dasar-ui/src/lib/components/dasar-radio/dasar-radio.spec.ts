import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeProviderComponent } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarRadioComponent } from './dasar-radio';
import { DasarThemeConfig } from '../../models/theme.model';

@Component({
  selector: 'test-radio-host',
  standalone: true,
  imports: [DasarRadioComponent],
  template: `<dasar-radio
    [label]="label()"
    [hint]="hint()"
    [size]="size()"
    [error]="error()"
    [disabled]="disabled()"
    [checked-value]="checkedValue()"
    [(value)]="value"
    (onUpdate)="updates.set([...updates(), $event])"
    >Extra</dasar-radio
  >`,
})
class RadioHost {
  label = signal('Option');
  hint = signal('');
  size = signal<'sm' | 'md' | 'lg'>('md');
  error = signal(false);
  disabled = signal(false);
  checkedValue = signal<any>('a');
  value = signal<any>(null);
  updates = signal<any[]>([]);
}

@Component({
  selector: 'test-radio-shared-host',
  standalone: true,
  imports: [DasarRadioComponent, FormsModule],
  template: `
    <dasar-radio label="A" name="plan" checked-value="a" [(ngModel)]="choice" />
    <dasar-radio label="B" name="plan" checked-value="b" [(ngModel)]="choice" />
  `,
})
class RadioSharedHost {
  choice: any = null;
}

@Component({
  selector: 'test-radio-ngmodel-host',
  standalone: true,
  imports: [DasarRadioComponent, FormsModule],
  template: `<dasar-radio label="A" checked-value="a" [(ngModel)]="model" />`,
})
class RadioNgModelHost {
  model: any = null;
}

@Component({
  selector: 'test-radio-reactive-host',
  standalone: true,
  imports: [DasarRadioComponent, ReactiveFormsModule],
  template: `<dasar-radio label="A" checked-value="a" [formControl]="control" />`,
})
class RadioReactiveHost {
  control = new FormControl(null);
}

@Component({
  selector: 'test-radio-theme-host',
  standalone: true,
  imports: [DasarRadioComponent],
  template: `<dasar-radio />`,
})
class RadioThemeHost {}

@Component({
  selector: 'test-radio-tokens-host',
  standalone: true,
  imports: [DasarThemeProviderComponent, DasarRadioComponent],
  template: `<dasar-theme-provider [tokenConfig]="tokens()">
    <dasar-radio label="Tokens" />
  </dasar-theme-provider>`,
})
class RadioTokensHost {
  tokens = signal<DasarThemeConfig['tokens']>({});
}

const hostOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('dasar-radio') as HTMLElement;
const nativeOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-radio-native') as HTMLInputElement;
const circleOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-radio-circle') as HTMLElement;

describe('DasarRadio', () => {
  let fixture: ComponentFixture<RadioHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is unchecked with the md class by default', () => {
    expect(nativeOf(fixture).checked).toBe(false);
    expect(circleOf(fixture).classList).not.toContain('checked');
    expect(hostOf(fixture).classList).toContain('md');
    expect(fixture.nativeElement.querySelector('.dasar-radio-label')?.textContent).toBe('Option');
    expect(fixture.nativeElement.textContent).toContain('Extra');
  });

  it('selects and emits the checked value on click', async () => {
    nativeOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe('a');
    expect(fixture.componentInstance.updates()).toEqual(['a']);
    expect(nativeOf(fixture).checked).toBe(true);
  });

  it('does nothing when the already selected radio is clicked', async () => {
    nativeOf(fixture).click();
    await fixture.whenStable();
    nativeOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.updates()).toEqual(['a']);
    expect(nativeOf(fixture).checked).toBe(true);
  });

  it('reflects a value set by the parent', async () => {
    fixture.componentInstance.value.set('a');
    await fixture.whenStable();

    expect(nativeOf(fixture).checked).toBe(true);

    fixture.componentInstance.value.set('other');
    await fixture.whenStable();

    expect(nativeOf(fixture).checked).toBe(false);
    expect(circleOf(fixture).classList).not.toContain('checked');
  });

  it('blocks interaction when disabled', async () => {
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();

    nativeOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBeNull();
    expect(fixture.componentInstance.updates()).toEqual([]);
    expect(hostOf(fixture).classList).toContain('disabled');
  });

  it('shows error state and aria-invalid', async () => {
    fixture.componentInstance.error.set(true);
    fixture.componentInstance.hint.set('Choose one');
    await fixture.whenStable();

    expect(hostOf(fixture).classList).toContain('error');
    expect(nativeOf(fixture).getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('.dasar-radio-hint')?.textContent).toContain(
      'Choose one',
    );
    expect(fixture.nativeElement.querySelector('.dasar-radio-hint')?.classList).toContain('error');
    const hintId = (hostOf(fixture).querySelector('.dasar-radio-hint') as HTMLElement).getAttribute(
      'id',
    );
    expect(nativeOf(fixture).getAttribute('aria-describedby')).toBe(hintId);
  });

  it('applies the lg size class', async () => {
    fixture.componentInstance.size.set('lg');
    await fixture.whenStable();

    expect(hostOf(fixture).classList).toContain('lg');
  });
});

describe('DasarRadio shared model', () => {
  it('keeps a single selection across standalone radios', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioSharedHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioSharedHost);
    await fixture.whenStable();

    const natives = Array.from(
      fixture.nativeElement.querySelectorAll('.dasar-radio-native'),
    ) as HTMLInputElement[];

    natives[0].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.choice).toBe('a');

    natives[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.choice).toBe('b');
    expect(natives[0].checked).toBe(false);
    expect(natives[1].checked).toBe(true);
  });
});

describe('DasarRadio forms', () => {
  it('updates the model on click and the view through the control', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioNgModelHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioNgModelHost);
    await fixture.whenStable();

    const native = fixture.nativeElement.querySelector('.dasar-radio-native') as HTMLInputElement;

    native.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.model).toBe('a');

    const ngModel = fixture.debugElement.query(By.directive(NgModel)).injector.get(NgModel);
    ngModel.control.setValue(null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(native.checked).toBe(false);
  });

  it('respects a disabled reactive FormControl', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioReactiveHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioReactiveHost);
    await fixture.whenStable();

    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    await fixture.whenStable();

    const native = fixture.nativeElement.querySelector('.dasar-radio-native') as HTMLInputElement;

    expect(native.disabled).toBe(true);

    native.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toBeNull();
  });
});

describe('DasarRadio theme defaults', () => {
  it('reads label, hint, size and disabled from the component config', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              radio: { label: 'Global', hint: 'Global hint', size: 'lg', disabled: true },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioThemeHost);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.dasar-radio-label')?.textContent).toBe('Global');
    expect(fixture.nativeElement.querySelector('.dasar-radio-hint')).not.toBeNull();
    expect((fixture.nativeElement.querySelector('dasar-radio') as HTMLElement).classList).toContain(
      'lg',
    );
    expect(
      (fixture.nativeElement.querySelector('.dasar-radio-native') as HTMLInputElement).disabled,
    ).toBe(true);
  });
});

describe('DasarRadio theme tokens', () => {
  it('writes the radio tokens on the provider host', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioTokensHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioTokensHost);
    await fixture.whenStable();

    fixture.componentInstance.tokens.set({
      light: { radio: { checkedColor: 'red', groupGap: '20px' } },
    });
    await fixture.whenStable();

    const host = fixture.nativeElement.querySelector('dasar-theme-provider') as HTMLElement;

    expect(host.style.getPropertyValue('--dasar-radio-checked-color')).toBe('red');
    expect(host.style.getPropertyValue('--dasar-radio-group-gap')).toBe('20px');
  });
});
