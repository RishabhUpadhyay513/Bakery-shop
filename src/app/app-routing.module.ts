import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeDetailsComponent } from './cake-details/cake-details.component';
import { CartComponent } from './cart/cart.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { CanactivateService } from './guards/canactivate.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { CartService } from './resolvers/cart.service';
import { OrdersService } from './resolvers/orders.service';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { ShopCakesComponent } from './shop-cakes/shop-cakes.component';
import { SignupComponent } from './signup/signup.component';

// Set Routes here
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cake/:id', component: CakeDetailsComponent },
  { path: 'search', component: SearchresultsComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanactivateService],
  },
  {
    path: 'forgetPassword',
    component: ForgetpassComponent,
    canActivate: [CanactivateService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [CanactivateService],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [CanactivateService],
    resolve: [CartService],
  },
  {
    path: 'myorders',
    component: OrdersComponent,
    canActivate: [CanactivateService],
    resolve: [OrdersService],
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),

    canActivate: [CanactivateService],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [CanactivateService],
  },
  { path: 'shopNow', component: ShopCakesComponent },
  // { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
