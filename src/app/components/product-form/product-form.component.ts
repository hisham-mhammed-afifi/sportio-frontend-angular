import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: any = {};
  categories: ICategory[] = [];
  showForm: boolean = true;

  productForm = this.fb.group({
    image: [
      '/uploads/1645172466825Screenshot 2022-02-18 102029.png',
      Validators.required,
    ],
    title: ['', Validators.required],
    price: [null, Validators.required],
    inStock: [null, Validators.required],
    categoryId: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private _productsService: ProductsService,
    private _categoriesServices: CategoriesService
  ) {}

  ngOnInit(): void {
    this._categoriesServices.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(this.product);
      if (this.product) {
        const { title, price, inStock, categoryId } = this.product;
        this.productForm.get('title')?.setValue(title);
        this.productForm.get('price')?.setValue(price);
        this.productForm.get('inStock')?.setValue(inStock);
        this.productForm.get('categoryId')?.setValue(categoryId);
      }
    });
  }

  onChange(e: any) {
    // const file = e.target.files[0];
    // this.productForm.patchValue({ image: file });
    // console.log(file);
    // console.log(this.productForm);
    // const formData: any = new FormData();
    // formData.append('image', file);
    // this._productsService.uploadImage(formData).subscribe((res) => {
    //   console.log(res);
    // });
  }
  onInput(e: any) {
    console.log(e);
  }

  addProduct(e: any) {
    const file = e.target[0].files[0];
    this.productForm.patchValue({ image: file });
    console.log(this.productForm);

    const formData: any = new FormData();
    formData.append('image', file);

    this._productsService.uploadImage(formData).subscribe((res) => {
      console.log(res.imagePath);

      this.productForm.get('image')?.setValue(res.imagePath);
      this._productsService
        .addProduct(this.productForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    });

    this.showForm = false;
  }
  updateProduct(e: any, productID: string) {
    const file = e.target[0].files[0];
    this.productForm.patchValue({ image: file });
    console.log(this.productForm);

    const formData: any = new FormData();
    formData.append('image', file);

    this._productsService.uploadImage(formData).subscribe((res) => {
      console.log(res.imagePath);

      this.productForm.get('image')?.setValue(res.imagePath);
      this._productsService
        .updateProduct(productID, this.productForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    });
    this.showForm = false;
  }

  get title() {
    return this.productForm.get('title');
  }
  get price() {
    return this.productForm.get('price');
  }
  get inStock() {
    return this.productForm.get('inStock');
  }
  get categoryId() {
    return this.productForm.get('categoryId');
  }

  isInvalid(control: any) {
    return control && control.touched && control.invalid;
  }
  isValid(control: any) {
    return control && control.touched && control.valid;
  }
}
