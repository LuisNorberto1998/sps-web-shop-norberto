import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found/not-found.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { CartComponent } from './features/cart/components/cart/cart.component';
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';

import { AuthGuard } from './core/guards/auth.guard';
import { ProductGuard } from './core/guards/product.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: ProductDetailComponent, canActivate: [AuthGuard, ProductGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];
