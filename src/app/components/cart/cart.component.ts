import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/interfaces/ICartItem';
import { IProduct } from 'src/app/interfaces/IProduct';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  ids: string[] = [];
  cartItems: ICartItem[] = [];
  productsInCart: IProduct[] = [];
  checked: boolean = false;

  constructor(
    private _orderServices: OrdersService,
    private _productsServices: ProductsService
  ) {}

  ngOnInit(): void {
    // get items in cart
    this.cartItems = JSON.parse(localStorage.getItem('cart') as string);
    const items = JSON.parse(localStorage.getItem('cart') as string) || [];
    for (let item of items) {
      this.ids.push(item.productId);
    }
    this._productsServices.getAllProducts().subscribe((products: any) => {
      this.productsInCart = products.data.filter((p: any) => {
        return this.ids.includes(p._id);
      });
    });
  }

  increase(productId: string) {
    const p = this.cartItems.find((p) => {
      return p.productId === productId;
    });
    p!.qty++;
    localStorage.setItem('cart', JSON.stringify([...this.cartItems]));
    this.getSubtotal();
    this.getTotal();
  }

  decrease(productId: string) {
    const p = this.cartItems.find((p) => {
      return p.productId === productId;
    });
    p!.qty <= 1 ? p!.qty : p!.qty--;
    localStorage.setItem('cart', JSON.stringify([...this.cartItems]));
    this.getSubtotal();
    this.getTotal();
  }
  getQTY(productId: string) {
    const item = this.cartItems.find((i) => {
      return i.productId === productId;
    });
    return item!.qty;
  }
  getSubtotal() {
    let subtotal: number = 0;
    for (let p of this.productsInCart) {
      let price = p.price * this.getQTY(p._id);
      subtotal += price;
    }
    return subtotal;
  }
  // Must Fix Price Later !!!!!!!!
  getTotal() {
    let withShipping = this.getSubtotal() + 50;
    return withShipping * 1.14;
  }

  //  - - - - - check out ( make order ) - - - - - - - -
  checkOut() {
    let order = {
      tax: 14,
      shippingFee: 50,
      cartItems: this.cartItems,
    };
    this._orderServices.addOrder(order).subscribe((res) => {
      console.log(res);
      localStorage.removeItem('cart');
      this.checked = true;
    });
  }
}
