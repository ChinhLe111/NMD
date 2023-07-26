import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddressFacade, District, Province } from '@store';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, throttleTime } from 'rxjs';

@Component({
  selector: 'g-address',
  templateUrl: './address.filter.component.html',
  styleUrls: ['./address.filter.component.less'],
  providers: [AddressFacade],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFilterComponent implements OnInit, OnDestroy {
  @Output() onChange = new EventEmitter();

  constructor(protected addressFacade: AddressFacade) {}

  selectAll?: boolean;

  ngOnInit(): void {
    this.selectAll = true;
    this.addressFacade.getProvinceList({});
    this.searchValueChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleSelectAll(chooseAll: { district: string } | { province: string }) {
    this.selectAll = true;
    if ('district' in chooseAll) {
      this.onChange.emit({ district: '', province: this.chooseProvince });
    }
    if ('province' in chooseAll) {
      this.onChange.emit({ province: '' });
    }
  }

  @ViewChild('address') address!: ElementRef;

  scrollTop() {
    return setTimeout(() => {
      this.address.nativeElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  chooseProvince?: Province;
  provinceSelected?: Province;
  chooseDistrict?: District;

  handleSelect(province?: Province, district?: District) {
    this.fullTextSearch.setValue('');
    if (province) {
      this.selectAll = true;
      this.chooseProvince = province;
      this.handleSelectAll({ district: '' });
      if (this.provinceSelected !== province) {
        this.provinceSelected = province;
        this.addressFacade.getDistrictList({ filter: JSON.stringify({ ParentId: province.maTinh }) });
      }
      this.scrollTop();
    }
    if (district && this.chooseDistrict !== district) {
      this.selectAll = false;
      this.chooseDistrict = district;
      this.onChange.emit(district);
    }
  }

  handleBack() {
    this.selectAll = false;
    this.chooseProvince = undefined;
    this.fullTextSearch.setValue('');
    this.scrollTop();
  }

  private destroyed$ = new Subject<void>();
  fullTextSearch = new FormControl();

  searchValueChange() {
    this.fullTextSearch.valueChanges
      .pipe(debounceTime(300), throttleTime(300), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.addressFacade.setProvinceList(value);
        this.addressFacade.setDistrictList(value);
      });
  }
}
