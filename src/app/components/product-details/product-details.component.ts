import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  products: any = [];
  productId: string = '';
  show: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((value: any) => {
      this.productId = value.params.id;
    });
    this._productsService.getSingleProduct(this.productId).subscribe((p) => {
      this.product = p;
      // ---- Products from cayegory ---- //
      this._categoriesService
        .getCategoryProducts(p.categoryId)
        .subscribe((products) => {
          this.products = products;
          console.log(products);
          if (products) {
            this.show = true;
          }
        });
    });
    window.scroll(0, 0);
  }
}
