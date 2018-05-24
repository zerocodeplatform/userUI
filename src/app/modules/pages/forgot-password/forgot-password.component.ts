import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  fp: any = {};
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }
  sendMail() {
    this.userService.forgotPassword(this.fp).subscribe(res => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }

}
