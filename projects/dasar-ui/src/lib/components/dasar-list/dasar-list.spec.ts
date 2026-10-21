import { Component, PLATFORM_ID, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { listMap } from '../../services/theme.service';
import {
  DasarList,
  DasarListComponent,
  DasarListItemClickEvent,
  DasarListRadiusType,
  DasarListScrollEvent,
} from './dasar-list';

@Component({
  selector: 'test-list-radius-host',
  standalone: true,
  imports: [DasarListComponent],
  template: `<dasar-list [radius]="radius()"></dasar-list>`,
})
class ListRadiusHost {
  radius = signal<DasarListRadiusType>('md');
}

@Component({
  selector: 'test-list-theme-host',
  standalone: true,
  imports: [DasarListComponent],
  template: `<dasar-list></dasar-list>`,
})
class ListThemeHost {}

@Component({
  selector: 'test-list-value-host',
  standalone: true,
  imports: [DasarListComponent],
  template: `<dasar-list
    selectable
    max-height="120px"
    [scroll-offset]="offset()"
    [scroll-on-click]="scrollOnClick()"
    [value]="value()"
    (valueChange)="value.set($event)"
    (onUpdate)="updated.set(updated() + 1)"
    (onItemClick)="clicks.set([...clicks(), $event])"
    (onScroll)="scrolls.set([...scrolls(), $event])"
    (onUserScroll)="userScrolls.set(userScrolls() + 1)"
  >
    @for (n of numbers; track n) {
      <dasar-list-item [value]="n" [disabled]="n === 7">Item {{ n }}</dasar-list-item>
    }
  </dasar-list>`,
})
class ListValueHost {
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  value = signal<any>(null);
  offset = signal(0);
  scrollOnClick = signal(true);
  updated = signal(0);
  clicks = signal<DasarListItemClickEvent[]>([]);
  scrolls = signal<DasarListScrollEvent[]>([]);
  userScrolls = signal(0);
}

@Component({
  selector: 'test-list-plain-host',
  standalone: true,
  imports: [DasarListComponent],
  template: `<dasar-list
    [selectable]="selectable()"
    (onItemClick)="clicks.set([...clicks(), $event])"
  >
    @for (n of numbers; track n) {
      <dasar-list-item [value]="n">Item {{ n }}</dasar-list-item>
    }
  </dasar-list>`,
})
class ListPlainHost {
  numbers = [0, 1, 2];
  selectable = signal(false);
  clicks = signal<DasarListItemClickEvent[]>([]);
}

@Component({
  selector: 'test-list-ngmodel-host',
  standalone: true,
  imports: [DasarListComponent, FormsModule],
  template: `<dasar-list selectable max-height="120px" [(ngModel)]="model">
    @for (n of numbers; track n) {
      <dasar-list-item [value]="n">Item {{ n }}</dasar-list-item>
    }
  </dasar-list>`,
})
class ListNgModelHost {
  numbers = [0, 1, 2, 3, 4];
  model: any = null;
}

@Component({
  selector: 'test-list-field-host',
  standalone: true,
  imports: [DasarListComponent],
  template: `<dasar-list selectable value-field="id" [value]="value()">
    <dasar-list-item [value]="{ id: 1, name: 'A' }">A</dasar-list-item>
    <dasar-list-item [value]="{ id: 2, name: 'B' }">B</dasar-list-item>
  </dasar-list>`,
})
class ListFieldHost {
  value = signal<any>({ id: 2, name: 'x' });
}

@Component({
  selector: 'test-list-kbd-host',
  standalone: true,
  imports: [DasarListComponent],
  template: `<dasar-list
    selectable
    keyboard
    max-height="120px"
    [show-focus]="showFocus()"
    [value]="value()"
    (valueChange)="value.set($event)"
  >
    @for (n of numbers; track n) {
      <dasar-list-item [value]="n" [disabled]="n === 1">Item {{ n }}</dasar-list-item>
    }
  </dasar-list>`,
})
class ListKbdHost {
  numbers = [0, 1, 2, 3, 4];
  value = signal<any>(null);
  showFocus = signal(false);
}

const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-list-container') as HTMLElement | null;

const contentOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-list-content') as HTMLElement;

const itemElsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-list-item')) as HTMLElement[];

const hostElsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('dasar-list-item')) as HTMLElement[];

