import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection.interface';
import { ProductService } from 'src/app/utils/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featured$: Observable<Collection>

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.featured$ = this.productService.getProducts('featured');
  }

}
