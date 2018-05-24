import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsertypeLayoutComponent } from './usertype-layout/usertype-layout.component';
import { UsertypeListComponent } from './usertype-list/usertype-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumbs: false
    },
    children: [
      {
        path: '',
        component: UsertypeListComponent,
      },
      {
        path: ':userTypeId/:name/:tabName',
        component: UsertypeLayoutComponent,
        data: {
          breadcrumbs: 'Details'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsertypeRoutingModule { }
