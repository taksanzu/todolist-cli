import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './page/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './page/login/login.component';
import { UserComponent } from './page/admin/user/user.component';
import { UserModalComponent } from './page/admin/modal/user-modal/user-modal.component';
import { HomeAdminComponent } from './page/admin/home-admin/home-admin.component';
import { ChangePasswordModalComponent } from './page/change-password-modal/change-password-modal.component';
import { CategoryComponent } from './page/admin/category/category.component';
import { CategoryModalComponent } from './page/admin/modal/category-modal/category-modal.component';
import { TaskComponent } from './page/admin/task/task.component';
import { TaskModalComponent } from './page/admin/modal/task-modal/task-modal.component';
import { HomeUserComponent } from './page/user/home-user/home-user.component';
import { TaskUserComponent } from './page/user/task-user/task-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CategoryComponent,
    CategoryModalComponent,
    TaskComponent,
    TaskModalComponent,
    LoginComponent,
    UserComponent,
    UserModalComponent,
    HomeAdminComponent,
    ChangePasswordModalComponent,
    HomeUserComponent,
    TaskUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
