import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from '../../Interface/iproduct';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../Services/Basket/basket-service';
import { CustomBasket } from '../../Interface/ibasket';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-item',
  imports: [CommonModule , RouterLink],
  templateUrl: './shop-item.html',
  styleUrl: './shop-item.css',
})
export class ShopItem implements OnChanges {

  @Input() product!: IProduct;
isAdding: boolean = false;
  mainImage: string = '';
  basketId!: string;
  

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.basketId = this.basketService.getBasketId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product?.photos?.length > 0) {
      this.mainImage =
        `https://localhost:7201/productPhotos/${this.product.photos[0].photoUrl}`;
    }
  }

  changeMainImage(photoUrl: string) {
    this.mainImage = `https://localhost:7201/productPhotos/${photoUrl}`;
  }

addToCart(product: IProduct) {
  if (this.isAdding) return;

  this.isAdding = true;

  const basketId = this.basketService.getBasketId();

  let basket = this.basketService.getCurrentBasket();


  if (!basket) {
    basket = {
      id: basketId,
      items: [],
      total: 0
    };
  }

  const index = basket.items.findIndex(
    x => x.productId === product.id
  );

  const imageUrl =
    product.photos && product.photos.length > 0
      ? `https://localhost:7201/productPhotos/${product.photos[0].photoUrl}`
      : 'assets/images/no-image.png';

  let message = '';

  if (index === -1) {

    basket.items.push({
      productId: product.id,
      productName: product.name,
      description: product.description,
      img: imageUrl,
      price: product.newPrice,
      quantity: 1
    });

    message = 'Product added to cart';
  } else {
    basket.items[index].quantity++;
    message = 'Product quantity updated';
  }

  basket.total = basket.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  this.basketService.updateBasket(basket).subscribe({
    next: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true
      });
    },
    error: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to add product',
        showConfirmButton: false,
        timer: 1500
      });
    },
    complete: () => {
      this.isAdding = false;
    }
  });
}


}