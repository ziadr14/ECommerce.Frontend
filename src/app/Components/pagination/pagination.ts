import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationComponent } from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-pagination',
  imports: [PaginationComponent],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {



  
@Input() TotalCount!: number;
@Input() pageSize!: number;
@Output()pageChanged = new EventEmitter();
  OnPageChange(event:any){
    this.pageChanged.emit(event)
  }
}

