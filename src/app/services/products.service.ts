import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  URL = 'https://sportio-backend.herokuapp.com/products';
  local = 'http://localhost:3000/products';
  constructor(private _http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    const products = this._http
      .get<IProduct[]>(this.URL, {
        withCredentials: true,
      })
      .pipe();
    return products;
  }
  getSingleProduct(productID: string): Observable<IProduct> {
    const product = this._http
      .get<IProduct>(`${this.URL}/${productID}`, {
        withCredentials: true,
      })
      .pipe();
    return product;
  }
  addProduct(productsDetails: any): Observable<IProduct> {
    // const formData = new FormData();
    // formData.append('image', productsDetails.image);
    const product = this._http
      .post<IProduct>(this.URL, productsDetails, {
        withCredentials: true,
      })
      .pipe();
    return product;
  }
  deleteProduct(productID: string) {
    const product = this._http
      .delete(`${this.URL}/${productID}`, {
        withCredentials: true,
      })
      .pipe();

    return product;
  }
  updateProduct(productID: string, productsDetails: any) {
    const product = this._http
      .patch(`${this.URL}/${productID}`, productsDetails, {
        withCredentials: true,
      })
      .pipe();

    return product;
  }

  uploadImage(imageDetails: any): Observable<any> {
    const imagePath = this._http
      .post<any>(`${this.URL}/uploadimage`, imageDetails, {
        withCredentials: true,
      })
      .pipe();
    return imagePath;
  }
}
