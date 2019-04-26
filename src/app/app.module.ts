import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component }  from '@angular/core';
import { Router }     from '@angular/router';
import { AppSandbox } from './app.sandbox';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import { 
  HttpModule,
  RequestOptions,
  XHRBackend,
  Http
}                              from '@angular/http';

// Third party libraries
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  SimpleNotificationsModule,
  NotificationsService
}                              from 'angular2-notifications';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from '@shared/components/components.module';

import { AppComponent } from './app.component';

// Store
import { StateModule } from './shared/store';

// Guards
import { AuthGuard }           from '@shared/guards/auth.guard';
import { CanDeactivateGuard }  from '@shared/guards/canDeactivate.guard';

// Services
import { ConfigService }       from './app-config.service';
import { HttpServiceModule }   from '@shared/asyncServices/http/http.module';
import { UtilityModule}        from '@shared/utility';

import {
  AgmCoreModule
} from '@agm/core';


import { WebsiteTopNavComponent } from './shared/layout/website/website-top-nav/website-top-nav.component';
import { WebsiteFooterComponent } from './shared/layout/website/website-footer/website-footer.component';
import { WebsiteLayoutComponent } from './shared/layout/website/website-layout/website-layout.component';
import { AdminLayoutComponent } from './administration/admin-layout/admin-layout.component';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PageContentComponent } from './shared/layout/page-content/page-content.component';

// import { fakeBackendProvider } from '@shared/interceptors';

import { environment } from '../environments/environment';
import { TranslationService } from './shared/translation/translation.service';
import { TextareaAutoHeightDirective } from './shared/directives/textarea-auto-height.directive';
import { DateTimePickerDirective } from './shared/directives/date-time-picker.directive';

/**
 * Calling functions or calling new is not supported in metadata when using AoT.
 * The work-around is to introduce an exported function.
 *
 * The reason for this limitation is that the AoT compiler needs to generate the code that calls the factory
 * and there is no way to import a lambda from a module, you can only import an exported symbol.
 */

export function configServiceFactory (config: ConfigService) {
  return () => config.load()
}

export function translationServiceFactory (translate: TranslationService) {
  return () => translate.setupLanguage();
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    HttpClientModule,

    // Third party modules
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    SimpleNotificationsModule.forRoot(),
    
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),    // App custom dependencies
    HttpServiceModule.forRoot(),
    UtilityModule.forRoot(),

    ComponentsModule,

    // Route
    RouterModule,
    AppRoutingModule,

    // Goggle Map
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),

    // Store
    StateModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
 ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PageContentComponent,
    WebsiteTopNavComponent,
    WebsiteFooterComponent,
    WebsiteLayoutComponent,
    LandingPageComponent,
    TextareaAutoHeightDirective,
    DateTimePickerDirective,
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService], 
      multi: true
    },
    TranslationService,
    {
      provide: APP_INITIALIZER,
      useFactory: translationServiceFactory,
      deps: [TranslationService], 
      multi: true
    },
    // provider used to create fake backend
    // fakeBackendProvider
    // { provide: Window, useValue: window },
    // { provide: 'intlTelInput', useValue: window['intlTelInput']() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // enableProdMode()
}