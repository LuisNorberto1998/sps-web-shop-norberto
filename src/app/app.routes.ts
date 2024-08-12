import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/components/product-detail/product-detail.component';
import { CartComponent } from './features/cart/components/cart/cart.component';
import { NotFoundComponent } from './features/not-found/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login',        component: LoginComponent},
    { path: 'dashboard',    component: DashboardComponent,          canActivate: [authGuard]},
    { path: 'products',     component: ProductListComponent,        canActivate: [authGuard]},
    { path: 'products/:id', component: ProductDetailComponent,      canActivate: [authGuard]},
    { path: 'cart',         component: CartComponent,               canActivate: [authGuard]},
    { path: '**',           component: NotFoundComponent,           canActivate: [authGuard]},
];
