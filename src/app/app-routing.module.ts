import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CakeDetailsComponent } from './cake-details/cake-details.component';
import { CartComponent } from './cart/cart.component';
import { ItemsresolverService } from './cart/itemsresolver.service';
import { CheckoutmeComponent } from './checkoutme/checkoutme.component';
import { ConfirmationGaurdService } from './confirmation-gaurd.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { GuardRouteService } from './guard-route.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrdsummaryComponent } from './ordsummary/ordsummary.component';
import { PayComponent } from './pay/pay.component';
import { SearchResultsDisComponent } from './search-results-dis/search-results-dis.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuardRouteService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [GuardRouteService],
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    canActivate: [GuardRouteService],
  },
  { path: 'search', component: SearchResultsDisComponent },
  { path: 'cakes/:cakeId', component: CakeDetailsComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [GuardRouteService],
    canDeactivate: [ConfirmationGaurdService],
    resolve: [ItemsresolverService],
  },
  {
    path: 'myorders',
    component: MyordersComponent,
    canActivate: [GuardRouteService],
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkoutme/checkoutme.module').then((m) => m.CheckoutmeModule),

    canActivate: [GuardRouteService],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [GuardRouteService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
