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
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Directive,
  ContentChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DASAR_THEME_PROVIDER } from '../dasar-theme-provider/dasar-theme-provider';
import { DasarChipComponent, DasarChipVariantType } from '../dasar-chip/dasar-chip';
import { ClassType, StyleType, ScaleAttributeType } from '../../models/type.model';
import { DasarButtonComponent } from '../dasar-button/dasar-button';
import { DasarThemeService } from '../../services/theme.service';
import { DasarIconComponent } from '../dasar-icon/dasar-icon';
import { resolveThemeDefault } from '../../utils/common';

export type DasarSelectSizeType = Extract<ScaleAttributeType, 'sm' | 'md' | 'lg'>;
export type DasarSelectChipSizeType = Extract<ScaleAttributeType, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
export type DasarSelectMultipleDisplayType = 'text' | 'chip' | null;
export type DasarSelectAppearanceType = 'outline' | 'filled';
export type DasarSelectRadiusType = ScaleAttributeType;

export interface DasarSelectConfig {
  multipleType?: DasarSelectMultipleDisplayType;
  arrowIconName?: string;
  debounceTime?: number;
  appearance?: DasarSelectAppearanceType;
  radius?: DasarSelectRadiusType;
  options?: DasarSelectOption[];
  chipSize?: DasarSelectChipSizeType;
  size?: DasarSelectSizeType;
  hint?: string;
  placeholder?: string;
  labelRight?: string;
  label?: string;
  dropdownPanelClass?: ClassType;
  containerClass?: ClassType;
  optionClass?: ClassType;
  dropdownPanelStyle?: StyleType;
  containerStyle?: StyleType;
  fullWidth?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  hideOverflow?: boolean;
}

@Directive({ selector: '[prefix-slot]', standalone: true })
export class DasarSelectPrefixSlot {}
@Directive({ selector: '[suffix-slot]', standalone: true })
export class DasarSelectSuffixSlot {}
@Directive({ selector: '[label-slot]', standalone: true })
export class DasarSelectLabelSlot {}
@Directive({ selector: '[extra-label-slot]', standalone: true })
export class DasarSelectExtraLabelSlot {}
@Directive({ selector: '[option-loading-slot]', standalone: true })
export class DasarSelectOptionLoadingSlot {}
@Directive({ selector: '[option-empty-slot]', standalone: true })
export class DasarSelectOptionEmptySlot {}
@Directive({ selector: '[chip-template]', standalone: true })
export class DasarSelectChipTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
@Directive({ selector: '[option-template]', standalone: true })
export class DasarSelectOptionTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}

export interface DasarSelectOption {
  chipVariant?: DasarChipVariantType;
  chipClass?: ClassType;
  chipStyle?: StyleType;
  disabled?: boolean;
  iconName?: string;
  label: string;
  value: any;
  [key: string]: any;
}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DasarSelect),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    DasarIconComponent,
    DasarButtonComponent,
    DasarChipComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dasar-select.html',
  styleUrls: ['./dasar-select.scss'],
  selector: 'dasar-select',
  standalone: true,
})
export class DasarSelect implements ControlValueAccessor {
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  @ContentChild(DasarSelectOptionLoadingSlot) optionLoadingSlot?: DasarSelectOptionLoadingSlot;
  @ContentChild(DasarSelectOptionEmptySlot) optionEmptySlot?: DasarSelectOptionEmptySlot;
  @ContentChild(DasarSelectOptionTemplate) optionTemplate?: DasarSelectOptionTemplate;
  @ContentChild(DasarSelectExtraLabelSlot) extraLabelSlot?: DasarSelectExtraLabelSlot;
  @ContentChild(DasarSelectChipTemplate) chipTemplate?: DasarSelectChipTemplate;
  @ContentChild(DasarSelectPrefixSlot) prefixSlot?: DasarSelectPrefixSlot;
  @ContentChild(DasarSelectSuffixSlot) suffixSlot?: DasarSelectSuffixSlot;
  @ContentChild(DasarSelectLabelSlot) labelSlot?: DasarSelectLabelSlot;

  private themeProvider = inject(DASAR_THEME_PROVIDER, { optional: true });
  private themeService = inject(DasarThemeService, { optional: true });
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  private debounceTimer: any = null;
  searchQuery = '';
  isOpen = false;

  @Input({ alias: 'multiple-type' }) multipleType: DasarSelectMultipleDisplayType =
    resolveThemeDefault('select', 'multipleType', null, this.themeProvider, this.themeService);
  @Input({ alias: 'chip-size' }) chipSize: DasarSelectChipSizeType = resolveThemeDefault(
    'select',
    'chipSize',
    'xs',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'arrow-icon-name' }) arrowIconName = resolveThemeDefault(
    'select',
    'arrowIconName',
    'chevron-down',
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'debounce-time' }) debounceTime = resolveThemeDefault(
    'select',
    'debounceTime',
    300,
    this.themeProvider,
    this.themeService,
  );
  @Input() appearance = resolveThemeDefault(
    'select',
    'appearance',
    'outline',
    this.themeProvider,
    this.themeService,
  );
  @Input() radius = resolveThemeDefault(
    'select',
    'radius',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() options = resolveThemeDefault(
    'select',
    'options',
    [],
    this.themeProvider,
    this.themeService,
  );
  @Input() size = resolveThemeDefault(
    'select',
    'size',
    'md',
    this.themeProvider,
    this.themeService,
  );
  @Input() hint = resolveThemeDefault(
    'select',
    'hint',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() placeholder = resolveThemeDefault(
    'select',
    'placeholder',
    'Select item',
    this.themeProvider,
    this.themeService,
  );
  @Input() label = resolveThemeDefault(
    'select',
    'label',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input() labelRight = resolveThemeDefault(
    'select',
    'labelRight',
    undefined,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'dropdown-panel-class' }) dropdownPanelClass = resolveThemeDefault(
    'select',
    'dropdownPanelClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-class' }) containerClass = resolveThemeDefault(
    'select',
    'containerClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'option-class' }) optionClass = resolveThemeDefault(
    'select',
    'optionClass',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'dropdown-panel-style' }) dropdownPanelStyle = resolveThemeDefault(
    'select',
    'dropdownPanelStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'container-style' }) containerStyle = resolveThemeDefault(
    'select',
    'containerStyle',
    null,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'full-width', transform: booleanAttribute }) fullWidth = resolveThemeDefault(
    'select',
    'fullWidth',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) clearable = resolveThemeDefault(
    'select',
    'clearable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) searchable = resolveThemeDefault(
    'select',
    'searchable',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) disabled = resolveThemeDefault(
    'select',
    'disabled',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) loading = resolveThemeDefault(
    'select',
    'loading',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ transform: booleanAttribute }) error = resolveThemeDefault(
    'select',
    'error',
    false,
    this.themeProvider,
    this.themeService,
  );
  @Input({ alias: 'hide-overflow', transform: booleanAttribute }) hideOverflow =
    resolveThemeDefault('card', 'hideOverflow', false, this.themeProvider, this.themeService);

  @Output() valueChange = new EventEmitter<any>();
  @Output() onBlurEvent = new EventEmitter<FocusEvent>();
  @Output() onSearchChange = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onPanelOpened = new EventEmitter<void>();
  @Output() onPanelClosed = new EventEmitter<void>();
  @Output() onCleared = new EventEmitter<void>();

  @HostBinding('class.dasar-select') readonly baseClass = true;
  @HostBinding('class.full-width') get hasFullWidth(): boolean {
    return this.fullWidth;
  }
  @HostBinding('class.disabled') get isDisabled(): boolean {
    return this.disabled;
  }

  _value: any = '';
  @Input()
  get value(): any {
    return this._value;
  }
  set value(val: any) {
    if (this._value !== val) {
      this._value = val;
      this.cdr.markForCheck();
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  // Control Value
  writeValue(val: any): void {
    this._value = val ?? (this.multipleType ? [] : '');
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

  get hasValue(): boolean {
    const val = this.value;
    if (this.multipleType) {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== null && val !== undefined && val !== '';
  }
  get isMultiple(): boolean {
    return this.multipleType != null;
  }
  get selectedOption(): DasarSelectOption | undefined {
    return this.options.find((opt) => opt.value === this._value);
  }
  get selectedOptions(): DasarSelectOption[] {
    if (!Array.isArray(this._value)) return [];
    return this.options.filter((opt) => this._value.includes(opt.value));
  }
  get filteredOptions(): DasarSelectOption[] {
    if (!this.searchable || !this.searchQuery.trim()) {
      return this.options;
    }
    const query = this.searchQuery.toLowerCase();
    return this.options.filter((opt) => opt.label.toLowerCase().includes(query));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.closePanel();
      }
    }
  }
  @HostListener('document:dasar-select:opened', ['$event'])
  onGlobalSelectOpened(event: any): void {
    if (event.detail !== this && this.isOpen) {
      this.closePanel();
    }
  }

  // Processing
  removeOption(option: DasarSelectOption, event: Event): void {
    event.stopPropagation();
    if (this.disabled) return;

    if (this.multipleType && Array.isArray(this._value)) {
      this._value = this._value.filter((val) => val !== option.value);
      this.onChange(this._value);
      this.valueChange.emit(this._value);
      this.cdr.detectChanges(); // Force UI update immediately
    }
  }
  clearSelection(event: Event): void {
    event.stopPropagation();
    const emptyVal = this.multipleType ? [] : '';
    this.value = emptyVal;
    this.onChange(emptyVal);
    this.valueChange.emit(emptyVal);
    this.onCleared.emit();
    if (this.isOpen) {
      this.closePanel();
    }
  }
  toggleDropdown(): void {
    if (this.disabled) return;
    if (this.isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }
  openPanel(): void {
    if (this.disabled || this.isOpen) return;
    this.isOpen = true;
    this.onPanelOpened.emit();
    const openEvent = new CustomEvent('dasar-select:opened', { detail: this });
    document.dispatchEvent(openEvent);
    if (this.searchable) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      });
    }
  }
  closePanel(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.searchQuery = '';
    this.onPanelClosed.emit();
    this.onTouched();
  }
  isOptionSelected(option: DasarSelectOption): boolean {
    if (this.multipleType) {
      return Array.isArray(this._value) && this._value.includes(option.value);
    }
    return this._value === option.value;
  }
  selectOption(option: DasarSelectOption, event: Event): void {
    event.stopPropagation();
    if (option.disabled) return;

    if (this.multipleType) {
      let currentVal = Array.isArray(this._value) ? [...this._value] : [];
      const index = currentVal.indexOf(option.value);
      if (index > -1) {
        currentVal.splice(index, 1);
      } else {
        currentVal.push(option.value);
      }
      this._value = currentVal;
      this.onChange(this._value);
      this.valueChange.emit(this._value);

      // If searchable, re-focus input after selecting a chip
      if (this.searchable) {
        this.searchQuery = '';
        this.searchInput?.nativeElement.focus();
      }
    } else {
      this._value = option.value;
      this.onChange(this._value);
      this.valueChange.emit(this._value);
      this.closePanel();
    }
  }
  getMultipleDisplayText(): string {
    const selected = this.selectedOptions;
    if (selected.length === 0) return '';
    return selected.map((s) => s.label).join(', ');
  }
  onSearchInput(query: string): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.onSearchChange.emit(query);
    }, this.debounceTime);
  }
  onInputFocus(event?: FocusEvent): void {
    if (event) this.onFocus.emit(event);
  }
  onInputBlur(event?: FocusEvent): void {
    if (event) this.onBlurEvent.emit(event);
  }
}
export const DasarSelectComponent = [
  DasarSelect,
  DasarSelectLabelSlot,
  DasarSelectSuffixSlot,
  DasarSelectChipTemplate,
  DasarSelectOptionTemplate,
  DasarSelectExtraLabelSlot,
  DasarSelectOptionEmptySlot,
  DasarSelectOptionLoadingSlot,
  DasarSelectPrefixSlot,
] as const;
