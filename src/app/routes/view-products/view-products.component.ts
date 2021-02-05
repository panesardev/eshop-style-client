import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection.interface';
import { CollectionService } from 'src/app/utils/collection.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {

  collection$: Observable<Collection>;

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const collectionName = this.route.snapshot.params.collectionName;
    this.collection$ = this.collectionService.get(collectionName);
  }

}
