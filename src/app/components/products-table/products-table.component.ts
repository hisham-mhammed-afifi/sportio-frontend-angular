import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  products: IProduct[] = [];
  product: any = {};
  openForm: boolean = false;

  constructor(private _productsServices: ProductsService) {}

  ngOnInit(): void {
    this._productsServices.getAllProducts().subscribe((p: any) => {
      this.products = p.data;
    });
  }
  deleteProduct(productID: string) {
    this._productsServices.deleteProduct(productID).subscribe((res) => {
      this.products = this.products.filter((p) => {
        return p._id !== productID;
      });
      console.log(res);
    });
  }

  toggleForm() {
    this.openForm = true;
    window.scroll(0, 0);
  }

  openForEdit(productID: string) {
    console.log(productID);
    this._productsServices
      .getSingleProduct(productID)
      .subscribe((product: any) => {
        this.product = product;
      });
    this.openForm = true;
    window.scroll(0, 0);
  }
}
