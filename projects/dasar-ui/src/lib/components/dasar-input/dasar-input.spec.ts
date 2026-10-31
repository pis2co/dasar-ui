import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgpInput } from 'ng-primitives/input';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarInput } from './dasar-input';

@Component({
  selector: 'test-input-host',
  standalone: true,
  imports: [DasarInput],
  template: `<dasar-input [hint]="hint()" [error]="error()" [disabled]="disabled()" />`,
})
class InputHost {
  hint = signal('');
  error = signal(false);
  disabled = signal(false);
}

const inputOf = (fixture: ComponentFixture<unknown>) =>
  fixture.debugElement.query(By.directive(DasarInput)).componentInstance as DasarInput;

describe('DasarInput', () => {
  let fixture: ComponentFixture<InputHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputHost],
    }).compileComponents();

    fixture = TestBed.createComponent(InputHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(inputOf(fixture)).toBeTruthy();
  });

  it('renders the hint and marks it as an error', async () => {
    fixture.componentInstance.hint.set('Use letters only.');
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();

    const hint = fixture.nativeElement.querySelector('.dasar-input-hint') as HTMLElement;
    expect(hint?.textContent).toContain('Use letters only.');
    expect(hint.classList).toContain('error');
    expect(hint.getAttribute('id')).toBe(inputOf(fixture).hintId);
    const native = fixture.nativeElement.querySelector('.dasar-input-native') as HTMLElement;
    expect(native.getAttribute('aria-invalid')).toBe('true');
    expect(native.getAttribute('aria-describedby')).toBe(inputOf(fixture).hintId);
  });

  it('reads hint from the component config', async () => {
    await TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [DasarInput],
        providers: [
          {
            provide: DASAR_THEME_PROVIDER,
            useValue: { componentConfig: { input: { hint: 'Global hint' } } },
          },
        ],
      })
      .compileComponents();
    const themed = TestBed.createComponent(DasarInput);
    await themed.whenStable();
    expect(themed.componentInstance.hint).toBe('Global hint');
  });

  describe('ng-primitives NgpInput integration', () => {
    it('applies ngpInput directive to the native input element', async () => {
      const inputDebugEl = fixture.debugElement.query(By.css('input.dasar-input-native'));
      expect(inputDebugEl).toBeTruthy();

      const ngpDirective = inputDebugEl.injector.get(NgpInput, null);
      expect(ngpDirective).toBeTruthy();
    });

    it('syncs disabled state to the native input and primitive', async () => {
      const inputDebugEl = fixture.debugElement.query(By.css('input.dasar-input-native'));
      const inputNative = inputDebugEl.nativeElement as HTMLInputElement;

      expect(inputNative.disabled).toBe(false);

      fixture.componentInstance.disabled.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(inputNative.disabled).toBe(true);
      expect(inputNative.getAttribute('data-disabled')).not.toBeNull();
    });

    it('toggles primitive data-attributes on focus and hover', async () => {
      const inputDebugEl = fixture.debugElement.query(By.css('input.dasar-input-native'));
      const inputNative = inputDebugEl.nativeElement as HTMLInputElement;

      // Hover
      inputNative.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(inputNative.hasAttribute('data-hover')).toBe(true);

      inputNative.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      expect(inputNative.hasAttribute('data-hover')).toBe(false);

      // Focus
      inputNative.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(inputNative.hasAttribute('data-focus')).toBe(true);

      inputNative.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();
      expect(inputNative.hasAttribute('data-focus')).toBe(false);
    });
  });
});
