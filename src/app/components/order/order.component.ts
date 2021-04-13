import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/models/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;
  @Output() action = new EventEmitter<boolean>();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    
  }

  remove(): void {
    this.orderService.delete(this.order.id)
      .subscribe(() => this.action.emit(true));
  }

}
