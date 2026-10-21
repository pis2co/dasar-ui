import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeProviderComponent } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarCheckboxComponent } from './dasar-checkbox';
import { DasarThemeConfig } from '../../models/theme.model';

@Component({
  selector: 'test-checkbox-host',
  standalone: true,
  imports: [DasarCheckboxComponent],
  template: `<dasar-checkbox
    [label]="label()"
    [hint]="hint()"
    [size]="size()"
    [error]="error()"
    [disabled]="disabled()"
    [checked-value]="checkedValue()"
    [unchecked-value]="uncheckedValue()"
    [(value)]="value"
    (onUpdate)="updates.set([...updates(), $event])"
    >Extra</dasar-checkbox
  >`,
})
class CheckboxHost {
  label = signal('Accept');
  hint = signal('');
  size = signal<'sm' | 'md' | 'lg'>('md');
  error = signal(false);
  disabled = signal(false);
  checkedValue = signal<any>(true);
  uncheckedValue = signal<any>(false);
  value = signal<any>(false);
  updates = signal<any[]>([]);
}

@Component({
  selector: 'test-checkbox-ngmodel-host',
  standalone: true,
  imports: [DasarCheckboxComponent, FormsModule],
  template: `<dasar-checkbox label="Terms" [(ngModel)]="model" />`,
})
class CheckboxNgModelHost {
  model: any = false;
}

@Component({
  selector: 'test-checkbox-reactive-host',
  standalone: true,
  imports: [DasarCheckboxComponent, ReactiveFormsModule],
  template: `<dasar-checkbox label="News" [formControl]="control" />`,
})
class CheckboxReactiveHost {
  control = new FormControl(false);
}

@Component({
  selector: 'test-checkbox-theme-host',
  standalone: true,
  imports: [DasarCheckboxComponent],
  template: `<dasar-checkbox />`,
})
class CheckboxThemeHost {}

@Component({
  selector: 'test-checkbox-tokens-host',
  standalone: true,
  imports: [DasarThemeProviderComponent, DasarCheckboxComponent],
  template: `<dasar-theme-provider [tokenConfig]="tokens()">
    <dasar-checkbox label="Tokens" />
  </dasar-theme-provider>`,
})
class CheckboxTokensHost {
  tokens = signal<DasarThemeConfig['tokens']>({});
}

const hostOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('dasar-checkbox') as HTMLElement;
const nativeOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-checkbox-native') as HTMLInputElement;
const boxOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-checkbox-box') as HTMLElement;

describe('DasarCheckbox', () => {
  let fixture: ComponentFixture<CheckboxHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxHost],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is unchecked with the md class by default', () => {
    expect(nativeOf(fixture).checked).toBe(false);
    expect(boxOf(fixture).classList).not.toContain('checked');
    expect(hostOf(fixture).classList).toContain('md');
    expect(fixture.nativeElement.querySelector('.dasar-checkbox-label')?.textContent).toBe(
      'Accept',
    );
    expect(fixture.nativeElement.textContent).toContain('Extra');
  });

  it('toggles and emits the checked value on click', async () => {
    nativeOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(true);
    expect(fixture.componentInstance.updates()).toEqual([true]);
    expect(nativeOf(fixture).checked).toBe(true);
  });

  it('emits custom checked and unchecked values', async () => {
    fixture.componentInstance.checkedValue.set('Y');
    fixture.componentInstance.uncheckedValue.set('N');
    await fixture.whenStable();

    nativeOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe('Y');

    nativeOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe('N');
    expect(fixture.componentInstance.updates()).toEqual(['Y', 'N']);
  });

  it('reflects a value set by the parent', async () => {
    fixture.componentInstance.value.set(true);
    await fixture.whenStable();

    expect(nativeOf(fixture).checked).toBe(true);
    expect(boxOf(fixture).classList).toContain('checked');
  });

  it('blocks interaction when disabled', async () => {
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();

    nativeOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(false);
    expect(fixture.componentInstance.updates()).toEqual([]);
    expect(hostOf(fixture).classList).toContain('disabled');
  });

  it('shows error state and aria-invalid', async () => {
    fixture.componentInstance.error.set(true);
    fixture.componentInstance.hint.set('Required field');
    await fixture.whenStable();

    expect(hostOf(fixture).classList).toContain('error');
    expect(nativeOf(fixture).getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('.dasar-checkbox-hint')?.textContent).toContain(
      'Required field',
    );
    expect(fixture.nativeElement.querySelector('.dasar-checkbox-hint')?.classList).toContain(
      'error',
    );
    const hintId = (
      hostOf(fixture).querySelector('.dasar-checkbox-hint') as HTMLElement
    ).getAttribute('id');
    expect(nativeOf(fixture).getAttribute('aria-describedby')).toBe(hintId);
  });

  it('applies the lg size class', async () => {
    fixture.componentInstance.size.set('lg');
    await fixture.whenStable();

    expect(hostOf(fixture).classList).toContain('lg');
  });
});

