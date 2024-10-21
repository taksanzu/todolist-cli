import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './page/home/home.component';
import { CategoryComponent } from './page/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryModalComponent } from './page/modal/category-modal/category-modal.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './page/task/task.component';
import { TaskModalComponent } from './page/modal/task-modal/task-modal.component';
import { LoginComponent } from './page/login/login.component';
import { HomeAdminComponent } from './page/home-admin/home-admin.component';
import { HomeUserComponent } from './page/home-user/home-user.component';
import { GroupComponent } from './page/admin/group/group.component';
import { UserComponent } from './page/admin/user/user.component';
import { GroupModalComponent } from './page/admin/modal/group-modal/group-modal.component';
import { UserModalComponent } from './page/admin/modal/user-modal/user-modal.component';

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
    HomeAdminComponent,
    HomeUserComponent,
    GroupComponent,
    UserComponent,
    GroupModalComponent,
    UserModalComponent
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
