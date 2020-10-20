import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {ShopComponent} from './shop/shop.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ContactComponent} from './contact/contact.component';
import {OrderManagementComponent} from './order-management/order-management.component';
import {BlogComponent} from './blog/blog.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'order-management', component: OrderManagementComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog-detail', component: BlogDetailComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
