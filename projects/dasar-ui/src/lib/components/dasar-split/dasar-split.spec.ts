import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { DasarSplit } from './dasar-split';

@Component({
  imports: [DasarSplit],
  template: `
    <dasar-split
      [direction]="direction()"
      [size]="size()"
      [min]="min()"
      [max]="max()"
      [disabled]="disabled()"
      first-panel-class="custom-first"
      (onDragStart)="starts.push($event)"
      (onUpdateSize)="updates.push($event)"
      (onDragEnd)="ends.push($event)"
      (sizeChange)="size.set($event)"
    >
      <div first-panel-slot class="first-content">first</div>
      <div second-panel-slot class="second-content">second</div>
      <span trigger-panel class="grip">grip</span>
    </dasar-split>
  `,
})
class Host {
  direction = signal<'horizontal' | 'vertical'>('horizontal');
  size = signal<string | number>(200);
  min = signal<string | number>(0);
  max = signal<string | number>('100%');
  disabled = signal(false);
  starts: number[] = [];
  updates: number[] = [];
  ends: number[] = [];
}

const rect = (width: number, height: number) =>
  ({ width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0 }) as DOMRect;

describe('DasarSplit', () => {
  let fixture: ComponentFixture<Host>;
  let host: Host;
  let root: HTMLElement;
  let bar: HTMLElement;
  let first: HTMLElement;

  const pointer = (type: string, x: number, y: number) => {
    const event = new Event(type, { bubbles: true, cancelable: true }) as any;
    event.clientX = x;
    event.clientY = y;
    event.pointerId = 1;
    bar.dispatchEvent(event);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    fixture = TestBed.createComponent(Host);
    host = fixture.componentInstance;
    fixture.detectChanges();
    root = fixture.nativeElement as HTMLElement;
    bar = root.querySelector('.dasar-split-bar') as HTMLElement;
    first = root.querySelector('.dasar-split-first') as HTMLElement;
    const container = root.querySelector('.dasar-split') as HTMLElement;
    container.getBoundingClientRect = () => rect(1000, 600);
    first.getBoundingClientRect = () =>
      host.direction() === 'horizontal'
        ? rect(Number(host.size()) || 200, 600)
        : rect(1000, Number(host.size()) || 200);
  });

  it('projects the slots', () => {
    expect(root.querySelector('.dasar-split-first .first-content')).toBeTruthy();
    expect(root.querySelector('.dasar-split-second .second-content')).toBeTruthy();
    expect(root.querySelector('.dasar-split-bar .grip')).toBeTruthy();
  });

  it('applies size and panel class', () => {
    expect(first.style.flexBasis).toBe('200px');
    expect(first.classList.contains('custom-first')).toBe(true);
  });

  it('switches layout class with direction', () => {
    expect(root.querySelector('.dasar-split')!.classList.contains('horizontal')).toBe(true);
    host.direction.set('vertical');
    fixture.detectChanges();
    expect(root.querySelector('.dasar-split')!.classList.contains('vertical')).toBe(true);
    expect(bar.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('emits drag events with sizes while dragging horizontally', () => {
    pointer('pointerdown', 200, 10);
    pointer('pointermove', 260, 10);
    pointer('pointermove', 300, 10);
    pointer('pointerup', 300, 10);
    expect(host.starts).toEqual([200]);
    expect(host.updates).toEqual([260, 300]);
    expect(host.ends).toEqual([300]);
    expect(host.size()).toBe(300);
  });

  it('drags along the y axis when vertical', () => {
    host.direction.set('vertical');
    fixture.detectChanges();
    pointer('pointerdown', 10, 200);
    pointer('pointermove', 10, 250);
    pointer('pointerup', 10, 250);
    expect(host.updates).toEqual([250]);
  });

  it('clamps to min and max', () => {
    host.min.set(150);
    host.max.set('50%');
    fixture.detectChanges();
    pointer('pointerdown', 200, 0);
    pointer('pointermove', 0, 0);
    expect(host.updates.at(-1)).toBe(150);
    pointer('pointermove', 900, 0);
    expect(host.updates.at(-1)).toBe(500);
    pointer('pointerup', 900, 0);
  });

  it('ignores pointer input when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    pointer('pointerdown', 200, 0);
    pointer('pointermove', 300, 0);
    expect(host.starts).toEqual([]);
    expect(host.updates).toEqual([]);
    expect(bar.getAttribute('aria-disabled')).toBe('true');
  });

  it('moves with the keyboard', () => {
    const key = (k: string, shiftKey = false) =>
      bar.dispatchEvent(new KeyboardEvent('keydown', { key: k, shiftKey, bubbles: true }));
    key('ArrowRight');
    expect(host.updates.at(-1)).toBe(210);
    key('ArrowRight', true);
    expect(host.updates.at(-1)).toBe(260);
    key('Home');
    expect(host.updates.at(-1)).toBe(0);
    key('End');
    expect(host.updates.at(-1)).toBe(1000);
  });

  it('does not emit when the size stays the same', () => {
    host.min.set(200);
    fixture.detectChanges();
    bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(host.updates).toEqual([]);
  });
});
