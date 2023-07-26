import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { Subject } from 'rxjs';
import Swiper, { EffectFade, SwiperOptions } from 'swiper';
import { register } from 'swiper/element/bundle';
import LazyLoad from 'vanilla-lazyload';
import { CodeType, CodeTypeFacade, Commune, District, Property, PropertyFacade, Province } from '@store';
import { FormatCurrencyPipe } from '@pipes';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PropertyFacade, CodeTypeFacade, FormatCurrencyPipe],
})
export class HomeComponent implements OnInit, OnDestroy {
  arrIconTypeOfHousing = [
    {
      icon: '/assets/icons/home/icon/land.svg',
      code: 'TP1',
    },
    {
      icon: '/assets/icons/home/icon/house.svg',
      code: 'TP2',
    },
    {
      icon: '/assets/icons/home/icon/building.svg',
      code: 'TP3',
    },
    {
      icon: '/assets/icons/home/icon/warehouse.svg',
      code: 'TP4',
    },
  ];

  news = [
    {
      type: 'Tin nổi bật',
      items: [
        {
          img: '/assets/icons/home/1.1.jpg',
          title: 'Thị Trường Mua Bán BĐS Quận 4 "Hút Khách" Do Đâu?',
          link: '',
        },
        {
          img: '/assets/icons/home/1.jpg',
          title: 'Bật Mí Yếu Tố Khiến Giá Chung Cư Tăng Mà Ít Ai Ngờ Tới',
          link: '',
        },
        {
          img: '/assets/icons/home/2.jpg',
          title: 'TPHCM Có Bao Nhiêu Dự Án Nhà Ở Xã Hội Đang Triển Khai Trong Năm 2023',
          link: '',
        },
        {
          img: '/assets/icons/home/3.jpg',
          title: 'Bị Ép Giá, Nhà Đầu Tư Chọn Ôm Đất Chờ Thời',
          link: '',
        },
        {
          img: '/assets/icons/home/4.webp',
          title: 'Chần Chừ, Giá BĐS TPHCM Có Thể Qua Đáy',
          link: '',
        },
        {
          img: '/assets/icons/home/5.jpg',
          title: '7 Điều Cần Biết Về Giải Thưởng Bất Động Sản Việt Nam Propertyguru',
          link: '',
        },
        {
          img: '/assets/icons/home/6.webp',
          title: 'Tuổi Hợi Hợp Hướng Nào Để Làm Nhà Trong Năm 2023?',
          link: '',
        },
      ],
    },
    {
      type: 'Tin tức',
      items: [
        {
          img: '/assets/icons/home/lai-suat.webp',
          title: 'Biên Độ Lãi Suất Là Gì? Xem Ngay Cách Tính Biên Độ Lãi Suất 2023',
          link: '',
        },
        {
          img: '/assets/icons/home/1.jpg',
          title: 'Bật Mí Yếu Tố Khiến Giá Chung Cư Tăng Mà Ít Ai Ngờ Tới',
          link: '',
        },
        {
          img: '/assets/icons/home/2.jpg',
          title: 'TPHCM Có Bao Nhiêu Dự Án Nhà Ở Xã Hội Đang Triển Khai Trong Năm 2023',
          link: '',
        },
        {
          img: '/assets/icons/home/3.jpg',
          title: 'Bị Ép Giá, Nhà Đầu Tư Chọn Ôm Đất Chờ Thời',
          link: '',
        },
        {
          img: '/assets/icons/home/4.webp',
          title: 'Chần Chừ, Giá BĐS TPHCM Có Thể Qua Đáy',
          link: '',
        },
        {
          img: '/assets/icons/home/5.jpg',
          title: '7 Điều Cần Biết Về Giải Thưởng Bất Động Sản Việt Nam Propertyguru',
          link: '',
        },
        {
          img: '/assets/icons/home/6.webp',
          title: 'Tuổi Hợi Hợp Hướng Nào Để Làm Nhà Trong Năm 2023?',
          link: '',
        },
      ],
    },
    {
      type: 'BĐS TPHCM',
      items: [
        {
          img: '/assets/icons/home/2.jpg',
          title: 'TPHCM Có Bao Nhiêu Dự Án Nhà Ở Xã Hội Đang Triển Khai Trong Năm 2023',
          link: '',
        },
        {
          img: '/assets/icons/home/1.1.jpg',
          title: 'Thị Trường Mua Bán BĐS Quận 4 "Hút Khách" Do Đâu?',
          link: '',
        },
        {
          img: '/assets/icons/home/1.jpg',
          title: 'Bật Mí Yếu Tố Khiến Giá Chung Cư Tăng Mà Ít Ai Ngờ Tới',
          link: '',
        },

        {
          img: '/assets/icons/home/3.jpg',
          title: 'Bị Ép Giá, Nhà Đầu Tư Chọn Ôm Đất Chờ Thời',
          link: '',
        },
        {
          img: '/assets/icons/home/4.webp',
          title: 'Chần Chừ, Giá BĐS TPHCM Có Thể Qua Đáy',
          link: '',
        },
        {
          img: '/assets/icons/home/5.jpg',
          title: '7 Điều Cần Biết Về Giải Thưởng Bất Động Sản Việt Nam Propertyguru',
          link: '',
        },
        {
          img: '/assets/icons/home/6.webp',
          title: 'Tuổi Hợi Hợp Hướng Nào Để Làm Nhà Trong Năm 2023?',
          link: '',
        },
      ],
    },
    {
      type: 'BĐS Hà Nội',
      items: [
        {
          img: '/assets/icons/home/dautuBDS.webp',
          title: 'Đầu Tư Bất Động Sản: Nhà Đầu Tư Và Môi Giới Tìm Cơ Hội Mới Khi Thị Trường Chững',
          link: '',
        },
        {
          img: '/assets/icons/home/1.jpg',
          title: 'Bật Mí Yếu Tố Khiến Giá Chung Cư Tăng Mà Ít Ai Ngờ Tới',
          link: '',
        },
        {
          img: '/assets/icons/home/2.jpg',
          title: 'TPHCM Có Bao Nhiêu Dự Án Nhà Ở Xã Hội Đang Triển Khai Trong Năm 2023',
          link: '',
        },
        {
          img: '/assets/icons/home/3.jpg',
          title: 'Bị Ép Giá, Nhà Đầu Tư Chọn Ôm Đất Chờ Thời',
          link: '',
        },
        {
          img: '/assets/icons/home/4.webp',
          title: 'Chần Chừ, Giá BĐS TPHCM Có Thể Qua Đáy',
          link: '',
        },
        {
          img: '/assets/icons/home/5.jpg',
          title: '7 Điều Cần Biết Về Giải Thưởng Bất Động Sản Việt Nam Propertyguru',
          link: '',
        },
        {
          img: '/assets/icons/home/6.webp',
          title: 'Tuổi Hợi Hợp Hướng Nào Để Làm Nhà Trong Năm 2023?',
          link: '',
        },
      ],
    },
  ];
  listSupport = [
    {
      link: '',
      img: '/assets/icons/home/ic-ying-yang.svg',
      title: 'Xem tuổi xây nhà',
    },
    {
      link: '',
      img: '/assets/icons/home/ic-house.svg',
      title: 'Chi phí làm nhà',
    },
    {
      link: '',
      img: '/assets/icons/home/calculator.svg',
      title: 'Tính lãi suất',
    },
    {
      link: '',
      img: '/assets/icons/home/ic-feng-shui.svg',
      title: 'Tư vấn phong thủy',
    },
  ];
  listLogo = [
    {
      link: '',
      img: '/assets/icons/home/duchungland.jpg',
      tooltip: 'CÔNG TY TNHH TƯ VẤN DỊCH VỤ BẤT ĐỘNG SẢN ĐỨC HƯNG LAND',
    },
    {
      link: '',
      img: '/assets/icons/home/sadeco.jpg',
      tooltip: 'CÔNG TY CỔ PHẦN PHÁT TRIỂN NAM SÀI GÒN',
    },
    {
      link: '',
      img: '/assets/icons/home/sphome.jpg',
      tooltip: 'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ BẤT ĐỘNG SẢN SP HOME',
    },
    {
      link: '',
      img: '/assets/icons/home/bdsdatviet.jpg',
      tooltip: 'CÔNG TY TNHH XÂY DỰNG THƯƠNG MẠI MÔI GIỚI BẤT ĐỘNG SẢN ĐẤT VIỆT',
    },
    {
      link: '',
      img: '/assets/icons/home/cangio24h.jpg',
      tooltip: 'CÔNG TY TNHH NHÀ ĐẤT CẦN GIỜ 24H',
    },
    {
      link: '',
      img: '/assets/icons/home/greenhouse.jpg',
      tooltip: 'CÔNG TY TNHH MÔI GIỚI NGÔI NHÀ XANH',
    },
    {
      link: '',
      img: '/assets/icons/home/thienminhcapital.jpg',
      tooltip: 'CÔNG TY TNHH BẤT ĐỘNG SẢN THIÊN MINH CAPITAL',
    },
    {
      link: '',
      img: '/assets/icons/home/hausland.jpg',
      tooltip: 'Công ty TNHH Đầu tư Bất động sản HAUSLAND',
    },
    {
      link: '',
      img: '/assets/icons/home/cityland.jpg',
      tooltip: 'Công ty TNHH Đầu tư Địa ốc Thành phố (CityLand)',
    },
    {
      link: '',
      img: '/assets/icons/home/hoangthogroup.jpg',
      tooltip: 'CÔNG TY TNHH ĐẦU TƯ XÂY DỰNG DỊCH VỤ HOÀNG THỔ GROUP',
    },
    {
      link: '',
      img: '/assets/icons/home/kimtinhgroup.jpg',
      tooltip: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ĐỊA ỐC KIM TINH',
    },
  ];
  listOutStanding = [
    {
      img: 'assets/icons/home/kitacapital.jpg',
      status: 'Sắp mở bán',
      date: '',
      title: 'Kita Capital Ciputra',
      totalArea: '<span>18.8 ha</span>',
      unit: '',
      location: 'Tây Hồ, Hà Nội',
    },
    {
      img: 'assets/icons/home/marinasaigon.jpg',
      status: 'Đang mở bán',
      date: 'Sắp bàn giao tòa Lake',
      title: 'Grand Marina Saigon',
      totalArea: '',
      location: 'Quận 1, Hồ Chí Minh',
    },
    {
      img: 'assets/icons/home/parishoangkim.jpg',
      status: 'Đang mở bán',
      date: '5/2023: Đang bán 10',
      title: 'Paris Hoàng Kim',
      totalArea: '<span>7,709 m&#178;</span>',
      location: 'Quận 2, Hồ Chí Minh',
    },
    {
      img: 'assets/icons/home/bconspolaris.jpg',
      status: 'Đang mở bán',
      date: '5/6/2023: Mở bán đợt',
      title: 'Bcons Polaris',
      totalArea: '<span>3,820 m&#178;</span>',
      location: 'Dĩ An, Bình Dương',
    },
    {
      img: 'assets/icons/home/thesholi.jpg',
      status: 'Sắp mở bán',
      date: 'Khởi công ngày 20/4/2023',
      title: 'The Sholi Bình Tân',
      totalArea: '<span>1.4 ha</span>',
      location: 'Bình Tân, Hồ Chí Minh',
    },
    {
      img: 'assets/icons/home/vinhomesky.jpg',
      status: 'Sắp mở bán',
      date: '24/5: Kick off',
      title: 'Vinhome Sky Park Bắc Giang',
      totalArea: '<span>8,900 m&#178;</span>',
      location: 'Bắc Giang, Bắc Giang',
    },
  ];
  listPropertyNews = [
    {
      img: 'assets/icons/home/01.jpg',
      stt: '01',
      title: 'Thương Hiệu Phân Phối Bất Động Sản Cao Cấp Uy Tín - MICC Group Chính Thức “Trình Làng”',
      link: '',
    },
    {
      img: 'assets/icons/home/02.webp',
      stt: '02',
      title: 'Xu Hướng Mua Căn Hộ Chung Cư: Ngại Dự Án Đang Xây, Chốt Nhà Đã Hoàn Thiện',
      link: '',
    },
    {
      img: 'assets/icons/home/03.jpg',
      stt: '03',
      title: 'Khi Nào Nhu Cầu Mua Nhà Đất Mới Tăng Trở Lại?',
      link: '',
    },
    {
      img: 'assets/icons/home/04.jpg',
      stt: '04',
      title: 'Căn Hộ Cho Thuê Và Những Chuyển Dịch Mới Trên Thị Trường Đầu Tư BĐS 2023',
      link: '',
    },
    {
      img: 'assets/icons/home/05.jpg',
      stt: '05',
      title: 'Thị Trường BĐS Hiện Nay Đang Ấm Dần Lên',
      link: '',
    },
    {
      img: 'assets/icons/home/06.jpg',
      stt: '06',
      title: 'Người Mua Nhà Còng Lưng Gánh Lãi Vì Dự Án Chậm Tiến Độ',
      link: '',
    },
  ];

