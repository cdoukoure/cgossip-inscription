
export interface IProfile {
  avatar:      any;
  avatarOri:   any;
  pseudo:      string;
  firstname:   string;
  lastname:    string;
  metadata:    any;
}

export class Profile implements IProfile {
  public avatar:      any;
  public avatarOri:   null;
  public pseudo:      string;
  public firstname:   string;
  public lastname:    string;
  public metadata:    null;
  // public country:     string | null;

  constructor(user?: any) {
    this.avatar     = user ? user.avatar : '';
    this.avatarOri  = user ? user.avatar : '';
    this.pseudo     = user ? user.pseudo : null;
    this.firstname  = user ? user.firstname : '';
    this.lastname   = user ? user.lastname : '';
    this.metadata   = user ? user.metadata : {};
    // this.country    = user ? user.country : null;
  }
}

export interface IConfigProfile {
  maxPseudo: number;
  minLastname: number;
  maxLastname: number;
  minFirstname: number;
  maxFirstname: number;
}

export class ConfigProfile implements IConfigProfile {
  maxPseudo: number = 20;
  minLastname: number = 3;
  maxLastname: number = 20;
  minFirstname: number = 3;
  maxFirstname: number = 20;
}


export interface ProfileForm {
  profile: Profile;
  config: ConfigProfile;
}

export interface IPassword {
  passe: string;
  cpasse: string;
}

export class Password implements IPassword {
  public passe:     string;
  public cpasse: string;

  constructor(pass?: any) {
    this.passe     = pass ? pass.passe : '';
    this.cpasse = pass ? pass.cpasse : '';;
  }
}

export interface IConfigPassword {
  minLength: number;
  maxLength: number;
}

export class ConfigPassword implements IConfigPassword {
  minLength: number = 3;
  maxLength: number = 20;
}

export interface PasswordForm {
  password: Password;
  config: ConfigPassword;
}

