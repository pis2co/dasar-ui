import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarIcon } from '../dasar-icon/dasar-icon';
import { switchMap } from '../../services/theme.service';
import { DasarSwitch, DasarSwitchComponent, DasarSwitchSizeType } from './dasar-switch';

@Component({
  selector: 'test-switch-host',
  standalone: true,
  imports: [DasarSwitchComponent],
  template: `<dasar-switch
    [value]="value()"
    (valueChange)="value.set($event)"
    (onUpdate)="updates.set([...updates(), $event])"
    [disabled]="disabled()"
    [error]="error()"
    [hint]="hint()"
    [size]="size()"
    [checked-value]="cv()"
    [unchecked-value]="ucv()"
    [checked-icon-name]="ci()"
    [unchecked-icon-name]="ui()"
    [label]="label()"
  />`,
})
class SwitchHost {
  value = signal<any>(false);
  disabled = signal(false);
  error = signal(false);
  hint = signal('');
  size = signal<DasarSwitchSizeType>('md');
  cv = signal<any>(true);
  ucv = signal<any>(false);
  ci = signal('');
  ui = signal('');
  label = signal('');
  updates = signal<any[]>([]);
}

@Component({
  selector: 'test-switch-default-host',
  standalone: true,
  imports: [DasarSwitchComponent],
  template: `<dasar-switch [default-value]="true" />`,
})
class SwitchDefaultHost {}

@Component({
  selector: 'test-switch-model-host',
  standalone: true,
  imports: [FormsModule, DasarSwitchComponent],
  template: `<dasar-switch [ngModel]="model()" (ngModelChange)="model.set($event)" />`,
})
class SwitchModelHost {
  model = signal<any>(false);
}

@Component({
  selector: 'test-switch-reactive-host',
  standalone: true,
  imports: [ReactiveFormsModule, DasarSwitchComponent],
  template: `<dasar-switch [formControl]="ctrl" />`,
})
class SwitchReactiveHost {
  ctrl = new FormControl(false);
}

@Component({
  selector: 'test-switch-slots-host',
  standalone: true,
  imports: [DasarSwitchComponent],
  template: `<dasar-switch [value]="value()" (valueChange)="value.set($event)">
    <span checked-slot>ON</span>
    <span unchecked-slot>OFF</span>
    <span checked-icon-slot>CI</span>
    <span unchecked-icon-slot>UI</span>
  </dasar-switch>`,
})
class SwitchSlotsHost {
  value = signal(false);
}

@Component({
  selector: 'test-switch-icon-slot-host',
  standalone: true,
  imports: [DasarSwitchComponent],
  template: `<dasar-switch
    [value]="value()"
    (valueChange)="value.set($event)"
    checked-icon-name="check"
  >
    <span icon-slot>IC</span>
  </dasar-switch>`,
})
class SwitchIconSlotHost {
  value = signal(false);
}

@Component({
  selector: 'test-switch-theme-host',
  standalone: true,
  imports: [DasarSwitchComponent],
  template: `<dasar-switch />`,
})
class SwitchThemeHost {}

const switchOf = (fixture: ComponentFixture<unknown>) =>
  fixture.debugElement.query(By.directive(DasarSwitch)).componentInstance as DasarSwitch;

const trackOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-switch-track') as HTMLElement;

const iconsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-switch-thumb dasar-icon'));

const hiddenOf = (text: string, fixture: ComponentFixture<unknown>) => {
  const els = Array.from(
    fixture.nativeElement.querySelectorAll(
      '.dasar-switch-thumb-icon, .dasar-switch-content-checked, .dasar-switch-content-unchecked',
    ),
  ) as HTMLElement[];
  return els.find((el) => el.textContent?.trim() === text);
};

