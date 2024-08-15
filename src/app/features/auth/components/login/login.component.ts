import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';
import { User } from '../../../../core/models/login.model';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.spinnerService.showSpinner();
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService
      .login(user)
      .then((response) => {
        const userEmail = response.user?.email || '';
        const userId = response.user?.uid || '';
        this.router.navigate(['/dashboard']);
        this.spinnerService.hideSpinner();

        this.snackBar.open(
          `Sesión iniciada con éxito:  ${userEmail} - ${userId}`,
          'Cerrar',
          {
            duration: 5000,
          }
        );
      })
      .catch((error) => {
        console.error(error);
        this.spinnerService.hideSpinner();
        this.snackBar.open('Error al iniciar sesión', 'Cerrar', {
          duration: 3000,
        });
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }
}
