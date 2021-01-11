import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collection.interface';
import { environment as env } from '../../environments/environment';
 
@Injectable({ providedIn: 'root' })
export class CollectionService {

  private URL = env.serverURL + '/collection/';

  constructor(private http: HttpClient) { }

  get = (name: string) => this.http.get<Collection>(this.URL + name);
}
