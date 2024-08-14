import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router, private spinnerService: SpinnerService) {}

  goToCart() {
    this.router.navigate(['/cart'])
  }

  logout() {
    this.spinnerService.showSpinner();
    this.authService.logout()
      .then(response => {
        this.router.navigate(['/login']);
        this.spinnerService.hideSpinner();
      })
      .catch(error => console.error(error)
    );
  }

}
