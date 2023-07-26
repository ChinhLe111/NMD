import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'g-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinComponent {
  @Input() loading: boolean | null = null;
  @Input() text = 'Now Loading...';
}
