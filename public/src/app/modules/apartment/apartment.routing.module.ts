/**
 * Module defines routes for apartment module.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartmentGridComponent } from './pages/apartment-grid/apartment-grid.component';

const ROUTES: Routes = [
  { path: 'apartments', component: ApartmentGridComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule {}
