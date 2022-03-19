import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  constructor(
    private _productsServices: ProductsService,
    private _categoriesServices: CategoriesService
  ) {}

  ngOnInit(): void {
    this._productsServices.getAllProducts().subscribe((result: any) => {
      this.products = result.data;
    });
    window.scroll(0, 0);
  }

  searchProducts(val: any) {
    this._productsServices.getAllProducts().subscribe((result: any) => {
      this.products = result.data.filter((product: any) => {
        return product.title.toLowerCase().includes(val.toLowerCase());
      });
    });
  }

  filterProducts(categoryId: string) {
    console.log(categoryId);

    this._categoriesServices
      .getCategoryProducts(categoryId)
      .subscribe((products) => {
        console.log(products);

        this.products = products;
      });
  }
}
