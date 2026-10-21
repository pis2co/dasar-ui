import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarButton } from '../dasar-button/dasar-button';
import { paginationMap } from '../../services/theme.service';
import {
  DasarPagination,
  DasarPaginationAppearanceType,
  DasarPaginationComponent,
  DasarPaginationDisplayItem,
  DasarPaginationItem,
  DasarPaginationRadiusType,
  DasarPaginationSizeType,
  DasarPaginationSpacingType,
} from './dasar-pagination';

@Component({
  selector: 'test-pagination-host',
  standalone: true,
  imports: [DasarPaginationComponent],
  template: `<dasar-pagination
    [page-count]="count()"
    [page]="page()"
    (pageChange)="page.set($event)"
    (onUpdatePage)="updates.set([...updates(), $event])"
    (onUpdatePageSize)="sizeUpdates.set([...sizeUpdates(), $event])"
    [page-slot]="slot()"
    [page-sizes]="size()"
    [page-size-options]="sizeOptions()"
    [display-order]="order()"
    [disabled]="disabled()"
    [size]="sizeAttr()"
    [radius]="radius()"
    [spacing]="spacing()"
    [fluid]="fluid()"
    [label]="label()"
    [appearance]="appearance()"
  ></dasar-pagination>`,
})
class PaginationHost {
  page = signal(1);
  count = signal(1);
  slot = signal(9);
  size = signal(10);
  sizeOptions = signal<number[]>([10, 20]);
  order = signal<DasarPaginationDisplayItem[]>(['pages', 'size-picker', 'quick-jumper-dropdown']);
  disabled = signal(false);
  sizeAttr = signal<DasarPaginationSizeType>('md');
  radius = signal<DasarPaginationRadiusType>('md');
  spacing = signal<DasarPaginationSpacingType>('xs');
  fluid = signal(false);
  label = signal<string | null>(null);
  appearance = signal<DasarPaginationAppearanceType>('ghost');
  updates = signal<number[]>([]);
  sizeUpdates = signal<number[]>([]);
}

@Component({
  selector: 'test-pagination-slots-host',
  standalone: true,
  imports: [DasarPaginationComponent],
  template: `<dasar-pagination [page-count]="count()" [page]="page()">
    <ng-template label-slot let-p let-c="count">L{{ p }}/{{ c }}</ng-template>
    <span prev-slot>PREV</span>
    <span next-slot>NEXT</span>
    <span prefix-slot>PRE</span>
    <span suffix-slot>SUF</span>
  </dasar-pagination>`,
})
class PaginationSlotsHost {
  count = signal(7);
  page = signal(3);
}

@Component({
  selector: 'test-pagination-default-host',
  standalone: true,
  imports: [DasarPaginationComponent],
  template: `<dasar-pagination [page-count]="count()" [default-page]="def()" />`,
})
class PaginationDefaultHost {
  count = signal(10);
  def = signal(4);
}

@Component({
  selector: 'test-pagination-theme-host',
  standalone: true,
  imports: [DasarPaginationComponent],
  template: `<dasar-pagination />`,
})
class PaginationThemeHost {}

const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-pagination-container') as HTMLElement;

const nativeButtons = (fixture: ComponentFixture<unknown>) =>
  Array.from(
    fixture.nativeElement.querySelectorAll('.dasar-pagination-item button'),
  ) as HTMLButtonElement[];

const itemTexts = (fixture: ComponentFixture<unknown>) =>
  Array.from(fixture.nativeElement.querySelectorAll('.dasar-pagination-item')).map((el) =>
    ((el as HTMLElement).textContent ?? '').trim(),
  );

const menusOf = (fixture: ComponentFixture<unknown>) =>
  Array.from(
    fixture.nativeElement.querySelectorAll('.dasar-pagination-ellipsis-menu'),
  ) as HTMLElement[];

const pagerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.debugElement.query(By.directive(DasarPagination)).componentInstance as DasarPagination;

