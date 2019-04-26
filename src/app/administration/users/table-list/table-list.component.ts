
import { Component, OnInit, AfterViewInit , ViewChild, OnDestroy, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef,
  ApplicationRef
} from '@angular/core';
import { MatSort, MatPaginator, MatProgressSpinner } from '@angular/material';

import { Subscription } from 'rxjs';

import { Router }           from '@angular/router';

import { UsersSandbox }  from '../users.sandbox';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent implements OnInit, AfterViewInit, OnDestroy  {

  color : string = 'warn';
  isLoading: boolean = false;
  // Pagination
  pageSizeOptions = [5, 10, 25, 50, 100, 200]

  // Spinner
  mode = 'indeterminate';
  spinnerValue = 50;

  @ViewChild("matSortFan") matSortFan: MatSort;
  @ViewChild("matPaginatorFan") matPaginatorFan: MatPaginator;    
  @ViewChild("matSpinnerFan") matSpinnerFan: MatProgressSpinner;    
  psizeFan: number = 10;
  pindexFan: number = 0;
  lengthFan: number;

  @ViewChild("matSortCelebrity") matSortCelebrity: MatSort;
  @ViewChild("matPaginatorCelebrity") matPaginatorCelebrity: MatPaginator;    
  @ViewChild("matSpinnerCelebrity") matSpinnerCelebrity: MatProgressSpinner;    
  psizeCelebrity: number = 10;
  pindexCelebrity: number = 0;
  lengthCelebrity: number;

  @ViewChild("matSortModerator") matSortModerator: MatSort;
  @ViewChild("matPaginatorModerator") matPaginatorModerator: MatPaginator;    
  @ViewChild("matSpinnerModerator") matSpinnerModerator: MatProgressSpinner;    
  psizeModerator: number = 10;
  pindexModerator: number = 0;
  lengthModerator: number;

  @ViewChild("matSortAdmin") matSortAdmin: MatSort;
  @ViewChild("matPaginatorAdmin") matPaginatorAdmin: MatPaginator;    
  @ViewChild("matSpinnerAdmin") matSpinnerAdmin: MatProgressSpinner;    
  psizeAdmin: number = 10;
  pindexAdmin: number = 0;
  lengthAdmin: number;

  constructor(
    // private cdr: ChangeDetectorRef,
    // private appRef: ApplicationRef,
    // pageSize: number,
    private router: Router,
    public sandBox: UsersSandbox
  ) {
    
  }

  private subscriptions: Array<Subscription> = [];

  ngOnInit() {

    this.sandBox.loadItems();

    // setTimeout(()=>{}, 0);

  }
  
  ngAfterViewInit() {

    // this.cdr.detectChanges();
    // this.appRef.tick();
    // this.pageSize = 25;
    this.registerEvents();

  }

  ngOnDestroy() {

    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {
      
    this.subscriptions.push(    
      this.sandBox.isLoading$.subscribe( loading => {
        this.isLoading = loading;
      })
    );
    
    this.subscriptions.push(    
      this.sandBox.fanItems$.subscribe( allItems => {
        this.lengthFan = allItems.length;
      })
    );
    this.subscriptions.push(
      this.matPaginatorFan.page.subscribe((pag: MatPaginator) => {
        this.pindexFan = pag.pageIndex;
        this.psizeFan = pag.pageSize;
      })
    );   
    this.subscriptions.push(
      this.matSortFan.sortChange.subscribe((sort: MatSort) => {
        if (!sort.active || sort.direction === '') {
          this.sandBox.loadItems();
        } else {
          this.pindexFan = 0;
          console.log(sort);
          this.sandBox.sortItems(sort, 'fan');
        }
      })
    );
    
    this.subscriptions.push(    
      this.sandBox.celebrityItems$.subscribe( allItems => {
        this.lengthCelebrity = allItems.length;
      })
    );
    this.subscriptions.push(
      this.matPaginatorCelebrity.page.subscribe((pag: MatPaginator) => {
        this.pindexCelebrity = pag.pageIndex;
        this.psizeCelebrity = pag.pageSize;
      })
    );   
    this.subscriptions.push(
      this.matSortCelebrity.sortChange.subscribe((sort: MatSort) => {
        if (!sort.active || sort.direction === '') {
          this.sandBox.loadItems();
        } else {
          this.pindexCelebrity = 0;
          console.log(sort);
          this.sandBox.sortItems(sort, 'celebrity');
        }
      })
    );
    
    this.subscriptions.push(    
      this.sandBox.moderatorItems$.subscribe( allItems => {
        this.lengthModerator = allItems.length;
      })
    );
    this.subscriptions.push(
      this.matPaginatorModerator.page.subscribe((pag: MatPaginator) => {
        this.pindexModerator = pag.pageIndex;
        this.psizeModerator = pag.pageSize;
      })
    );   
    this.subscriptions.push(
      this.matSortModerator.sortChange.subscribe((sort: MatSort) => {
        if (!sort.active || sort.direction === '') {
          this.sandBox.loadItems();
        } else {
          this.pindexModerator = 0;
          console.log(sort);
          this.sandBox.sortItems(sort, 'moderator');
        }
      })
    );
    
    this.subscriptions.push(    
      this.sandBox.adminItems$.subscribe( allItems => {
        this.lengthAdmin = allItems.length;
      })
    );
    this.subscriptions.push(
      this.matPaginatorAdmin.page.subscribe((pag: MatPaginator) => {
        this.pindexAdmin = pag.pageIndex;
        this.psizeAdmin = pag.pageSize;
      })
    );   
    this.subscriptions.push(
      this.matSortAdmin.sortChange.subscribe((sort: MatSort) => {
        if (!sort.active || sort.direction === '') {
          this.sandBox.loadItems();
        } else {
          this.pindexAdmin = 0;
          console.log(sort);
          this.sandBox.sortItems(sort, 'admin');
        }
      })
    );
    
  }

  onNew() {
    // alert("Nouvel utilisateur");
    this.sandBox.getItem(null);
  }
  
  /**
   * Callback function for grid select event
   * 
   * @param selected
   */
  public onShowMore(selectedId): void {
    this.sandBox.getItem(selectedId);
  }

}
