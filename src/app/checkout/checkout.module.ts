import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DeactivateService } from './form/deactivate.service';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: '', component: OrdersummaryComponent },
      {
        path: 'details',
        component: FormComponent,
        canDeactivate: [DeactivateService],
      },
      {
        path: 'confirm',
        component: ConfirmComponent,
      },
    ],
    component: CheckoutComponent,
  },
];
@NgModule({
  declarations: [OrdersummaryComponent, FormComponent, ConfirmComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class CheckoutModule {}
