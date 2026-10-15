import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DasarTabs, DasarTabsComponent } from './dasar-tabs';
import { ScaleAttributeType } from '../../models/type.model';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';

@Component({
  standalone: true,
  imports: [DasarTabsComponent],
  template: `
    <dasar-tabs
      [items]="items()"
      [size]="size()"
      [spacing]="spacing()"
      [radius]="radius()"
      [appearance]="appearance()"
      [fluid]="fluid()"
      [active-index]="active()"
      container-class="my-container"
      list-class="my-list"
      content-class="my-content"
      [container-style]="{ 'margin-top': '3px' }"
      (onTabsChange)="active.set($event); changed.set(changed() + 1)"
      (onTabsClick)="clicked.set(clicked() + 1)"
    >
      <p class="body">Body {{ active() }}</p>
    </dasar-tabs>
  `,
})
class ItemsHost {
  items = signal(['One', 'Two', 'Three']);
  size = signal<ScaleAttributeType>('md');
  spacing = signal<'compact' | 'normal'>('normal');
  radius = signal<ScaleAttributeType>('md');
  appearance = signal<'solid' | 'subtle' | 'outline'>('subtle');
  fluid = signal(false);
  active = signal(0);
  changed = signal(0);
  clicked = signal(0);
}

@Component({
  standalone: true,
  imports: [DasarTabsComponent],
  template: `
    <dasar-tabs>
      <ng-template tab-item-slot><span class="slot-label">A</span></ng-template>
      <ng-template tab-item-slot><span class="slot-label">B</span></ng-template>
      <ng-template tab-item-slot><span class="slot-label">C</span></ng-template>
    </dasar-tabs>
  `,
})
class SlotHost {}

@Component({
  selector: 'app-empty-body-host',
  standalone: true,
  imports: [DasarTabsComponent],
  template: `<dasar-tabs [items]="['A', 'B']" />`,
})
class EmptyBodyHost {}

@Component({
  selector: 'app-theme-host',
  standalone: true,
  imports: [DasarTabsComponent],
  template: `<dasar-tabs [items]="['A']" />`,
})
class ThemeHost {}

@Component({
  standalone: true,
  imports: [DasarTabsComponent],
  template: `
    <dasar-tabs
      [items]="['Alpha', 'Beta', 'Gamma']"
      scroll-left-icon-name="arrow-left"
      scroll-right-icon-name="arrow-right"
      scroll-button-class="my-scroll"
      [scroll-button-style]="{ 'margin-inline': '2px' }"
    />
  `,
})
class ScrollIconHost {}

@Component({
  standalone: true,
  imports: [DasarTabsComponent],
  template: `
    <dasar-tabs [items]="['Alpha', 'Beta', 'Gamma']">
      <ng-template tabs-scroll-left-slot><span class="my-left">Prev</span></ng-template>
      <ng-template tabs-scroll-right-slot><span class="my-right">Next</span></ng-template>
    </dasar-tabs>
  `,
})
class ScrollSlotHost {}

const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-tabs-container') as HTMLElement;
const listOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-tabs-list') as HTMLElement;
const contentOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-tabs-content') as HTMLElement;
const triggerElementsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-tab-trigger-btn')) as HTMLElement[];
const wrapperOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-tabs-list-wrapper') as HTMLElement;
const scrollButtonsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-tabs-scroll-btn')) as HTMLElement[];

