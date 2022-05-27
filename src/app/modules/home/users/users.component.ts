import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  page=1;
  size=10;
  total=0;
  searchQry="";
  sortOrder="desc";
  sortBy="createdAt";

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.sharedService.getUsers(this.page,this.size,this.searchQry,this.sortOrder,this.sortBy).subscribe(users => {
      this.users = users;
      this.page=users.page;
      this.size=users.size;
      this.total=users.total;
    },
      err => {
        alert(err.error.message);
      });
  }
  changePage(value:number){
    this.page+=value;
    this.getUsers();
  }

  sortColumns(columnName:string){
    if(this.sortOrder=='asc')
      this.sortOrder='desc';
    else
      this.sortOrder='asc';
    this.sortBy=columnName;
    this.getUsers();
  }

  openProfile(id:number){
    this.sharedService.navigateToProfile(id);
  }
}
