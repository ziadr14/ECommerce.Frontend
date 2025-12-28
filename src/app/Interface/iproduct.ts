import { ICategory } from './icategory';
import { IPhoto } from './iphoto';
export interface IProduct {
    categoryId: number;
    id: number;
    name: string;
    description: string;
    oldPrice: number;
    newPrice: number;
    photos: IPhoto[];
    categoryName: string;
    isActive: boolean;
    isDeleted: boolean;
}
