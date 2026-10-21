import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DasarButtonComponent, DasarDrawerComponent } from 'dasar-ui';

@Component({
  templateUrl: './drawer-ng-model.example.html',
  selector: 'app-drawer-ng-model-example',
  imports: [DasarDrawerComponent, DasarButtonComponent, FormsModule],
  standalone: true,
})
export class DrawerNgModelExample {
  protected visible = false;
}
