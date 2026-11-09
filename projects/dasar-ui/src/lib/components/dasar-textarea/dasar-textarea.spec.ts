import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgpTextarea } from 'ng-primitives/textarea';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarTextarea, DasarTextareaComponent } from './dasar-textarea';

@Component({
  standalone: true,
  imports: [DasarTextareaComponent, FormsModule],
  template: `<dasar-textarea
    [value]="value()"
    [disabled]="disabled()"
    [placeholder]="placeholder()"
  />`,
})
class TextareaTestHost {
  value = signal('Hello');
  disabled = signal(false);
  placeholder = signal('Write something...');
}

@Component({
  standalone: true,
  imports: [DasarTextareaComponent],
  template: `<dasar-textarea />`,
})
class TextareaThemeDefaultHost {}

describe('DasarTextarea', () => {
  let component: DasarTextarea;
  let fixture: ComponentFixture<DasarTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasarTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(DasarTextarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Theme resolution & literal fallback', () => {
    it('uses literal defaults when no theme provider is present', () => {
      expect(component.appearance).toBe('outline');
      expect(component.size).toBe('md');
      expect(component.radius).toBe('md');
      expect(component.rows).toBe(4);
      expect(component.cols).toBe(20);
      expect(component.hint).toBe('');
      expect(component.placeholder).toBe('');
      expect(component.label).toBeUndefined();
      expect(component.labelRight).toBeUndefined();
      expect(component.fullWidth).toBe(false);
      expect(component.disabled).toBe(false);
      expect(component.readonly).toBe(false);
      expect(component.error).toBe(false);
    });

    it('resolves defaults from theme provider when present', async () => {
      const themeConfig = {
        components: {
          textarea: {
            appearance: 'elevated',
            size: 'lg',
            radius: 'full',
            rows: 8,
            cols: 40,
            hint: 'Default theme hint',
            placeholder: 'Theme placeholder',
            label: 'Theme label',
            fullWidth: true,
            disabled: true,
            readonly: true,
            error: true,
          },
        },
      };

      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [TextareaThemeDefaultHost],
        providers: [
          {
            provide: DASAR_THEME_PROVIDER,
            useValue: { componentConfig: themeConfig.components },
          },
        ],
      }).compileComponents();

      const themed = TestBed.createComponent(TextareaThemeDefaultHost);
      themed.detectChanges();
      await themed.whenStable();

      const textareaEl = themed.debugElement.query(By.directive(DasarTextarea));
      const instance = textareaEl.componentInstance as DasarTextarea;

      expect(instance.appearance).toBe('elevated');
      expect(instance.size).toBe('lg');
      expect(instance.radius).toBe('full');
      expect(instance.rows).toBe(8);
      expect(instance.cols).toBe(40);
      expect(instance.hint).toBe('Default theme hint');
      expect(instance.placeholder).toBe('Theme placeholder');
      expect(instance.label).toBe('Theme label');
      expect(instance.fullWidth).toBe(true);
      expect(instance.disabled).toBe(true);
      expect(instance.readonly).toBe(true);
      expect(instance.error).toBe(true);
    });
  });

  describe('ng-primitives NgpTextarea integration', () => {
    it('applies ngpTextarea directive to the native textarea element', async () => {
      const hostFixture = TestBed.createComponent(TextareaTestHost);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const textareaDebugEl = hostFixture.debugElement.query(
        By.css('textarea.dasar-textarea-native'),
      );
      expect(textareaDebugEl).toBeTruthy();

      const ngpDirective = textareaDebugEl.injector.get(NgpTextarea, null);
      expect(ngpDirective).toBeTruthy();
    });

    it('syncs disabled state to the native textarea and primitive', async () => {
      const hostFixture = TestBed.createComponent(TextareaTestHost);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const textareaDebugEl = hostFixture.debugElement.query(
        By.css('textarea.dasar-textarea-native'),
      );
      const textareaNative = textareaDebugEl.nativeElement as HTMLTextAreaElement;

      expect(textareaNative.disabled).toBe(false);

      hostFixture.componentInstance.disabled.set(true);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      expect(textareaNative.disabled).toBe(true);
      expect(textareaNative.getAttribute('data-disabled')).not.toBeNull();
    });

    it('toggles primitive data-attributes on focus and hover', async () => {
      const hostFixture = TestBed.createComponent(TextareaTestHost);
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const textareaDebugEl = hostFixture.debugElement.query(
        By.css('textarea.dasar-textarea-native'),
      );
      const textareaNative = textareaDebugEl.nativeElement as HTMLTextAreaElement;

      // Hover
      textareaNative.dispatchEvent(new MouseEvent('mouseenter'));
      hostFixture.detectChanges();
      expect(textareaNative.hasAttribute('data-hover')).toBe(true);

      textareaNative.dispatchEvent(new MouseEvent('mouseleave'));
      hostFixture.detectChanges();
      expect(textareaNative.hasAttribute('data-hover')).toBe(false);

      // Focus
      textareaNative.dispatchEvent(new FocusEvent('focus'));
      hostFixture.detectChanges();
      expect(textareaNative.hasAttribute('data-focus')).toBe(true);

      textareaNative.dispatchEvent(new FocusEvent('blur'));
      hostFixture.detectChanges();
      expect(textareaNative.hasAttribute('data-focus')).toBe(false);
    });
  });
});
