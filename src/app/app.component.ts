import { Component, HostListener } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private cartService: CartService) { }

  // Save cart if user refreshes or leaves te site
  @HostListener('window:beforeunload')
  listenCloseWindow() {
    this.cartService.save();
  }
}
