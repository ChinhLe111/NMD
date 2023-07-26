import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AcreageFilterComponent } from './acreage.filter.component';
import { CommonModule } from '@angular/common';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GButtonModule } from '@core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AcreageFilterComponent],
  exports: [AcreageFilterComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
          return new TranslateHttpLoader(http, '/assets/translations/');
        },
        deps: [HttpClient],
      },
    }),
    FormsModule,
    NzSliderModule,
    ReactiveFormsModule,
    GButtonModule,
    NzMenuModule,
    NgxMaskModule.forRoot(),
  ],
})
export class GFilterAcreageModule {}
