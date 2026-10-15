import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DasarCardComponent,
  DasarTabsComponent,
  DasarInputComponent,
  DasarSelectComponent,
  DasarDatepickerComponent,
  DasarSelectOption,
} from 'dasar-ui';

@Component({
  templateUrl: './tabs-advanced-form.example.html',
  selector: 'app-tabs-advanced-form-example',
  imports: [
    FormsModule,
    DasarCardComponent,
    DasarTabsComponent,
    DasarInputComponent,
    DasarSelectComponent,
    DasarDatepickerComponent,
  ],
  standalone: true,
})
export class TabsAdvancedFormExample {
  protected active = 0;
  protected name = 'Ada Lovelace';
  protected role = 'admin';
  protected renewal = '2026-12-31';

  protected roles: DasarSelectOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];
}
