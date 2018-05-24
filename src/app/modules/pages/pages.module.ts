import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { CommonFormModuleModule } from '../../config/shared-modules/common-form-module.module';
import { CommonLayoutModuleModule } from '../../config/shared-modules/common-layout-module.module';
import { UserService } from '../../services/user.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SessionService } from '../../services/session.service';
import { LocalStorageService } from '../../utils/local-storage.service';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    CommonFormModuleModule,
    CommonLayoutModuleModule,
    ButtonModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent],
  providers: [UserService, SessionService, LocalStorageService]
})
export class PagesModule { }
