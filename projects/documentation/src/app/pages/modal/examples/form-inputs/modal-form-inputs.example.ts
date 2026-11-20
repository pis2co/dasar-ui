import { Component, signal } from '@angular/core';
import {
  DasarModalComponent,
  DasarButtonComponent,
  DasarInputComponent,
  DasarTextareaComponent,
  DasarNumberInputComponent,
  DasarSelectComponent,
  DasarSelectOption,
  DasarDatepickerComponent,
  DasarCheckboxComponent,
  DasarCheckboxGroupComponent,
  DasarRadioComponent,
  DasarRadioGroupComponent,
  DasarSwitchComponent,
  DasarSliderComponent,
  DasarPinComponent,
} from 'dasar-ui';

@Component({
  templateUrl: './modal-form-inputs.example.html',
  selector: 'app-modal-form-inputs-example',
  imports: [
    DasarModalComponent,
    DasarButtonComponent,
    DasarInputComponent,
    DasarTextareaComponent,
    DasarNumberInputComponent,
    DasarSelectComponent,
    DasarDatepickerComponent,
    DasarCheckboxComponent,
    DasarCheckboxGroupComponent,
    DasarRadioComponent,
    DasarRadioGroupComponent,
    DasarSwitchComponent,
    DasarSliderComponent,
    DasarPinComponent,
  ],
  standalone: true,
})
export class ModalFormInputsExample {
  protected notify = signal(true);
  protected options: DasarSelectOption[] = [
    { label: 'Indonesia', value: 'id' },
    { label: 'Japan', value: 'jp' },
    { label: 'Germany', value: 'de' },
  ];
}
