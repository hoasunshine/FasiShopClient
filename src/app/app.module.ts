// @ts-ignore
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {ShopComponent} from './shop/shop.component';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
// @ts-ignore
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { ContactComponent } from './contact/contact.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ShopComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ContactComponent,
    OrderManagementComponent,
    BlogComponent,
    BlogDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
