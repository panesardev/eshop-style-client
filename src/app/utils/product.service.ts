import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private URL: string = environment.serverURL + '/product/';

  constructor(private http: HttpClient) { }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, product);
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(this.URL + id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.URL + id);
  }
  
  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }

}
