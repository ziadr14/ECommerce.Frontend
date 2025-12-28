import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../Interface/iorder';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../Services/Order/orders-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details-component',
  imports: [CurrencyPipe , CommonModule],
  templateUrl: './order-details-component.html',
  styleUrl: './order-details-component.css',
})
export class OrderDetailsComponent implements OnInit {

  order!: OrderResponse;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ordersService.getOrderById(id).subscribe({
      next: res => this.order = res
    });
  }

  getStatusClass(status: string) {
    return status.toLowerCase();
  }





sendInvoice(orderId: number) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: 'Sending invoice...',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true
  });

  this.ordersService.sendInvoice(orderId).subscribe({
    next: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Invoice PDF sent to your email 📧',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });
    },
    error: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to send invoice',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true
      });
    }
  });
}


}