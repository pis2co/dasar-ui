import { Component } from '@angular/core';
import { DasarButtonComponent } from 'dasar-ui';

@Component({
  templateUrl: './theming-css-override.example.html',
  styleUrl: './theming-css-override.example.scss',
  selector: 'app-theming-css-override-example',
  imports: [DasarButtonComponent],
  standalone: true,
})
export class ThemingCssOverrideExample {}
