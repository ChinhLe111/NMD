import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SwiperDirective } from '@directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { FormatCurrencyPipe, FormatDatePipe, FullTextSearchPipe } from '@pipes';
import { ClientLayout } from '@layouts';
import { environment } from '@src/environments/environment';
import { ClientRouting } from './client.routing';
import {
  GDatatableModule,
  GFilterAcreageModule,
  GFilterAddressModule,
  GFilterAreaProjectModule,
  GFilterPriceModule,
  GFilterSelectModule,
  GFormModule,
  GPaginationModule,
} from '@core';
import {
  ADDRESS_FEATURE_KEY,
  AddressEffects,
  addressReducer,
  CODE_TYPE_FEATURE_KEY,
  CodeTypeEffects,
  codeTypeReducer,
  GLOBAL_FEATURE_KEY,
  GlobalEffects,
  globalReducer,
  NEWS_FEATURE_KEY,
  NewsEffects,
  newsReducer,
  PARAMETERS_FEATURE_KEY,
  ParametersEffects,
  parametersReducer,
  PROPERTY_FEATURE_KEY,
  PropertyEffects,
  propertyReducer,
  TYPES_CODE_TYPE_FEATURE_KEY,
  TypesCodeTypeEffects,
  typesCodeTypeReducer,
  UPLOAD_FEATURE_KEY,
  UploadEffects,
  uploadReducer,
} from '@store';
import {
  DetailListSourceNewsComponent,
  EditListSourceNewsComponent,
  HomeComponent,
  ListSourceNewsComponent,
} from '@pages';
import { NgxMaskModule } from 'ngx-mask';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    ClientLayout,
    SwiperDirective,
    FormatDatePipe,
    FullTextSearchPipe,
    FormatCurrencyPipe,
    HomeComponent,
    ListSourceNewsComponent,
    DetailListSourceNewsComponent,
    EditListSourceNewsComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('ng-language') || environment.language,
      loader: {
        provide: TranslateLoader,
        useFactory: function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
          return new TranslateHttpLoader(http, 'assets/translations/');
        },
        deps: [HttpClient],
      },
    }),
    GFilterAddressModule,
    GFilterPriceModule,
    GFilterAcreageModule,
    GFilterAreaProjectModule,
    GFilterSelectModule,
    CommonModule,
    ClientRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzIconModule,
    NzPopoverModule,
    NzToolTipModule,
    NzModalModule,
    NzSpinModule,
    GPaginationModule,
    GFormModule,
    NgxMaskModule,
    GDatatableModule,
    NzInputModule,
    NzDatePickerModule,
    EffectsModule.forFeature([
      AddressEffects,
      CodeTypeEffects,
      GlobalEffects,
      ParametersEffects,
      TypesCodeTypeEffects,
      UploadEffects,
      PropertyEffects,
      NewsEffects,
    ]),
    StoreModule.forFeature(ADDRESS_FEATURE_KEY, addressReducer),
    StoreModule.forFeature(CODE_TYPE_FEATURE_KEY, codeTypeReducer),
    StoreModule.forFeature(GLOBAL_FEATURE_KEY, globalReducer),
    StoreModule.forFeature(PARAMETERS_FEATURE_KEY, parametersReducer),
    StoreModule.forFeature(TYPES_CODE_TYPE_FEATURE_KEY, typesCodeTypeReducer),
    StoreModule.forFeature(UPLOAD_FEATURE_KEY, uploadReducer),
    StoreModule.forFeature(PROPERTY_FEATURE_KEY, propertyReducer),
    StoreModule.forFeature(NEWS_FEATURE_KEY, newsReducer),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientModule {}
