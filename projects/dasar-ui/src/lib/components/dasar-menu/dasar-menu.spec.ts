import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasarMenu, DasarMenuComponent } from './dasar-menu';

@Component({
  standalone: true,
  imports: [DasarMenuComponent],
  template: `
    <dasar-menu
      [size]="size()"
      [radius]="radius()"
      [placement]="placement()"
      label="Menu"
      [items]="items"
    />
  `,
})
class MenuHost {
  size = signal<'sm' | 'md' | 'lg'>('sm');
  radius = signal<'none' | 'md' | 'lg' | 'full'>('lg');
  placement = signal<'bottom-start' | 'top-start'>('bottom-start');
  items = [{ label: 'One', value: 1, iconName: 'info-circle' }];
}

describe('DasarMenu', () => {
  let component: DasarMenu;
  let fixture: ComponentFixture<MenuHost>;
  let host: MenuHost;

  const panel = () => fixture.nativeElement.querySelector('.dasar-menu-panel') as HTMLElement;
  const open = async () => {
    (fixture.nativeElement.querySelector('.dasar-menu-trigger') as HTMLElement).click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuHost],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuHost);
    host = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders no panel while closed', () => {
    expect(panel()).toBeNull();
  });

  it('panel follows size and radius of the trigger', async () => {
    await open();

    expect(panel()).toBeTruthy();
    expect(panel().classList).toContain('size-sm');
    expect(panel().classList).toContain('radius-lg');
    expect(panel().classList).toContain('placement-bottom-start');
  });

  it('panel reflects a radius change', async () => {
    host.radius.set('none');
    await open();

    expect(panel().classList).toContain('radius-none');
  });

  it('panel starts at the requested placement', async () => {
    host.placement.set('top-start');
    await open();

    expect(panel().classList).toContain('placement-top-start');
  });

  it('item icons scale with the menu size', async () => {
    await open();

    const svg = panel().querySelector('.dasar-menu-item dasar-icon svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('14');
  });

  it('selecting an item closes the panel', async () => {
    await open();

    (panel().querySelector('.dasar-menu-item') as HTMLElement).click();
    await fixture.whenStable();

    expect(panel()).toBeNull();
  });
});
