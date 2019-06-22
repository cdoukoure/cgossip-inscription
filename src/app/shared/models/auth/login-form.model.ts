import { Boxed, box } from "ngrx-forms";

export interface ILoginForm {
  pseudo: string;
  passe: string;
}

export class LoginForm implements ILoginForm {
  public pseudo: string;
  public passe: string;

  constructor(loginForm: any) {
    this.pseudo = loginForm.pseudo || '';
    this.passe = loginForm.passe || '';
  }
}


export interface IFirstLogin {
  phone: string,
  pseudo: string,
  passe: string;
  cpasse: string;
  groups: number[]
}

export class FirstLogin implements IFirstLogin {
  public firstname: string;
  public lastname: string;
  public phone: string;
  public pseudo: string;
  public passe: string;
  public cpasse: string;
  public groups: number[]

  constructor(flogin?: any) {
    this.firstname = flogin ? flogin.firstname : '';
    this.lastname = flogin ? flogin.lastname : '';
    this.phone = flogin ? flogin.phone : '';
    this.pseudo = flogin ? flogin.pseudo : '';
    this.passe = flogin ? flogin.passe : '';
    this.cpasse = flogin ? flogin.cpasse : '';
    this.groups = flogin ? flogin.groups : [4];
  }
}
