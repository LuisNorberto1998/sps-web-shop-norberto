import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './features/not-found/not-found/not-found.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { CartComponent } from './features/cart/components/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];
