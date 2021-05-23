import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { CakecardComponent } from './cakecard/cakecard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { CakeDetailsComponent } from './cake-details/cake-details.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { LoginComponent } from './login/login.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { SignupComponent } from './signup/signup.component';
import { InterceptorService } from './auth/interceptor.service';
import { CanactivateService } from './guards/canactivate.service';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { ShopCakesComponent } from './shop-cakes/shop-cakes.component';
import { GtagModule } from 'angular-gtag';
import { PaginationAdminComponent } from './pagination-admin/pagination-admin.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#fff',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 4,
  fgsColor: '#f4ac32',
  pbColor: '#f4ac32',
  bgsType: SPINNER.ballSpinClockwise, // background spinner type
  fgsType: SPINNER.ballSpin, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 4, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    HomeComponent,
    CakecardComponent,
    PaginationComponent,
    CakeDetailsComponent,
    SearchresultsComponent,
    LoginComponent,
    ForgetpassComponent,
    SignupComponent,
    CartComponent,
    OrdersComponent,
    CheckoutComponent,
    AdminComponent,
    ShopCakesComponent,
    PaginationAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      enableHtml: true,
    }),
    BrowserModule,

    // Import NgxUiLoaderModule
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    CanactivateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
