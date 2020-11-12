import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Payload } from '../models/payload.interface';
import { Collection } from '../models/collection.interface';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private URL: string = environment.serverURL;

  constructor(private http: HttpClient) { }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Payload<Product>>(this.URL + '/products', product).pipe(
      switchMap(payload => {
        if (!payload.success)
          throw Error(payload.timeStamp + ' ' + payload.message);
        return of(payload.data);
      })
    );
  }

  getCollection(collection: string): Observable<Collection> {
    // complete get products
    // test add and update products
    collection = '/collection/' + collection;
    return this.http.get<Payload<Collection>>(this.URL + collection).pipe(
      switchMap(payload => {
        if (!payload.success)
          throw Error(payload.timeStamp + ' ' + payload.message);
        return of(payload.data);
      })
    );
  }

  // getProduct(id: string): Observable<Product> {

  // }

}
