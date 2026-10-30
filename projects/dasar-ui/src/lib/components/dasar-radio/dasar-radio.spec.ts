import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgpRadioGroup, NgpRadioIndicator, NgpRadioItem } from 'ng-primitives/radio';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeProviderComponent } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarRadio, DasarRadioComponent } from './dasar-radio';
import { DasarRadioGroupComponent } from '../dasar-radio-group/dasar-radio-group';
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

@Component({
  selector: 'test-radio-label-size-host',
  standalone: true,
  imports: [DasarRadioComponent],
  template: `<dasar-radio label="Label" [size]="size()" />`,
})
class RadioLabelSizeHost {
  size = signal<'sm' | 'md' | 'lg'>('md');
}

describe('DasarRadio label size', () => {
  let fixture: ComponentFixture<RadioLabelSizeHost>;

  const fontSize = () =>
    getComputedStyle(fixture.nativeElement.querySelector('.dasar-radio-label')).fontSize;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RadioLabelSizeHost] }).compileComponents();
    fixture = TestBed.createComponent(RadioLabelSizeHost);
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

@Component({
  selector: 'test-radio-grouped-host',
  standalone: true,
  imports: [DasarRadioComponent, NgpRadioGroup],
  template: `
    <div
      ngpRadioGroup
      [ngpRadioGroupValue]="groupValue()"
      (ngpRadioGroupValueChange)="groupValue.set($event)"
    >
      <dasar-radio label="A" checked-value="a" />
      <dasar-radio label="B" checked-value="b" [disabled]="bDisabled()" />
    </div>
  `,
})
class RadioGroupedTestHost {
  groupValue = signal<any>('a');
  bDisabled = signal(false);
}

describe('DasarRadio dual-path grouped vs standalone', () => {
  it('when groupState is null (standalone, default), does NOT host NgpRadioItem and keeps native radio input', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioHost);
    await fixture.whenStable();

    const ngpItemDebugEl = fixture.debugElement.query(By.directive(NgpRadioItem));
    expect(ngpItemDebugEl).toBeNull();

    const nativeInput = fixture.nativeElement.querySelector(
      'input.dasar-radio-native',
    ) as HTMLInputElement;
    expect(nativeInput).not.toBeNull();
    expect(nativeInput.tagName.toLowerCase()).toBe('input');
    expect(nativeInput.type).toBe('radio');
  });

  it('when groupState is set inside an NgpRadioGroup, hosts NgpRadioItem with value and disabled', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupedTestHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioGroupedTestHost);
    await fixture.whenStable();

    const radios = fixture.debugElement.queryAll(By.directive(DasarRadio));
    const radioA = radios[0].componentInstance as DasarRadio;
    const radioB = radios[1].componentInstance as DasarRadio;

    // Simulate groupState propagation
    radioA.applyGroupState(
      { checked: true, disabled: false, error: false, size: 'md', name: 'group-1' },
      () => {},
    );
    radioB.applyGroupState(
      { checked: false, disabled: true, error: false, size: 'md', name: 'group-1' },
      () => {},
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const ngpItems = fixture.debugElement.queryAll(By.directive(NgpRadioItem));
    expect(ngpItems.length).toBe(2);

    const itemA = ngpItems[0].injector.get(NgpRadioItem);
    const itemB = ngpItems[1].injector.get(NgpRadioItem);
    expect(itemA.value()).toBe('a');
    expect(itemA.disabled()).toBe(false);
    expect(itemB.value()).toBe('b');
    expect(itemB.disabled()).toBe(true);

    const indicatorDebugEl = fixture.debugElement.query(By.directive(NgpRadioIndicator));
    expect(indicatorDebugEl).not.toBeNull();
  });

  it('resolves NgpRadioGroup via DI in real DasarRadioGroup with DasarRadio children, syncing selection and compareWith', async () => {
    @Component({
      selector: 'test-real-radio-group-integration',
      standalone: true,
      imports: [DasarRadioGroupComponent, DasarRadioComponent],
      template: `
        <dasar-radio-group
          [(value)]="selectedValue"
          [value-field]="'id'"
          (onUpdate)="updates.set([...updates(), $event])"
        >
          <dasar-radio label="Option 1" [checked-value]="item1" />
          <dasar-radio label="Option 2" [checked-value]="item2" />
        </dasar-radio-group>
      `,
    })
    class RealRadioGroupIntegrationHost {
      item1 = { id: '1', title: 'One' };
      item2 = { id: '2', title: 'Two' };
      selectedValue = signal<any>({ id: '1' });
      updates = signal<any[]>([]);
    }

    await TestBed.configureTestingModule({
      imports: [RealRadioGroupIntegrationHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RealRadioGroupIntegrationHost);
    await fixture.whenStable();

    // Verify NgpRadioGroup is hosted on the group
    const groupDebugEl = fixture.debugElement.query(By.directive(NgpRadioGroup));
    expect(groupDebugEl).not.toBeNull();
    const ngpGroup = groupDebugEl.injector.get(NgpRadioGroup);
    expect(ngpGroup.value()).toEqual({ id: '1' });

    // Verify both child radios resolved NgpRadioItem via DI (no NG0201 crash!)
    const ngpItems = fixture.debugElement.queryAll(By.directive(NgpRadioItem));
    expect(ngpItems.length).toBe(2);

    const button1 = ngpItems[0].nativeElement as HTMLButtonElement;
    const button2 = ngpItems[1].nativeElement as HTMLButtonElement;

    // Check ARIA attributes and name attribute
    expect(button1.getAttribute('role')).toBe('radio');
    expect(button1.getAttribute('aria-checked')).toBe('true');
    expect(button2.getAttribute('aria-checked')).toBe('false');
    expect(button1.getAttribute('name')).toBeTruthy();
    expect(button1.getAttribute('name')).toBe(button2.getAttribute('name'));

    // Trigger focus on button2 (testing roving focus / arrow selection)
    button2.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.selectedValue()).toEqual({ id: '2', title: 'Two' });
    expect(fixture.componentInstance.updates()).toEqual([{ id: '2', title: 'Two' }]);
    expect(button1.getAttribute('aria-checked')).toBe('false');
    expect(button2.getAttribute('aria-checked')).toBe('true');

    // Trigger click on button1
    button1.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.selectedValue()).toEqual({ id: '1', title: 'One' });
    expect(fixture.componentInstance.updates()).toEqual([
      { id: '2', title: 'Two' },
      { id: '1', title: 'One' },
    ]);
  });
});
