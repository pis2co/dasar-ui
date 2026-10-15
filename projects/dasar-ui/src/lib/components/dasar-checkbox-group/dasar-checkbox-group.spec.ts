import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DasarCheckboxComponent } from '../dasar-checkbox/dasar-checkbox';
import { DasarCheckboxGroupComponent } from './dasar-checkbox-group';

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
  ) as HTMLInputElement[];
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

    expect(natives[0].checked).toBe(true);
    expect(natives[1].checked).toBe(false);
    expect(natives[2].checked).toBe(true);
  });

  it('appends the checked value and emits onUpdate', async () => {
    await clickNative(fixture, 0);

    expect(fixture.componentInstance.value()).toEqual(['a']);
    expect(fixture.componentInstance.updates()).toEqual([['a']]);
    expect(nativesOf(fixture)[0].checked).toBe(true);
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

    expect(natives[0].checked).toBe(true);
    expect(natives[1].checked).toBe(false);

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

    expect(natives[0].checked).toBe(true);

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
    expect(natives[1].checked).toBe(true);

    natives[2].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toEqual(['b', 'c']);
  });
});
