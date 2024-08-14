import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { SpinnerService } from '../../services/spinner.service';
import { CartService } from '../../../cart/services/cart.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartItemsCount: number = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {
    this.cartSubscription.add(
      this.cartService.getCartItemsCount().subscribe((count) => {
        this.cartItemsCount = count;
      })
    );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.spinnerService.showSpinner();
    this.authService
      .logout()
      .then((response) => {
        this.router.navigate(['/login']);
        this.spinnerService.hideSpinner();
        this.snackBar.open('Sesión cerrada con éxito.', 'Cerrar', {
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error(error);
        this.spinnerService.hideSpinner();
        this.snackBar.open(
          'Error al cerrar sesión. Inténtalo de nuevo.',
          'Cerrar',
          {
            duration: 3000,
          }
        );
      });
  }
}
