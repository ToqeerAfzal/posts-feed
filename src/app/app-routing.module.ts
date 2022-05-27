import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule),
    canActivate:[AuthGuard]
  },
  {
    path:'user',
    loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
