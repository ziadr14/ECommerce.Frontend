import { IProduct } from './iproduct';

export interface IPagination {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    data: IProduct[];
}
