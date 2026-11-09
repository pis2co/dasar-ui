import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import {
  DasarMenu,
  DasarMenuAppearanceType,
  DasarMenuComponent,
  DasarMenuItem,
  DasarMenuPlacementType,
  DasarMenuRadiusType,
  DasarMenuSizeType,
  DasarMenuTrigger,
} from './dasar-menu';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';

@Component({
  standalone: true,
  imports: [DasarMenuComponent],
  template: `
    <button
      class="trigger-btn"
      [dasarMenuTrigger]="menuTpl"
      [dasarMenuTriggerPlacement]="placement()"
      [dasarMenuTriggerDisabled]="disabled()"
    >
      Menu
    </button>
    <ng-template #menuTpl>
      <dasar-menu
        [size]="size()"
        [radius]="radius()"
        [appearance]="appearance()"
        [items]="items"
        [itemClass]="itemClass()"
        [panelClass]="panelClass()"
        (onItemClick)="clicks.set([...clicks(), $event])"
      />
    </ng-template>
  `,
})
class MenuHost {
  size = signal<DasarMenuSizeType>('sm');
  radius = signal<DasarMenuRadiusType>('lg');
  placement = signal<DasarMenuPlacementType>('bottom-start');
  appearance = signal<DasarMenuAppearanceType>('outline');
  disabled = signal<boolean>(false);
  itemClass = signal<string | null>(null);
  panelClass = signal<string | null>(null);
  clicks = signal<DasarMenuItem[]>([]);
  items: DasarMenuItem[] = [
    { label: 'One', value: 1, iconName: 'info-circle' },
    { label: 'Two', value: 2 },
    { label: 'Divider', value: 'div', divider: true },
    { label: 'Disabled Item', value: 3, disabled: true },
  ];
}

@Component({
  standalone: true,
  imports: [DasarMenuComponent],
  template: `
    <button class="trigger-custom-btn" [dasarMenuTrigger]="customTpl">Open</button>
    <ng-template #customTpl>
      <dasar-menu [items]="items">
        <ng-template menu-item-template let-item let-i="index">
          <span class="custom-item-label">{{ i }}: {{ item.label }}</span>
        </ng-template>
      </dasar-menu>
    </ng-template>
  `,
})
class MenuCustomTemplateHost {
  items: DasarMenuItem[] = [
    { label: 'Custom A', value: 'a' },
    { label: 'Custom B', value: 'b' },
  ];
}

@Component({
  standalone: true,
  imports: [DasarMenuComponent],
  template: `
    <button class="trigger-theme-btn" [dasarMenuTrigger]="themeTpl">Theme Menu</button>
    <ng-template #themeTpl>
      <dasar-menu [items]="items" />
    </ng-template>
  `,
})
class MenuThemeHost {
  items: DasarMenuItem[] = [{ label: 'Item 1', value: 1 }];
}

describe('DasarMenu', () => {
  let fixture: ComponentFixture<MenuHost>;
  let host: MenuHost;

  const trigger = () => fixture.nativeElement.querySelector('.trigger-btn') as HTMLElement;
  const menuElement = () => document.querySelector('dasar-menu') as HTMLElement | null;
  const panel = () => document.querySelector('.dasar-menu-panel') as HTMLElement | null;
  const items = () => Array.from(document.querySelectorAll('.dasar-menu-item')) as HTMLElement[];

  const openMenu = async () => {
    trigger().click();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 50));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuHost],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('dasar-menu').forEach((el) => el.remove());
  });

  it('renders no menu or panel while closed', () => {
    expect(menuElement()).toBeNull();
    expect(panel()).toBeNull();
  });

  it('renders menu and panel when trigger is clicked', async () => {
    await openMenu();

    expect(menuElement()).toBeTruthy();
    expect(panel()).toBeTruthy();
    expect(panel()!.classList).toContain('size-sm');
    expect(panel()!.classList).toContain('radius-lg');
    expect(panel()!.classList).toContain('appearance-outline');
  });

  it('reflects size, radius and appearance changes', async () => {
    host.size.set('lg');
    host.radius.set('none');
    host.appearance.set('elevated');

    await openMenu();

    expect(panel()!.classList).toContain('size-lg');
    expect(panel()!.classList).toContain('radius-none');
    expect(panel()!.classList).toContain('appearance-elevated');
  });

  it('applies filled appearance class correctly', async () => {
    host.appearance.set('filled');
    await openMenu();

    expect(panel()!.classList).toContain('appearance-filled');
  });

  it('applies appearance-none correctly', async () => {
    host.appearance.set('none');
    await openMenu();

    expect(panel()!.classList).toContain('appearance-none');
  });

  it('renders items with divider and disabled states correctly', async () => {
    await openMenu();

    const renderedItems = items();
    expect(renderedItems.length).toBe(3); // 3 non-divider items
    expect(document.querySelector('.dasar-menu-divider')).toBeTruthy();
    expect(renderedItems[2].classList).toContain('disabled');
  });

  it('renders item icons scaling with the menu size', async () => {
    await openMenu();

    const svg = panel()!.querySelector('.dasar-menu-item dasar-icon svg') as SVGElement;
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('width')).toBe('14');
  });

  it('clicking an item emits onItemClick and closes the menu', async () => {
    await openMenu();

    const renderedItems = items();
    renderedItems[0].click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.clicks().length).toBe(1);
    expect(host.clicks()[0].value).toBe(1);
    expect(panel()).toBeNull();
  });

  it('clicking a disabled item does not emit onItemClick and does not close menu', async () => {
    await openMenu();

    const renderedItems = items();
    renderedItems[2].click(); // disabled item
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.clicks().length).toBe(0);
    expect(panel()).toBeTruthy();
  });

  it('does not open when trigger is disabled', async () => {
    host.disabled.set(true);
    fixture.detectChanges();

    await openMenu();
    expect(panel()).toBeNull();
  });

  it('supports custom item templates via DasarMenuItemTemplate', async () => {
    const customFixture = TestBed.createComponent(MenuCustomTemplateHost);
    customFixture.detectChanges();

    const customBtn = customFixture.nativeElement.querySelector(
      '.trigger-custom-btn',
    ) as HTMLElement;
    customBtn.click();
    await customFixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 50));
    customFixture.detectChanges();

    const customLabels = Array.from(document.querySelectorAll('.custom-item-label')).map((el) =>
      el.textContent?.trim(),
    );
    expect(customLabels).toEqual(['0: Custom A', '1: Custom B']);
  });

  it('reads theme defaults from DASAR_THEME_PROVIDER', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [MenuThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              menu: {
                appearance: 'elevated',
                radius: 'xl',
                size: 'lg',
              },
            },
          },
        },
      ],
    }).compileComponents();

    const tFixture = TestBed.createComponent(MenuThemeHost);
    tFixture.detectChanges();

    const themeBtn = tFixture.nativeElement.querySelector('.trigger-theme-btn') as HTMLElement;
    themeBtn.click();
    await tFixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 50));
    tFixture.detectChanges();

    const themePanel = document.querySelector('.dasar-menu-panel') as HTMLElement;
    expect(themePanel).toBeTruthy();
    expect(themePanel.classList).toContain('appearance-elevated');
    expect(themePanel.classList).toContain('radius-xl');
    expect(themePanel.classList).toContain('size-lg');
  });
});
