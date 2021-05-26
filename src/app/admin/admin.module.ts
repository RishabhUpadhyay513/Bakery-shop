import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { EditformComponent } from '../editform/editform.component';

import { AddproductsComponent } from '../addproducts/addproducts.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'editcake/:cakeId', component: EditformComponent },
  { path: 'addcake', component: AddproductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModule {}