describe('DasarPagination', () => {
  let component: DasarPagination;
  let fixture: ComponentFixture<DasarPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('DasarPagination defaults', () => {
  let fixture: ComponentFixture<PaginationHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationHost);
    await fixture.whenStable();
  });

  it('renders a single page with prev and next disabled', () => {
    expect(nativeButtons(fixture).length).toBe(3);
    expect(nativeButtons(fixture)[0].disabled).toBe(true);
    expect(nativeButtons(fixture)[2].disabled).toBe(true);
    expect(itemTexts(fixture)).toEqual(['', '1', '']);
  });

  it('renders every page without ellipsis when they fit', async () => {
    fixture.componentInstance.count.set(5);
    await fixture.whenStable();

    expect(nativeButtons(fixture).length).toBe(7);
    expect(fixture.nativeElement.querySelector('.dasar-pagination-ellipsis')).toBeNull();
  });

  it('windows pages around the current page', async () => {
    fixture.componentInstance.count.set(20);
    await fixture.whenStable();
    const pager = pagerOf(fixture);

    const kinds = (items: DasarPaginationItem[]) =>
      items.map((item) => (item.type === 'page' ? item.page : '…'));

    fixture.componentInstance.page.set(1);
    await fixture.whenStable();
    expect(kinds(pager.items)).toEqual([1, 2, 3, 4, 5, 6, 7, '…', 20]);
    expect(itemTexts(fixture)).toEqual(['', '1', '2', '3', '4', '5', '6', '7', '…', '20', '']);

    fixture.componentInstance.page.set(10);
    await fixture.whenStable();
    expect(kinds(pager.items)).toEqual([1, '…', 8, 9, 10, 11, 12, '…', 20]);

    fixture.componentInstance.page.set(20);
    await fixture.whenStable();
    expect(kinds(pager.items)).toEqual([1, '…', 14, 15, 16, 17, 18, 19, 20]);
  });

  it('carries the hidden pages on each ellipsis', async () => {
    fixture.componentInstance.count.set(20);
    fixture.componentInstance.page.set(10);
    await fixture.whenStable();
    const ellipsis = pagerOf(fixture).items.filter((item) => item.type === 'ellipsis');

    expect(ellipsis.length).toBe(2);
    expect(ellipsis[0].pages).toEqual([2, 3, 4, 5, 6, 7]);
    expect(ellipsis[1].pages).toEqual([13, 14, 15, 16, 17, 18, 19]);
  });

  it('clicking a page emits once and marks it active', async () => {
    fixture.componentInstance.count.set(5);
    await fixture.whenStable();

    nativeButtons(fixture)[3].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.updates()).toEqual([3]);
    expect(fixture.componentInstance.page()).toBe(3);
    const active = fixture.nativeElement.querySelector(
      '.dasar-pagination-btn.active',
    ) as HTMLElement;
    expect(active?.textContent?.trim()).toBe('3');
    expect(active?.getAttribute('aria-current')).toBe('page');
  });

  it('clicking the active page emits nothing', async () => {
    fixture.componentInstance.count.set(5);
    await fixture.whenStable();
    fixture.componentInstance.updates.set([]);

    nativeButtons(fixture)[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.updates()).toEqual([]);
  });

  it('moves with prev and next and disables them at the ends', async () => {
    fixture.componentInstance.count.set(3);
    await fixture.whenStable();
    const btns = () => nativeButtons(fixture);

    expect(btns()[0].disabled).toBe(true);
    btns()[btns().length - 1].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.page()).toBe(2);

    btns()[0].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.page()).toBe(1);

    fixture.componentInstance.page.set(3);
    await fixture.whenStable();
    expect(nativeButtons(fixture)[nativeButtons(fixture).length - 1].disabled).toBe(true);
  });

  it('clamps a page above the count without emitting', async () => {
    fixture.componentInstance.count.set(5);
    fixture.componentInstance.page.set(99);
    await fixture.whenStable();

    expect(pagerOf(fixture).page).toBe(5);
    expect(fixture.componentInstance.updates()).toEqual([]);
  });

  it('re-clamps silently when the count shrinks', async () => {
    fixture.componentInstance.count.set(5);
    fixture.componentInstance.page.set(5);
    await fixture.whenStable();
    fixture.componentInstance.updates.set([]);

    fixture.componentInstance.count.set(2);
    await fixture.whenStable();

    expect(pagerOf(fixture).page).toBe(2);
    expect(fixture.componentInstance.updates()).toEqual([]);
  });

  it('blocks interaction when disabled', async () => {
    fixture.componentInstance.count.set(5);
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();
    fixture.componentInstance.updates.set([]);

    nativeButtons(fixture)[3].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.page()).toBe(1);
    expect(fixture.componentInstance.updates()).toEqual([]);
    expect(containerOf(fixture).classList).toContain('disabled');
  });

  it('renders every page and arrow button as icon-only', async () => {
    fixture.componentInstance.count.set(5);
    await fixture.whenStable();

    const buttons = nativeButtons(fixture);
    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) expect(button.classList).toContain('icon-only');
  });

  it('defaults to ghost with a primary active page', async () => {
    fixture.componentInstance.count.set(5);
    fixture.componentInstance.order.set(['pages']);
    await fixture.whenStable();

    const buttons = fixture.debugElement
      .queryAll(By.directive(DasarButton))
      .map((el) => el.componentInstance as DasarButton);
    expect(buttons[2].variant).toBe('ghost');
    expect(buttons[2].appearance).toBe('solid');
    expect(buttons[1].variant).toBe('primary');
    expect(buttons[1].appearance).toBe('subtle');
    expect(buttons[0].variant).toBe('ghost');
  });

  it('makes the active page solid when appearance is solid', async () => {
    fixture.componentInstance.count.set(5);
    fixture.componentInstance.order.set(['pages']);
    fixture.componentInstance.appearance.set('solid');
    await fixture.whenStable();

    const buttons = fixture.debugElement
      .queryAll(By.directive(DasarButton))
      .map((el) => el.componentInstance as DasarButton);
    expect(buttons[1].appearance).toBe('solid');
    expect(buttons[2].variant).toBe('ghost');
  });

  it('gives bordered inactive buttons when appearance is outline', async () => {
    fixture.componentInstance.count.set(5);
    fixture.componentInstance.order.set(['pages']);
    fixture.componentInstance.appearance.set('outline');
    await fixture.whenStable();

    const buttons = fixture.debugElement
      .queryAll(By.directive(DasarButton))
      .map((el) => el.componentInstance as DasarButton);
    expect(buttons[2].variant).toBe('secondary');
    expect(buttons[2].appearance).toBe('outline');
    expect(buttons[1].appearance).toBe('outline');
  });
});

