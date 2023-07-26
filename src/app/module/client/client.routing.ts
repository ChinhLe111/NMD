import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientLayout } from '@layouts';
import {
  DetailListSourceNewsComponent,
  EditListSourceNewsComponent,
  HomeComponent,
  ListSourceNewsComponent,
} from '@pages';

const routes: Routes = [
  {
    path: '',
    component: ClientLayout,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'list_source_news',
        component: ListSourceNewsComponent,
      },
      {
        path: 'list_source_news/:id/edit',
        component: EditListSourceNewsComponent,
      },
      {
        path: 'list_source_news/:id/detail',
        component: DetailListSourceNewsComponent,
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRouting {}
