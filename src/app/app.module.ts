import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFilesizeModule } from 'ngx-filesize';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { AdminComponent } from './routes/admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { ViewProductComponent } from './routes/view-product/view-product.component';
import { SaveProductComponent } from './components/save-product/save-product.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { DropZoneDirective } from './services/drop-zone.directive';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { HomeProductListComponent } from './components/home-product-list/home-product-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CollectionService } from 'src/app/services/collection.service';
import { ViewProductsComponent } from './routes/view-products/view-products.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { ViewCartComponent } from './routes/view-cart/view-cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';
import { ReviewComponent } from './components/review/review.component';
import { ToastrModule } from 'ngx-toastr';
import { OrderService } from './services/order.service';
import { OrderComponent } from './components/order/order.component';
import { AboutComponent } from './routes/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    AdminComponent,
    NavbarComponent,
    ProductComponent,
    ViewProductComponent,
    DropZoneDirective,
    SaveProductComponent,
    HomeCarouselComponent,
    HomeProductListComponent,
    ProductListComponent,
    ViewProductsComponent,
    LoadingComponent,
    ModalComponent,
    ViewCartComponent,
    CartProductComponent,
    CheckoutComponent,
    ReviewComponent,
    OrderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxFilesizeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    UserService,
    ProductService,
    CartService,
    CollectionService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
