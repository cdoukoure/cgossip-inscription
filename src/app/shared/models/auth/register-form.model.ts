export class RegisterForm {
  public phone:  string;
  public codev:   string;

  constructor(registerForm: any) {
    this.phone = registerForm.phone || '';
    this.codev  = registerForm.codev || '';
  }
}