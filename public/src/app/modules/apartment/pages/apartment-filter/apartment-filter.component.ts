/**
 * Component for displaying the filter for grid.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apartment-filter',
  templateUrl: './apartment-filter.component.html',
  styleUrls: ['./apartment-filter.component.scss']
})
export class ApartmentFilterComponent {
  @Input()
  searchFilter: any;
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return '$' + value.toString().slice(0, -2) + '00';
    }

    return value;
  }
}
