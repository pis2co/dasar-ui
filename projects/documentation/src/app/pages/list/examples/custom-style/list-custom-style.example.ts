import { Component } from '@angular/core';
import { DasarListComponent } from 'dasar-ui';

@Component({
  templateUrl: './list-custom-style.example.html',
  selector: 'app-list-custom-style-example',
  imports: [DasarListComponent],
  standalone: true,
})
export class ListCustomStyleExample {
  protected items = ['Overview', 'Activity', 'Settings'];

  protected containerStyle = { 'max-width': '320px' };

  protected highlightStyle = {
    'background-color': 'var(--theme-primary-surface-color)',
    'font-weight': '600',
  };
}