describe('DasarCheckbox forms', () => {
  it('works with ngModel in both directions', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxNgModelHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckboxNgModelHost);
    await fixture.whenStable();

    const native = fixture.nativeElement.querySelector(
      '.dasar-checkbox-native',
    ) as HTMLInputElement;

    native.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.model).toBe(true);

    fixture.componentInstance.model = false;
    const ngModel = fixture.debugElement.query(By.directive(NgModel)).injector.get(NgModel);
    ngModel.control.setValue(false);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(native.checked).toBe(false);
  });

  it('respects a disabled reactive FormControl', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxReactiveHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckboxReactiveHost);
    await fixture.whenStable();

    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    await fixture.whenStable();

    const native = fixture.nativeElement.querySelector(
      '.dasar-checkbox-native',
    ) as HTMLInputElement;

    expect(native.disabled).toBe(true);

    native.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toBe(false);
  });
});

describe('DasarCheckbox theme defaults', () => {
  it('reads label, hint, size and disabled from the component config', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              checkbox: { label: 'Global', hint: 'Global hint', size: 'lg', disabled: true },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckboxThemeHost);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.dasar-checkbox-label')?.textContent).toBe(
      'Global',
    );
    expect(fixture.nativeElement.querySelector('.dasar-checkbox-hint')).not.toBeNull();
    expect(
      (fixture.nativeElement.querySelector('dasar-checkbox') as HTMLElement).classList,
    ).toContain('lg');
    expect(
      (fixture.nativeElement.querySelector('.dasar-checkbox-native') as HTMLInputElement).disabled,
    ).toBe(true);
  });
});

describe('DasarCheckbox theme tokens', () => {
  it('writes the checkbox tokens on the provider host', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxTokensHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckboxTokensHost);
    await fixture.whenStable();

    fixture.componentInstance.tokens.set({
      light: { checkbox: { checkedBg: 'red', groupGap: '20px' } },
    });
    await fixture.whenStable();

    const host = fixture.nativeElement.querySelector('dasar-theme-provider') as HTMLElement;

    expect(host.style.getPropertyValue('--dasar-checkbox-checked-bg')).toBe('red');
    expect(host.style.getPropertyValue('--dasar-checkbox-group-gap')).toBe('20px');
  });
});

@Component({
  selector: 'test-checkbox-indeterminate-host',
  standalone: true,
  imports: [DasarCheckboxComponent],
  template: `<dasar-checkbox
    label="Partial"
    [indeterminate]="indeterminate()"
    [(value)]="value"
  />`,
})
class CheckboxIndeterminateHost {
  indeterminate = signal(true);
  value = signal<any>(false);
}

describe('DasarCheckbox indeterminate', () => {
  let fixture: ComponentFixture<CheckboxIndeterminateHost>;
  let host: CheckboxIndeterminateHost;

  const input = () =>
    fixture.nativeElement.querySelector('.dasar-checkbox-native') as HTMLInputElement;
  const box = () => fixture.nativeElement.querySelector('.dasar-checkbox-box') as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxIndeterminateHost],
    }).compileComponents();
    fixture = TestBed.createComponent(CheckboxIndeterminateHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the mixed state with a dash instead of a check', () => {
    expect(input().indeterminate).toBe(true);
    expect(input().getAttribute('aria-checked')).toBe('mixed');
    expect(box().classList).toContain('indeterminate');
    expect(box().querySelector('dasar-icon')?.getAttribute('name')).toBe('minus');
  });

  it('goes back to the normal look when indeterminate is cleared', () => {
    host.indeterminate.set(false);
    fixture.detectChanges();

    expect(input().indeterminate).toBe(false);
    expect(input().getAttribute('aria-checked')).toBeNull();
    expect(box().classList).not.toContain('indeterminate');
    expect(box().querySelector('dasar-icon')).toBeNull();
  });

  it('still toggles the value from the unchecked state when clicked', () => {
    input().click();
    fixture.detectChanges();

    expect(host.value()).toBe(true);
  });
});

@Component({
  selector: 'test-checkbox-label-size-host',
  standalone: true,
  imports: [DasarCheckboxComponent],
  template: `<dasar-checkbox label="Label" [size]="size()" />`,
})
class CheckboxLabelSizeHost {
  size = signal<'sm' | 'md' | 'lg'>('md');
}

describe('DasarCheckbox label size', () => {
  let fixture: ComponentFixture<CheckboxLabelSizeHost>;

  const fontSize = () =>
    getComputedStyle(fixture.nativeElement.querySelector('.dasar-checkbox-label')).fontSize;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CheckboxLabelSizeHost] }).compileComponents();
    fixture = TestBed.createComponent(CheckboxLabelSizeHost);
    await fixture.whenStable();
  });

  it('follows the same font scale as the other components', async () => {
    fixture.componentInstance.size.set('sm');
    await fixture.whenStable();
    expect(fontSize()).toContain('--dasar-font-size-sm');

    fixture.componentInstance.size.set('md');
    await fixture.whenStable();
    expect(fontSize()).toContain('--dasar-font-size-base');

    fixture.componentInstance.size.set('lg');
    await fixture.whenStable();
    expect(fontSize()).toContain('--dasar-font-size-lg');
  });
});
