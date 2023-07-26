import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormatCurrencyPipe } from '@pipes';
import { NzSliderValue } from 'ng-zorro-antd/slider';

@Component({
  selector: 'g-price',
  templateUrl: './price.filter.component.html',
  styleUrls: ['./price.filter.component.less'],
  providers: [FormatCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceFilterComponent implements OnChanges {
  @Input() isReset = false;
  @Input() showSlider = true;
  @Input() showFooter = true;
  @Input() fullWidth = false;
  @Input() fullHeight = false;
  @Output() onChange = new EventEmitter();

  arrPrice = [
    { label: 'Dưới 500 triệu', from: 0, to: 500000000 },
    { label: '500 - 800 triệu', from: 500000000, to: 800000000 },
    { label: '800 triệu - 1 tỷ', from: 800000000, to: 1000000000 },
    { label: '1- 2 tỷ', from: 1000000000, to: 2000000000 },
    { label: '2- 3 tỷ', from: 2000000000, to: 3000000000 },
    { label: '3 - 5 tỷ', from: 3000000000, to: 5000000000 },
    { label: '5 - 7 tỷ', from: 5000000000, to: 7000000000 },
    { label: '7 - 10 tỷ', from: 7000000000, to: 10000000000 },
    { label: '10 - 20 tỷ', from: 10000000000, to: 20000000000 },
    { label: '20 - 30 tỷ', from: 20000000000, to: 30000000000 },
  ];

  constructor(private formatCurrency: FormatCurrencyPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReset) this.handleReset();
  }

  sliderFrom?: number;
  sliderArrive?: number;
  sliderValue = [0, 100000000000];

  changeSliderFrom(value: number) {
    if (value !== this.sliderValue[0]) this.sliderValue = [value, this.sliderValue[1]];
  }

  changeSliderArrive(value: number) {
    if (value !== this.sliderValue[1] && value > this.sliderValue[0]) this.sliderValue = [this.sliderValue[0], value];
  }

  tipFormatter = (value: number) => `${this.formatCurrency.transform(value)}`;

  onAfterChange(value: NzSliderValue) {
    if (Array.isArray(value)) {
      this.sliderFrom = value[0];
      this.sliderArrive = value[1];
    }
    this.choosePrice = undefined;
    this.handleApply();
  }

  choosePrice?: { label: string; from: number; to: number };

  handleChoose(price: { label: string; from: number; to: number }) {
    this.choosePrice = price;
    this.removeSlider();
    this.onChange.emit({ label: price.label, from: price.from, to: price.to });
  }

  removeSlider() {
    this.sliderValue = [0, 100000000000];
    this.sliderFrom = undefined;
    this.sliderArrive = undefined;
  }

  handleReset() {
    this.removeSlider();
    this.choosePrice = undefined;
    this.onChange.emit();
  }

  handleApply() {
    let titlePrice = '';
    const from = this.formatCurrency.transformText(this.sliderValue[0], 1);
    const to = this.formatCurrency.transformText(this.sliderValue[1], 1);
    if (from === 0) titlePrice = `≤ ${to}`;
    else titlePrice = `${from} - ${to}`;
    this.onChange.emit({ label: titlePrice, from: this.sliderValue[0], to: this.sliderValue[1] });
  }
}
