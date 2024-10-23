import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UserComponent } from './page/admin/user/user.component';
import { HomeAdminComponent } from './page/admin/home-admin/home-admin.component';
import { CategoryComponent } from './page/admin/category/category.component';
import { TaskComponent } from './page/admin/task/task.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';
import { HomeUserComponent } from './page/user/home-user/home-user.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
  { path: 'task', component: TaskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-admin', component: UserComponent, canActivate: [authGuard] },
  { path: 'admin', component: HomeAdminComponent, canActivate: [authGuard, roleGuard] },
  { path: 'user', component: HomeUserComponent, canActivate: [authGuard, roleGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
