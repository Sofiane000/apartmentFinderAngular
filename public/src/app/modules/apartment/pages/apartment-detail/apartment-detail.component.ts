/**
 * Component for display apartment details.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent {
  /**
   * Current selected apartment.
   */
  @Input()
  apartment: any;
  constructor() {}
}
