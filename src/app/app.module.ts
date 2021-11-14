import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EditComponent } from './admin/edit/edit.component';
import { CreateComponent } from './admin/create/create.component';
import { LoginComponent } from './admin/login/login.component';
import { MainComponent } from './main/main.component';
import { PostsComponent } from './main/posts/posts.component';
import { HomeComponent } from './main/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PostComponent } from './main/posts/post/post.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { QuillModule } from 'ngx-quill'
import { AuthInterceptor } from './shared/services/auth.intercepror';
import { searchPosts } from './shared/pipes/search-posts.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    PostsComponent,
    DashboardComponent,
    EditComponent,
    CreateComponent,
    LoginComponent,
    AdminComponent,
    MainComponent,
    PostsComponent,
    HomeComponent,
    PostComponent,
    LoaderComponent,
    searchPosts,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [
    INTERCEPTOR_PROVIDER,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
