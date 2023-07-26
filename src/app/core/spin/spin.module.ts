import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinComponent } from './spin.component';

@NgModule({
  declarations: [SpinComponent],
  exports: [SpinComponent],
  imports: [CommonModule],
})
export class GSpinModule {}
