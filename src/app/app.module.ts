import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { environment as env } from 'src/environments/environment';

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
import { ViewProductComponent } from './components/view-product/view-product.component';

import { AdminGuard } from './auth/admin.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './utils/user.service';
import { UploadService } from './utils/upload.service';
import { ProductService } from './utils/product.service';
import { DropZoneDirective } from './utils/drop-zone.directive';
import { SaveProductFormComponent } from './components/save-product-form/save-product-form.component';
import { SaveProductComponent } from './components/save-product/save-product.component';

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
    SaveProductFormComponent,
    SaveProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    UserService,
    ProductService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
