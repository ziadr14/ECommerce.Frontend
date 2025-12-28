import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  formGroup!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValidation();
  }

  formValidation() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
              username: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/),
        ],
      ],
    });
  }

  get _email() {
    return this.formGroup.get('email');
  }

  get _password() {
    return this.formGroup.get('password');
  }
  get _username() {
    return this.formGroup.get('username');
  }

  Submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.authService.login(this.formGroup.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
        });

        localStorage.setItem('token', res.token);

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1800);
      },

      error: (err) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: err.error?.message || 'Invalid email or password',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  }
}
