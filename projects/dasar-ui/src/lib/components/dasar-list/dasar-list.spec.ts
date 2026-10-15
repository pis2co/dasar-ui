import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { listMap } from '../../services/theme.service';
import { DasarList, DasarListComponent, DasarListRadiusType } from './dasar-list';

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

const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-list-container') as HTMLElement | null;

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

describe('listMap radius tokens', () => {
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
});
