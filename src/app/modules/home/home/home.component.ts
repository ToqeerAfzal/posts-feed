import { Component, Input, OnInit } from '@angular/core';
import { KeyStrings } from 'src/app/app.constants';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any;
  displayStyle = "none";
  postBody = "";
  isEdit = false;
  currentPost: any;
  page=1;
  size=10;
  total=0;
  userId:any;
  searchQry="";
  sortOrder="desc";
  sortBy="createdAt";
  @Input() usrId:any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getPosts();
    this.userId=localStorage.getItem(KeyStrings.UserId);
  }

  getPosts() {
    this.sharedService.getPosts(this.page,this.size,this.searchQry,this.sortOrder,this.sortBy,this.usrId).subscribe(posts => {
      this.posts = posts;
      this.page=posts.page;
      this.size=posts.size;
      this.total=posts.total;
    },
      err => {
        alert(err.error.message);
      });
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.postBody="";
    this.displayStyle = "none";
  }

  createPost() {
    if (this.isEdit) {
      this.sharedService.updatePost(this.currentPost.id,this.postBody).subscribe(posts => {
        this.closePopup();
        this.getPosts();
      },
        err => {
          alert(err.error.message);
        });
    }
    else {
      this.sharedService.createPost(this.postBody).subscribe(posts => {
        this.closePopup();
        this.getPosts();
      },
        err => {
          alert(err.error.message);
        });
    }
  }

  editPost(post: any) {
    this.currentPost = post;
    this.isEdit = true;
    this.postBody = post.body;
    this.openPopup();
  }

  deletePost(post:any) {
    this.sharedService.deletePost(post.id).subscribe(posts => {
      this.getPosts();
    },
      err => {
        alert(err.error.message);
      });
  }
  changePage(value:number){
    this.page+=value;
    this.getPosts();
  }

  sortColumns(columnName:string){
    if(this.sortOrder=='asc')
      this.sortOrder='desc';
    else
      this.sortOrder='asc';
    this.sortBy=columnName;
    this.getPosts();
  }
}
