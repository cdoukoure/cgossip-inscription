import {
  Component,
  ChangeDetectionStrategy
}                          from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
}                          from '@angular/forms';

import { moveIn }          from '@shared/animations';
import { AuthSandbox }     from '../auth.sandbox';
import { TranslationService } from '@app/shared/translation/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public translate: any;
  public submitted:  boolean = false;
  public pseudo: AbstractControl;
  public passe: AbstractControl;
  public loginForm:  FormGroup;
  public isLoading: boolean;

  public sub : Subscription;

  constructor(
    private translationService: TranslationService,
    private fb: FormBuilder,
    public authSandbox: AuthSandbox,
  ) {}

  ngOnInit() {
    this.translate = this.translationService.translate;
    this.initLoginForm();

    this.sub = this.authSandbox.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initLoginForm(): void {
    
    this.loginForm = this.fb.group({
      pseudo:      ['', Validators.required],
      passe:   ['', Validators.required]
    });

    this.pseudo     = this.loginForm.controls['pseudo'];
    this.passe  = this.loginForm.controls['passe'];
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
    if (this.loginForm.valid) this.authSandbox.login(form);
  }
}