import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection.interface';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  featured: Collection;
  loading: boolean;

  private subscription: Subscription;

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.collectionService.get('featured').subscribe(collection => {
      this.featured = collection;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
