import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../../models/collection.interface';

@Component({
  selector: 'app-home-product-list',
  templateUrl: './home-product-list.component.html',
  styleUrls: ['./home-product-list.component.scss']
})
export class HomeProductListComponent implements OnInit {

  @Input() collection: Collection;

  constructor() { }

  ngOnInit(): void {
    console.log(this.collection);
    
  }

}
