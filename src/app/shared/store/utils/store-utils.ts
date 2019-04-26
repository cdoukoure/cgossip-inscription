
export function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function sortStore<Model>(sort: { active: any; direction: any; }) {
  return function(a:Model , b:Model) {
    const isAsc = sort.direction === 'asc';
    return compare(a[sort.active], b[sort.active], isAsc);
  }
}

export type RowFilter = {
  key: string,
  value: any
}



