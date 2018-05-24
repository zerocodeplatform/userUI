import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/account',
        pathMatch: 'full'
      },
      {
        path: 'account',
        loadChildren: 'app/modules/account-setup/account-setup.module#AccountSetupModule',
        data: {
          // Uses last urlfragment (about) as text
          breadcrumbs: 'Account'
        }
      },
      {
        path: 'applications',
        loadChildren: 'app/modules/applications/applications.module#ApplicationsModule',
        data: {
          breadcrumbs: 'Applications'
        }
      },
      {
        path: 'usertype',
        loadChildren: 'app/modules/usertype/usertype.module#UsertypeModule',
        data: {
          breadcrumbs: 'User Type'
        }
      },
      {
        path: 'ui',
        loadChildren: 'app/modules/ui/ui.module#UiModule',
        data: {
          breadcrumbs: 'UI '
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
