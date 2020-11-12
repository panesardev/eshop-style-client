import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Collection } from '../models/collection.interface';
import { Payload } from '../models/payload.interface';

@Injectable({ providedIn: 'root' })
export class CollectionService {

  private URL: string = environment.serverURL + '/collections/';

  constructor(private http: HttpClient) { }

  getCollection(collection: string): Observable<Collection> {
    return this.http.get<Payload<Collection>>(this.URL + collection).pipe(
      switchMap(payload => {
        if (!payload.success) throw Error(payload.timeStamp + ' ' + payload.message);
        return of(payload.data);
      }),
      share()
    );
  }

}
