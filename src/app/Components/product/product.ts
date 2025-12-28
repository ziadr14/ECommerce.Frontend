import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../Interface/iproduct';
import { IPagination } from '../../Interface/ipagination';
import { ProductService } from '../../Services/Product/product-service';
import { Category } from '../../Services/Category/category';
import { ICategory } from '../../Interface/icategory';
import { ShopItem } from '../shop-item/shop-item';
import { PaginationComponent, PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductParams } from '../../Interface/ProductParams';
import { Pagination } from '../pagination/pagination';
import Swal from 'sweetalert2';
import { Hero } from '../hero/hero';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ShopItem, CommonModule, PaginationModule , Pagination , Hero],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  product: IProduct[] = [];
  category: ICategory[] = [];
  TotalCount: number = 0;
  sortVisible = false;
    loading = false;


  selectedOption = '';
  ProductParams = new ProductParams();

  SortOptions = [
    { name: 'Name', value: 'Name' },
    { name: 'Price: min - max', value: 'PriceAce' },
    { name: 'Price: max - min', value: 'PriceDce' },
  ];

  @ViewChild('search') searchInput!: ElementRef;

  constructor(
    private _productservice: ProductService,
    private _cdr: ChangeDetectorRef,
    private _categoryService: Category ,
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategories();
  }

  getAllProduct(): void {
    this._productservice.getAll(this.ProductParams).subscribe({
      next: (value: IPagination) => {
        this.product = value.data;
        this.TotalCount = value.totalCount;
        this.ProductParams.PageNumber = value.pageNumber;
        this.ProductParams.pageSize = value.pageSize;
        this._cdr.detectChanges();

      },
      error: (err) => console.error(err),
    });
  }

  getAllCategories(): void {
    this._categoryService.getAll().subscribe({
      next: (res) => {
        this.category = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  toggleSortDropdown() {
    this.sortVisible = !this.sortVisible;
  }

  selectSort(item: { name: string; value: string }) {
    this.ProductParams.SortSelecting = item.value;
    this.selectedOption = item.name;
    this.sortVisible = false;
    this.getAllProduct();
  }

  SelectedId(categoryId: number) {
    this.ProductParams.CategoryId = categoryId;
    this.getAllProduct();
  }

  OnSearch(value: string) {
    this.ProductParams.search = value;
    this.getAllProduct();
  }

  ResetValue() {
    this.ProductParams.search = '';
    this.ProductParams.CategoryId = 0;
    this.ProductParams.SortSelecting = '';
    this.selectedOption = '';
    this.searchInput.nativeElement.value = '';
    this.getAllProduct();
  }

  OnPageChange(page: number) {
    this.ProductParams.PageNumber = page;
    this.getAllProduct();
  }

  
}
