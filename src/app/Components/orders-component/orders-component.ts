import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../Interface/iorder';
import { OrdersService } from '../../Services/Order/orders-service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-component',
  imports: [CurrencyPipe, DatePipe, RouterLink, CommonModule],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css',
})
export class OrdersComponent implements OnInit {
  orders: OrderResponse[] = [];
  showDeleteModal = false;
  selectedOrderId: number | null = null;
  constructor(private ordersService: OrdersService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllOrders();
  }
  openDeleteModal(orderId: number) {
    this.selectedOrderId = orderId;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showDeleteModal = false;
    this.selectedOrderId = null;
  }

  confirmDelete() {
    if (!this.selectedOrderId) return;

    this.ordersService.deleteOrder(this.selectedOrderId).subscribe({
      next: () => {
        this.orders = this.orders.filter((o) => o.id !== this.selectedOrderId);
        this.closeModal();
        this._cdr.detectChanges();
      },
    });
  }

  getAllOrders() {
    this.ordersService.getMyOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this._cdr.detectChanges();
      },
    });
  }
}
