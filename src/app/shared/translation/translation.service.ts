import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { Store }         		from '@ngrx/store';
import { AppState, SettingsStoreActions } from '@shared/store';
import { ConfigService }    from '@app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(  protected store$: Store<AppState.State>,
  	public translate: TranslateService,
    private configService: ConfigService
    ) {

      this.setupLanguage();
      
    }

  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {
    /* let localization: any        = this.configService.get('localization');
    let languages: Array<string> = localization.languages.map(lang => lang.code);
    let browserLang: string      = this.translate.getBrowserLang();

    this.translate.addLangs(languages);
    this.translate.setDefaultLang(localization.defaultLanguage);

    let selectedLang    = browserLang.match(/fr|en|hr/) ? browserLang : localization.defaultLanguage;
    let selectedCulture = localization.languages.filter(lang => lang.code === selectedLang)[0].culture;

    this.translate.use(selectedLang);
    this.store$.dispatch(new SettingsStoreActions.SetLanguageAction(selectedLang));
    this.store$.dispatch(new SettingsStoreActions.SetCultureAction(selectedCulture)); */


      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('en');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('en');
  
  }

}
