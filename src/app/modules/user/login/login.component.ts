import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KeyStrings } from 'src/app/app.constants';
import { SharedService } from '../../shared/shared.service';
// import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  helper = new JwtHelperService();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private sharedService: SharedService) {
    localStorage.removeItem(KeyStrings.AuthTokenString);
  }

  ngOnInit(): void {
  }

  login() {
    let req = this.loginForm.getRawValue();
    this.sharedService.login(req).subscribe((data: any) => {
      if (data) {
        localStorage.setItem(KeyStrings.AuthTokenString, data.jwt);
        this.sharedService.navigateToHome();
        const decodedToken = this.helper.decodeToken(data.jwt);
        const expirationDate = this.helper.getTokenExpirationDate(data.jwt);
        const isExpired = this.helper.isTokenExpired(data.jwt);
        localStorage.setItem(KeyStrings.UserId,decodedToken.userId);
      }
      else {
        alert("Wrong Username/Password");
      }
    },
      err => {
        alert(err.error.message);
      });
  }

  navigateToRegister() {
    this.sharedService.navigateToRegister();
  }
}
