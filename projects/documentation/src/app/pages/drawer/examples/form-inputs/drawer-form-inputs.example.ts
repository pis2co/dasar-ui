import { Component, signal } from '@angular/core';
import {
  DasarDrawerComponent,
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
  templateUrl: './drawer-form-inputs.example.html',
  selector: 'app-drawer-form-inputs-example',
  imports: [
    DasarDrawerComponent,
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
export class DrawerFormInputsExample {
  protected show = signal(false);
  protected notify = signal(true);
  protected options: DasarSelectOption[] = [
    { label: 'Indonesia', value: 'id' },
    { label: 'Japan', value: 'jp' },
    { label: 'Germany', value: 'de' },
  ];
}
