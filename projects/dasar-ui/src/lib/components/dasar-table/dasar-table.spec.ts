import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { tableMap } from '../../services/theme.service';
import { DasarTable, DasarTableAppearance, DasarTableRadiusType } from './dasar-table';

@Component({
  selector: 'test-table-radius-host',
  standalone: true,
  imports: [DasarTable],
  template: `<dasar-table
    [radius]="radius()"
    [appearance]="appearance()"
    [data]="[]"
    [columns]="[]"
  ></dasar-table>`,
})
class TableRadiusHost {
  radius = signal<DasarTableRadiusType>('md');
  appearance = signal<DasarTableAppearance>('outline');
}

@Component({
  selector: 'test-table-theme-host',
  standalone: true,
  imports: [DasarTable],
  template: `<dasar-table [data]="[]" [columns]="[]"></dasar-table>`,
})
class TableThemeHost {}

const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-table-container') as HTMLElement | null;

describe('DasarTable', () => {
  let component: DasarTable;
  let fixture: ComponentFixture<DasarTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('DasarTable radius', () => {
  let fixture: ComponentFixture<TableRadiusHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRadiusHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TableRadiusHost);
    await fixture.whenStable();
  });

  it('defaults to radius-md', () => {
    expect(containerOf(fixture)?.classList).toContain('radius-md');
  });

  it('radius drives the container class', async () => {
    for (const value of ['none', 'sm', 'lg', 'full'] as DasarTableRadiusType[]) {
      fixture.componentInstance.radius.set(value);
      await fixture.whenStable();

      expect(containerOf(fixture)?.classList).toContain(`radius-${value}`);
    }
  });

  it('keeps the borderless appearance square', async () => {
    fixture.componentInstance.appearance.set('borderless');
    fixture.componentInstance.radius.set('lg');
    await fixture.whenStable();

    expect(containerOf(fixture)?.classList).toContain('radius-lg');
    expect(containerOf(fixture)?.classList).toContain('appearance-borderless');
  });
});

describe('DasarTable radius theme default', () => {
  let fixture: ComponentFixture<TableThemeHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: { componentConfig: { table: { radius: 'none' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableThemeHost);
    await fixture.whenStable();
  });

  it('reads radius from the component config', () => {
    expect(containerOf(fixture)?.classList).toContain('radius-none');
  });
});

describe('tableMap container radius tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('maps the per-size container radius tokens', () => {
    expect(tableMap['containerRadiusNone']).toBe('--dasar-table-container-radius-none');
    expect(tableMap['containerRadiusXs']).toBe('--dasar-table-container-radius-xs');
    expect(tableMap['containerRadiusSm']).toBe('--dasar-table-container-radius-sm');
    expect(tableMap['containerRadiusMd']).toBe('--dasar-table-container-radius-md');
    expect(tableMap['containerRadiusLg']).toBe('--dasar-table-container-radius-lg');
    expect(tableMap['containerRadiusXl']).toBe('--dasar-table-container-radius-xl');
    expect(tableMap['containerRadiusFull']).toBe('--dasar-table-container-radius-full');
  });
});
