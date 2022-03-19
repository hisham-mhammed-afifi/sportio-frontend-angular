import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/ICartItem';
import { IProduct } from 'src/app/interfaces/IProduct';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() products: IProduct[] = [];
  cart: ICartItem[] = [];

  subscription: Subscription = new Subscription();

  constructor(private _orderServices: OrdersService) {}

  ngOnInit(): void {
    this.subscription = this._orderServices.getCartItems().subscribe((res) => {
      console.log('from products', res);
      this.cart = res;
    });
  }

  addToCart(e: any, productId: string) {
    let cartItem = {
      productId,
      qty: 1,
    };
    e.target.disabled = true;
    e.target.innerText = 'added to cart';
    if (this.cart.some((item) => item.productId === productId)) {
      this._orderServices.setCartItems([...this.cart]);
    } else {
      localStorage.setItem('cart', JSON.stringify([cartItem, ...this.cart]));
      this._orderServices.setCartItems([cartItem, ...this.cart]);
    }
  }
}
