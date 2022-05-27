import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyStrings } from './app.constants';
import { SharedService } from './modules/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sd-assignment';
  showNav=false;
  userId:any;

  constructor(private sharedService:SharedService, private router: Router, private route:ActivatedRoute){
    this.router.events.subscribe((data) => {
      if (router.url.includes("/user"))
        this.showNav = false;
      else
        this.showNav = true;
    });
    this.userId=localStorage.getItem(KeyStrings.UserId);
  }

  logout(){
    this.sharedService.navigateToLogin();
  }

  navigateToPosts(){
    this.sharedService.navigateToPosts();
  }

  navigateToUsers(){
    this.sharedService.navigateToUsers();
  }

  openProfile(){
    this.sharedService.navigateToProfile(this.userId);
  }

}
