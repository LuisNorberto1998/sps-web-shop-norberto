import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user) {
          // Usuario autenticado
          console.log(user);
          
          return true;
        } else {
          // Usuario no autenticado, redirigir al login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
