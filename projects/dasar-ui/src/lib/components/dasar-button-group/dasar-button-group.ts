import { booleanAttribute, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DasarButtonGroupOrientationType = 'horizontal' | 'vertical';

@Component({
  styleUrls: ['./dasar-button-group.scss'],
  templateUrl: './dasar-button-group.html',
  encapsulation: ViewEncapsulation.None,
  selector: 'dasar-button-group',
  imports: [CommonModule],
  standalone: true,
//   host: {

//   }
// //dasar-button-native-group
})
export class DasarButtonGroup {
  @Input() orientation: DasarButtonGroupOrientationType = 'horizontal';
  @Input({ transform: booleanAttribute }) attached = true;

  get buttonClasses(): Record<string, boolean> {
    return {
      'dasar-button-native-group': true,
      horizontal: this.orientation === "vertical",
      vertical: this.orientation === "vertical",
      'attached': this.attached,
    };
  }
}
