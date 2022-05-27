import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'posts'
  },
  {
    path:'posts',
    component:HomeComponent
  },
  {
    path:'usrlist',
    component: UsersComponent
  },
  {
    path:'profile/:id',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
