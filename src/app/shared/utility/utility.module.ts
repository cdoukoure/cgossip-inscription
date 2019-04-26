import {
  NgModule,
  ModuleWithProviders
}                            from "@angular/core";
import { UtilService }       from './utility.service';
import { ValidationService } from './validation.service';

import { CountryCode } from './data/country-code';

@NgModule()
export class UtilityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UtilityModule,

      providers: [
        CountryCode,
        UtilService,
        ValidationService
      ]
    };
  }
}