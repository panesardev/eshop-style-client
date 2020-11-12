import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Payload } from '../models/payload.interface';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private URL: string = environment.serverURL + '/products/';

  constructor(private http: HttpClient) { }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Payload<Product>>(this.URL, product).pipe(
      switchMap((payload: Payload<Product>) => {
        if (!payload.success) throw Error(payload.timeStamp + ' ' + payload.message);
        return of(payload.data);
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Payload<Product>>(this.URL + id).pipe(
      switchMap((payload: Payload<Product>) => {
        if (!payload.success) throw Error(payload.timeStamp + ' ' + payload.message);
        return of(payload.data);
      })
    );
  }

}
