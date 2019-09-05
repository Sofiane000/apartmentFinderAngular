/**
 * Component for apartments grid which is using material table.
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { MatPaginator } from '@angular/material';
import { merge, of } from 'rxjs';
import {
  startWith,
  switchMap,
  map,
  catchError,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Logger } from '@app/core/services/logger.service';

@Component({
  selector: 'app-apartment-grid',
  templateUrl: './apartment-grid.component.html',
  styleUrls: ['./apartment-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ApartmentGridComponent implements OnInit, AfterViewInit {
  /**
   * Columns that are displayed on grid.
   */
  displayedColumns: string[] = [];

  /**
   * Datasource for the grid.
   */
  data: any;

  /**
   * Currently expanded element in the row.
   */
  expandedElement: any;

  /**
   * Total number of elements in grid.
   */
  resultsLength: any;

  /**
   * Search filters for grid.
   */
  searchFilter = {
    bathroooms: new FormControl('1'),
    bedrooms: new FormControl('1'),
    price: new FormControl('2000')
  };
  log = new Logger('apartment-grid.component.ts');
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private apartmentService: ApartmentService) {}

  ngOnInit() {
    this.log.info('Grid Initialization');
  }

  ngAfterViewInit() {
    merge(
      this.paginator.page,
      this.searchFilter.bedrooms.valueChanges,
      this.searchFilter.bathroooms.valueChanges,
      this.searchFilter.price.valueChanges
    )
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith({}),
        switchMap(() => {
          return this.apartmentService.getAll(
            this.paginator.pageIndex === 0
              ? this.paginator.pageSize
              : this.paginator.pageSize * (this.paginator.pageIndex + 1),
            this.paginator.pageSize * this.paginator.pageIndex,
            this.searchFilter.price.value,
            this.searchFilter.bedrooms.value,
            this.searchFilter.bathroooms.value
          );
        }),
        map(data => {
          this.resultsLength = data.count;
          this.displayedColumns = data.fields.slice(0, -1);
          return data.data;
        }),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe(data => (this.data = data));
  }

  /**
   * expand collapse a row
   * @param row
   */
  toggleRow(row) {
    if (this.expandedElement === row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
    }
  }
}
