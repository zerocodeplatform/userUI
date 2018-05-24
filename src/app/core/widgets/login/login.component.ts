import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';
import { LocalStorageService } from '../../../utils/local-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() options: any = {};
  loginForm: FormGroup = new FormGroup({});
  user: any = {};
  rememberMe = false;
  btnLabel: string;
  title:string;

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router, private localStorageService: LocalStorageService) {
  }
  ngOnInit() {
    this.btnLabel = this.options.btnLabel || 'Submit';
    this.title = this.options.title || 'Login';
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
        this.router.navigate(['/page/' + this.options.navigateTo]);
        // const { accountFlag = false } = resultData;
        // if (accountFlag) {
        //   this.router.navigate(['/admin']);
        // } else {
        //   this.router.navigate(['/admin/account']);
        // }

      }
    });
  }
  loginRememberMe(value) {
    // console.log('value', value);
    this.rememberMe = value;
  }

}
