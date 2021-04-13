import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/models/cart.interface';
import { Order } from 'src/app/models/order.interface';
import { User } from 'src/app/models/user.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { timeStamp } from 'src/app/services/utility-functions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  cart: Cart;
  user: User;
  order: Order;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
    ) { }
    
    ngOnInit(): void {
      this.cart = this.cartService.cart;
      this.subscription = this.auth.user$.subscribe(user => {
        this.user = user;
        this.order = {
        address: this.user.address,
        email: this.user.email,
        products: this.cart.products,
        totalPrice: this.cart.total,
        orderPlaceTime: timeStamp()
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  placeOrder(): void {
    this.orderService.save(this.order).subscribe((order) => {
      this.order = order;
      this.toastr.success('Order Placed, Thank you!', '', {
        timeOut: 1000,
      });
      this.cartService.clear();
      this.router.navigate(['/home']);
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

}
