import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DasarRadioComponent } from '../dasar-radio/dasar-radio';
import { DasarRadioGroupComponent } from './dasar-radio-group';

@Component({
  selector: 'test-radio-group-host',
  standalone: true,
  imports: [DasarRadioGroupComponent, DasarRadioComponent],
  template: `<dasar-radio-group
    [(value)]="value"
    [disabled]="disabled()"
    [error]="error()"
    [hint]="hint()"
    [size]="size()"
    [value-field]="valueField()"
    (onUpdate)="updates.set([...updates(), $event])"
  >
    <dasar-radio
      label="A"
      [checked-value]="'a'"
      (onUpdate)="childUpdates.set(childUpdates() + 1)"
    />
    <dasar-radio label="B" [checked-value]="'b'" [disabled]="childDisabled()" />
    <dasar-radio label="C" [checked-value]="'c'" />
  </dasar-radio-group>`,
})
class RadioGroupHost {
  value = signal<any>(null);
  disabled = signal(false);
  error = signal(false);
  hint = signal('');
  size = signal<'sm' | 'md' | 'lg' | null>(null);
  valueField = signal<string | null>(null);
  updates = signal<any[]>([]);
  childDisabled = signal(false);
  childUpdates = signal(0);
}

@Component({
  selector: 'test-radio-group-names-host',
  standalone: true,
  imports: [DasarRadioGroupComponent, DasarRadioComponent],
  template: `
    <dasar-radio-group>
      <dasar-radio label="A" checked-value="a" />
    </dasar-radio-group>
    <dasar-radio-group>
      <dasar-radio label="B" checked-value="b" />
    </dasar-radio-group>
  `,
})
class RadioGroupNamesHost {}

@Component({
  selector: 'test-radio-group-object-host',
  standalone: true,
  imports: [DasarRadioGroupComponent, DasarRadioComponent],
  template: `<dasar-radio-group [(value)]="value" value-field="id">
    <dasar-radio label="One" [checked-value]="{ id: 1, name: 'One' }" />
    <dasar-radio label="Two" [checked-value]="{ id: 2, name: 'Two' }" />
  </dasar-radio-group>`,
})
class RadioGroupObjectHost {
  value = signal<any>({ id: 2 });
}

@Component({
  selector: 'test-radio-group-ngmodel-host',
  standalone: true,
  imports: [DasarRadioGroupComponent, DasarRadioComponent, FormsModule],
  template: `<dasar-radio-group [(ngModel)]="model">
    <dasar-radio label="A" [checked-value]="'a'" />
    <dasar-radio label="B" [checked-value]="'b'" />
  </dasar-radio-group>`,
})
class RadioGroupNgModelHost {
  model: any = 'a';
}

@Component({
  selector: 'test-radio-group-dynamic-host',
  standalone: true,
  imports: [DasarRadioGroupComponent, DasarRadioComponent],
  template: `<dasar-radio-group [(value)]="value">
    @for (item of items(); track item) {
      <dasar-radio [label]="item" [checked-value]="item" />
    }
  </dasar-radio-group>`,
})
class RadioGroupDynamicHost {
  items = signal(['a', 'b']);
  value = signal<any>(null);
}

const nativesOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-radio-native')) as HTMLInputElement[];
const clickNative = async (fixture: ComponentFixture<unknown>, index: number) => {
  nativesOf(fixture)[index].click();
  await fixture.whenStable();
};

describe('DasarRadioGroup', () => {
  let fixture: ComponentFixture<RadioGroupHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('checks only the matching child from the initial value', async () => {
    fixture.componentInstance.value.set('b');
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives[0].checked).toBe(false);
    expect(natives[1].checked).toBe(true);
    expect(natives[2].checked).toBe(false);
  });

  it('selects the clicked child, unchecks the previous one and emits onUpdate', async () => {
    fixture.componentInstance.value.set('a');
    await fixture.whenStable();
    await clickNative(fixture, 2);

    expect(fixture.componentInstance.value()).toBe('c');
    expect(fixture.componentInstance.updates()).toEqual(['c']);

    const natives = nativesOf(fixture);

    expect(natives[0].checked).toBe(false);
    expect(natives[2].checked).toBe(true);
  });

  it('emits nothing when the selected child is clicked again', async () => {
    fixture.componentInstance.value.set('a');
    await fixture.whenStable();
    await clickNative(fixture, 0);

    expect(fixture.componentInstance.updates()).toEqual([]);
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

    expect(fixture.componentInstance.value()).toBeNull();
  });

  it('keeps a disabled child disabled when the group is enabled', async () => {
    fixture.componentInstance.childDisabled.set(true);
    await fixture.whenStable();

    expect(nativesOf(fixture)[1].disabled).toBe(true);
    expect(nativesOf(fixture)[0].disabled).toBe(false);
  });

  it('overrides child sizes and renders hint and error', async () => {
    fixture.componentInstance.size.set('lg');
    fixture.componentInstance.hint.set('Pick one');
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();

    const hosts = fixture.nativeElement.querySelectorAll('dasar-radio');

    expect(Array.from(hosts).every((host) => (host as HTMLElement).classList.contains('lg'))).toBe(
      true,
    );
    expect(fixture.nativeElement.querySelector('.dasar-radio-group-hint')?.textContent).toContain(
      'Pick one',
    );
    expect(fixture.nativeElement.querySelector('.dasar-radio-group-hint')?.classList).toContain(
      'error',
    );
    expect(
      (fixture.nativeElement.querySelector('dasar-radio-group') as HTMLElement).classList,
    ).toContain('error');
  });
});

describe('DasarRadioGroup names', () => {
  it('gives each group its own generated name', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupNamesHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioGroupNamesHost);
    await fixture.whenStable();

    const names = nativesOf(fixture).map((native) => native.getAttribute('name'));

    expect(names[0]).toMatch(/^dasar-radio-group-\d+$/);
    expect(names[1]).toMatch(/^dasar-radio-group-\d+$/);
    expect(names[0]).not.toBe(names[1]);
  });
});

describe('DasarRadioGroup with objects', () => {
  it('matches by value-field', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupObjectHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioGroupObjectHost);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives[0].checked).toBe(false);
    expect(natives[1].checked).toBe(true);

    natives[0].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toEqual({ id: 1, name: 'One' });
  });
});

describe('DasarRadioGroup forms', () => {
  it('binds a single value through ngModel', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupNgModelHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioGroupNgModelHost);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives[0].checked).toBe(true);

    natives[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.model).toBe('b');
  });
});

describe('DasarRadioGroup dynamic children', () => {
  it('applies state to children added later', async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupDynamicHost],
    }).compileComponents();

    const fixture = TestBed.createComponent(RadioGroupDynamicHost);
    await fixture.whenStable();

    fixture.componentInstance.value.set('b');
    await fixture.whenStable();

    fixture.componentInstance.items.set(['a', 'b', 'c']);
    await fixture.whenStable();

    const natives = nativesOf(fixture);

    expect(natives.length).toBe(3);
    expect(natives[1].checked).toBe(true);

    natives[2].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe('c');
  });
});
