import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UsersComponent } from './pages/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './interceptor/user.interceptor';
import { UsersGuard } from './guards/users.guard';
import { PaginationComponent } from './component/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './pages/clients/clients.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';
import { InvoicesFormComponent } from './pages/invoices-form/invoices-form.component';
import {ToasterComponent} from "./component/toaster/toaster.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    NavbarComponent,
    UsersComponent,
    PaginationComponent,
    ClientsComponent,
    InvoicesComponent,
    ClientFormComponent,
    InvoicesFormComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UsersGuard,
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
