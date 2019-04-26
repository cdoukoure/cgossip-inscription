/* import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppSandbox } from '@app/app.sandbox';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgrxFormsModule } from 'ngrx-forms';

import { MaterialModule } from '../material/material.module';

import {
  // Module
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  //MatTableModule,
  //MatIconModule
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
} from '@angular/material';

// import { NgxDatatableModule }       from '@swimlane/ngx-datatable';
// import { NgxImgModule } from 'ngx-img';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { WebsiteLayoutComponent } from '@shared/layout/website/website-layout/website-layout.component';
import { AdminLayoutComponent } from '@app/administration/admin-layout/admin-layout.component';

// Module feature components
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { FirstLoginComponent } from './first-login/first-login.component';


import { AuthGuard } from '@app/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: 'first-login', component: FirstLoginComponent, pathMatch: 'full'},
      { path: 'register', component: RegisterComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent, pathMatch: 'full'},
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }, 
      /*{
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }*/ 
    ]
  }, 
  {
    path: 'user-panel',
    pathMatch: 'prefix',
    component: AdminLayoutComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      { path: 'profile', component: ProfileComponent, pathMatch: 'full'},
      { path: 'password', component: PasswordComponent, pathMatch: 'full'},
      { path: 'logout', component: LogoutComponent, pathMatch: 'full'},
    ]
  }, 
];

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    LogoutComponent, 
    ProfileComponent, 
    PasswordComponent,
    FirstLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    // RouterModule.forChild(routes), 
    RouterModule.forRoot(routes), 

 
    NgrxFormsModule,


    TranslateModule,

    // Angular Material
    MaterialModule, // for ngrx-forms

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    SweetAlert2Module
  ],
  exports: [TranslatePipe],
  providers: [TranslateModule]
})
export class AuthRoutingModule { }
