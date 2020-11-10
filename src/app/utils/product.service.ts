import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { Collection } from '../models/collection.interface';
import { environment as env } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import * as uuid from 'uuid';
import { Payload } from '../models/payload.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private URL: string;

  constructor(private http: HttpClient) { 
    this.URL = env.serverURL;
  }

  saveProduct(product: Product): Observable<Payload<Product>> {
    return this.http.post<Payload<Product>>(this.URL + '/products', product);
  }

  getProducts(type: string): Observable<Collection> {
    return of({ 
      name: type,
      id: uuid.v4(),
      products: [
        
      ]
    });
  }

}