describe('DasarSwitch', () => {
  let fixture: ComponentFixture<SwitchHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchHost);
    await fixture.whenStable();
  });

  it('creates unchecked with switch off semantics', () => {
    expect(switchOf(fixture).isChecked).toBe(false);
    expect(trackOf(fixture).getAttribute('aria-checked')).toBe('false');
    expect(trackOf(fixture).classList).not.toContain('checked');
  });

  it('toggles on click and emits the new value', async () => {
    trackOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(true);
    expect(fixture.componentInstance.updates()).toEqual([true]);
    expect(trackOf(fixture).classList).toContain('checked');
  });

  it('toggles back off on a second click', async () => {
    trackOf(fixture).click();
    await fixture.whenStable();
    trackOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(false);
    expect(fixture.componentInstance.updates()).toEqual([true, false]);
  });

  it('uses custom checked and unchecked values', async () => {
    fixture.componentInstance.cv.set('yes');
    fixture.componentInstance.ucv.set('no');
    fixture.componentInstance.value.set('no');
    await fixture.whenStable();

    trackOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.updates()).toEqual(['yes']);
  });

  it('checks silently on external value change', async () => {
    fixture.componentInstance.value.set(true);
    await fixture.whenStable();

    expect(switchOf(fixture).isChecked).toBe(true);
    expect(fixture.componentInstance.updates()).toEqual([]);
  });

  it('blocks toggles when disabled', async () => {
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();
    fixture.componentInstance.updates.set([]);

    trackOf(fixture).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(false);
    expect(fixture.componentInstance.updates()).toEqual([]);
    expect((trackOf(fixture) as HTMLButtonElement).disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('.dasar-switch').classList).toContain('disabled');
  });

  it('applies error styling and aria-invalid', async () => {
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.dasar-switch').classList).toContain('error');
    expect(trackOf(fixture).getAttribute('aria-invalid')).toBe('true');
  });

  it('renders the hint and marks it as an error', async () => {
    fixture.componentInstance.hint.set('Extra verification step.');
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();

    const hint = fixture.nativeElement.querySelector('.dasar-switch-hint') as HTMLElement;
    expect(hint?.textContent).toContain('Extra verification step.');
    expect(hint.classList).toContain('error');
    expect(trackOf(fixture).getAttribute('aria-describedby')).toBe(hint.getAttribute('id'));
  });

  it('reads hint from the component config', () => {
    expect(switchOf(fixture).hint).toBe('');
  });

  it('toggles on Space and Enter', async () => {
    const track = trackOf(fixture);
    track.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await fixture.whenStable();
    expect(fixture.componentInstance.value()).toBe(true);

    track.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await fixture.whenStable();
    expect(fixture.componentInstance.value()).toBe(false);
  });

  it('applies the size class', async () => {
    fixture.componentInstance.size.set('lg');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.dasar-switch').classList).toContain('lg');
  });

  it('renders the checked icon when on and the unchecked icon when off', async () => {
    fixture.componentInstance.ci.set('check');
    fixture.componentInstance.ui.set('x');
    await fixture.whenStable();
    expect(iconsOf(fixture).length).toBe(1);

    fixture.componentInstance.value.set(true);
    await fixture.whenStable();
    expect(iconsOf(fixture).length).toBe(1);
  });

  it('renders no icon without a name or slot', () => {
    expect(iconsOf(fixture).length).toBe(0);
  });

  it('renders the label and sets aria-label', async () => {
    fixture.componentInstance.label.set('Wifi');
    await fixture.whenStable();

    expect(
      (fixture.nativeElement.querySelector('.dasar-switch-label') as HTMLElement)?.textContent,
    ).toBe('Wifi');
    expect(trackOf(fixture).getAttribute('aria-label')).toBe('Wifi');
  });
});

describe('DasarSwitch default value', () => {
  let fixture: ComponentFixture<SwitchDefaultHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchDefaultHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchDefaultHost);
    await fixture.whenStable();
  });

  it('starts checked from default-value', () => {
    expect(switchOf(fixture).isChecked).toBe(true);
  });
});

describe('DasarSwitch ngModel', () => {
  let fixture: ComponentFixture<SwitchModelHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchModelHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchModelHost);
    await fixture.whenStable();
  });

  it('binds both ways', async () => {
    fixture.componentInstance.model.set(true);
    await fixture.whenStable();
    expect(switchOf(fixture).isChecked).toBe(true);

    trackOf(fixture).click();
    await fixture.whenStable();
    expect(fixture.componentInstance.model()).toBe(false);
  });
});