const setMetrics = (el: HTMLElement, scrollWidth: number, clientWidth: number, scrollLeft = 0) => {
  Object.defineProperty(el, 'scrollWidth', {
    value: scrollWidth,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(el, 'clientWidth', {
    value: clientWidth,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(el, 'scrollLeft', {
    value: scrollLeft,
    configurable: true,
    writable: true,
  });
};

class FakeResizeObserver {
  static instances: FakeResizeObserver[] = [];

  constructor(private readonly callback: () => void) {
    FakeResizeObserver.instances.push(this);
  }

  observe() {}
  unobserve() {}

  disconnect() {
    const at = FakeResizeObserver.instances.indexOf(this);
    if (at >= 0) FakeResizeObserver.instances.splice(at, 1);
  }

  trigger() {
    this.callback();
  }
}

describe('DasarTabs', () => {
  let component: DasarTabs;
  let fixture: ComponentFixture<ItemsHost>;
  let host: ItemsHost;

  const triggers = () => triggerElementsOf(fixture);
  const clickTab = async (index: number) => {
    (triggers()[index].querySelector('button') as HTMLElement).click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsHost);
    host = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders one tab trigger per item with its label', () => {
    const buttons = triggers();

    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('One');
    expect(buttons[1].textContent).toContain('Two');
    expect(buttons[2].textContent).toContain('Three');
  });

  it('applies the default container classes', () => {
    expect(containerOf(fixture).classList).toContain('size-md');
    expect(containerOf(fixture).classList).toContain('spacing-normal');
    expect(containerOf(fixture).classList).toContain('radius-md');
    expect(containerOf(fixture).classList).toContain('appearance-subtle');
  });

  it('size drives the container class and the button size', async () => {
    host.size.set('lg');
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('size-lg');
    expect(fixture.debugElement.query(By.css('dasar-button')).componentInstance.size).toBe('lg');
  });

  it('maps the clamped sizes onto the button size scale', async () => {
    host.size.set('none');
    await fixture.whenStable();
    expect(containerOf(fixture).classList).toContain('size-none');
    expect(fixture.debugElement.query(By.css('dasar-button')).componentInstance.size).toBe('xs');

    host.size.set('full');
    await fixture.whenStable();
    expect(containerOf(fixture).classList).toContain('size-full');
    expect(fixture.debugElement.query(By.css('dasar-button')).componentInstance.size).toBe('xl');
  });

  it('spacing drives the container class', async () => {
    host.spacing.set('compact');
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('spacing-compact');
  });

  it('radius drives the container class', async () => {
    for (const value of ['none', 'sm', 'lg', 'full'] as ScaleAttributeType[]) {
      host.radius.set(value);
      await fixture.whenStable();

      expect(containerOf(fixture).classList).toContain(`radius-${value}`);
    }
  });

  it('passes radius none to the buttons in the outline appearance', async () => {
    host.appearance.set('outline');
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('appearance-outline');
    const buttonDebugs = fixture.debugElement.queryAll(By.css('dasar-tab-trigger-btn'));
    for (const debug of buttonDebugs) {
      expect(debug.componentInstance.radius).toBe('none');
    }
  });

  it('selecting a tab updates the active state and emits both outputs', async () => {
    await clickTab(1);

    expect(host.active()).toBe(1);
    expect(host.changed()).toBe(1);
    expect(host.clicked()).toBe(1);
    expect(triggers()[1].classList).toContain('active');
    expect(triggers()[0].classList).not.toContain('active');
    expect(triggers()[1].getAttribute('aria-selected')).toBe('true');
    expect(triggers()[0].getAttribute('aria-selected')).toBe('false');
    expect(contentOf(fixture).textContent).toContain('Body 1');
  });

  it('clicking the active tab only emits onTabsClick', async () => {
    await clickTab(1);
    await clickTab(1);

    expect(host.clicked()).toBe(2);
    expect(host.changed()).toBe(1);
  });

  it('keeps the body rendered when content is projected', () => {
    expect(contentOf(fixture).querySelector('.body')).toBeTruthy();
    expect(contentOf(fixture).matches(':empty')).toBe(false);
  });

  it('fluid adds the fluid class', async () => {
    host.fluid.set(true);
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('fluid');
  });

  it('applies the class and style inputs to the right elements', () => {
    expect(containerOf(fixture).classList).toContain('my-container');
    expect(containerOf(fixture).style.marginTop).toBe('3px');
    expect(listOf(fixture).classList).toContain('my-list');
    expect(contentOf(fixture).classList).toContain('my-content');
  });

  it('exposes the tablist, tab and tabpanel roles', () => {
    expect(listOf(fixture).getAttribute('role')).toBe('tablist');
    for (const trigger of triggers()) {
      expect(trigger.getAttribute('role')).toBe('tab');
    }
    expect(contentOf(fixture).getAttribute('role')).toBe('tabpanel');
  });
});

describe('DasarTabs with tab-item-slot', () => {
  let fixture: ComponentFixture<SlotHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SlotHost);
    await fixture.whenStable();
  });

  it('renders one tab trigger per tab-item-slot with the slot template', () => {
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll(
        '.dasar-tab-trigger-btn .slot-label',
      ) as NodeListOf<HTMLElement>,
    );
    expect(labels.map((label) => label.textContent)).toEqual(['A', 'B', 'C']);
  });
});

