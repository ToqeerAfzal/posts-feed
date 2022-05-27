import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyStrings } from 'src/app/app.constants';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId=0;
  profile:any;
  myUserid:any;

  constructor(private route:ActivatedRoute, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.userId=+this.route.snapshot.params['id'];
    this.getProfile();
    this.myUserid=localStorage.getItem(KeyStrings.UserId);
  }

  getProfile() {
    this.sharedService.getProfile(this.userId).subscribe(prof => {
      this.profile=prof;
    },
      err => {
        alert(err.error.message);
      });
  }
  deleteProfile(){
    this.sharedService.deleteuser(this.userId).subscribe(prof => {
      this.sharedService.navigateToLogin();
    },
      err => {
        alert(err.error.message);
      });
  }
}
