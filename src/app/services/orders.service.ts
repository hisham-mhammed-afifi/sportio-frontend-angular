import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem } from '../interfaces/ICartItem';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _cartItem = new BehaviorSubject<ICartItem[]>([]);
  private _cartItem$ = this._cartItem.asObservable();

  getCartItems(): Observable<ICartItem[]> {
    return this._cartItem$;
  }

  setCartItems(latestValue: ICartItem[]) {
    return this._cartItem.next(latestValue);
  }

  URL = 'https://sportio-backend.herokuapp.com/orders';
  constructor(private _http: HttpClient) {}

  getAllOrders(): Observable<any> {
    const orders = this._http
      .get<any>(this.URL, { withCredentials: true })
      .pipe();
    return orders;
  }

  addOrder(orderDetails: any): Observable<any> {
    const order = this._http
      .post<any>(this.URL, orderDetails, {
        withCredentials: true,
      })
      .pipe();
    return order;
  }
}
