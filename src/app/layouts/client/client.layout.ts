import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { GlobalFacade } from '@store';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

export interface Navbar {
  title: string;
  icon: string;
  link: string;
  roleListCode: string[];
  collapseListOption: boolean;
  listOption: { title: string; icon: string; link: string }[];
}

@Component({
  selector: 'app-client',
  templateUrl: './client.layout.html',
  styleUrls: ['./client.layout.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayout implements OnInit {
  isCollapsed = false;
  showGuidance!: boolean;
  showRegulation!: boolean;
  passwordVisible = false;
  confirmPasswordVisible = false;
  listNavbar: Navbar[] = [
    {
      title: 'Nhà đất bán',
      icon: '/assets/icons/house2.svg',
      link: '/real_estate_for_sale',
      roleListCode: ['', 'SOU_CO', 'SOU', 'ADMIN'],
      collapseListOption: false,
      listOption: [
        { title: 'Bán đất', icon: '', link: '/real_estate_for_sale/land' },
        { title: 'Bán nhà ở', icon: '', link: '/real_estate_for_sale/house' },
        { title: 'Bán căn hộ chung cư', icon: '', link: '/real_estate_for_sale/apartment' },
        { title: 'Bán kho, nhà xưởng', icon: '', link: '/real_estate_for_sale/factory' },
      ],
    },
    {
      title: 'Nhà đất cho thuê',
      icon: '/assets/icons/complex.svg',
      link: '/real_estate_for_rent',
      roleListCode: ['', 'SOU_CO', 'SOU', 'ADMIN'],
      collapseListOption: false,
      listOption: [
        { title: 'Cho thuê đất', icon: '', link: '/real_estate_for_rent/land' },
        { title: 'Cho thuê nhà ở', icon: '', link: '/real_estate_for_rent/house' },
        { title: 'Cho thuê căn hộ chung cư', icon: '', link: '/real_estate_for_rent/apartment' },
        { title: 'Cho thuê kho, nhà xưởng', icon: '', link: '/real_estate_for_rent/factory' },
      ],
    },
    {
      title: 'Nguồn tin của tôi',
      icon: '/assets/icons/complex.svg',
      link: '/list_source_news',
      roleListCode: ['SOU_CO'],
      collapseListOption: false,
      listOption: [],
    },
    {
      title: 'Kho tin CTV',
      icon: '/assets/icons/complex.svg',
      link: '/list_source_news',
      roleListCode: ['SOU'],
      collapseListOption: false,
      listOption: [],
    },
    {
      title: 'Xét duyệt tin CTV',
      icon: '/assets/icons/complex.svg',
      link: '/list_source_news',
      roleListCode: ['ADMIN'],
      collapseListOption: false,
      listOption: [],
    },
    {
      title: 'Xét duyệt nguồn',
      icon: '/assets/icons/complex.svg',
      link: '/real-estate-news',
      roleListCode: ['ADMIN'],
      collapseListOption: false,
      listOption: [],
    },
    {
      title: 'Nguồn hàng của tôi',
      icon: '/assets/icons/complex.svg',
      link: '/real-estate-news',
      roleListCode: ['SOU'],
      collapseListOption: false,
      listOption: [],
    },
  ];

  listGuidance = [
    { text: 'Báo giá & hỗ trợ', link: '/' },
    { text: 'Câu hỏi thường gặp', link: '/' },
    { text: 'Thông báo', link: '/' },
    { text: 'Liên hệ', link: '/' },
    { text: 'Sitemap', link: '/' },
  ];

  listRegulation = [
    { text: 'Quy định đăng tin', link: '' },
    { text: 'Quy chế hoạt động', link: '' },
    { text: 'Điều khoản thỏa thuận', link: '' },
    { text: 'Chính sách bảo mật', link: '' },
    { text: 'Giải quyết khiếu nại', link: '' },
    { text: 'Góp ý báo lỗi', link: '' },
  ];

  listSupport = [
    {
      img: '/assets/icons/footer/phone-call.svg',
      title: 'Hotline',
      href: '',
      contact: '1900 1881',
    },
    {
      img: '/assets/icons/footer/question.svg',
      title: 'Hỗ trợ khách hàng',
      href: 'http://trogiup.batdongsan.com.vn',
      contact: 'trogiup.batdongsan.com.vn',
    },
    {
      img: '/assets/icons/footer/headset.svg',
      title: 'Chăm sóc khách hàng',
      href: 'http://hotro@batdongsan.com.vn',
      contact: 'hotro@batdongsan.com.vn',
    },
  ];

  listNation = [
    {
      flag: '/assets/icons/footer/vietnam.svg',
      language: 'Việt Nam',
      linkPage: '',
    },
    {
      flag: '/assets/icons/footer/singapore.svg',
      language: 'Singapore',
      linkPage: '',
    },
    {
      flag: '/assets/icons/footer/malaysia.svg',
      language: 'Malaysia',
      linkPage: '',
    },
    {
      flag: '/assets/icons/footer/thailand.svg',
      language: 'Thailand',
      linkPage: '',
    },
    {
      flag: '/assets/icons/footer/indonesia.svg',
      language: 'Indonesia',
      linkPage: '',
    },
    {
      flag: '/assets/icons/footer/australia.svg',
      language: 'Australia',
      linkPage: '',
    },
  ];

  listLicense = [
    'Giấy ĐKKD số 0104630479 do Sở KHĐT TP Hà Nội cấp lần đầu ngày 02/06/2010',
    'Giấy phép ICP số 2399/GP-STTTT do Sở TTTT Hà Nội cấp ngày 4/9/2014',
    'Giấy phép GH ICP số 3832/GP-TTĐT do Sở TTTT Hà Nội cấp ngày 8/8/2019',
    'Giấy phép SĐ, BS GP ICP số 3833/GP-TTĐT do Sở TTTT Hà Nội cấp ngày 8/8/2019',
    'Giấy xác nhận số 1728/GXN-TTĐT do Sở TTTT Hà Nội cấp ngày 23/6/2020',
    'Giấy phép GH ICP số 2886/GP-TTĐT do Sở TTTT Hà Nội cấp ngày 09/08/2021',
  ];

  listReponsible = [
    'Chịu trách nhiệm nội dung GP ICP: Bà Đặng Thị Hường',
    'Chịu trách nhiệm sàn GDTMĐT: Ông Nguyễn Đức Thắng',
    'Quy chế, quy định giao dịch có hiệu lực từ 27/02/2023',
    'Ghi rõ nguồn "Batdongsan.com.vn" khi phát hành lại thông tin từ website này.',
  ];

  constructor(public globalFacade: GlobalFacade, private fb: UntypedFormBuilder, protected router: Router) {}

  private destroyed$ = new Subject<void>();
  roleCode = '';
  isVisible!: boolean;
  validateForm!: UntypedFormGroup;
  registerForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.globalFacade.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      if (user?.userModel?.roleListCode) {
        this.roleCode = user?.userModel?.roleListCode[0];
      } else {
        this.roleCode = '';
      }
    });
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      deviceNo: 'abc',
      deviceName: 'abc',
      deviceType: 'BROWSER',
      remember: Boolean,
    });
    this.registerForm = this.fb.group({
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      registerCode: [null, [Validators.required]],
      roleCode: [null, [Validators.required]],
      attachments: new FormArray([]),
    });
    this.globalFacade.status$.subscribe((status) => {
      if (status == 'loginOk') this.isVisible = false;
    });
  }

  isShowLogin!: boolean;

  showLoginForm(): void {
    this.isVisible = true;
    this.isShowLogin = true;
  }

  showRegisterForm(): void {
    this.isVisible = true;
    this.isShowLogin = false;
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.checkPassword.updateValueAndValidity());
  }

  submitForm(): void {
    if (this.validateForm.valid) {
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.globalFacade.login(this.validateForm.value);
  }

  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      this.globalFacade.register(this.registerForm.value);
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