const stubLayout = (container: HTMLElement, items: HTMLElement[], itemHeight = 40) => {
  Object.defineProperty(container, 'clientHeight', { configurable: true, value: 120 });
  Object.defineProperty(container, 'scrollHeight', {
    configurable: true,
    value: items.length * itemHeight,
  });
  container.getBoundingClientRect = () => ({ top: 100 }) as DOMRect;
  items.forEach((el, i) => {
    el.getBoundingClientRect = () =>
      ({ top: 100 + i * itemHeight - container.scrollTop }) as DOMRect;
  });
  container.scrollTo = ((opts: ScrollToOptions) => {
    container.scrollTop = opts.top ?? 0;
  }) as any;
};

describe('DasarList', () => {
  let component: DasarList;
  let fixture: ComponentFixture<DasarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarList],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('DasarList radius', () => {
  let fixture: ComponentFixture<ListRadiusHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRadiusHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListRadiusHost);
    await fixture.whenStable();
  });

  it('defaults to radius-md', () => {
    expect(containerOf(fixture)?.classList).toContain('radius-md');
  });

  it('radius drives the container class', async () => {
    for (const value of ['none', 'sm', 'lg', 'full'] as DasarListRadiusType[]) {
      fixture.componentInstance.radius.set(value);
      await fixture.whenStable();

      expect(containerOf(fixture)?.classList).toContain(`radius-${value}`);
    }
  });
});

describe('DasarList radius theme default', () => {
  let fixture: ComponentFixture<ListThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: { componentConfig: { list: { radius: 'none' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListThemeHost);
    await fixture.whenStable();
  });

  it('reads radius from the component config', () => {
    expect(containerOf(fixture)?.classList).toContain('radius-none');
  });
});

describe('listMap tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('maps the per-size radius tokens', () => {
    expect(listMap['radiusNone']).toBe('--list-radius-none');
    expect(listMap['radiusXs']).toBe('--list-radius-xs');
    expect(listMap['radiusSm']).toBe('--list-radius-sm');
    expect(listMap['radiusMd']).toBe('--list-radius-md');
    expect(listMap['radiusLg']).toBe('--list-radius-lg');
    expect(listMap['radiusXl']).toBe('--list-radius-xl');
    expect(listMap['radiusFull']).toBe('--list-radius-full');
  });

  it('maps the scroll and active tokens', () => {
    expect(listMap['maxHeight']).toBe('--list-max-height');
    expect(listMap['activeItemBackground']).toBe('--list-active-item-background');
    expect(listMap['activeItemColor']).toBe('--list-active-item-color');
    expect(listMap['focusItemOutline']).toBe('--list-focus-item-outline');
  });
});

describe('DasarList selection', () => {
  let fixture: ComponentFixture<ListValueHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListValueHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListValueHost);
    await fixture.whenStable();
  });

  it('clicking an item selects it and emits once', async () => {
    itemElsOf(fixture)[3].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(3);
    expect(fixture.componentInstance.updated()).toBe(1);
    expect(itemElsOf(fixture)[3].classList).toContain('active');
  });

  it('clicking the active item emits onItemClick but not onUpdate', async () => {
    fixture.componentInstance.value.set(2);
    await fixture.whenStable();
    fixture.componentInstance.updated.set(0);
    fixture.componentInstance.clicks.set([]);

    itemElsOf(fixture)[2].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.clicks().length).toBe(1);
    expect(fixture.componentInstance.clicks()[0].value).toBe(2);
    expect(fixture.componentInstance.clicks()[0].index).toBe(2);
    expect(fixture.componentInstance.updated()).toBe(0);
  });

  it('a disabled item click does nothing', async () => {
    itemElsOf(fixture)[7].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBeNull();
    expect(fixture.componentInstance.clicks().length).toBe(0);
  });

  it('scrolls a click to the offset and emits onScroll', async () => {
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));

    itemElsOf(fixture)[5].click();
    await fixture.whenStable();

    expect(container.scrollTop).toBe(200);
    const last = fixture.componentInstance.scrolls().at(-1);
    expect(last?.reason).toBe('click');
    expect(last?.scrollTop).toBe(200);
  });

  it('applies scroll-offset to the click scroll', async () => {
    fixture.componentInstance.offset.set(16);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));

    itemElsOf(fixture)[5].click();
    await fixture.whenStable();

    expect(container.scrollTop).toBe(184);
  });

  it('does not scroll on click when scroll-on-click is false', async () => {
    fixture.componentInstance.scrollOnClick.set(false);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));
    fixture.componentInstance.scrolls.set([]);

    itemElsOf(fixture)[5].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(5);
    expect(container.scrollTop).toBe(0);
    expect(fixture.componentInstance.scrolls().length).toBe(0);
  });
});

