import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFilterComponent } from './address.filter.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [AddressFilterComponent],
  exports: [AddressFilterComponent],
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
          return new TranslateHttpLoader(http, '/assets/translations/');
        },
        deps: [HttpClient],
      },
    }),
    NzSpinModule,
    ReactiveFormsModule,
    NzMenuModule,
  ],
})
export class GFilterAddressModule {}
