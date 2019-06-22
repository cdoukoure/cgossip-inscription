export interface ILoadItems {
  filter: any; // eq [{'key':'firstname', 'value':'Atteke'},{'key':'country', 'value':'civ'}, ...]
  pindex: number;
  psize: number;
  sort: any; // sort for user - role type('fan','celebrity' ), for Posts - my or all
}

export class LoadItems implements ILoadItems {
  public filter: any;
  public pindex: number;
  public psize: number;
  public sort: any;

  constructor(params?: any) {
    this.filter = params ? params.filter : null;
    this.pindex = params ? params.pindex : 0;
    this.psize = params ? params.psize : 25;
    this.sort = params ? params.sort : null;
  }
}
