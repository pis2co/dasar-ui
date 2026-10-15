import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DasarSelect, DasarSelectComponent } from './dasar-select';

@Component({
  standalone: true,
  imports: [FormsModule, DasarSelectComponent],
  template: `
    <dasar-select
      [size]="size()"
      [radius]="radius()"
      [placement]="placement()"
      [options]="options"
      [ngModel]="value"
    />
  `,
})
class SelectHost {
  size = signal<'sm' | 'md' | 'lg'>('sm');
  radius = signal<'none' | 'md' | 'lg' | 'full'>('lg');
  placement = signal<'bottom-start' | 'top-start'>('bottom-start');
  value = '';
  options = [
    { label: 'Alpha', value: 'a', iconName: 'info-circle' },
    { label: 'Beta', value: 'b' },
  ];
}

describe('DasarSelect', () => {
  let component: DasarSelect;
  let fixture: ComponentFixture<SelectHost>;
  let host: SelectHost;

  const container = () =>
    fixture.nativeElement.querySelector('.dasar-select-container') as HTMLElement;
  const panel = () =>
    fixture.nativeElement.querySelector('.dasar-select-dropdown-panel') as HTMLElement;
  const open = async () => {
    container().click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectHost);
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

  it('arrow icon scales with the select size', () => {
    const svg = container().querySelector('.dasar-select-arrow-btn dasar-icon svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('14');
  });

  it('option icons scale with the select size', async () => {
    await open();

    const svg = panel().querySelector('.dasar-select-option dasar-icon svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('14');
  });
});