  codeType = this.news[0].type;
  title = this.news[0].items[0].title;

  currenIndex: any = 0;

  config: SwiperOptions = {
    modules: [EffectFade],
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    effect: 'fade',
  };

  config1: SwiperOptions = {
    loop: true,
    autoplay: {
      delay: 1000,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      620: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      895: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1250: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };

  public enterprises: SwiperOptions = {
    loop: true,
    autoplay: {
      delay: 500,
    },
    breakpoints: {
      350: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 3,
      },

      768: {
        slidesPerView: 5,
        spaceBetween: 4,
      },

      1024: {
        slidesPerView: 6,
        spaceBetween: 2,
      },
    },
  };
  public propertyNews: SwiperOptions = {
    loop: true,
    autoplay: {
      delay: 500,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  lazyload: any;
  private destroyed$ = new Subject<void>();
  @ViewChild('swiper') swiperRef: any;

  constructor(
    public propertyFacade: PropertyFacade,
    protected codeTypeFacade: CodeTypeFacade,
    private metaService: Meta,
    private titleService: Title,
    public translate: TranslateService,
    protected formatCurrency: FormatCurrencyPipe,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.lazyload = new LazyLoad({
          callback_error: (el: any) => (el.src = 'https://via.placeholder.com/440x560/?text=Error'),
        });
      }
    };
  }

