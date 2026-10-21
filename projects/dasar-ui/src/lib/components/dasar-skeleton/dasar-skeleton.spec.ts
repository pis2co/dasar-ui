import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DASAR_THEME_PROVIDER,
  DasarThemeProviderComponent,
} from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeConfig } from '../../models/theme.model';
import { DasarSkeletonComponent, DasarSkeletonSizeType, DasarSkeletonType } from './dasar-skeleton';

@Component({
  selector: 'test-skeleton-host',
  standalone: true,
  imports: [DasarSkeletonComponent],
  template: `<dasar-skeleton
    [type]="type()"
    [size]="size()"
    [radius]="radius()"
    [width]="width()"
    [height]="height()"
    [fullWidth]="fullWidth()"
    [repeat]="repeat()"
    [animated]="animated()"
    [circle]="circle()"
  />`,
})
class SkeletonHost {
  type = signal<DasarSkeletonType>('text');
  size = signal<DasarSkeletonSizeType>('md');
  radius = signal<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  width = signal<string | number | null>(null);
  height = signal<string | number | null>(null);
  fullWidth = signal(false);
  repeat = signal(1);
  animated = signal(true);
  circle = signal(false);
}

@Component({
  selector: 'test-skeleton-theme-host',
  standalone: true,
  imports: [DasarSkeletonComponent],
  template: `<dasar-skeleton />`,
})
class SkeletonThemeHost {}

@Component({
  selector: 'test-skeleton-tokens-host',
  standalone: true,
  imports: [DasarThemeProviderComponent, DasarSkeletonComponent],
  template: `<dasar-theme-provider [tokenConfig]="tokens()">
    <dasar-skeleton />
  </dasar-theme-provider>`,
})
class SkeletonTokensHost {
  tokens = signal<DasarThemeConfig['tokens']>({});
}

const itemsOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelectorAll('.dasar-skeleton-item') as NodeListOf<HTMLElement>;
const itemOf = (fixture: ComponentFixture<unknown>, index: number) =>
  itemsOf(fixture)[index] as HTMLElement;
const containerOf = (fixture: ComponentFixture<unknown>) =>
  fixture.nativeElement.querySelector('.dasar-skeleton') as HTMLElement;

describe('DasarSkeleton', () => {
  let fixture: ComponentFixture<SkeletonHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a single text line by default', () => {
    const item = itemOf(fixture, 0);

    expect(itemsOf(fixture).length).toBe(1);
    expect(item.classList).toContain('dasar-skeleton-item');
    expect(item.classList).toContain('type-text');
    expect(item.classList).toContain('radius-md');
  });

  it('animates by default and can be disabled', async () => {
    expect(itemOf(fixture, 0).classList).toContain('animated');

    fixture.componentInstance.animated.set(false);
    await fixture.whenStable();

    expect(itemOf(fixture, 0).classList).not.toContain('animated');
  });

  it('renders a box shape', async () => {
    fixture.componentInstance.type.set('box');
    await fixture.whenStable();

    expect(itemOf(fixture, 0).classList).toContain('type-box');
  });

  it('applies width and height', async () => {
    fixture.componentInstance.width.set(120);
    fixture.componentInstance.height.set('2rem');
    await fixture.whenStable();

    const item = itemOf(fixture, 0);

    expect(item.style.width).toBe('120px');
    expect(item.style.height).toBe('2rem');
  });

  it('treats numeric strings from plain attributes as pixels', async () => {
    fixture.componentInstance.circle.set(true);
    fixture.componentInstance.height.set('48');
    await fixture.whenStable();

    const item = itemOf(fixture, 0);

    expect(item.style.width).toBe('48px');
    expect(item.style.height).toBe('48px');
  });

  it('forces the full width when fullWidth is set', async () => {
    fixture.componentInstance.type.set('box');
    fixture.componentInstance.fullWidth.set(true);
    await fixture.whenStable();

    expect(itemOf(fixture, 0).style.width).toBe('100%');
    expect(containerOf(fixture).classList).toContain('full-width');
  });

  it('repeats the item and shortens the last text line', async () => {
    fixture.componentInstance.repeat.set(3);
    await fixture.whenStable();

    expect(itemsOf(fixture).length).toBe(3);
    expect(itemOf(fixture, 0).style.width).toBe('100%');
    expect(itemOf(fixture, 1).style.width).toBe('100%');
    expect(itemOf(fixture, 2).style.width).toBe('60%');
  });

  it('renders a circle with equal width and height', async () => {
    fixture.componentInstance.circle.set(true);
    fixture.componentInstance.height.set(48);
    fixture.componentInstance.radius.set('xs');
    await fixture.whenStable();

    const item = itemOf(fixture, 0);

    expect(item.classList).toContain('circle');
    expect(item.classList).not.toContain('radius-xs');
    expect(item.style.width).toBe('48px');
    expect(item.style.height).toBe('48px');
  });

  it('maps the size to default dimensions', async () => {
    fixture.componentInstance.type.set('box');
    fixture.componentInstance.size.set('xl');
    await fixture.whenStable();

    expect(itemOf(fixture, 0).style.width).toBe('200px');
    expect(itemOf(fixture, 0).style.height).toBe('160px');
  });
});

describe('DasarSkeleton theme defaults', () => {
  it('reads type, size and animation from the component config', async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonThemeHost],
      providers: [
        {
          provide: DASAR_THEME_PROVIDER,
          useValue: {
            componentConfig: {
              skeleton: { type: 'box', size: 'lg', animated: false },
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SkeletonThemeHost);
    await fixture.whenStable();

    const item = itemOf(fixture, 0);

    expect(item.classList).toContain('type-box');
    expect(item.classList).not.toContain('animated');
    expect(item.style.width).toBe('160px');
    expect(item.style.height).toBe('120px');
  });
});

describe('DasarSkeleton theme tokens', () => {
  let fixture: ComponentFixture<SkeletonTokensHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonTokensHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonTokensHost);
    await fixture.whenStable();
  });

  it('writes the skeleton tokens on the provider host', async () => {
    fixture.componentInstance.tokens.set({
      light: {
        skeleton: {
          baseColor: 'red',
          highlightColor: 'blue',
          animationDuration: '2s',
          gap: '4px',
        },
      },
    });
    await fixture.whenStable();

    const host = fixture.nativeElement.querySelector('dasar-theme-provider') as HTMLElement;

    expect(host.style.getPropertyValue('--dasar-skeleton-base-color')).toBe('red');
    expect(host.style.getPropertyValue('--dasar-skeleton-highlight-color')).toBe('blue');
    expect(host.style.getPropertyValue('--dasar-skeleton-animation-duration')).toBe('2s');
    expect(host.style.getPropertyValue('--dasar-skeleton-gap')).toBe('4px');
  });
});
