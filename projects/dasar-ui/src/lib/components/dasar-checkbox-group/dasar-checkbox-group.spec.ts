import { Component, signal, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  DasarCheckbox,
  DasarCheckboxAppearanceType,
  DasarCheckboxComponent,
} from '../dasar-checkbox/dasar-checkbox';
import { DasarCheckboxGroup, DasarCheckboxGroupComponent } from './dasar-checkbox-group';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';

@Component({
  selector: 'test-checkbox-group-host',
  standalone: true,
  imports: [DasarCheckboxGroupComponent, DasarCheckboxComponent],
  template: `<dasar-checkbox-group
    [(value)]="value"
    [disabled]="disabled()"
    [error]="error()"
    [hint]="hint()"
    [size]="size()"
    [value-field]="valueField()"
    (onUpdate)="updates.set([...updates(), $event])"
    (valueChange)="valueChanges.set([...valueChanges(), $event])"
  >
    <dasar-checkbox
      label="A"
      [checked-value]="'a'"
      (onUpdate)="childUpdates.set(childUpdates() + 1)"
    />
    <dasar-checkbox label="B" [checked-value]="'b'" [disabled]="childDisabled()" />
    <dasar-checkbox label="C" [checked-value]="'c'" />
  </dasar-checkbox-group>`,
})
class CheckboxGroupHost {
  value = signal<any[]>([]);
  disabled = signal(false);
  error = signal(false);
  hint = signal('');
  size = signal<'sm' | 'md' | 'lg' | null>(null);
  valueField = signal<string | null>(null);
  updates = signal<any[][]>([]);
  valueChanges = signal<any[][]>([]);
  childDisabled = signal(false);
  childUpdates = signal(0);
}

@Component({
  selector: 'test-checkbox-group-object-host',
  standalone: true,
  imports: [DasarCheckboxGroupComponent, DasarCheckboxComponent],
  template: `<dasar-checkbox-group [(value)]="value" value-field="id">
    <dasar-checkbox label="One" [checked-value]="{ id: 1, name: 'One' }" />
    <dasar-checkbox label="Two" [checked-value]="{ id: 2, name: 'Two' }" />
  </dasar-checkbox-group>`,
})
class CheckboxGroupObjectHost {
  value = signal<any[]>([{ id: 1 }]);
}

@Component({
  selector: 'test-checkbox-group-ngmodel-host',
  standalone: true,
  imports: [DasarCheckboxGroupComponent, DasarCheckboxComponent, FormsModule],
  template: `<dasar-checkbox-group [(ngModel)]="model">
    <dasar-checkbox label="A" [checked-value]="'a'" />
    <dasar-checkbox label="B" [checked-value]="'b'" />
  </dasar-checkbox-group>`,
})
class CheckboxGroupNgModelHost {
  model: any[] = ['a'];
}

@Component({
  selector: 'test-checkbox-group-dynamic-host',
  standalone: true,
  imports: [DasarCheckboxGroupComponent, DasarCheckboxComponent],
  template: `<dasar-checkbox-group [(value)]="value">
    @for (item of items(); track item) {
      <dasar-checkbox [label]="item" [checked-value]="item" />
    }
  </dasar-checkbox-group>`,
})
class CheckboxGroupDynamicHost {
  items = signal(['a', 'b']);
  value = signal<any[]>([]);
}

const nativesOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(
    fixture.nativeElement.querySelectorAll('.dasar-checkbox-native'),
  ) as HTMLButtonElement[];
const clickNative = async (fixture: ComponentFixture<unknown>, index: number) => {
  nativesOf(fixture)[index].click();
  await fixture.whenStable();
};

