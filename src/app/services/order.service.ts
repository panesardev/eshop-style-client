import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.interface';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private URL: string = environment.serverURL + '/order/';

  constructor(private http: HttpClient) { }

  save(order: Order): Observable<Order> {
    return this.http.post<Order>(this.URL, order);
  }

  update(order: Order): Observable<Order> {
    return this.http.put<Order>(this.URL, order);
  }

  get(id: string): Observable<Order> {
    return this.http.get<Order>(this.URL + id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.URL + id);
  }
  
  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL);
  }

  findByEmail(email: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}email/${email}`);
  } 
}
