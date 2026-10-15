import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DasarNumberInput } from './dasar-number-input';

@Component({
  selector: 'test-number-input-host',
  standalone: true,
  imports: [DasarNumberInput],
  template: `<dasar-number-input [hint]="hint()" [error]="error()" />`,
})
class NumberInputHost {
  hint = signal('');
  error = signal(false);
}

const numberInputOf = (fixture: ComponentFixture<unknown>) =>
  fixture.debugElement.query(By.directive(DasarNumberInput)).componentInstance as DasarNumberInput;

describe('DasarNumberinput', () => {
  let fixture: ComponentFixture<NumberInputHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputHost],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberInputHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(numberInputOf(fixture)).toBeTruthy();
  });

  it('renders the hint and marks it as an error', async () => {
    fixture.componentInstance.hint.set('Max 10 items.');
    fixture.componentInstance.error.set(true);
    await fixture.whenStable();

    const hint = fixture.nativeElement.querySelector('.dasar-number-input-hint') as HTMLElement;
    expect(hint?.textContent).toContain('Max 10 items.');
    expect(hint.classList).toContain('error');
    expect(hint.getAttribute('id')).toBe(numberInputOf(fixture).hintId);
    const native = fixture.nativeElement.querySelector('.dasar-number-input-native') as HTMLElement;
    expect(native.getAttribute('aria-invalid')).toBe('true');
    expect(native.getAttribute('aria-describedby')).toBe(numberInputOf(fixture).hintId);
  });
});
