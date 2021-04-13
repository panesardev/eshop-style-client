import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss']
})
export class SaveProductComponent implements OnInit {

  @ViewChild('previewIMG') previewIMG: ElementRef;

  product: Product = {
    collectionName: 'men clothing'
  } as Product;

  picture: File = null;

  task: AngularFireUploadTask;
  progress: Observable<number>;

  isHovering: boolean;
  unsupportedFile: boolean;
  disableSave: boolean;
  previewURL: string;
  validationError: boolean;

  constructor(
    private productService: ProductService,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  async uploadPicture(): Promise<void> {
    const file = this.picture;

    const path = `products/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);
    this.progress = this.task.percentageChanges();
    
    await this.task.snapshotChanges().toPromise();
    this.product.pictureURL = await ref.getDownloadURL().toPromise();
  }
  
  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    this.picture = files.item(0);
    this.setPreviewURL();

    if (this.picture.type.split('/')[0] !== 'image') {
      this.unsupportedFile = true;
      this.disableSave = true;
    }
  }

  fileSelected(event: any): void {
    this.picture = event.target.files[0];
    this.setPreviewURL();
  }

  setPreviewURL(): void {
    this.previewIMG.nativeElement.src = URL.createObjectURL(this.picture);
    this.previewIMG.nativeElement.height = 100;
    this.previewIMG.nativeElement.onload = () => {
      URL.revokeObjectURL(this.previewIMG.nativeElement.src);
    }
  }

  async save(): Promise<void> {
    if (this.validateProduct()) {
      await this.uploadPicture();
      await this.productService.save(this.product).toPromise();
      this.toastr.success('Product uploaded!', '', { timeOut: 1000 });
      location.reload();
    } else {
      this.validationError = true;
    }
  }

  validateProduct(): boolean {
    return this.product.description ||
      this.product.name ||
      this.product.price || 
      this.product.pictureURL ? true : false;
  }

}
