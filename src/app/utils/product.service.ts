import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private URL: string = environment.serverURL + '/products/';

  constructor(private http: HttpClient) { }

  save = (product: Product) => this.http.post<Product>(this.URL, product);

  get = (id: string) => this.http.get<Product>(this.URL + id);

  delete = (id: string) => this.http.delete<any>(this.URL + id);

}
