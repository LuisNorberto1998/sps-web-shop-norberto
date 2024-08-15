import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatIconModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any[] = [];
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  loadCart() {
    this.spinnerService.showSpinner();
    this.cartSubscription.add(
      this.cartService.getCartItems().subscribe((items) => {
        this.cart = items;
        this.spinnerService.hideSpinner();
      })
    );
  }

  getTotalProducts(): number {
    return this.cart.reduce((sum, product) => sum + (product.quantity || 0), 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (sum, product) => sum + product.price * (product.quantity || 0),
      0
    );
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      // Actualizar la vista después de eliminar
      this.loadCart();
    });
  }
}