describe('DasarList scroll math', () => {
  let fixture: ComponentFixture<ListValueHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListValueHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListValueHost);
    await fixture.whenStable();
  });

  it('scrollToActive lines the item top up with the container top', async () => {
    const host = fixture.componentInstance;
    host.value.set(5);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;

    expect(list.scrollToActive('auto', 'value')).toBe(true);
    expect(container.scrollTop).toBe(200);
  });

  it('clamps the last items at the end of the list', async () => {
    const host = fixture.componentInstance;
    host.value.set(9);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;

    list.scrollToActive('auto');
    expect(container.scrollTop).toBe(280);
  });

  it('clamps above zero when the offset overshoots', async () => {
    const host = fixture.componentInstance;
    host.offset.set(16);
    host.value.set(0);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;

    list.scrollToActive('auto');
    expect(container.scrollTop).toBe(0);
  });

  it('returns false when no item matches', async () => {
    const host = fixture.componentInstance;
    host.value.set(99);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;

    expect(list.scrollToActive('auto')).toBe(false);
    expect(container.scrollTop).toBe(0);
  });

  it('emits onScroll with reason value on external value change scroll', async () => {
    const host = fixture.componentInstance;
    host.value.set(4);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));
    host.scrolls.set([]);
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;

    list.scrollToActive('auto', 'value');
    expect(host.scrolls().at(-1)?.reason).toBe('value');
    expect(host.scrolls().at(-1)?.index).toBe(4);
  });
});

describe('DasarList without selectable', () => {
  let fixture: ComponentFixture<ListPlainHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlainHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPlainHost);
    await fixture.whenStable();
  });

  it('click emits onItemClick but selects nothing', async () => {
    itemElsOf(fixture)[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.clicks().length).toBe(1);
    expect(fixture.componentInstance.clicks()[0].value).toBe(1);
    expect(itemElsOf(fixture)[1].classList).not.toContain('active');
  });
});

describe('DasarList ngModel', () => {
  let fixture: ComponentFixture<ListNgModelHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNgModelHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListNgModelHost);
    await fixture.whenStable();
  });

  it('writes the model to the view', async () => {
    const ngModel = fixture.debugElement.query(By.directive(NgModel)).injector.get(NgModel);
    ngModel.control.setValue(4);
    await fixture.whenStable();

    expect(itemElsOf(fixture)[4].classList).toContain('active');
  });

  it('writes the view to the model', async () => {
    itemElsOf(fixture)[2].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.model).toBe(2);
  });
});

describe('DasarList value-field', () => {
  let fixture: ComponentFixture<ListFieldHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFieldHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListFieldHost);
    await fixture.whenStable();
  });

  it('matches objects by the key field', () => {
    const items = itemElsOf(fixture);
    expect(items[0].classList).not.toContain('active');
    expect(items[1].classList).toContain('active');
  });
});

describe('DasarList keyboard', () => {
  let fixture: ComponentFixture<ListKbdHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListKbdHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListKbdHost);
    await fixture.whenStable();
  });

  it('moves focus with arrows, skipping disabled items', async () => {
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));

    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();

    expect(list.focusedIndex()).toBe(2);
    expect(container.getAttribute('aria-activedescendant')).toBe(
      itemElsOf(fixture)[2].getAttribute('id'),
    );
  });

  it('marks no item as focused before navigation', () => {
    expect(itemElsOf(fixture).some((el) => el.classList.contains('focused'))).toBe(false);
  });

  it('hides the focus outline by default but keeps aria-activedescendant', async () => {
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));

    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();

    expect(itemElsOf(fixture).some((el) => el.classList.contains('focused'))).toBe(false);
    expect(container.getAttribute('aria-activedescendant')).toBe(
      itemElsOf(fixture)[0].getAttribute('id'),
    );
  });

  it('shows the focus outline when show-focus is true', async () => {
    fixture.componentInstance.showFocus.set(true);
    await fixture.whenStable();
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));

    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();

    expect(itemElsOf(fixture)[0].classList).toContain('focused');
    expect(itemElsOf(fixture)[1].classList).not.toContain('focused');
  });

  it('selects the focused item on Enter', async () => {
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));

    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await fixture.whenStable();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(0);
    expect(itemElsOf(fixture)[0].classList).toContain('active');
  });

  it('reaches the ends with End and Home', async () => {
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;
    const container = contentOf(fixture);
    stubLayout(container, hostElsOf(fixture));

    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await fixture.whenStable();
    expect(list.focusedIndex()).toBe(4);

    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await fixture.whenStable();
    expect(list.focusedIndex()).toBe(0);
  });
});

