import { Input, Output, EventEmitter, ViewChild, ElementRef, Directive, Renderer } from '@angular/core';
declare var $: any;

// NOT WORKING 

@Directive({
  selector: '[dateTimePicker]'
})
export class DateTimePickerDirective {

  @Input() value = '';
  @Input() minimumDate: boolean = false;
  @Input() onlyDatePicker: boolean = false;
  @Output() dateChange = new EventEmitter();

  constructor(public el: ElementRef, public renderer: Renderer) { }

  ngOnInit() {
    if (this.onlyDatePicker === true) {
      $(this.el.nativeElement).datepicker({
        controlType: 'select'
        , oneLine: true,
        minDate: this.minimumDate === false ? '' : new Date(),
        onSelect: (value) => {
          this.value = value;
          this.dateChange.next(value);
        }
      })
      .datepicker('setDate', this.value);
    }
    else {
      $(this.el.nativeElement).datetimepicker({
        controlType: 'select',
        oneLine: true,
        timeFormat: 'hh:mm tt',
        minDate: this.minimumDate === false ? '' : new Date(),
        onSelect: (value) => {
          this.value = value;
          this.dateChange.next(value);
        }
      })
      .datepicker('setDate', this.value);
    }
  }
}