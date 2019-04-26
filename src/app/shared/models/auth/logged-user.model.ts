export interface ILoggedUser {
  phone:      string;
  pseudo:      string;
  firstname:      string;
  lastname:      string;
  country:      string;
  groups?:  number[];
}

export class LoggedUser implements ILoggedUser {

  public phone:      string;
  public pseudo:      string;
  public firstname:      string;
  public lastname:      string;
  public country:      string;
  public groups:      [];

  constructor(user?: any) {
    this.phone     = user ? user.phone : '';
    this.pseudo    = user ? user.pseudo : '';
    this.firstname = user ? user.firstname : '';
    this.lastname  = user ? user.lastname : '';
    this.country   = user ? user.country : '';
    this.groups     = user ? user.groups : '';
  }

  /**
   * Saves user into local storage
   *
   * @param user
   *
  public save(): void {
    localStorage.setItem('currentUser', JSON.stringify(this));
  }

  /**
   * Saves user into local storage
   *
  public remove(): void {
    localStorage.setItem('currentUser', null);
  }
  */


}