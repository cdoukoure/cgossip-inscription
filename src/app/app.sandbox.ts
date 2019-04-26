import { Injectable }    		from '@angular/core';
import { Sandbox }       		from '@shared/sandbox/base.sandbox';
import { Store }         		from '@ngrx/store';
import { AppState, SettingsStoreActions } from '@shared/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService }    from './app-config.service';

@Injectable({
  providedIn : "root"
})
export class AppSandbox extends Sandbox {

  constructor(
  	protected store$: Store<AppState.State>,
  	private translate: TranslateService,
  	private configService: ConfigService
  ) {
    super(store$);
  }

  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {
    let localization: any        = this.configService.get('localization');
    let languages: Array<string> = localization.languages.map(lang => lang.code);
    let browserLang: string      = this.translate.getBrowserLang();

    this.translate.addLangs(languages);
    this.translate.setDefaultLang(localization.defaultLanguage);

    let selectedLang    = browserLang.match(/fr|en|hr/) ? browserLang : localization.defaultLanguage;
    let selectedCulture = localization.languages.filter(lang => lang.code === selectedLang)[0].culture;

    this.translate.use(selectedLang);
    // this.store$.dispatch(new SettingsStoreActions.SetLanguageAction(selectedLang));
    // this.store$.dispatch(new SettingsStoreActions.SetCultureAction(selectedCulture));
  }

  /**
   * Returns global notification options
   */
  public getNotificationOptions(): any {
  	return this.configService.get('notifications').options;
  }
}