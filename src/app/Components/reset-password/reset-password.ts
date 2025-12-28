import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/Auth/auth-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {

  formGroup!: FormGroup;
  email = '';
  token = '';
  showPassword = false;
  showConfirmPassword = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];

      if (!this.email || !this.token) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid link',
          text: 'Reset password link is invalid or expired',
        });
        this.router.navigate(['/login']);
      }
    });

    this.formGroup = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (!password || !confirm) return null;

    return password === confirm ? null : { passwordMismatch: true };
  }

  get _newPassword() {
    return this.formGroup.get('newPassword');
  }

  get _confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  Submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.auth.resetPassword({
      email: this.email,
      token: this.token,
      newPassword: this.formGroup.value.newPassword,
    }).subscribe({
      next: () => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password reset successfully',
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: err => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'Reset password failed',
        });
      },
    });
  }
}
