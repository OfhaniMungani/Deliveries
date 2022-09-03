import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly apiUrl = 'https://Localhost:7056/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

constructor(private http: HttpClient) { }

getProducts(): Observable<any> {
  return this.http
    .get(`${this.apiUrl}Deliveries/getDelivery`, this.httpOptions)
    .pipe(map((res) => res));
}

getOrders(): Observable<any> {
  return this.http
    .get(`${this.apiUrl}Deliveries/getDeliveryList`, this.httpOptions)
    .pipe(map((res) => res));
}

createOrder(obj: any): Observable<any> {
  return this.http
    .post<any>(`${this.apiUrl}Deliveries/createDelivery`, obj);
}
}
