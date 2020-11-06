import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/utils/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  product: Product = {} as Product;
  productPictureFile: File = null;
    
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onFileSelect(files: FileList): void {
    this.productPictureFile = files.item(0);
  }

  async uploadProduct(): Promise<void> {
    try {
      await this.productService.submitProduct(this.product, this.productPictureFile);
    } catch (e) {
      console.log(e);
    }
  }

}
