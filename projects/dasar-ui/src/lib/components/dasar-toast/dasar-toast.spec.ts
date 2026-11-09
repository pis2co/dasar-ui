import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { DasarToast, DasarToastAppearanceType } from './dasar-toast';
import { DasarToastItem } from './dasar-toast.model';
import { DasarToastService } from './dasar-toast.service';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';

function createMockItem(): DasarToastItem {
  return {
    id: 1,
    options: {
      label: 'Test Toast',
      variant: 'primary',
    },
    state: 'visible',
    ref: {
      id: 1,
      close: () => {},
      update: () => {},
    },
  };
}

@Component({
  imports: [DasarToast],
  template: `
    @if (appearance()) {
      <dasar-toast [item]="item" [appearance]="appearance()!" />
    } @else {
      <dasar-toast [item]="item" />
    }
  `,
})
class ToastTestHost {
  item = createMockItem();
  appearance = signal<DasarToastAppearanceType | undefined>(undefined);
}

@Component({
  imports: [DasarToast],
  template: ` <dasar-toast [item]="item" /> `,
})
class ThemedToastTestHost {
  item = createMockItem();
}

describe('DasarToast appearance', () => {
  it('defaults to solid appearance and applies appearance-solid class', async () => {
    await TestBed.configureTestingModule({
      imports: [ToastTestHost],
      providers: [DasarToastService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ToastTestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const toastDebug = fixture.debugElement.query(By.directive(DasarToast));
    const toastInstance = toastDebug.componentInstance as DasarToast;
    const toastEl = fixture.nativeElement.querySelector('.dasar-toast') as HTMLElement;

    expect(toastInstance.appearance).toBe('solid');
    expect(toastEl.classList.contains('appearance-solid')).toBe(true);
    expect(toastEl.classList.contains('appearance-elevated')).toBe(false);
  });

  it('applies appearance-elevated class when appearance is set to elevated', async () => {
    await TestBed.configureTestingModule({
      imports: [ToastTestHost],
      providers: [DasarToastService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ToastTestHost);
    fixture.componentInstance.appearance.set('elevated');
    fixture.detectChanges();
    await fixture.whenStable();

    const toastDebug = fixture.debugElement.query(By.directive(DasarToast));
    const toastInstance = toastDebug.componentInstance as DasarToast;
    const toastEl = fixture.nativeElement.querySelector('.dasar-toast') as HTMLElement;

    expect(toastInstance.appearance).toBe('elevated');
    expect(toastEl.classList.contains('appearance-elevated')).toBe(true);
    expect(toastEl.classList.contains('appearance-solid')).toBe(false);
  });

  it('respects theme-provided default appearance when configured in DASAR_THEME_PROVIDER', async () => {
    const customThemeConfig = {
      componentConfig: {
        toast: {
          appearance: 'elevated' as const,
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ThemedToastTestHost],
      providers: [
        DasarToastService,
        { provide: DASAR_THEME_PROVIDER, useValue: customThemeConfig },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ThemedToastTestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const toastDebug = fixture.debugElement.query(By.directive(DasarToast));
    const toastInstance = toastDebug.componentInstance as DasarToast;
    const toastEl = fixture.nativeElement.querySelector('.dasar-toast') as HTMLElement;

    expect(toastInstance.appearance).toBe('elevated');
    expect(toastEl.classList.contains('appearance-elevated')).toBe(true);
  });
});
