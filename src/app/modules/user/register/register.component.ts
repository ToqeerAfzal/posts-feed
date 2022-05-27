import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeyStrings } from 'src/app/app.constants';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  register() {
    let req = this.loginForm.getRawValue();
    this.sharedService.register(req).subscribe((data: any) => {
      if (data) {
        localStorage.setItem(KeyStrings.AuthTokenString, data.jwt);
        this.sharedService.navigateToLogin();
      }
      else {
        alert("Invalid data...");
      }
    },
      err => {
        alert(err.error.message);
      });
  }


  navigateToLogin(){
    this.sharedService.navigateToLogin();
  }
}
