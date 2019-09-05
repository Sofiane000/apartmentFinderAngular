/**
 * Module class for apartment.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentRoutingModule } from './apartment.routing.module';
import { ApartmentGridComponent } from './pages/apartment-grid/apartment-grid.component';
import { SharedModule } from '@app/shared';
import { ApartmentDetailComponent } from './pages/apartment-detail/apartment-detail.component';
import { ApartmentFilterComponent } from './pages/apartment-filter/apartment-filter.component';

@NgModule({
  declarations: [
    ApartmentGridComponent,
    ApartmentDetailComponent,
    ApartmentFilterComponent
  ],
  imports: [CommonModule, ApartmentRoutingModule, SharedModule]
})
export class ApartmentModule {}
