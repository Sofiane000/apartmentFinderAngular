/**
 * Service for operations of apartments.
 */
import { Injectable } from '@angular/core';
import { ApiService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  constructor(private apiService: ApiService) {}

  getAll(
    limit: number,
    offset: number,
    price: number,
    bedroom: number,
    bathroom: number
  ) {
    let url = '/api/listings?limit=' + limit + '&offset=' + offset;
    if (price) {
      url += '&price=' + price;
    }
    if (bedroom) {
      url += '&bedrooms=' + bedroom;
    }
    if (bathroom) {
      url += '&bathrooms=' + bathroom;
    }
    return this.apiService.get(url);
  }
}