describe('DasarPagination ellipsis dropdown', () => {
  let fixture: ComponentFixture<PaginationHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationHost);
    fixture.componentInstance.count.set(20);
    fixture.componentInstance.page.set(10);
    await fixture.whenStable();
  });

  it('renders a dropdown per ellipsis by default', () => {
    expect(menusOf(fixture).length).toBe(2);
  });

  it('jumps to a picked hidden page', async () => {
    const pager = pagerOf(fixture);
    const pick = vi.spyOn(pager.onUpdatePage, 'emit');

    pager.onEllipsisPick({ label: '15', value: 15 });
    await fixture.whenStable();

    expect(pick).toHaveBeenCalledWith(15);
    expect(fixture.componentInstance.page()).toBe(15);
  });

  it('renders plain ellipses when the dropdown is left out of the order', async () => {
    fixture.componentInstance.order.set(['pages']);
    await fixture.whenStable();

    expect(menusOf(fixture).length).toBe(0);
    expect(
      fixture.nativeElement.querySelectorAll('.dasar-pagination-ellipsis').length,
    ).toBeGreaterThan(0);
  });

  it('renders plain ellipses when disabled', async () => {
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();

    expect(menusOf(fixture).length).toBe(0);
  });
});

describe('DasarPagination default page', () => {
  let fixture: ComponentFixture<PaginationDefaultHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationDefaultHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationDefaultHost);
    await fixture.whenStable();
  });

  it('starts on default-page when page is not bound', () => {
    expect(pagerOf(fixture).page).toBe(4);
  });
});

describe('DasarPagination size picker', () => {
  let fixture: ComponentFixture<PaginationHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationHost);
    await fixture.whenStable();
  });

  const pickerOf = () =>
    fixture.nativeElement.querySelector('.dasar-pagination-size-picker') as HTMLElement | null;

  it('shows the picker by default', () => {
    expect(pickerOf()).not.toBeNull();
  });

  it('hides the picker when size-picker is left out of the order', async () => {
    fixture.componentInstance.order.set(['pages']);
    await fixture.whenStable();

    expect(pickerOf()).toBeNull();
  });

  it('emits on size change and merges a missing value into the options', async () => {
    const pager = pagerOf(fixture);

    pager.changePageSize(30);
    await fixture.whenStable();

    expect(fixture.componentInstance.sizeUpdates()).toEqual([30]);
    expect(pager.pageSizes).toBe(30);
    expect(pager.sizeOptions.map((o) => o.value)).toContain(30);
  });

  it('ignores a repeated size', async () => {
    pagerOf(fixture).changePageSize(10);
    await fixture.whenStable();

    expect(fixture.componentInstance.sizeUpdates()).toEqual([]);
  });
});

