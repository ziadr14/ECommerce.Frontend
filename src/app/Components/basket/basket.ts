import { Component, OnInit } from '@angular/core';
import { CustomBasket, IBasketItem } from '../../Interface/ibasket';
import { BasketService } from '../../Services/Basket/basket-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-basket',
  standalone: true, 
  imports: [CurrencyPipe , CommonModule, RouterLink],
  templateUrl: './basket.html',
  styleUrls: ['./basket.css']
})
export class Basket implements OnInit {
  basket!: CustomBasket;
  basketId!: string;
  loading = false;
  progressValue = 0;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketId = this.basketService.getBasketId();
    this.loadBasket();
  }

  loadBasket() {
    this.loading = true;
    this.basketService.getBasket(this.basketId).subscribe({
      next: basket => {
        this.basket = basket;
        this.loading = false;
        this.animateProgress();
      },
      error: err => {
        console.error('Error loading basket:', err);
        this.loading = false;
      }
    });
  }

  increaseQuantity(item: IBasketItem) {
    item.quantity++;
    this.updateBasket();
  }

  decreaseQuantity(item: IBasketItem) {
    item.quantity--;
    if (item.quantity <= 0) {
      this.removeItem(item.productId);
    } else {
      this.updateBasket();
    }
  }

  removeItem(productId: number) {
    this.basket.items = this.basket.items.filter(i => i.productId !== productId);
    this.updateBasket();
  }

  updateBasket() {
    this.basketService.updateBasket(this.basket).subscribe({
      next: basket => {
        this.basket = basket;
        this.animateProgress();
      },
      error: err => console.error('Error updating basket:', err)
    });
  }

  clearBasket() {
    this.basketService.deleteBasket(this.basketId).subscribe({
      next: () => {
        this.basket.items = [];
        this.animateProgress();
      },
      error: err => console.error('Error clearing basket:', err)
    });
  }

  calculateProgress(): number {
    const targetTotal = 2000;
    const currentTotal = this.basket?.total ?? 0;
    return Math.min(100, Math.round((currentTotal / targetTotal) * 100));
  }

  animateProgress() {
    const targetValue = this.calculateProgress();
    let current = this.progressValue;
    const step = targetValue > current ? 1 : -1;

    const interval = setInterval(() => {
      if ((step > 0 && current >= targetValue) || (step < 0 && current <= targetValue)) {
        clearInterval(interval);
      } else {
        current += step;
        this.progressValue = current;
      }
    }, 15);
  }
}