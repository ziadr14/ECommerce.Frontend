import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/Auth/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule , ReactiveFormsModule ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  formGroup!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder , private router: Router, private auth: AuthService) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get _email() {
    return this.formGroup.get('email');
  }

Submit() {
  if (this.formGroup.invalid) {
    this.formGroup.markAllAsTouched();
    return;
  }

  this.loading = true;

  this.auth.forgotPassword(this.formGroup.value).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Check your email',
        text: 'We sent you a reset password link to your email',
        confirmButtonText: 'OK',
      });

      this.loading = false;
      this.formGroup.reset();
    },
    error: () => {
      this.loading = false;
      Swal.fire('Error', 'Something went wrong', 'error');
    },
  });
}


}
