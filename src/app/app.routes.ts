import { Routes } from '@angular/router';
import { authGuardGuard } from './Guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Components/home/home').then(m => m.Home),
    children: [
      { path: '', loadComponent: () => import('./Components/product/product').then(m => m.Product) },
      { path: 'shop', loadComponent: () => import('./Components/product/product').then(m => m.Product) },
      { path: 'shop/product-details/:id', loadComponent: () => import('./Components/product-details/product-details').then(m => m.ProductDetails) },
      { path: 'basket', loadComponent: () => import('./Components/basket/basket').then(m => m.Basket) },
      { path: 'about-us', loadComponent: () => import('./Components/about-us/about-us').then(m => m.AboutUs) },
      { path: 'login', loadComponent: () => import('./Components/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./Components/register/register').then(m => m.Register) },
      { path: 'activate-account', loadComponent: () => import('./Components/active-accoount/active-accoount').then(m => m.ActiveAccoount) },
      { path: 'forgot-password', loadComponent: () => import('./Components/forgot-password/forgot-password').then(m => m.ForgotPassword) },
      { path: 'reset-password', loadComponent: () => import('./Components/reset-password/reset-password').then(m => m.ResetPassword) },
      { path: 'contact_us', loadComponent: () => import('./Components/contact-us/contact-us').then(m => m.ContactUs) },

      {
        path: 'checkout',
        loadComponent: () => import('./Components/checkout/checkout').then(m => m.Checkout),
        canActivate: [authGuardGuard]
      },
      {
        path: 'orders',
        loadComponent: () => import('./Components/orders-component/orders-component').then(m => m.OrdersComponent),
        canActivate: [authGuardGuard]
      },
      {
        path: 'orders-details/:id',
        loadComponent: () => import('./Components/order-details-component/order-details-component').then(m => m.OrderDetailsComponent),
        canActivate: [authGuardGuard]
      },
      {
        path: 'orders/success/:id',
        loadComponent: () => import('./Components/order-success-component/order-success-component').then(m => m.OrderSuccessComponent),
        canActivate: [authGuardGuard]
      },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
