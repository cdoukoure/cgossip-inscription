// Angular
import { Component, OnInit, OnDestroy, OnChanges, ChangeDetectionStrategy, ViewChild, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersSandbox } from '../users.sandbox';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormComponent implements OnInit {


  constructor(
    public sandBox: UsersSandbox
  ) { 

  }

  imgSrc: any = [];

  isNewItem : boolean;

  itemId : any | null;

  public submitted:  boolean = false;

  dialCode : any = 225;
  flagClass : string = 'ci';
  placeHolder : string = "22457841";

  // public country: AbstractControl;
  // public phone: AbstractControl;
  // // public pseudo: AbstractControl;
  // public firstname: AbstractControl;
  // public lastname: AbstractControl;
  // public avatar: AbstractControl;
  // public avatar64: AbstractControl;
  // public groups: AbstractControl;

  // public myForm: FormGroup;
  // public formStatus: any;

  subscription : Subscription;

  setCountryOptions(iso2:string) {
    let country = this.sandBox.allCountries.filter(
      country => country.iso2 === iso2)[0]
    this.dialCode = country.dialCode;
    this.placeHolder = country.placeHolder;
    this.flagClass = country.flagClass;
  }

  onFormControlChange(controlName, $event) {
    switch (controlName) {
      case 'country':
        this.setCountryOptions($event.value)
        break;
    
      default:
        break;
    }
  }

  ngOnInit() {

    this.subscription = this.sandBox.formState$.subscribe(fs => {
      if (fs.value.phone !== "") {
        this.isNewItem = false;
        this.itemId = fs.value.phone;
      } else {
        this.isNewItem = true;
        this.itemId = null;
      }
    });

    let sub = this.sandBox.formState$.subscribe( user => {
      this.setCountryOptions(user.value.country)
    }); 
    sub.unsubscribe();

  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  public onSubmit(event: Event, submitType: string): void {
    event.stopPropagation();
    switch(submitType) {
      case "create": 
        this.sandBox.createItem();
        break;
      case "update": 
        this.sandBox.updateItem();
        break;
      // case "delete": this.sandBox.deleteItem();
      default: return
    }
  }

  onReset() {
    // console.log("onReset");
    this.sandBox.releaseItem();
  }

  onConfirmDeleteDialog($event: any) {
    // console.log($event);
    this.sandBox.deleteItem();
  }

  onConfirmGenerateDialog($event: any) {
    if (this.itemId)
      this.sandBox.generatePassword(this.itemId);
  }

  /* fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  } */

  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event
   * @param form
   */
  public onSubmitUserForm(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;
    // if (this.myForm.valid) this.sandBox.createItem();
  }

  findInvalidControls( _invalidControls: AbstractControl[], _input?: AbstractControl): AbstractControl[] {
    if ( ! _invalidControls ) _invalidControls = [];
    if ( _input instanceof FormControl  ) {
        if ( _input.invalid ) _invalidControls.push( _input );
        return _invalidControls;
    }

    if ( ! (_input instanceof FormArray) && ! (_input instanceof FormGroup) ) return _invalidControls;

    const controls = _input.controls;
    for (const name in controls) {
        let control = controls[name];
        if (control.invalid) _invalidControls.push( control );
        switch( control.constructor.name )
        {    
            case 'FormArray':
                (<FormArray> control ).controls.forEach( _control => _invalidControls = this.findInvalidControls( _invalidControls, _control, ) );
                break;

            case 'FormGroup':
                _invalidControls = this.findInvalidControls( _invalidControls, control );
                break;
        }
    }

    return _invalidControls;
  }

}