  ngOnInit() {
    this.typingEffectSearch();
    this.handleMenuFilter('For Sale');
    this.codeTypeFacade.getPropertySource({ filter: JSON.stringify({ type: 'PropertySourceCode' }) });
    this.codeTypeFacade.getPropertyType({ filter: JSON.stringify({ type: 'PropertyTypeCode' }) });

    this.translate.get('page').subscribe((text: any) => {
      this.titleService.setTitle('GENEAT SOFTWARE – Phần mềm hiệu năng cao cho doanh nghiệp SMEs');
      this.metaService.updateTag({
        name: 'description',
        content: 'GENEAT SOFTWARE – Phần mềm hiệu năng cao cho doanh nghiệp SMEs',
      });
      this.metaService.updateTag({
        property: 'og:url',
        content: location.href,
      });
      this.metaService.updateTag({
        property: 'og:image',
        content: 'https://angular.io/assets/images/favicons/favicon-144x144.png',
      });
      this.metaService.updateTag({
        property: 'og:title',
        content: 'GENEAT SOFTWARE',
      });
      this.metaService.updateTag({
        property: 'og:description',
        content: 'GENEAT SOFTWARE – Phần mềm hiệu năng cao cho doanh nghiệp SMEs',
      });
      this.metaService.updateTag({
        name: 'inLanguage',
        content: this.translate.getDefaultLang(),
      });
      this.metaService.updateTag({
        name: 'pubdate',
        content: new Date().toDateString(),
      });
      this.metaService.updateTag({
        name: 'lastmod',
        content: new Date().toDateString(),
      });
      this.metaService.updateTag({
        name: 'dateCreated',
        content: new Date().toDateString(),
      });
      this.metaService.updateTag({
        name: 'twitter:url',
        content: location.href,
      });
      this.metaService.updateTag({
        name: 'twitter:image',
        content: 'https://geneat.vn/assets/images/favicons/favicon-144x144.png',
      });
      this.metaService.updateTag({
        name: 'twitter:title',
        content: 'Angular',
      });
      this.metaService.updateTag({
        name: 'twitter:description',
        content: 'GENEAT SOFTWARE – Phần mềm hiệu năng cao cho doanh nghiệp SMEs',
      });
      document.getElementById('canonical')!.setAttribute('href', window.location.href);
      document.documentElement.lang = this.translate.getDefaultLang();

      const el = <HTMLScriptElement>document.getElementById('jsonLD');
      el.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'GENEAT SOFTWARE',
        headline: 'GENEAT SOFTWARE' + ' | ' + 'GENEAT SOFTWARE',
        image: 'https://geneat.vn/assets/images/favicons/favicon-144x144.png',
        keywords: 'GENEAT SOFTWARE',
        publisher: 'geneat.vn',
        url: location.href,
        dateCreated: new Date().toDateString(),
        description: 'GENEAT SOFTWARE – Phần mềm hiệu năng cao cho doanh nghiệp SMEs',
        articleBody: 'GENEAT SOFTWARE – Phần mềm hiệu năng cao cho doanh nghiệp SMEs',
        author: {
          '@type': 'Person',
          name: 'geneat.vn',
        },
      });
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  arrPlaceHolder = [
    'Tìm kiếm theo tên nhà đất...',
    'Tìm kiếm theo tên nhà đất bán...',
    'Tìm kiếm theo tên nhà đất cho thuê...',
  ];

  typingEffectSearch() {
    const search = document.getElementById('search') as HTMLInputElement;
    let placeHolderTimeout: number;
    let index = 0,
      indexPlaceHolder = 0;
    const effect = () => {
      search.setAttribute('placeholder', this.arrPlaceHolder[indexPlaceHolder].slice(0, index));
      index++;
      if (index > this.arrPlaceHolder[indexPlaceHolder].length) {
        index = 0;
        indexPlaceHolder = Math.floor(Math.random() * this.arrPlaceHolder.length);
        placeHolderTimeout = setTimeout(effect, 2000);
      } else placeHolderTimeout = setTimeout(effect, 100);
    };

    effect();

    search.addEventListener('focusin', (event: Event) => {
      clearTimeout(placeHolderTimeout);
      search.placeholder = 'Nhập tên nhà đất cần tìm';
    });
    search.addEventListener('focusout', (event: Event) => {
      effect();
    });
  }

  formatCurrencyText = (value: number) => this.formatCurrency.transformText(value, 1);

  buttonExtend = false;

  getProperties() {
    this.buttonExtend = !this.buttonExtend;
  }

  calculateDayProperty(date: string) {
    const fromDate = new Date(date).getTime();
    const toDate = new Date().getTime();
    const calDay = Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24));
    return fromDate === toDate ? 'Đăng hôm nay' : `Đăng ${calDay} ngày trước`;
  }

  typeMenuFilter?: 'For Sale' | 'For Rent';
  isSearch?: boolean;

  handleMenuFilter(typeMenu: 'For Sale' | 'For Rent') {
    this.isSearch = false;
    this.buttonExtend = false;
    this.typeMenuFilter = typeMenu;
    switch (typeMenu) {
      case 'For Sale':
        this.propertyFacade.get({ filter: JSON.stringify({ TransactionTypeCode: 'SALE' }) });
        break;
      case 'For Rent':
        this.propertyFacade.get({ filter: JSON.stringify({ TransactionTypeCode: 'RENT' }) });
        break;
    }
  }

  choosePropertyType?: CodeType;

  handleTypeOfHousing(propertyType: CodeType) {
    this.choosePropertyType = propertyType;
  }

  fullTextSearch?: string;

  handleSearch() {
    const paramFilter = {
      PropertyTypeCode: this.choosePropertyType?.code,
      FullTextSearch: this.fullTextSearch,
      ProvinceCode: this.valueChangeArea?.province?.maTinh,
      DistrictCode: this.valueChangeArea?.district?.districtCode,
      CommuneCode: this.valueChangeArea?.commune?.communeCode,
      TotalPriceRange: this.valueChangePrice ? [this.valueChangePrice?.from, this.valueChangePrice?.to] : undefined,
      TotalAreaRange: this.valueChangeAcreage
        ? [this.valueChangeAcreage?.from, this.valueChangeAcreage?.to]
        : undefined,
      PropertySourceCode: this.valueChangeSource?.code,
    };
    if (Object.keys(JSON.parse(JSON.stringify(paramFilter))).length > 0) {
      switch (this.typeMenuFilter) {
        case 'For Sale':
          this.propertyFacade.get({ filter: JSON.stringify({ TransactionTypeCode: 'SALE', ...paramFilter }) });
          this.isSearch = true;
          break;
        case 'For Rent':
          this.propertyFacade.get({ filter: JSON.stringify({ TransactionTypeCode: 'RENT', ...paramFilter }) });
          this.isSearch = true;
          break;
      }
    }
  }

  titleArea() {
    let title = '';
    if (this.valueChangeArea?.province) title += this.valueChangeArea.province.tenTinh;
    if (this.valueChangeArea?.district) title += ', ' + this.valueChangeArea.district.districtName;
    if (this.valueChangeArea?.commune) title += ', ' + this.valueChangeArea.commune.communeName;
    return title;
  }

  valueChangeArea?: { province?: Province; district?: District; commune?: Commune };
  changeArea = (change: { province?: Province; district?: District; commune?: Commune }) => {
    this.valueChangeArea = change;
    this.titleArea();
  };

  valueChangePrice?: { label: string; from: number; to: number };
  changePrice = (change: { label: string; from: number; to: number }) => (this.valueChangePrice = change);

  valueChangeAcreage?: { label: string; from: number; to: number };
  changeAcreage = (change: { label: string; from: number; to: number }) => (this.valueChangeAcreage = change);

  valueChangeSource?: CodeType;
  changeSource = (change: CodeType) => (this.valueChangeSource = change);

  isResetFilter = false;

  filterVisibleChange(visible: boolean) {
    if (visible) this.isResetFilter = false;
  }

  handleReset() {
    this.isResetFilter = true;
    this.choosePropertyType = undefined;
    this.fullTextSearch = undefined;
    if (this.typeMenuFilter && this.isSearch) this.handleMenuFilter(this.typeMenuFilter);
  }

  clickProperty(property: Property) {
    this.router.navigate(['/real_estate_for_sale', property.id]);
  }

  // swiper
  handleNext = (el: any) => el.swiper?.slideNext();
  handlePrev = (el: any) => el.swiper?.slidePrev();
  handleInit = (el: HTMLElement & { swiper?: Swiper } & { initialize: () => void }) => {
    if (!!el.swiper) {
      const init = (swiper: Swiper) => {
        const tl = gsap.timeline({
          delay: 0.5,
          defaults: { duration: 1, ease: 'power1.inOut' },
        });
        tl.from(
          swiper.slides[swiper.activeIndex].querySelector('.left'),
          { x: '-=10%', scale: '+=0.15', opacity: '-=1' },
          '<0.25',
        )
          .from(
            swiper.slides[swiper.activeIndex].querySelector('.right'),
            { x: '+=10%', scale: '+=0.15', opacity: '-=1' },
            '<0.5',
          )
          .from(
            swiper.slides[swiper.activeIndex].querySelector('.top'),
            { y: '-=50%', scale: '+=0.15', opacity: '-=1' },
            '<0.25',
          )
          .from(
            swiper.slides[swiper.activeIndex].querySelector('.bottom'),
            { y: '+=50%', scale: '+=0.15', opacity: '-=1' },
            '<0.5',
          );
        gsap.to(swiper.slides[swiper.activeIndex].querySelector('.zoom'), { scale: '+=0.1', duration: 20 });
      };
      init(el.swiper);
      el.addEventListener('slidechangetransitionstart', (event: any) => {
        const [swiper] = event.detail;
        init(swiper);
      });
    }
  };

  changeType(array: any): void {
    this.codeType = array.type;
  }

  changeTitle(atomic: any): void {
    this.title = atomic.title;
  }

  changeIndex(i: number): void {
    this.title = this.news[i].items[0].title;
  }

  // end swiper
}