describe('DasarSwitch reactive forms', () => {
  let fixture: ComponentFixture<SwitchReactiveHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchReactiveHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchReactiveHost);
    await fixture.whenStable();
  });

  it('follows the control value and disabled state', async () => {
    fixture.componentInstance.ctrl.setValue(true);
    await fixture.whenStable();
    expect(switchOf(fixture).isChecked).toBe(true);

    fixture.componentInstance.ctrl.disable();
    await fixture.whenStable();
    expect(switchOf(fixture).isDisabled).toBe(true);
    expect((trackOf(fixture) as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('DasarSwitch slots', () => {
  let fixture: ComponentFixture<SwitchSlotsHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchSlotsHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchSlotsHost);
    await fixture.whenStable();
  });

  it('shows OFF when unchecked and ON when checked', async () => {
    expect(hiddenOf('OFF', fixture)?.classList.contains('hidden')).toBe(false);
    expect(hiddenOf('ON', fixture)?.classList.contains('hidden')).toBe(true);

    trackOf(fixture).click();
    await fixture.whenStable();

    expect(hiddenOf('ON', fixture)?.classList.contains('hidden')).toBe(false);
    expect(hiddenOf('OFF', fixture)?.classList.contains('hidden')).toBe(true);
  });

  it('prefers state icons over names', async () => {
    expect(hiddenOf('UI', fixture)?.classList.contains('hidden')).toBe(false);

    trackOf(fixture).click();
    await fixture.whenStable();

    expect(hiddenOf('CI', fixture)?.classList.contains('hidden')).toBe(false);
    expect(hiddenOf('UI', fixture)?.classList.contains('hidden')).toBe(true);
  });
});

describe('DasarSwitch icon slot', () => {
  let fixture: ComponentFixture<SwitchIconSlotHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchIconSlotHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchIconSlotHost);
    await fixture.whenStable();
  });

  it('shows the shared icon in both states and hides the named icon', async () => {
    expect(hiddenOf('IC', fixture)?.classList.contains('hidden')).toBe(false);
    expect(iconsOf(fixture).length).toBe(0);

    trackOf(fixture).click();
    await fixture.whenStable();

    expect(hiddenOf('IC', fixture)?.classList.contains('hidden')).toBe(false);
    expect(iconsOf(fixture).length).toBe(0);
  });
});

describe('DasarSwitch theme defaults', () => {
  let fixture: ComponentFixture<SwitchThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              switch: { size: 'lg', checkedIconName: 'check' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchThemeHost);
    await fixture.whenStable();
  });

  it('reads switch config from the component config', () => {
    const sw = switchOf(fixture);
    expect(sw.size).toBe('lg');
    expect(sw.checkedIconName).toBe('check');
  });
});

describe('switchMap tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('maps switch tokens to css variables', () => {
    expect(switchMap['gap']).toBe('--switch-gap');
    expect(switchMap['radius']).toBe('--switch-radius');
    expect(switchMap['thumbRadius']).toBe('--switch-thumb-radius');
    expect(switchMap['heightSm']).toBe('--switch-height-sm');
    expect(switchMap['heightMd']).toBe('--switch-height-md');
    expect(switchMap['heightLg']).toBe('--switch-height-lg');
    expect(switchMap['minWidthSm']).toBe('--switch-min-width-sm');
    expect(switchMap['minWidthMd']).toBe('--switch-min-width-md');
    expect(switchMap['minWidthLg']).toBe('--switch-min-width-lg');
    expect(switchMap['trackBg']).toBe('--switch-track-bg');
    expect(switchMap['trackCheckedBg']).toBe('--switch-track-checked-bg');
    expect(switchMap['thumbBg']).toBe('--switch-thumb-bg');
    expect(switchMap['thumbIconColor']).toBe('--switch-thumb-icon-color');
    expect(switchMap['thumbIconCheckedColor']).toBe('--switch-thumb-icon-checked-color');
    expect(switchMap['contentColor']).toBe('--switch-content-color');
    expect(switchMap['contentFontSize']).toBe('--switch-content-font-size');
    expect(switchMap['focusColor']).toBe('--switch-focus-color');
    expect(switchMap['disabledOpacity']).toBe('--switch-disabled-opacity');
    expect(switchMap['labelColor']).toBe('--switch-label-color');
    expect(switchMap['labelFontSize']).toBe('--switch-label-font-size');
    expect(switchMap['errorColor']).toBe('--switch-error-color');
    expect(switchMap['hintGap']).toBe('--switch-hint-gap');
    expect(switchMap['hintColor']).toBe('--switch-hint-color');
    expect(switchMap['hintFontSize']).toBe('--switch-hint-font-size');
    expect(switchMap['hintErrorColor']).toBe('--switch-hint-error-color');
  });
});
