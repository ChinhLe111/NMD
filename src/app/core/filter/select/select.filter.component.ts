import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'g-select',
  templateUrl: './select.filter.component.html',
  styleUrls: ['./select.filter.component.less'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFilterComponent implements OnChanges {
  @Input() isReset = false;
  @Input() listSelect: any[] | undefined = [];
  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReset) this.handleReset();
  }

  chooseSelect?: any;

  handleChoose(choose: any) {
    this.chooseSelect = choose;
    this.handleApply();
  }

  handleReset() {
    this.chooseSelect = undefined;
    this.onChange.emit();
  }

  handleApply() {
    this.onChange.emit(this.chooseSelect);
  }
}
