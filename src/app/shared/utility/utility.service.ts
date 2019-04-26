import { Injectable }           from '@angular/core';
import { TranslateService }     from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as lpn from 'google-libphonenumber';

import { Observable }           from 'rxjs/Rx';

declare var $: any;

import { ConfigService } from '@app/app-config.service';

import { CountryCode } from './data/country-code';

@Injectable({
  providedIn: "root"
})
export class UtilService {

  constructor(
    private countryCodeData: CountryCode,
    private translateService: TranslateService,
    private notificationService: NotificationsService,
    private configService: ConfigService
  ) {}

  /**
   * Country Code
   *
   * @param data
   */
  allCountries: Array<any> = [];
  phoneUtil = lpn.PhoneNumberUtil.getInstance();
  public fetchCountryData() {
		this.countryCodeData.allCountries.forEach(c => {
			const country = {
				name: c[0].toString(),
				iso2: c[1].toString(),
				dialCode: c[2].toString(),
				priority: +c[3] || 0,
				areaCodes: c[4] as string[] || undefined,
				flagClass: c[1].toString().toLocaleLowerCase(),
				placeHolder: this.getPhoneNumberPlaceHolder(c[1].toString().toUpperCase())
			};
			this.allCountries.push(country);
    });
    return this.allCountries;
  }
  
	protected getPhoneNumberPlaceHolder(countryCode: string): string {
		try {
			return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.LOCAL);
		} catch (e) {
			return e;
		}
  }

  /**
   * Translates given message code and title code and displays corresponding notification
   *
   * @param messageTranslationCode
   * @param type
   * @param titleTranslationCode
   */
  public displayNotification(messageTranslationCode: string, type: string = 'info', titleTranslationCode?: string) {
    let message: string = this.translateService.instant(messageTranslationCode);
    let title: string = titleTranslationCode ? this.translateService.instant(titleTranslationCode) : null;

    switch (type) {
      case "error":
        title = this.translateService.instant('ErrorNotificationTitle');
        break;

      case "success":
        title = this.translateService.instant('SuccessNotificationTitle');
        break;

      case "alert":
        title = this.translateService.instant('WarningNotificationTitle');
        break;
      
      default:
        title = this.translateService.instant('InfoNotificationTitle');
        break;
    }

    this.notificationService[type](title, message, this.configService.get('notifications').options);
  }

  public showNotification(from, align, message, type?:string, timer?:number){
    const ctype = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: message
    },{
        // type: ctype[color],
        type: type ? type : 'info',
        timer: timer ? timer : 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  /**
   * Translates lookup names by looking into lookup code
   *
   * @param data
   */
  public translateLookupData(data: Array<any>): Array<any> {
    // Translate quantity stock adjustment reasons
    return data.map(lookup => {
      lookup.name = lookup.code ? this.translateService.instant('Lookups')[lookup.code] : lookup.name;
      return lookup;
    });
  }

}