describe('DasarCheckboxGroup', () => {
  let fixture: ComponentFixture<CheckboxGroupHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupHost],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxGroupHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('checks children from the initial value', async () => {
    fixture.componentInstance.value.set(['a', 'c']);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives[0].getAttribute('aria-checked')).toBe('true');
    expect(natives[1].getAttribute('aria-checked')).toBe('false');
    expect(natives[2].getAttribute('aria-checked')).toBe('true');
  });

  it('appends the checked value and emits onUpdate and valueChange', async () => {
    await clickNative(fixture, 0);

    expect(fixture.componentInstance.value()).toEqual(['a']);
    expect(fixture.componentInstance.updates()).toEqual([['a']]);
    expect(fixture.componentInstance.valueChanges()).toEqual([['a']]);
    expect(nativesOf(fixture)[0].getAttribute('aria-checked')).toBe('true');
  });

  it('removes the value when an already checked child is clicked', async () => {
    fixture.componentInstance.value.set(['a', 'b']);
    await fixture.whenStable();
    await clickNative(fixture, 0);

    expect(fixture.componentInstance.value()).toEqual(['b']);
  });

  it('does not fire the child onUpdate inside a group', async () => {
    await clickNative(fixture, 0);

    expect(fixture.componentInstance.childUpdates()).toBe(0);
    expect(fixture.componentInstance.updates().length).toBe(1);
  });

  it('disables every child when the group is disabled', async () => {
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives.every((native) => native.disabled)).toBe(true);

    await clickNative(fixture, 0);

    expect(fixture.componentInstance.value()).toEqual([]);
  });

  it('keeps a disabled child disabled when the group is enabled', async () => {
    fixture.componentInstance.childDisabled.set(true);
    await fixture.whenStable();

    expect(nativesOf(fixture)[1].disabled).toBe(true);
    expect(nativesOf(fixture)[0].disabled).toBe(false);
  });

  it('overrides child sizes', async () => {
    fixture.componentInstance.size.set('lg');
    await fixture.whenStable();

    const hosts = fixture.nativeElement.querySelectorAll('dasar-checkbox');

    expect(Array.from(hosts).every((host) => (host as HTMLElement).classList.contains('lg'))).toBe(
      true,
    );
  });

  it('renders the group hint and error state', async () => {
    fixture.componentInstance.hint.set('Pick at least one');
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();

    expect(
      fixture.nativeElement.querySelector('.dasar-checkbox-group-hint')?.textContent,
    ).toContain('Pick at least one');
    expect(fixture.nativeElement.querySelector('.dasar-checkbox-group-hint')?.classList).toContain(
      'error',
    );
    expect(
      (fixture.nativeElement.querySelector('dasar-checkbox-group') as HTMLElement).getAttribute(
        'aria-describedby',
      ),
    ).toBe(
      (
        fixture.nativeElement.querySelector('.dasar-checkbox-group-hint') as HTMLElement
      ).getAttribute('id'),
    );
    expect(
      (fixture.nativeElement.querySelector('dasar-checkbox-group') as HTMLElement).classList,
    ).toContain('error');
  });
});

describe('DasarCheckboxGroup with objects', () => {
  it('matches by value-field and removes by key', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupObjectHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckboxGroupObjectHost);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives[0].getAttribute('aria-checked')).toBe('true');
    expect(natives[1].getAttribute('aria-checked')).toBe('false');

    natives[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toEqual([{ id: 1 }, { id: 2, name: 'Two' }]);

    natives[0].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toEqual([{ id: 2, name: 'Two' }]);
  });
});

describe('DasarCheckboxGroup forms', () => {
  it('binds an array through ngModel', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupNgModelHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckboxGroupNgModelHost);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives[0].getAttribute('aria-checked')).toBe('true');

    natives[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.model).toEqual(['a', 'b']);
  });
});

describe('DasarCheckboxGroup dynamic children', () => {
  it('applies state to children added later', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupDynamicHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckboxGroupDynamicHost);
    await fixture.whenStable();

    fixture.componentInstance.value.set(['b']);
    await fixture.whenStable();

    fixture.componentInstance.items.set(['a', 'b', 'c']);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives.length).toBe(3);
    expect(natives[1].getAttribute('aria-checked')).toBe('true');

    natives[2].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toEqual(['b', 'c']);
  });
});

