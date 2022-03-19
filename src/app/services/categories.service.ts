import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/ICategory';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  URL = 'https://sportio-backend.herokuapp.com/categories';

  constructor(private _http: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    const categories = this._http
      .get<ICategory[]>(this.URL, {
        withCredentials: true,
      })
      .pipe();
    return categories;
  }

  getCategoryProducts(categoryID: string): Observable<IProduct[]> {
    const products = this._http
      .get<IProduct[]>(`${this.URL}/${categoryID}`, {
        withCredentials: true,
      })
      .pipe();
    return products;
  }
}
