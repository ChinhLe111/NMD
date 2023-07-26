import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, throttleTime } from 'rxjs';
import { AddressFacade, Commune, District, Province } from '@store';

type TypeSelect = 'province' | 'district' | 'commune';

@Component({
  selector: 'g-area',
  templateUrl: './area.filter.component.html',
  styleUrls: ['./area.filter.component.less'],
  providers: [AddressFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaFilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isReset = false;
  @Output() onChange = new EventEmitter();

  constructor(protected addressFacade: AddressFacade) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReset) this.handleReset();
  }

  ngOnInit(): void {
    this.comeback = true;
    this.addressFacade.getProvinceList({});
    this.searchValueChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleTooltip = () =>
    !this.chooseProvince
      ? 'Bạn phải chọn Tỉnh/Thành trước'
      : !this.chooseDistrict
      ? 'Bạn phải chọn Quận/Huyện trước'
      : '';

  handleTitle = () =>
    this.provinceSelected ? 'Chọn Tỉnh/Thành' : this.districtSelected ? 'Chọn Quận/Huyện' : 'Chọn Phường/Xã';

  provinceSelected = false;
  districtSelected = false;
  communeSelected = false;

  handleSelected(select: TypeSelect) {
    switch (select) {
      case 'province':
        this.provinceSelected = true;
        this.comeback = false;
        this.fullTextSearch.setValue('');
        break;
      case 'district':
        if (this.chooseProvince) {
          this.districtSelected = true;
          this.comeback = false;
          this.fullTextSearch.setValue('');
        }
        break;
      case 'commune':
        if (this.chooseDistrict) {
          this.communeSelected = true;
          this.comeback = false;
          this.fullTextSearch.setValue('');
        }
        break;
    }
  }

  chooseProvince?: Province;
  chooseDistrict?: District;
  chooseCommune?: Commune;

  handleChoose(choose: Province | District | Commune, type: TypeSelect) {
    switch (type) {
      case 'province':
        this.provinceSelected = false;
        const province: Province = choose as Province;
        this.chooseProvince = province;
        this.addressFacade.getDistrictList({ filter: JSON.stringify({ ParentId: province.maTinh }) });
        this.comeback = true;
        this.handleApply();
        break;
      case 'district':
        this.districtSelected = false;
        const district: District = choose as District;
        this.chooseDistrict = district;
        this.addressFacade.getCommuneList({ filter: JSON.stringify({ ParentId: district.districtCode }) });
        this.comeback = true;
        this.handleApply();
        break;
      case 'commune':
        this.communeSelected = false;
        const commune: Commune = choose as Commune;
        this.chooseCommune = commune;
        this.comeback = true;
        this.handleApply();
        break;
    }
  }

  comeback?: boolean;

  handleBack() {
    this.comeback = true;
    if (this.provinceSelected) this.provinceSelected = false;
    if (this.districtSelected) this.districtSelected = false;
    if (this.communeSelected) this.communeSelected = false;
  }

  handleIconX(type: TypeSelect) {
    switch (type) {
      case 'province':
        this.handleReset();
        this.handleApply();
        break;
      case 'district':
        this.chooseDistrict = undefined;
        this.chooseCommune = undefined;
        this.handleApply();
        break;
      case 'commune':
        this.chooseCommune = undefined;
        this.handleApply();
        break;
    }
  }

  handleReset() {
    this.chooseProvince = undefined;
    this.chooseDistrict = undefined;
    this.chooseCommune = undefined;
    this.onChange.emit();
  }

  handleApply() {
    this.onChange.emit({
      province: this.chooseProvince,
      district: this.chooseDistrict,
      commune: this.chooseCommune,
    });
  }

  private destroyed$ = new Subject<void>();
  fullTextSearch = new FormControl();

  searchValueChange() {
    this.fullTextSearch.valueChanges
      .pipe(debounceTime(300), throttleTime(300), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.addressFacade.setProvinceList(value);
        this.addressFacade.setDistrictList(value);
        this.addressFacade.setCommuneList(value);
      });
  }
}
