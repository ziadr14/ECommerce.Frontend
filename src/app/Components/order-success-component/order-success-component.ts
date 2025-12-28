import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../Interface/iorder';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../Services/Order/orders-service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-success-component',
  imports: [CurrencyPipe , DatePipe , CommonModule , RouterLink],
  templateUrl: './order-success-component.html',
  styleUrl: './order-success-component.css',
})
export class OrderSuccessComponent implements OnInit {

  order!: OrderResponse;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.ordersService.getOrderById(orderId).subscribe({
      next: res => this.order = res
    });
  }
}
