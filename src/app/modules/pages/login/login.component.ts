import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SessionModel } from '../../../utils/models/session-model';
import { SessionService } from '../../../services/session.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../utils/local-storage.service';
import { FieldInterface } from '../../../core/tss-form/models/field.interface';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  user: any = {};
  rememberMe = false;
  formData = {
    'userName': <FieldInterface>{ name: 'userName2', label: 'User Name', value: 'test', rules: { required: true } },
    'password': <FieldInterface>{ name: 'password2', label: 'Password', rules: { required: true } },
    'rememberMe': <FieldInterface>{ name: 'rememberMe2', label: 'Remember me on this computer ' }
  };

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    let remember: any = {};
    this.user = {};
    // console.log('this.loginForm929', this.loginForm);
    //  this.loginForm.value({ 'userName2': 'Rakesh' });
    remember = this.localStorageService.getItem('remember', true);
    if (remember && remember.rememberMe) {
      this.user = remember;
      this.rememberMe = remember.rememberMe;
    }
  }
  login() {
    this.formData.userName.value = 'testssssss2665';
    // console.log(this.loginForm.value);
    this.userService.login(this.user).subscribe(res => {
      let resultData: any;
      resultData = res;
      if (res) {
        if (this.rememberMe) {
          this.user.rememberMe = true;
          this.localStorageService.setItem('remember', this.user, true);
        } else {
          this.localStorageService.removeItem('remember');
        }
        this.sessionService.setSession(res);
        const { accountFlag = false } = resultData;
        if (accountFlag) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/admin/account']);
        }

      }
    });
  }

  loginRememberMe(value) {
    // console.log('value', value);
    this.rememberMe = value;
  }

}
