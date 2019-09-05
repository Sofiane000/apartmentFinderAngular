/**
 * Main application routes.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/apartments',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/apartment/apartment.module').then(
            m => m.ApartmentModule
          )
      }
    ]
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/home/apartments', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: true })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
