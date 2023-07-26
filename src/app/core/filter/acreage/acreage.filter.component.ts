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
  selector: 'g-acreage',
  templateUrl: './acreage.filter.component.html',
  styleUrls: ['./acreage.filter.component.less'],
  providers: [FormatCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcreageFilterComponent implements OnChanges {
  @Input() isReset = false;
  @Input() showSlider = true;
  @Input() showFooter = true;
  @Input() fullWidth = false;
  @Input() fullHeight = false;
  @Output() onChange = new EventEmitter();

  arrAcreage = [
    { label: 'Dưới 30m²', from: 0, to: 30 },
    { label: '30m² - 50m²', from: 30, to: 50 },
    { label: '50m² - 80m²', from: 50, to: 80 },
    { label: '80m² - 100m²', from: 80, to: 100 },
    { label: '100m² - 150m²', from: 100, to: 150 },
    { label: '150m² - 200m²', from: 150, to: 200 },
    { label: '200m² - 250m²', from: 200, to: 250 },
    { label: '250m² - 300m²', from: 250, to: 300 },
    { label: '300m² - 500m²', from: 300, to: 500 },
    { label: '500m² - 1000m²', from: 500, to: 1000 },
    { label: 'Trên 1000m²', from: 1000, to: 1000000 },
  ];

  constructor(private formatCurrency: FormatCurrencyPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReset) this.handleReset();
  }

  sliderFrom?: number;
  sliderArrive?: number;
  sliderValue = [0, 100000];

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
    this.chooseAcreage = undefined;
    this.handleApply();
  }

  chooseAcreage?: { label: string; from: number; to: number };

  handleChoose(acreage: { label: string; from: number; to: number }) {
    this.chooseAcreage = acreage;
    this.removeSlider();
    this.onChange.emit({ label: acreage.label, from: acreage.from, to: acreage.to });
  }

  removeSlider() {
    this.sliderValue = [0, 100000];
    this.sliderFrom = undefined;
    this.sliderArrive = undefined;
  }

  handleReset() {
    this.removeSlider();
    this.chooseAcreage = undefined;
    this.onChange.emit();
  }

  handleApply() {
    let titleAcreage = '';
    const from = this.formatCurrency.transform(this.sliderValue[0]);
    const to = this.formatCurrency.transform(this.sliderValue[1]);
    if (from === '0') titleAcreage = `≤ ${to}m²`;
    else titleAcreage = `${from}m² - ${to}m²`;
    this.onChange.emit({ label: titleAcreage, from: this.sliderValue[0], to: this.sliderValue[1] });
  }
}
