import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '@core/form/form.component';
import { FormModel } from '@model';
import { AddressFacade, NewsFacade, PropertyFacade } from '@store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-list-source-news',
  templateUrl: './edit-list-source-news.component.html',
  styleUrls: ['../list-source-news.component.less'],
  providers: [PropertyFacade, AddressFacade, NewsFacade],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditListSourceNewsComponent {
  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    public newsFacade: NewsFacade,
    public propertyFacade: PropertyFacade,
    public addressFacade: AddressFacade,
  ) {}
  id = '';
  private destroyed$ = new Subject<void>();
  @ViewChild('newsForm') newsForm!: FormComponent;
  validateForm!: FormGroup;

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.newsFacade.getById(this.id);
    }
    this.addressFacade.getProvinceList({});
    this.propertyFacade.data$.pipe(takeUntil(this.destroyed$)).subscribe((data: any) => {
      if (data && data.id) {
        this.addressFacade.getDistrictList({ filter: JSON.stringify({ ParentId: data?.provinceCode }) });
        this.addressFacade.getCommuneList({ filter: JSON.stringify({ ParentId: data?.districtCode }) });
      }
    });
    this.newsFacade.status$.pipe(takeUntil(this.destroyed$)).subscribe((status) => {
      switch (status) {
        case 'putOk':
          this.handleBack();
          break;
      }
    });
  }
  handelSubmit() {
    const { controls: controlsF, value: valueF, valid: validF } = this.newsForm.validateForm;
    const payload = {
      ...valueF,
    };
    this.newsFacade.put(this.id, payload);
  }
  columnsProperty: FormModel[] = [
    {
      name: 'title',
      title: 'Tiêu đề',
      formItem: {
        placeholder: 'Nhập tiêu đề',
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'ownerName',
      title: 'Tên chủ đất',
      formItem: {
        placeholder: 'Nhập tên chủ đất',
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'ownerPhone',
      title: 'Số điện thoại',
      formItem: {
        placeholder: 'Nhập số điện thoại',
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'provinceCode',
      title: 'Tỉnh, thành phố',
      formItem: {
        type: 'select',
        placeholder: 'Chọn tỉnh, thành phố',
        facade: this.addressFacade.provinceList$,
        col: 6,
        rules: [{ type: 'required' }],
        autoSet: (data, validateForm) => {
          validateForm?.controls['districtCode'].reset();
          if (data) this.addressFacade.getDistrictList({ filter: JSON.stringify({ ParentId: data }) });
        },
      },
    },
    {
      name: 'districtCode',
      title: 'Quận, huyện',
      formItem: {
        type: 'select',
        placeholder: 'Chọn quận, huyện',
        facade: this.addressFacade.districtList$,
        col: 6,
        rules: [{ type: 'required' }],
        autoSet: (data, validateForm) => {
          validateForm?.controls['communeCode'].reset();
          if (data) this.addressFacade.getCommuneList({ filter: JSON.stringify({ ParentId: data }) });
        },
      },
    },
    {
      name: 'communeCode',
      title: 'Phường, xã',
      formItem: {
        type: 'select',
        placeholder: 'Chọn phường, xã',
        facade: this.addressFacade.communeList$,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'village',
      title: 'Địa chỉ cụ thể',
      formItem: {
        placeholder: 'VD: Nhà số 77 đường Duy Tân',
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'mapNumber',
      title: 'Số bản đồ',
      formItem: {
        placeholder: 'Nhập số bản đồ',
        type: 'number',
        col: 6,
      },
    },
    {
      name: 'lotNumber',
      title: 'Số thửa đất',
      formItem: {
        placeholder: 'Số thửa đất',
        type: 'number',
        col: 6,
      },
    },
    {
      name: 'description',
      title: 'Mô tả',
      formItem: {
        placeholder: 'Nhập mô tả',
        type: 'textarea',
      },
    },
  ];
  handleBack() {
    this.router.navigate(['/list_source_news']);
  }
}
