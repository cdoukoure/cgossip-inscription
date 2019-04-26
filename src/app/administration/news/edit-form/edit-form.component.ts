import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, NgZone, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { NewsSandbox } from '../news.sandbox';

import { NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

// import moment = require('moment');

import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormComponent implements OnInit, AfterViewInit, OnDestroy {

  media: string;

  constructor(
    private ngZone: NgZone,
    private location: Location,
    private sanitizer: DomSanitizer,
    // private renderer: Renderer2,
    public sandBox: NewsSandbox
  ) { }

  dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
    convertViewToStateValue(value) {
      if (value === null) {
        return null;
      }
  
      // the value provided by the date picker is in local time but we want UTC so we recreate the date as UTC
      // value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      // value = new Date(Date.format().now())
      // value = moment(moment(value.toString()).format('DD/MM/YYYY, HH:mm')).toDate();
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
  }; 

  @ViewChild("fileInput") fileInput: ElementRef;
  @ViewChild("datetimepicker") datetimepicker: ElementRef;
  @ViewChild('description') txtAreaAutoHeight1: CdkTextareaAutosize;
  @ViewChild('content') txtAreaAutoHeight2: CdkTextareaAutosize;

  ngOnInit() {
    this.ngZone.onStable.subscribe(() => {
      this.txtAreaAutoHeight1.resizeToFitContent(true)
      this.txtAreaAutoHeight2.resizeToFitContent(true)
    });
  }

  ngAfterViewInit(){
    let that = this;

    $('#datetimepicker').bootstrapMaterialDatePicker(
      { 
        format : 'DD-MM-YYYY HH:mm:00', 
        minDate : new Date() 
      }
    ).on('change', function(e, date){
      // console.log(e)
      // console.log(date)
      // that.renderer.setProperty(that.datetimepicker.nativeElement, 'value', e.target.value);
      that.sandBox.formStateSetValue("NEWS_EDIT_FORM.delay", e.target.value);
    });


  }

  onDatetimeChange() {
    console.log()
  }

  ngOnDestroy() {
  }

  /*
  public onClick(action: string): void {
    this.sandBox.treatment(action);
  }
  */

 /* onDescChange() {
  console.log("enabled: "+ this.txtAreaAutoHeight2.enabled);
  console.log("minRows: "+ this.txtAreaAutoHeight2.minRows);
  console.log("maxRows: "+ this.txtAreaAutoHeight2.maxRows);
  // this.txtAreaAutoHeight.resizeToFitContent();
  // console.log("Description: "+ this.descFC.value);
  // console.log("Rows " + this.txtAreaAutoHeight.nativeElement.rows);
  // console.log("scrollHeight " + this.txtAreaAutoHeight.nativeElement.scrollHeight);
  // this.txtAreaAutoHeight.nativeElement.style.height = 'auto';
  // this.txtAreaAutoHeight.nativeElement.style.height = this.txtAreaAutoHeight.nativeElement.scrollHeight + "px";
  // console.log("style Height " + this.txtAreaAutoHeight.nativeElement.style.height);
}  */

  /* public triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.subscribe(() => this.txtAreaAutoHeight2.resizeToFitContent(true));
    
    console.log("triggerResize")
    console.log("triggerResize")
  }  */

  /* adjust(): void {
    // this.txtAreaAutoHeight.nativeElement.resizeToFitContent(true);
    // let nativeElement = this.txtAreaAutosize.;
    this.txtAreaAutoHeight.nativeElement.rows
    this.txtAreaAutoHeight.nativeElement.style.overflow = 'hidden';
    this.txtAreaAutoHeight.nativeElement.style.height = 'auto';
    this.txtAreaAutoHeight.nativeElement.style.height = this.txtAreaAutoHeight.nativeElement.scrollHeight + "px !important";
  } */

  clearMediaUrl() {
    this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url","");
  }

  public onFileChange($event) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      // image.src = loadEvent.target.result;
      // that.media = loadEvent.target.result;
      that.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url",loadEvent.target.result);
      // console.warn(that.media);
    };
    if (file) {
      myReader.readAsDataURL(file);
    } else {
      // that.media = '';
      that.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url",'');
    }
  }

  onClickBack() {
    // console.log("onReset");
    this.location.back();
    // this.sandBox.releaseItem();
  }

  onConfirmTreatmentDialog(action) {
    this.sandBox.treatment(action);
  }

  onConfirmDeleteDialog() {
    this.sandBox.deleteItem()
  }
}
