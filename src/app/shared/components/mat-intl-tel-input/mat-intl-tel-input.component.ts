import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, Input, OnDestroy, Optional, Self} from '@angular/core';
import {FormBuilder, FormGroup, ControlValueAccessor, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';

import * as lpn from 'google-libphonenumber';

import { CountryCode } from './data/country-code';
import { phoneNumberValidator } from './mat-intl-tel-input.validator';

/** Data structure for holding telephone number. */
export class MyTel {
  constructor(public area: string, public subscriber: string) {}
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'mat-intl-tel-input',
  templateUrl: './mat-intl-tel-input.component.html',
  styleUrls: ['./mat-intl-tel-input.component.scss'],
  providers: [
    CountryCode,
    {provide: MatFormFieldControl, useExisting: MatIntlTelInput}
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class MatIntlTelInput implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy {
  static nextId = 0;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'mat-intl-tel-input';
  id = `mat-intl-tel-input-${MatIntlTelInput.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {value: {area, subscriber}} = this.parts;

    return !area && !subscriber;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MyTel | null {
    const {value: {area, subscriber}} = this.parts;
    // console.log(this.parts);
    if (area.length > 0 && area.length <= 3 && subscriber.length >= 6) {
      return new MyTel(area, subscriber);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    const {area, subscriber} = tel || new MyTel('', '');
    this.parts.setValue({area, subscriber});
    // console.log(this.parts);
    this.stateChanges.next();
  }

  allCountries: Array<any> = [];
  phoneUtil = lpn.PhoneNumberUtil.getInstance();

  constructor(
    private countryCodeData: CountryCode,
    fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = fb.group({
      area: '',
      subscriber: '',
    });

    fm.monitor(elRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    // console.log(CountryCode.allCountries);
    this.fetchCountryData();
    // console.log(this.allCountries);
  }

  protected fetchCountryData(): void {
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
	}

	protected getPhoneNumberPlaceHolder(countryCode: string): string {
		try {
			return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
		} catch (e) {
			return e;
		}
  }
  
  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(tel: MyTel | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.parts.value);
  }
}

