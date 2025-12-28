import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../Services/Product/product-service';
import { IProduct } from '../../Interface/iproduct';
import { Pagination } from '../pagination/pagination';
import { ProductParams } from '../../Interface/ProductParams';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { BasketService } from '../../Services/Basket/basket-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, Pagination ,NgxImageZoomModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  product!: IProduct;
  productId!: number;

  similarProducts: IProduct[] = [];
  isLoadingSimilar = true;

  similarPageNumber = 1;
  similarPageSize = 3;
  similarTotalCount = 0;

  mainImage = '';

isAdding: boolean = false;
  basketId!: string;




  ProductParams = new ProductParams();







  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router ,
    private basketService : BasketService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.productId = id;
        this.loadProduct(id);
        this.loadSimilarProducts();
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getById(id).subscribe({
      next: (res: any) => {
        this.product = res.data ?? res;

        this.mainImage = this.product.photos?.length
          ? `https://localhost:7201/productPhotos/${this.product.photos[0].photoUrl}`
          : 'assets/no-image.png';
      },
      error: err => console.error(err)
    });
  }

  loadSimilarProducts() {
    this.isLoadingSimilar = true;

    this.productService
      .getSimilarProductsPaged(
        this.productId,
        this.similarPageNumber,
        this.similarPageSize
      )
      .subscribe({
        next: (res: any) => {
          this.similarProducts = res.data;
          this.similarTotalCount = res.totalCount;
          this.isLoadingSimilar = false;
        },
        error: err => {
          console.error(err);
          this.isLoadingSimilar = false;
        }
      });
  }

  onSimilarPageChange(page: number) {
    this.similarPageNumber = page;
    this.loadSimilarProducts();
  }

  changeMainImage(photoUrl: string) {
    this.mainImage = `https://localhost:7201/productPhotos/${photoUrl}`;
  }

  goToProduct(id: number) {
    this.router.navigate(['/shop/product-details', id]);
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
