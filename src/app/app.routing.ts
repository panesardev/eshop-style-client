import { Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { ViewProductComponent } from './routes/view-product/view-product.component';
import { AdminComponent } from './routes/admin/admin.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { ViewProductsComponent } from './routes/view-products/view-products.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/sign-up', component: SignUpComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'view/product/:id', component: ViewProductComponent },
  { path: 'view/collection/:collectionName', component: ViewProductsComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