describe('DasarPagination summary label', () => {
  let fixture: ComponentFixture<PaginationHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationHost);
    await fixture.whenStable();
  });

  const summaryOf = () =>
    fixture.nativeElement.querySelector('.dasar-pagination-summary') as HTMLElement | null;

  it('renders nothing without a label', () => {
    expect(summaryOf()).toBeNull();
  });

  it('replaces page and count tokens and updates on navigation', async () => {
    fixture.componentInstance.label.set('Page {page} of {count}');
    fixture.componentInstance.count.set(20);
    await fixture.whenStable();
    expect(summaryOf()?.textContent?.trim()).toBe('Page 1 of 20');

    fixture.componentInstance.page.set(4);
    await fixture.whenStable();
    expect(summaryOf()?.textContent?.trim()).toBe('Page 4 of 20');
  });
});

describe('DasarPagination slots', () => {
  let fixture: ComponentFixture<PaginationSlotsHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationSlotsHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationSlotsHost);
    await fixture.whenStable();
  });

  it('renders the label slot with page and count context', () => {
    const summary = fixture.nativeElement.querySelector(
      '.dasar-pagination-summary',
    ) as HTMLElement | null;
    expect(summary?.textContent?.trim()).toBe('L3/7');
  });

  it('renders prefix, suffix and custom icons', () => {
    const container = containerOf(fixture);
    expect(container.textContent).toContain('PRE');
    expect(container.textContent).toContain('SUF');
    expect(container.textContent).toContain('PREV');
    expect(container.textContent).toContain('NEXT');
  });
});

describe('DasarPagination order and slots', () => {
  let fixture: ComponentFixture<PaginationHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationHost);
    await fixture.whenStable();
  });

  it('renders parts in display order', async () => {
    fixture.componentInstance.order.set(['size-picker', 'pages']);
    await fixture.whenStable();

    const children = Array.from(containerOf(fixture).children).map(
      (el) => (el as HTMLElement).className,
    );
    const pickerAt = children.findIndex((c) => c.includes('dasar-pagination-size-picker'));
    const listAt = children.findIndex((c) => c.includes('dasar-pagination-list'));
    expect(pickerAt).toBeGreaterThanOrEqual(0);
    expect(listAt).toBeGreaterThan(pickerAt);
  });
});

describe('DasarPagination classes', () => {
  let fixture: ComponentFixture<PaginationHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationHost],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationHost);
    await fixture.whenStable();
  });

  it('applies size, radius, spacing and fluid classes', async () => {
    fixture.componentInstance.sizeAttr.set('lg');
    fixture.componentInstance.spacing.set('md');
    fixture.componentInstance.fluid.set(true);
    await fixture.whenStable();

    expect(containerOf(fixture).classList).toContain('size-lg');
    expect(containerOf(fixture).classList).toContain('spacing-md');
    expect(containerOf(fixture).classList).toContain('fluid');
  });
});

describe('DasarPagination theme defaults', () => {
  let fixture: ComponentFixture<PaginationThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              pagination: { pageSlot: 7, size: 'lg', fluid: true, label: 'Side {page}/{count}' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationThemeHost);
    await fixture.whenStable();
  });

  it('reads pagination config from the component config', () => {
    const pager = pagerOf(fixture);
    expect(pager.pageSlot).toBe(7);
    expect(pager.size).toBe('lg');
    expect(pager.fluid).toBe(true);
    expect(pager.label).toBe('Side {page}/{count}');
  });
});

describe('paginationMap tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('maps pagination tokens to css variables', () => {
    expect(paginationMap['gap']).toBe('--dasar-pagination-gap');
    expect(paginationMap['fontSize']).toBe('--dasar-pagination-font-size');
    expect(paginationMap['itemMinWidth']).toBe('--dasar-pagination-item-min-width');
    expect(paginationMap['ellipsisColor']).toBe('--dasar-pagination-ellipsis-color');
    expect(paginationMap['summaryColor']).toBe('--dasar-pagination-summary-color');
    expect(paginationMap['dropdownMaxHeight']).toBe('--dasar-pagination-dropdown-max-height');
  });
});
