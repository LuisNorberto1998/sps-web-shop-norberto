import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {}

  goToCart() {
    this.router.navigate(['/cart'])
  }

  logout() {
    this.authService.logout()
      .then(response => {
        console.log(response);
        this.router.navigate(['/login'])
      })
      .catch(error => console.error(error)
    );
  }

}
