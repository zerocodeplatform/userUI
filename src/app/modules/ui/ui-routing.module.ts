import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UiComponent } from './ui.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { UiBootstrapComponent } from './dynamic-form/ui-bootstrap/ui-bootstrap.component';
import { UiMaterialComponent } from './dynamic-form/ui-material/ui-material.component';
import { UiCustomFormComponent } from './dynamic-form/ui-custom-form/ui-custom-form.component';
import {
  DynamicComponentComponent
} from './dynamic-form/dynamic-component/dynamic-component.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dynamic-form',
    pathMatch: 'full'
  },

  {
    path: '',
    component: UiComponent,
    children: [
      {
        path: '',
        redirectTo: 'ui-bootstrap',
        pathMatch: 'full'
      },
      {
        path: 'dynamic-component',
        component: DynamicComponentComponent
      },
      {
        path: 'dynamic-form',
        component: DynamicFormComponent,
        children: [
          {
            path: 'ui-bootstrap',
            component: UiBootstrapComponent
          },
          {
            path: 'ui-material',
            component: UiMaterialComponent
          },
          {
            path: 'ui-custom-form',
            component: UiCustomFormComponent
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
export class UiRoutingModule { }
