import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "@app/shared/models";
import { UsersApiClient } from "../usersApiClient.service";
import { catchError, finalize } from "rxjs/operators";

export class UsersDataSource implements DataSource<User> {

  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: UsersApiClient) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
      return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.usersSubject.complete();
      this.loadingSubject.complete();
  }

//   loadItems() {
//       this.loadingSubject.next(true);
//       this.apiService.loadItems().pipe(
//           catchError(() => of([])),
//           finalize(() => this.loadingSubject.next(false))
//       )
//       .subscribe(response => this.usersSubject.next(response.data.users));
//   }    

    // loadItems(itemId: number, filter = '',
    //         sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

    //     this.loadingSubject.next(true);

    //     this.store$.AuthState
    //     .pipe(
    //         catchError(() => of([])),
    //         finalize(() => this.loadingSubject.next(false))
    //     )
    //     .subscribe(items => this.itemsSubject.next(items));
    // }
}

