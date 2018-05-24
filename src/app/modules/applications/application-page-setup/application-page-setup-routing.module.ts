import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationPageSetupComponent } from './application-page-setup.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationPageSetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPageSetupRoutingModule { }
