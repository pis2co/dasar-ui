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
  standalone: true,
  imports: [DasarTabsComponent],
  template: `<dasar-tabs [items]="['A', 'B']" />`,
})
class EmptyBodyHost {}

@Component({
  standalone: true,
  imports: [DasarTabsComponent],
  template: `<dasar-tabs [items]="['A']" />`,
})
class ThemeHost {}

const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-tabs-container') as HTMLElement;
const listOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-tabs-list') as HTMLElement;
const contentOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-tabs-content') as HTMLElement;
const triggerElementsOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-tab-trigger-btn')) as HTMLElement[];

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
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeHost);
    await fixture.whenStable();
  });

  it('reads the defaults from the component config', () => {
    const container = containerOf(fixture);

    expect(container.classList).toContain('size-lg');
    expect(container.classList).toContain('spacing-compact');
    expect(container.classList).toContain('appearance-outline');
  });
});
