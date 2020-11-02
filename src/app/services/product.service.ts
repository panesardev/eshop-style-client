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

  async submitProduct(product: Product, productPictureFile: File) {
    const productForm: FormData = new FormData();
    productForm.append('productPicture', productPictureFile);

    const saved = await this.http.post<Payload<Product>>(this.URL + '/products', product).toPromise();    
    const res = await this.http.post<Payload<File>>(`${this.URL}/products/${saved.data.id}`, productForm).toPromise();
    return res
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
