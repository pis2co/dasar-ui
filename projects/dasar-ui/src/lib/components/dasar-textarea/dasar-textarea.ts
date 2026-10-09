import {
  booleanAttribute,
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
import { CommonModule } from '@angular/common';
import { ScaleAttributeType } from '@models/type.model';

export type DasarTextareaSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarTextareaAppearanceType = 'outline' | 'filled';
export type DasarTextareaRadiusType = ScaleAttributeType;

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
  imports: [CommonModule, FormsModule],
  styleUrls: ['./dasar-textarea.scss'],
  templateUrl: './dasar-textarea.html',
  selector: 'dasar-textarea',
  standalone: true,
})
export class DasarTextarea implements ControlValueAccessor {
  @ContentChild(DasarTextareaExtraLabelSlot) extraLabelSlot?: DasarTextareaExtraLabelSlot;
  @ContentChild(DasarTextareaLabelSlot) labelSlot?: DasarTextareaLabelSlot;

  @Input() appearance: DasarTextareaAppearanceType = 'outline';
  @Input() labelRight?: string | TemplateRef<any>;
  @Input() size: DasarTextareaSizeType = 'md';
  @Input() radius: DasarTextareaRadiusType = 'md';
  @Input() hint: string = '';
  @Input() placeholder = '';
  @Input() label?: string;
  @Input() rows: number = 4;
  @Input() cols: number = 20;
  @Input({ transform: booleanAttribute }) fullWidth = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) error = false;

  @Input() containerClass: string | string[] | Set<string> | { [klass: string]: any } = '';
  @Input() textareaClass: string | string[] | Set<string> | { [klass: string]: any } = '';
  @Input() hostClass: string | string[] | Set<string> | { [klass: string]: any } = '';
  @Input() containerStyle: Record<string, any> | null = null;
  @Input() textareaStyle: Record<string, any> | null = null;
  @Input() hostStyle: Record<string, any> | null = null;

  private cdr = inject(ChangeDetectorRef);
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
