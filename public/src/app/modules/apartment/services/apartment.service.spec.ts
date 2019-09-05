import {
  TestBed,
  getTestBed,
  fakeAsync,
  inject,
  tick
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ApartmentService } from './apartment.service';

describe('ApartmentServicee', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApartmentService]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  describe('#getApartments', () => {
    it('should return an Observable<User[]>', inject(
      [ApartmentService],
      fakeAsync((service: ApartmentService) => {
        const dummyApartments = {
          fields: [
            'address',
            'city',
            'state',
            'building_name',
            'price',
            'bedrooms',
            'bathrooms',
            'image_id'
          ],
          data: [
            [
              1,
              1600,
              1,
              '545 N State St',
              'Ann Arbor',
              'MI',
              'High Street Apartments',
              146534455
            ],
            [
              0,
              1225,
              1,
              '220 N 1st St',
              'Ann Arbor',
              'MI',
              '220 N 1st St',
              168276057
            ]
          ]
        };

        service.getAll(10, 1, 1000, 1, 1).subscribe(apartments => {
          expect(apartments.data.length).toBe(2);
          expect(apartments).toEqual(dummyApartments);
        });

        const req = httpMock.expectOne(
          `http://localhost:3000/api/listings?limit=10&offset=1&price=1000&bedrooms=1&bathrooms=1`
        );
        console.log(req.request.url);
        expect(req.request.method).toBe('GET');
        req.flush(dummyApartments);
      })
    ));
  });

  /**
   * We also run HttpTestingController#verify to make sure that
   * there are no outstanding requests:
   */
  afterEach(() => {
    httpMock.verify();
  });
});
