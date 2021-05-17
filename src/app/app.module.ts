import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './card/card.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AdditemComponent } from './additem/additem.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

import { CakeSliderComponent } from './cake-slider/cake-slider.component';
import { SearchComponent } from './search/search.component';
import { SearchCakeDirective } from './search-cake.directive';
import { HomeComponent } from './home/home.component';
import { SearchResultsDisComponent } from './search-results-dis/search-results-dis.component';
import { CakeDetailsComponent } from './cake-details/cake-details.component';
import { FilterComponent } from './filter/filter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CartComponent } from './cart/cart.component';
import { MyordersComponent } from './myorders/myorders.component';
import { AuthinterceptorService } from './authinterceptor.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { EditformComponent } from './editform/editform.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { OrdsummaryComponent } from './ordsummary/ordsummary.component';
import { CheckoutmeComponent } from './checkoutme/checkoutme.component';
import { AddressComponent } from './address/address.component';
import { PayComponent } from './pay/pay.component';
import { GuardRouteService } from './guard-route.service';

@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    LoginComponent,
    SignupComponent,
    CardComponent,
    ForgetPasswordComponent,
    AdditemComponent,
    AddUserComponent,
    UserListComponent,

    CakeSliderComponent,

    SearchComponent,
    SearchCakeDirective,
    HomeComponent,
    SearchResultsDisComponent,
    CakeDetailsComponent,
    FilterComponent,
    PaginationComponent,
    CartComponent,
    MyordersComponent,
    CheckoutComponent,
    AdminComponent,
    EditformComponent,
    AddproductsComponent,
    OrdsummaryComponent,
    CheckoutmeComponent,
    AddressComponent,
    PayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      enableHtml: true,
    }), // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true,
    },GuardRouteService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
