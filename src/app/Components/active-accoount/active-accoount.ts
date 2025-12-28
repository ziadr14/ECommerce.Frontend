import { AfterViewInit, Component } from '@angular/core';
import { IActiveAcount } from '../../Interface/iactiveAcount';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-accoount',
  imports: [CommonModule ],
  templateUrl: './active-accoount.html',
  styleUrl: './active-accoount.css',
})
export class ActiveAccoount implements AfterViewInit  {

  activeParams:IActiveAcount={email:'',token:''};
  status: 'loading' | 'success' | 'error' | 'already-active' = 'loading';
  errorMessage = '';
  constructor(private _router : ActivatedRoute , 
    private route : Router , private _authService: AuthService){}


  ngAfterViewInit(): void {
    this._router.queryParams.subscribe(params => {

      this.activeParams.email = params['email'];
      this.activeParams.token = params['token'];

      if (!this.activeParams.email || !this.activeParams.token) {
        this.status = 'error';
        this.errorMessage = 'Invalid or broken activation link';
        return;
      }

      this.status = 'loading';

      this._authService.activeAccount(this.activeParams).subscribe({
        next: (res: any) => {
          this.status = 'success';

          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1800,
            timerProgressBar: true,
          });

          setTimeout(() => {
            this.route.navigate(['/login']);
          }, 2500);
        },

        error: (err) => {
          this.status = 'error';
          this.errorMessage =
            err.error?.message || 'Activation link expired or invalid';

          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: this.errorMessage,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
    });
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }

  goToRegister() {
    this.route.navigate(['/register']);
  }



}