describe('DasarCheckboxGroup applyGroupState and regression coverage', () => {
  @Component({
    selector: 'test-checkbox-group-regression-host',
    standalone: true,
    imports: [DasarCheckboxGroupComponent, DasarCheckboxComponent],
    template: `
      <dasar-checkbox-group
        [(value)]="value"
        [disabled]="disabled()"
        [error]="error()"
        [size]="size()"
        (valueChange)="valueChangeEvents.set([...valueChangeEvents(), $event])"
        (onUpdate)="updateEvents.set([...updateEvents(), $event])"
      >
        <dasar-checkbox label="Option 1" checked-value="opt1" />
        <dasar-checkbox label="Option 2" checked-value="opt2" [disabled]="opt2Disabled()" />
        <dasar-checkbox label="Option 3" checked-value="opt3" />
      </dasar-checkbox-group>
    `,
  })
  class CheckboxGroupRegressionHost {
    group = viewChildren(DasarCheckboxGroup);
    checkboxes = viewChildren(DasarCheckbox);
    value = signal<string[]>(['opt1']);
    disabled = signal(false);
    error = signal(false);
    size = signal<'sm' | 'md' | 'lg' | null>(null);
    opt2Disabled = signal(false);
    valueChangeEvents = signal<string[][]>([]);
    updateEvents = signal<string[][]>([]);
  }

  let fixture: ComponentFixture<CheckboxGroupRegressionHost>;
  let host: CheckboxGroupRegressionHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupRegressionHost],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxGroupRegressionHost);
    host = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('correctly propagates initial group value, disabled, error, and size to child checkboxes via applyGroupState', () => {
    const children = host.checkboxes();
    expect(children.length).toBe(3);

    // Initial value is ['opt1'] -> opt1 should be checked, opt2 and opt3 unchecked
    expect(children[0].isChecked).toBe(true);
    expect(children[1].isChecked).toBe(false);
    expect(children[2].isChecked).toBe(false);

    // All should have error=false, disabled=false, default size
    for (const child of children) {
      expect(child.hasError).toBe(false);
      expect(child.isDisabled).toBe(false);
    }
  });

  it('propagates size changes from group to all child checkboxes', async () => {
    host.size.set('lg');
    await fixture.whenStable();

    const children = host.checkboxes();
    for (const child of children) {
      expect(child.currentSize).toBe('lg');
    }

    const hostEls = fixture.nativeElement.querySelectorAll('dasar-checkbox');
    for (const el of Array.from(hostEls)) {
      expect((el as HTMLElement).classList.contains('lg')).toBe(true);
    }
  });

  it('propagates error state from group to all child checkboxes', async () => {
    host.error.set(true);
    await fixture.whenStable();

    const children = host.checkboxes();
    for (const child of children) {
      expect(child.hasError).toBe(true);
    }

    const hostEls = fixture.nativeElement.querySelectorAll('dasar-checkbox');
    for (const el of Array.from(hostEls)) {
      expect((el as HTMLElement).classList.contains('error')).toBe(true);
    }
  });

  it('group-level disabled disables all children regardless of individual child disabled state', async () => {
    // opt2 has opt2Disabled=false initially, set to true to test individual child
    host.opt2Disabled.set(true);
    await fixture.whenStable();

    const children = host.checkboxes();
    expect(children[0].isDisabled).toBe(false);
    expect(children[1].isDisabled).toBe(true);
    expect(children[2].isDisabled).toBe(false);

    // Now set group-level disabled to true
    host.disabled.set(true);
    await fixture.whenStable();

    // ALL children must now be disabled
    for (const child of children) {
      expect(child.isDisabled).toBe(true);
    }

    const groupEl = fixture.nativeElement.querySelector('dasar-checkbox-group') as HTMLElement;
    expect(groupEl.classList).toContain('disabled');

    // Clicking disabled children should not mutate group value or emit events
    const natives = nativesOf(fixture);
    natives[0].click();
    natives[2].click();
    await fixture.whenStable();

    expect(host.value()).toEqual(['opt1']);
    expect(host.valueChangeEvents().length).toBe(0);
    expect(host.updateEvents().length).toBe(0);
  });

  it('toggling children updates the group value array (add/remove) and emits both valueChange and onUpdate', async () => {
    const natives = nativesOf(fixture);

    // Check opt3 (index 2) -> adds 'opt3'
    natives[2].click();
    await fixture.whenStable();

    expect(host.value()).toEqual(['opt1', 'opt3']);
    expect(host.valueChangeEvents()).toEqual([['opt1', 'opt3']]);
    expect(host.updateEvents()).toEqual([['opt1', 'opt3']]);
    expect(host.checkboxes()[2].isChecked).toBe(true);

    // Uncheck opt1 (index 0) -> removes 'opt1'
    natives[0].click();
    await fixture.whenStable();

    expect(host.value()).toEqual(['opt3']);
    expect(host.valueChangeEvents()).toEqual([['opt1', 'opt3'], ['opt3']]);
    expect(host.updateEvents()).toEqual([['opt1', 'opt3'], ['opt3']]);
    expect(host.checkboxes()[0].isChecked).toBe(false);

    // Toggle opt3 again -> removes 'opt3', leaving empty array
    natives[2].click();
    await fixture.whenStable();

    expect(host.value()).toEqual([]);
    expect(host.valueChangeEvents()).toEqual([['opt1', 'opt3'], ['opt3'], []]);
    expect(host.updateEvents()).toEqual([['opt1', 'opt3'], ['opt3'], []]);
    expect(host.checkboxes()[2].isChecked).toBe(false);
  });
});

