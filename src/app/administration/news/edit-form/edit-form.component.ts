import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, NgZone, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription, Observable, Subject, forkJoin } from 'rxjs';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { NewsSandbox } from '../news.sandbox';

import { NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

// import moment = require('moment');

// import * as moment from 'moment';
// import { take } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormComponent implements OnInit, AfterViewInit, OnDestroy {

  media: string;
  toUplaod: File;
  uploadStatus: boolean = false;

  constructor(
    private ngZone: NgZone,
    private location: Location,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
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

  ngAfterViewInit() {
    let that = this;

    $('#datetimepicker').bootstrapMaterialDatePicker(
      {
        format: 'DD-MM-YYYY HH:mm:00',
        minDate: new Date()
      }
    ).on('change', function (e, date) {
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

  /** */
  onDescChange() {
    // console.log("enabled: "+ this.txtAreaAutoHeight2.enabled);
    // console.log("minRows: "+ this.txtAreaAutoHeight2.minRows);
    // console.log("maxRows: "+ this.txtAreaAutoHeight2.maxRows);
    // this.txtAreaAutoHeight.resizeToFitContent();
    // console.log("Description: "+ this.descFC.value);
    // console.log("Rows " + this.txtAreaAutoHeight.nativeElement.rows);
    // console.log("scrollHeight " + this.txtAreaAutoHeight.nativeElement.scrollHeight);
    // this.txtAreaAutoHeight.nativeElement.style.height = 'auto';
    // this.txtAreaAutoHeight.nativeElement.style.height = this.txtAreaAutoHeight.nativeElement.scrollHeight + "px";
    // console.log("style Height " + this.txtAreaAutoHeight.nativeElement.style.height);
  }
  /** */

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

  onMediaChange($event) {
    // console.log($event);
    this.toUplaod = null;

    if ($event.ressourceType === "") {
      this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", "");
      this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.type", "text");
    } else if ($event.ressourceType === "image") {
      this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", $event.ressource);
      this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.type", $event.ressourceType);
    } else if ($event.ressourceType === "video") {

      // console.log($event.ressource);
      this.toUplaod = $event.ressource;
      var tmppath = window.URL.createObjectURL($event.ressource);

      // console.log(tmppath);
      this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", tmppath);
      this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.type", $event.ressourceType);

    }
  }

  clearMediaUrl() {
    this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", "");
  }

  public onFileChange($event) {
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      // image.src = loadEvent.target.result;
      // that.media = loadEvent.target.result;
      that.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", loadEvent.target.result);
      // console.warn(that.media);
    };
    if (file) {
      myReader.readAsDataURL(file);
    } else {
      // that.media = '';
      /* this.sandBox.formState$.subscribe(fs => {
        myReader.readAsDataURL(fs.value.mediaOri.url);
      }) */

      that.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", "");
    }
  }

  onClickBack() {
    // console.log("onReset");
    this.location.back();
    // this.sandBox.releaseItem();
  }

  onConfirmTreatmentDialog(action) {

    if (this.toUplaod) {

      /* 
      this.uploadStatus = this.uploadSingle(this.toUplaod, "https://stream.aldizconsulting.com:8443/upload");

      this.uploadStatus.progress.subscribe(val => console.log(val));
      this.uploadStatus.mediaUrl.subscribe(val => console.log(val));

      // convert the progress map into an array
      let allProgressObservables = [];
      allProgressObservables.push(this.uploadStatus.progress);
      allProgressObservables.push(this.uploadStatus.mediaUrl);

      // When all progress-observables are completed...
      forkJoin(allProgressObservables).subscribe(([progress, mediaUrl]) => {
        this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", mediaUrl);
        this.sandBox.treatment(action);
      }); 
      */

      this.uploadBeforeEdit(action ,this.toUplaod, "https://stream.aldizconsulting.com:8443/upload")
      

    } else {

      this.sandBox.treatment(action);

    }

  }

  onConfirmDeleteDialog() {
    this.sandBox.deleteItem()
  }

  public uploadBeforeEdit(
    action,
    file: File,
    url: string
  ) {
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);
    console.log(file);
    console.log(formData);

    // this.sandBox.uploadBeforeEdit(formData, action);

    this.uploadStatus = true;

    const req = new HttpRequest("POST", url, formData, {});

    this.http.post<any>(url, formData).subscribe(
      (res) => {
        if (res.url && res.url !== '') {
          this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", res.url);
          this.sandBox.treatment(action);
        } else {
          console.log(res);
        }    
        this.uploadStatus = false;  
        setTimeout(() => {
          console.log(res);
          this.sandBox.isLoading$.subscribe( isloading => {
            console.log(isloading);
          });
        }, 200); 
      },
      (err) => {
        this.uploadStatus = false;
        setTimeout(() => {
          console.log(err);
          this.sandBox.isLoading$.subscribe( isloading => {
            console.log(isloading);
          });
        }, 200);
        
        
      }
    ); 

    // this.uploadStatus = false;

  }

  public uploadSingle(
    file: File,
    url: string
  ): { progress: Observable<number>, mediaUrl: Observable<string> } {
    // this will be the our resulting map
    var status: { progress: Observable<number>, mediaUrl: Observable<string> };

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest("POST", url, formData, {
      /* headers: new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded' 
        'Content-Type': 'multipart/form-data',
      }),*/
      reportProgress: true
    });

    // create a new progress-subject for every file
    const progress = new Subject<number>();

    // create a new progress-subject for every file
    const mediaUrl = new Subject<string>();
    mediaUrl.next('');

    // send the http-request and subscribe for progress-updates

    let startTime = new Date().getTime();
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // calculate the progress percentage

        const percentDone = Math.round((100 * event.loaded) / event.total);
        // pass the percentage into the progress-stream
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        // Close the progress-stream if we get an answer form the API
        // The upload is complete
        progress.complete();
        mediaUrl.next(event.body["url"]);
        mediaUrl.complete();

        // this.sandBox.formStateSetValue("NEWS_EDIT_FORM.media.url", event.body["url"]);
      }
    });

    // Save every progress-observable in a map of all observables
    status = {
      progress: progress.asObservable(),
      mediaUrl: mediaUrl.asObservable()
    };

    // return the map of progress.observables
    return status;
  }

}
