import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutmeComponent } from './checkoutme.component';
import { OrdsummaryComponent } from '../ordsummary/ordsummary.component';
import { AddressComponent } from '../address/address.component';
import { ConfirmationGaurdService } from '../confirmation-gaurd.service';
import { PayComponent } from '../pay/pay.component';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: '', component: OrdsummaryComponent },
      {
        path: 'address',
        component: AddressComponent,
        canDeactivate: [ConfirmationGaurdService],
      },
      {
        path: 'payment',
        component: PayComponent,
      },
    ],
    component: CheckoutmeComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutmeModule {}
