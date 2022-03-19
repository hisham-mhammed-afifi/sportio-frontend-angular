import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponentComponent } from './shared/header-component/header-component.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CardComponent } from './shared/card/card.component';
import { ProductsComponent } from './components/products/products.component';
import { BannersComponent } from './components/banners/banners.component';
import { FooterComponentComponent } from './shared/footer-component/footer-component.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { AuthProvider } from './intrceptors/auth.interceptor';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavBarComponent,
    HeaderComponentComponent,
    HomeComponent,
    CategoriesComponent,
    CardComponent,
    ProductsComponent,
    BannersComponent,
    FooterComponentComponent,
    ProductDetailsComponent,
    RegisterFormComponent,
    LoginFormComponent,
    DashboardComponent,
    UsersComponent,
    ProductsTableComponent,
    OrdersTableComponent,
    ProductFormComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpClientXsrfModule.withOptions({
    //   cookieName: 'My-Xsrf-Cookie',
    //   headerName: 'My-Xsrf-Header',
    // }),
  ],
  providers: [AuthProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
