import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from '../../utils/product.service';

@Component({
  selector: 'app-save-product-form',
  templateUrl: './save-product-form.component.html',
  styleUrls: ['./save-product-form.component.scss']
})
export class SaveProductFormComponent implements OnInit {

  product: Product = {} as Product;
  task: AngularFireUploadTask;
  progress: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>

  isHovering: boolean;
  unsupportedFile: boolean;
  
  constructor(
    private productService: ProductService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  async startUpload(event: FileList) {
    const file: File = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      this.unsupportedFile = true;
    }

    const path = `products/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);
    this.progress = this.task.percentageChanges();
    
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => this.downloadURL = await ref.getDownloadURL().toPromise()) 
    );
  }
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    this.startUpload(files);
  }

  isActive(snapshot: any): boolean {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  onFileSelect(files: FileList): void {
  }

  async uploadProduct(): Promise<void> {
    try {
      await this.productService.submitProduct(this.product, null);
    } catch (e) {
      console.log(e);
    }
  }


}
