import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collection } from 'src/app/models/collection.interface';
import { CartService } from 'src/app/utils/cart.service';
import { CollectionService } from 'src/app/utils/collection.service';
import { ProductService } from 'src/app/utils/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featured$: Observable<Collection>;

  constructor(
    private collectionService: CollectionService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.featured$ = this.collectionService.get('featured')
      .pipe(map(payload => payload.success ? payload.data : null));
  }

  clear(): void {
    this.cartService.clear();
  }

  addProduct(): void {
    this.cartService.addProduct({
      description: '',
      name: '',
      pictureURL: '',
      price: 0,
      quantity: 0,
      type: 'jean'
    });
  }

  

}