describe('DasarList scroll defaults', () => {
  let fixture: ComponentFixture<ListThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              list: { maxHeight: '200px', scrollOffset: 8, selectable: true, showFocus: true },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListThemeHost);
    await fixture.whenStable();
  });

  it('reads scroll config from the component config', () => {
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;
    expect(contentOf(fixture).style.maxHeight).toBe('200px');
    expect(list.scrollOffset).toBe(8);
    expect(list.selectable).toBe(true);
    expect(list.showFocus).toBe(true);
  });
});

describe('DasarList onUserScroll', () => {
  let fixture: ComponentFixture<ListValueHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListValueHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListValueHost);
    await fixture.whenStable();
  });

  it('emits the native scroll event', async () => {
    const target = fixture.debugElement.query(By.directive(DasarList)).componentInstance
      .onUserScroll;
    const spy = vi.spyOn(target, 'emit');
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: any) => {
      cb(0);
      return 0;
    });
    contentOf(fixture).dispatchEvent(new Event('scroll'));
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledTimes(1);
    raf.mockRestore();
  });
});

describe('DasarList server platform', () => {
  let fixture: ComponentFixture<ListValueHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListValueHost],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListValueHost);
    await fixture.whenStable();
  });

  it('setting a value does not throw and does not scroll', async () => {
    const list = fixture.debugElement.query(By.directive(DasarList)).componentInstance as DasarList;
    const scrollTo = vi.spyOn(list, 'scrollToActive');

    expect(() => {
      fixture.componentInstance.value.set(3);
    }).not.toThrow();
    await fixture.whenStable();

    expect(scrollTo).not.toHaveBeenCalled();
  });
});

describe('DasarList reactive form', () => {
  @Component({
    selector: 'test-list-reactive-host',
    standalone: true,
    imports: [DasarListComponent, ReactiveFormsModule],
    template: `<dasar-list selectable [formControl]="control">
      @for (n of numbers; track n) {
        <dasar-list-item [value]="n">Item {{ n }}</dasar-list-item>
      }
    </dasar-list>`,
  })
  class ListReactiveHost {
    numbers = [0, 1, 2];
    control = new FormControl(1);
  }

  let fixture: ComponentFixture<ListReactiveHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReactiveHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListReactiveHost);
    await fixture.whenStable();
  });

  it('shows the control value as active', () => {
    expect(itemElsOf(fixture)[1].classList).toContain('active');
  });

  it('a disabled control blocks clicks and marks the container', async () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(containerOf(fixture)?.classList).toContain('disabled');
    itemElsOf(fixture)[0].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toBe(1);
    expect(itemElsOf(fixture)[0].classList).not.toContain('active');
  });
});

describe('DasarList scroll container', () => {
  const overflowOf = (fixture: ComponentFixture<unknown>) =>
    getComputedStyle(fixture.nativeElement.querySelector('.dasar-list-content')).overflowY;

  it('does not trap the wheel when the list has no max height', async () => {
    await TestBed.configureTestingModule({ imports: [ListThemeHost] }).compileComponents();
    const fixture = TestBed.createComponent(ListThemeHost);
    await fixture.whenStable();

    expect(overflowOf(fixture)).not.toBe('auto');
  });

  it('scrolls inside the list when a max height is set', async () => {
    await TestBed.configureTestingModule({ imports: [ListValueHost] }).compileComponents();
    const fixture = TestBed.createComponent(ListValueHost);
    await fixture.whenStable();

    expect(overflowOf(fixture)).toBe('auto');
  });
});
