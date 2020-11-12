import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/utils/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private products: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.product$ = this.products.getProduct(id);
  }

}
