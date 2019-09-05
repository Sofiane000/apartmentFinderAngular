import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = env.serverUrl;

@Injectable({
  providedIn: 'root'
})
/**
 * Common service for api operations.
 */
export class ApiService {
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private httpClient: HttpClient) {}
  /**
   * Method to get data from api.
   * @param path  Url of the api.
   * @param params Request parameters.
   */
  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.httpClient
      .get(BASE_URL + path, { params })
      .pipe(catchError(this.formatErrors));
  }

  /**
   * Method to update data.
   * @param path Url of the api.
   * @param body Request body.
   */
  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  /**
   * Method to add data.
   * @param path  Url of the api.
   * @param body Request body.
   */
  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param path  Url of the api.
   */
  public delete(path: string): Observable<any> {
    return this.httpClient
      .delete(BASE_URL + path)
      .pipe(catchError(this.formatErrors));
  }

  /**
   *
   * @param error Error from api.
   */
  private formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
