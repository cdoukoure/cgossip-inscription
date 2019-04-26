import { NgModule } from '@angular/core';
// import { Store, StoreModule }      	 from '@ngrx/store';
import { AuthApiClient }    from '@app/auth/authApiClient.service';


import { AuthRoutingModule } from './auth-routing.module';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { LogoutComponent } from './logout/logout.component';
import { TranslationService } from '@shared/translation/translation.service';

@NgModule({
  imports: [
    // StoreModule.forRoot({}),
    AuthRoutingModule
  ],
  declarations: [
    // LogoutComponent
  ],
  providers: [AuthApiClient, TranslationService]
})
export class AuthModule { }