@Component({
  selector: 'test-checkbox-group-appearance-host',
  standalone: true,
  imports: [DasarCheckboxGroupComponent, DasarCheckboxComponent],
  template: `
    @if (appearance()) {
      <dasar-checkbox-group [appearance]="appearance()!">
        <dasar-checkbox label="One" [checked-value]="'1'" />
        <dasar-checkbox label="Two" [checked-value]="'2'" />
      </dasar-checkbox-group>
    } @else {
      <dasar-checkbox-group>
        <dasar-checkbox label="One" [checked-value]="'1'" />
        <dasar-checkbox label="Two" [checked-value]="'2'" />
      </dasar-checkbox-group>
    }
  `,
})
class CheckboxGroupAppearanceHost {
  appearance = signal<DasarCheckboxAppearanceType | undefined>(undefined);
  checkboxes = viewChildren(DasarCheckbox);
}

@Component({
  selector: 'test-checkbox-group-appearance-theme-host',
  standalone: true,
  imports: [DasarCheckboxGroupComponent, DasarCheckboxComponent],
  template: `
    <dasar-checkbox-group>
      <dasar-checkbox label="Theme Child" [checked-value]="'tc'" />
    </dasar-checkbox-group>
  `,
})
class CheckboxGroupAppearanceThemeHost {
  checkboxes = viewChildren(DasarCheckbox);
}

describe('DasarCheckboxGroup appearance propagation', () => {
  it('propagates default outline appearance to child checkboxes', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupAppearanceHost],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckboxGroupAppearanceHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const boxes = fixture.nativeElement.querySelectorAll('.dasar-checkbox-box');
    expect(boxes.length).toBe(2);
    for (const box of Array.from(boxes)) {
      expect((box as HTMLElement).classList.contains('appearance-outline')).toBe(true);
      expect((box as HTMLElement).classList.contains('appearance-elevated')).toBe(false);
    }
  });

  it('propagates explicit appearance to all child checkboxes', async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxGroupAppearanceHost],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckboxGroupAppearanceHost);
    fixture.componentInstance.appearance.set('elevated');
    fixture.detectChanges();
    await fixture.whenStable();

    const boxes = fixture.nativeElement.querySelectorAll('.dasar-checkbox-box');
    expect(boxes.length).toBe(2);
    for (const box of Array.from(boxes)) {
      expect((box as HTMLElement).classList.contains('appearance-elevated')).toBe(true);
      expect((box as HTMLElement).classList.contains('appearance-outline')).toBe(false);
    }
  });

  it('respects theme-configured default appearance on checkboxGroup', async () => {
    const customThemeConfig = {
      componentConfig: {
        checkboxGroup: {
          appearance: 'elevated' as const,
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [CheckboxGroupAppearanceThemeHost],
      providers: [{ provide: DASAR_THEME_PROVIDER, useValue: customThemeConfig }],
    }).compileComponents();
    const fixture = TestBed.createComponent(CheckboxGroupAppearanceThemeHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const group = fixture.debugElement.children[0].componentInstance as DasarCheckboxGroup;
    expect(group.appearance).toBe('elevated');

    const box = fixture.nativeElement.querySelector('.dasar-checkbox-box') as HTMLElement;
    expect(box.classList.contains('appearance-elevated')).toBe(true);
  });
});
