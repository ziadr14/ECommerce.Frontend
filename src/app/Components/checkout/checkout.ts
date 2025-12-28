import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../Environments/environment';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { BasketService } from '../../Services/Basket/basket-service';
import { DeliveryMethodService } from '../../Services/DeliveryMethod/delivery-method-service';

import { CustomBasket } from '../../Interface/ibasket';
import { CreateOrder } from '../../Interface/iorder';
import { DeliveryMethod } from '../../Interface/idelivaryMethod';
import { Router } from '@angular/router';
import { OrdersService } from '../../Services/Order/orders-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class Checkout  implements OnInit, OnDestroy {
  basket: CustomBasket | null = null;
  basketId!: string;

  shippingForm!: FormGroup;
  paymentForm!: FormGroup;

  deliveryMethods: DeliveryMethod[] = [];
  selectedDeliveryPrice = 0;

  private basketSub!: Subscription;

  constructor(
    private basketService: BasketService,
    private orderService: OrdersService,
    private deliveryMethodService: DeliveryMethodService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.basketId = this.basketService.getBasketId();

    this.basketSub = this.basketService.basket$.subscribe(
      basket => (this.basket = basket)
    );

    this.basketService.getBasket(this.basketId).subscribe();

    this.shippingForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.paymentForm = this.fb.group({
      deliveryMethodId: [null, Validators.required],
    });

    this.deliveryMethodService.getAll().subscribe(methods => {
      this.deliveryMethods = methods;
      if (methods.length) {
        this.paymentForm.patchValue({
          deliveryMethodId: methods[0].id,
        });
        this.selectedDeliveryPrice = methods[0].price;
      }
    });

    this.paymentForm.get('deliveryMethodId')?.valueChanges.subscribe(id => {
      const method = this.deliveryMethods.find(m => m.id === id);
      this.selectedDeliveryPrice = method ? method.price : 0;
    });
  }

  ngOnDestroy(): void {
    this.basketSub?.unsubscribe();
  }


  getItemsCount() {
    return this.basket?.items?.length || 0;
  }

  getSubtotal() {
    return this.basket?.total || 0;
  }

  getShippingPrice() {
    return this.selectedDeliveryPrice;
  }

  getTotal() {
    return this.getSubtotal() + this.getShippingPrice();
  }


  confirmOrderWithoutPayment() {
    if (!this.basket || this.shippingForm.invalid || this.paymentForm.invalid)
      return;

    const order: CreateOrder = {
      basketId: this.basketId,
      deliveryMethodId: this.paymentForm.value.deliveryMethodId,
      shippingAddress: this.shippingForm.value,
    };

    this.orderService.createOrder(order).subscribe(res => {
      this.basketService.deleteBasket(this.basketId).subscribe();
      localStorage.removeItem('basket_id');
      this.router.navigate([`/orders/success/${res.id}`]);
    });
  }


payWithStripe() {
  if (this.shippingForm.invalid || this.paymentForm.invalid) return;

  const order: CreateOrder = {
    basketId: this.basketId,
    deliveryMethodId: this.paymentForm.value.deliveryMethodId,
    shippingAddress: this.shippingForm.value
  };

  this.orderService.createOrder(order).subscribe({
    next: () => {

      this.basketService
        .createStripeCheckout(
          this.basketId,
          this.paymentForm.value.deliveryMethodId
        )
        .subscribe({
          next: (url: string) => {
            window.location.href = url; 
          },
          error: err =>
            console.error('Stripe Checkout Error', err)
        });

    },
    error: err =>
      console.error('Create Order Error', err)
  });
}

}