import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarInput } from './dasar-input';

@Component({
  selector: 'test-input-host',
  standalone: true,
  imports: [DasarInput],
  template: `<dasar-input [hint]="hint()" [error]="error()" />`,
})
class InputHost {
  hint = signal('');
  error = signal(false);
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
});
