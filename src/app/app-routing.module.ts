import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { CategoryComponent } from './page/category/category.component';
import { TaskComponent } from './page/task/task.component';
import { LoginComponent } from './page/login/login.component';
import { authGuard } from './auth.guard';
import { HomeAdminComponent } from './page/home-admin/home-admin.component';
import { roleGuard } from './role.guard';
import { UserComponent } from './page/admin/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
  { path: 'task', component: TaskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: HomeAdminComponent, canActivate: [authGuard, roleGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard, roleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
