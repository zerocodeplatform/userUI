import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ApplicationModulesComponent } from './application-modules/application-modules.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationModulesSetupComponent } from './application-modules-setup/application-modules-setup.component';
import { RouterOutletComponent } from '../../layouts/router-outlet.component';
import { RouterOutlet } from '@angular/router';
import { DatasetLayoutComponent } from './application-modules-setup/app-datasets/dataset-layout/dataset-layout.component';
import { ApplicationSetupComponent } from './application-setup/application-setup.component';
import { ApplicationPageSetupComponent } from './application-page-setup/application-page-setup.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumbs: false
    },
    children: [
      {
        path: '',
        component: ApplicationsListComponent,
      },
      {
        path: 'application-setup/:applicationUid',
        component: ApplicationSetupComponent
      },
      {
        path: ':applicationName/:applicationUid',
        data: {
          breadcrumbs: 'application details'
        },
        children: [
          {
            path: '',
            component: ApplicationModulesComponent,
          },
          {
            path: ':module/:moduleUid/:tabName',
            data: {
              breadcrumbs: 'Module details'
            },
            children: [
              {
                path: '',
                component: ApplicationModulesSetupComponent,
                data: {
                  breadcrumbs: false
                }
              },
              {
                path: 'page/:pageUid',  //page setup
                loadChildren: 'app/modules/applications/application-page-setup/application-page-setup.module#ApplicationPageSetupModule',
                data: {
                  breadcrumbs: 'Page Builder'
                }
              },
              {
                path: ':datasetType/:datasetUid/:datasetName', //data setup
                component: DatasetLayoutComponent,
                data: {
                  breadcrumbs: 'Dataset Setup'
                }
              },

            ]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
