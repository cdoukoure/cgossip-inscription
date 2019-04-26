import {
  Component,
  ChangeDetectionStrategy
}                          from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
}                          from '@angular/forms';

declare var $: any;

import { moveIn }          from '@shared/animations';
import { AuthSandbox }     from '../auth.sandbox';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  public submitted:  boolean = false;
  public phone:      AbstractControl;
  public codev:   AbstractControl;
  public registerForm:  FormGroup;
  public registrationStep: number;

  // public step$ = 

  constructor(
    private fb: FormBuilder,
    public authSandbox: AuthSandbox
  ) {}

  ngOnInit() {
    this.initRegisterForm();

  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initRegisterForm(): void {
    
    // let disable = Number(this.authSandbox.registrationStep$) == 1 ? "disabled" : ""

    this.authSandbox.step$.subscribe(step => this.registrationStep = step)
    
    this.registerForm = this.fb.group({
      // phone:      ['', Validators.required],
      phone: new FormControl({ value: '', disabled: this.registrationStep === 2}, Validators.required),
      // codev:   ['', Validators.required]
    });

    this.phone     = this.registerForm.controls['phone'];
    this.codev  = this.registerForm.controls['codev'];
  }

  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event
   * @param form
   */
  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;
    if (this.registerForm.valid) {
      if (this.registrationStep === 1) this.authSandbox.register(this.phone.value);
      else this.authSandbox.validate(form);
    } 
  }
}