describe('DasarTabs without a projected body', () => {
  let fixture: ComponentFixture<EmptyBodyHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyBodyHost],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyBodyHost);
    await fixture.whenStable();
  });

  it('removes the body padding when no content is projected', () => {
    expect(contentOf(fixture).matches(':empty')).toBe(true);
  });
});

describe('DasarTabs theme defaults', () => {
  let fixture: ComponentFixture<ThemeHost>;
  let component: DasarTabs;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              tabs: {
                size: 'lg',
                spacing: 'compact',
                appearance: 'outline',
                scrollLeftIconName: 'arrow-left',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeHost);
    component = fixture.debugElement.children[0].componentInstance;
    await fixture.whenStable();
  });

  it('reads the defaults from the component config', () => {
    const container = containerOf(fixture);

    expect(container.classList).toContain('size-lg');
    expect(container.classList).toContain('spacing-compact');
    expect(container.classList).toContain('appearance-outline');
  });

  it('reads the scroll icon default from the component config', async () => {
    setMetrics(listOf(fixture), 600, 300);
    component.updateScrollState();
    await fixture.whenStable();

    const icons = fixture.debugElement.queryAll(By.css('.dasar-tabs-scroll-btn dasar-icon'));
    expect(icons.map((icon) => icon.componentInstance.name)).toEqual([
      'arrow-left',
      'chevron-right',
    ]);
  });
});

