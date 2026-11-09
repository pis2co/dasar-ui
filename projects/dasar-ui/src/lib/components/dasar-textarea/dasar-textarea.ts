import {
  booleanAttribute,
  numberAttribute,
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation,
  TemplateRef,
  ChangeDetectorRef,
  inject,
  Directive,
  ContentChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { CommonModule } from '@angular/common';
import { NgpTextarea } from 'ng-primitives/textarea';
import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarThemeService } from '../../services/theme.service';
import { resolveThemeDefault } from '../../utils/common';

export type DasarTextareaSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarTextareaAppearanceType = 'outline' | 'filled' | 'elevated';
export type DasarTextareaRadiusType = ScaleAttributeType;

export interface DasarTextareaConfig {
  appearance?: DasarTextareaAppearanceType;
  labelRight?: string | TemplateRef<any>;
  radius?: DasarTextareaRadiusType;
  size?: DasarTextareaSizeType;
  hint?: string;
  placeholder?: string;
  label?: string;
  rows?: number;
  cols?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  containerClass?: ClassType;
  textareaClass?: ClassType;
  hostClass?: ClassType;
  containerStyle?: StyleType;
  textareaStyle?: StyleType;
  hostStyle?: StyleType;
}

@Directive({ selector: '[label-slot]', standalone: true })
export class DasarTextareaLabelSlot {}
@Directive({ selector: '[extra-label-slot]', standalone: true })
export class DasarTextareaExtraLabelSlot {}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarTextarea),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, NgpTextarea],
  styleUrls: ['./dasar-textarea.scss'],
  templateUrl: './dasar-textarea.html',
  selector: 'dasar-textarea',
  standalone: true,
})
export class DasarTextarea implements ControlValueAccessor {
  @ContentChild(DasarTextareaExtraLabelSlot) extraLabelSlot?: DasarTextareaExtraLabelSlot;
  @ContentChild(DasarTextareaLabelSlot) labelSlot?: DasarTextareaLabelSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);

  @Input() appearance: DasarTextareaAppearanceType = resolveThemeDefault(
    'textarea',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'label-right' }) labelRight: string | TemplateRef<any> | undefined =
    resolveThemeDefault('textarea', 'labelRight', undefined, this.themeProvider, this.themeService);
  @Input() size: DasarTextareaSizeType = resolveThemeDefault(
    'textarea',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius: DasarTextareaRadiusType = resolveThemeDefault(
    'textarea',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() hint: string = resolveThemeDefault(
    'textarea',
    'hint',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() placeholder: string = resolveThemeDefault(
    'textarea',
    'placeholder',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input() label?: string = resolveThemeDefault(
    'textarea',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: numberAttribute }) rows: number = resolveThemeDefault(
    'textarea',
    'rows',
    4,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: numberAttribute }) cols: number = resolveThemeDefault(
    'textarea',
    'cols',
    20,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth: boolean =
    resolveThemeDefault('textarea', 'fullWidth', false, this.themeProvider, this.themeService);
  @Input({ transform: booleanAttribute }) disabled: boolean = resolveThemeDefault(
    'textarea',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) readonly: boolean = resolveThemeDefault(
    'textarea',
    'readonly',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error: boolean = resolveThemeDefault(
    'textarea',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );

  @Input({ alias: 'container-class' }) containerClass: ClassType = resolveThemeDefault(
    'textarea',
    'containerClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'textarea-class' }) textareaClass: ClassType = resolveThemeDefault(
    'textarea',
    'textareaClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'host-class' }) hostClass: ClassType = resolveThemeDefault(
    'textarea',
    'hostClass',
    '',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle: StyleType = resolveThemeDefault(
    'textarea',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'textarea-style' }) textareaStyle: StyleType = resolveThemeDefault(
    'textarea',
    'textareaStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'host-style' }) hostStyle: StyleType = resolveThemeDefault(
    'textarea',
    'hostStyle',
    null,
    this.themeProvider,
    this.themeService,
  );

  _value: any = '';

  @Input()
  get value(): any {
    return this._value;
  }
  set value(val: any) {
    if (this._value !== val) {
      this._value = val ?? '';
      this.cdr.markForCheck();
    }
  }

  @Output() valueChange = new EventEmitter<any>();

  @HostBinding('class.dasar-textarea') readonly baseClass = true;

  @HostBinding('class.full-width')
  get hasFullWidth(): boolean {
    return this.fullWidth;
  }

  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(val: any): void {
    this._value = val !== null && val !== undefined ? String(val) : '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const val = target.value;
    this._value = val;
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onBlur(): void {
    this.onTouched();
  }

  isTemplate(value: any): boolean {
    return value instanceof TemplateRef;
  }
}

export const DasarTextareaComponent = [
  DasarTextareaExtraLabelSlot,
  DasarTextareaLabelSlot,
  DasarTextarea,
] as const;
