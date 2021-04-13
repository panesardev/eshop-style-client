import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product, Review } from 'src/app/models/product.interface';
import { User } from 'src/app/models/user.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { timeStamp } from 'src/app/services/utility-functions';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  product: Product;
  loading: boolean;
  user: User = {} as User;

  reviewContent: string;

  showModal: boolean;

  private subscriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private cartService: CartService
  ) { 
    this.subscriptions.push(this.auth.user$.subscribe(user => this.user = user));
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.loading = true;
    this.subscriptions.push(this.productService.get(id).subscribe(product => {
      this.product = product;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addProduct(): void {
    this.cartService.addProduct(this.product);
  }

  async deleteProduct(event: boolean): Promise<void> {
    if (this.user.isAdmin && event) {
      await this.productService.delete(this.product.id).toPromise();
      window.history.back();
    } else {
      this.showModal = false;
    }
  }

  async postReview(): Promise<void> {
    const review: Review = {
      id: uuid().toString(),
      content: this.reviewContent,
      timeStamp: timeStamp(),
      name: this.user.displayName,
    };
    this.product.reviews.push(review);
    await this.productService.update(this.product).toPromise();
    this.reviewContent = '';
  }

  async deleteReview(id: string): Promise<void> {
    this.product.reviews = this.product.reviews.filter(p => p.id !== id);
    await this.productService.update(this.product).toPromise();
  }

  closeModal(event: any): void {
		if (event.target !== event.currentTarget) { return; }
		this.showModal = false;
  }

}
