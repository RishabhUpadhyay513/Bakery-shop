import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditformComponent } from './editform/editform.component';
import { AddcakeComponent } from './addcake/addcake.component';
import { GtagModule } from 'angular-gtag';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'editcake/:cakeId', component: EditformComponent },
  { path: 'addcake', component: AddcakeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    GtagModule,
  ],
  exports: [RouterModule],
  declarations: [EditformComponent, AddcakeComponent],
})
export class AdminModule {}