describe('DasarTabs scroll arrows', () => {
  let fixture: ComponentFixture<ItemsHost>;
  let component: DasarTabs;
  let originalResizeObserver: unknown;
  let originalScrollIntoView: unknown;
  let scrollIntoViewTargets: Element[] = [];

  const triggers = () => triggerElementsOf(fixture);
  const clickTab = async (index: number) => {
    (triggers()[index].querySelector('button') as HTMLElement).click();
    await fixture.whenStable();
  };

  const measure = async (scrollWidth: number, clientWidth: number, scrollLeft = 0) => {
    setMetrics(listOf(fixture), scrollWidth, clientWidth, scrollLeft);
    component.updateScrollState();
    await fixture.whenStable();
  };

  beforeAll(() => {
    originalResizeObserver = (globalThis as any).ResizeObserver;
    (globalThis as any).ResizeObserver = FakeResizeObserver;
    originalScrollIntoView = (Element.prototype as any).scrollIntoView;
    (Element.prototype as any).scrollIntoView = function (this: Element) {
      scrollIntoViewTargets.push(this);
    };
  });

  afterAll(() => {
    if (originalResizeObserver === undefined) delete (globalThis as any).ResizeObserver;
    else (globalThis as any).ResizeObserver = originalResizeObserver;
    if (originalScrollIntoView === undefined) delete (Element.prototype as any).scrollIntoView;
    else (Element.prototype as any).scrollIntoView = originalScrollIntoView;
  });

  beforeEach(async () => {
    scrollIntoViewTargets = [];
    await TestBed.configureTestingModule({
      imports: [ItemsHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsHost);
    component = fixture.debugElement.children[0].componentInstance;
    await fixture.whenStable();
  });

  it('starts with no scroll arrows before any measurement', () => {
    expect(scrollButtonsOf(fixture).length).toBe(0);
    expect(wrapperOf(fixture).classList).not.toContain('overflowing');
  });

  it('does not render the arrows when the strip fits the container', async () => {
    await measure(300, 300);

    expect(scrollButtonsOf(fixture).length).toBe(0);
    expect(wrapperOf(fixture).classList).not.toContain('overflowing');
  });

  it('renders both arrows with the left one disabled at the start', async () => {
    await measure(600, 300);

    const buttons = scrollButtonsOf(fixture);
    expect(buttons.length).toBe(2);
    expect(wrapperOf(fixture).classList).toContain('overflowing');
    expect(wrapperOf(fixture).classList).toContain('can-scroll-right');
    expect(wrapperOf(fixture).classList).not.toContain('can-scroll-left');
    expect((buttons[0].querySelector('button') as HTMLButtonElement).disabled).toBe(true);
    expect((buttons[1].querySelector('button') as HTMLButtonElement).disabled).toBe(false);
  });

  it('enables both arrows in the middle of the scroll range', async () => {
    await measure(600, 300, 150);

    const buttons = scrollButtonsOf(fixture);
    expect((buttons[0].querySelector('button') as HTMLButtonElement).disabled).toBe(false);
    expect((buttons[1].querySelector('button') as HTMLButtonElement).disabled).toBe(false);
    expect(wrapperOf(fixture).classList).toContain('can-scroll-left');
    expect(wrapperOf(fixture).classList).toContain('can-scroll-right');
  });

  it('disables the right arrow at the end of the scroll range', async () => {
    await measure(600, 300, 300);

    const buttons = scrollButtonsOf(fixture);
    expect((buttons[0].querySelector('button') as HTMLButtonElement).disabled).toBe(false);
    expect((buttons[1].querySelector('button') as HTMLButtonElement).disabled).toBe(true);
    expect(wrapperOf(fixture).classList).not.toContain('can-scroll-right');
  });

  it('scrolls by 80 percent of the visible width', async () => {
    await measure(600, 300, 150);
    const calls: ScrollToOptions[] = [];
    (listOf(fixture) as any).scrollBy = (options: ScrollToOptions) => calls.push(options);

    (scrollButtonsOf(fixture)[1].querySelector('button') as HTMLElement).click();
    await fixture.whenStable();

    expect(calls).toEqual([{ left: 240, behavior: 'smooth' }]);
  });

  it('removes the arrows once the strip fits again', async () => {
    await measure(600, 300);
    expect(scrollButtonsOf(fixture).length).toBe(2);

    await measure(300, 300);
    expect(scrollButtonsOf(fixture).length).toBe(0);
  });

  it('attaches a resize observer to the strip', () => {
    expect(FakeResizeObserver.instances.length).toBeGreaterThan(0);
  });

  it('shows the default chevron icons in the arrows', async () => {
    await measure(600, 300);

    const icons = fixture.debugElement.queryAll(By.css('.dasar-tabs-scroll-btn dasar-icon'));
    expect(icons.map((icon) => icon.componentInstance.name)).toEqual([
      'chevron-left',
      'chevron-right',
    ]);
  });

  it('labels the arrows and keeps them out of the tablist', async () => {
    await measure(600, 300);

    const buttons = scrollButtonsOf(fixture);
    expect(buttons[0].getAttribute('aria-label')).toBe('Scroll tabs left');
    expect(buttons[1].getAttribute('aria-label')).toBe('Scroll tabs right');
    expect(buttons[0].getAttribute('role')).toBeNull();
    expect(buttons[1].getAttribute('role')).toBeNull();
  });

  it('scrolls the newly selected tab into view', async () => {
    await clickTab(1);

    expect(scrollIntoViewTargets).toContain(triggers()[1]);
  });
});

describe('DasarTabs custom scroll icons', () => {
  let fixture: ComponentFixture<ScrollIconHost>;
  let component: DasarTabs;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollIconHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollIconHost);
    component = fixture.debugElement.children[0].componentInstance;
    await fixture.whenStable();
  });

  it('uses the icon name inputs and the scroll button class and style', async () => {
    setMetrics(listOf(fixture), 600, 300);
    component.updateScrollState();
    await fixture.whenStable();

    const icons = fixture.debugElement.queryAll(By.css('.dasar-tabs-scroll-btn dasar-icon'));
    expect(icons.map((icon) => icon.componentInstance.name)).toEqual(['arrow-left', 'arrow-right']);

    const buttons = scrollButtonsOf(fixture);
    expect(buttons[0].classList).toContain('my-scroll');
    expect(buttons[0].style.marginInline).toBe('2px');
  });
});

describe('DasarTabs scroll slots', () => {
  let fixture: ComponentFixture<ScrollSlotHost>;
  let component: DasarTabs;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollSlotHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollSlotHost);
    component = fixture.debugElement.children[0].componentInstance;
    await fixture.whenStable();
  });

  it('renders the slot templates instead of the default icons', async () => {
    setMetrics(listOf(fixture), 600, 300);
    component.updateScrollState();
    await fixture.whenStable();

    const buttons = scrollButtonsOf(fixture);
    expect(buttons.length).toBe(2);
    expect(buttons[0].querySelector('.my-left')?.textContent).toContain('Prev');
    expect(buttons[1].querySelector('.my-right')?.textContent).toContain('Next');
    expect(buttons[0].querySelector('dasar-icon')).toBeNull();
    expect(buttons[1].querySelector('dasar-icon')).toBeNull();
  });
});
