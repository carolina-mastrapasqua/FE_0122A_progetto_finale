import { InvoicesFormComponent } from './pages/invoices-form/invoices-form.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersGuard } from './guards/users.guard';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'add-client',
    component: ClientFormComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'add-client/:id',
    component: ClientFormComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'invoices/:id',
    component: InvoicesComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'add-invoice',
    component: InvoicesFormComponent,
    canActivate: [UsersGuard],
  },
  {
    path: 'add-invoice/:id',
    component: InvoicesFormComponent,
    canActivate: [UsersGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
