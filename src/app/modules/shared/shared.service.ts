import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KeyStrings } from 'src/app/app.constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token',
    AuthToken:''
  })
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentUrl="";
  constructor(private router: Router, private http:HttpClient) {
    this.currentUrl=KeyStrings.API_BASE_URL;
  }

  navigateToHome() {
    this.router.navigateByUrl("");
  }

  navigateToPosts() {
    this.router.navigateByUrl("/");
  }

  navigateToLogin() {
    this.router.navigateByUrl("/user");
  }

  navigateToRegister() {
    this.router.navigateByUrl("/user/register");
  }

  navigateToUsers() {
    this.router.navigateByUrl("/home/usrlist");
  }

  navigateToProfile(id:number) {
    this.router.navigateByUrl(`/home/profile/${id}`);
  }

  login(request:any):Observable<any> {
    return this.http.post<any>(this.currentUrl + "/login", request, httpOptions);
  }

  register(request:any):Observable<any> {
    return this.http.post<any>(this.currentUrl + "/register", request, httpOptions);
  }

  getPosts(page:number,size:number,searchQry:string,sortOrder:string,sortBy:string,usrId:any):Observable<any>
  {
    let opts={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem(KeyStrings.AuthTokenString)??''}`
      })
    };
    if(usrId)
      return this.http.get<any>(this.currentUrl +`/posts?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}&contains=${searchQry}&userId=${usrId}`, opts);
    else
    return this.http.get<any>(this.currentUrl +`/posts?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}&contains=${searchQry}`, opts);
  }

  getUsers(page:number,size:number,searchQry:string,sortOrder:string,sortBy:string):Observable<any>
  {
    let opts={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem(KeyStrings.AuthTokenString)??''}`
      })
    };
    return this.http.get<any>(this.currentUrl +`/users?page=${page}&size=${size}&sortOrder=${sortOrder}&sortBy=${sortBy}&contains=${searchQry}`, opts);
  }

  createPost(postBody:string):Observable<any>
  {
    let request={
      body:postBody
    };
    let opts={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem(KeyStrings.AuthTokenString)??''}`
      })
    };
    return this.http.post<any>(this.currentUrl + "/posts", request, opts);
  }


  updatePost(postId:number,postBody:string):Observable<any>
  {
    let request={
      body:postBody
    };
    let opts={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem(KeyStrings.AuthTokenString)??''}`
      })
    };
    return this.http.put<any>(this.currentUrl + `/posts/${postId}`, request, opts);
  }

  deletePost(postId:number):Observable<any>
  {
    let opts={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem(KeyStrings.AuthTokenString)??''}`
      })
    };
    return this.http.delete<any>(this.currentUrl + `/posts/${postId}`, opts);
  }

  getProfile(userId:number):Observable<any>
  {
    let opts={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem(KeyStrings.AuthTokenString)??''}`
      })
    };
    return this.http.get<any>(this.currentUrl +`/users/${userId}`, opts);
  }

  deleteuser(userId:number):Observable<any>
  {
    let opts={
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem(KeyStrings.AuthTokenString)??''}`
      })
    };
    return this.http.delete<any>(this.currentUrl + `/users/${userId}`, opts);
  }
}