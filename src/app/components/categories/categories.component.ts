import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/app/interfaces/ICategory';
import { IProduct } from 'src/app/interfaces/IProduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() products: IProduct[] = [];
  @Input() categories: ICategory[] = [];
  @Output() searchProducts: EventEmitter<string> = new EventEmitter();
  @Output() filterProducts: EventEmitter<string> = new EventEmitter();
  constructor(private _categoriesServices: CategoriesService) {}

  ngOnInit(): void {
    // get all categories
    this._categoriesServices.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  search(e: any) {
    this.searchProducts.emit(e.target.value);
  }

  filterByCategory(categoryId: string) {
    this.filterProducts.emit(categoryId);
  }

  // /////////
  //  ngAfterViewInit(): void {
  //   this.searchForProduct();
  // }

  // filterBySearch(term: string) {
  //   console.log(term);
  //   return this._productService
  //     .getAllProducts()
  //     .pipe(
  //       map((products) =>
  //         products.filter((p) =>
  //           p.title.toLowerCase().includes(term.toLowerCase())
  //         )
  //       )
  //     );
  // }

  // searchForProduct() {
  //   fromEvent<any>(this.input.nativeElement, 'keyup')
  //     .pipe(
  //       map((event) => event.target.value),
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       switchMap((search) => this.filterBySearch(search))
  //     )
  //     .subscribe((products) => {
  //       this.products = products;
  //       console.log(this.products);
  //     });
  // }
}
