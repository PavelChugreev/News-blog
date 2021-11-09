import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminRouterModule } from './admin/admin-routing.module';
import { MainRoutengModule } from './main/main-routing.module';

@NgModule({
  imports: [
    AdminRouterModule,
    MainRoutengModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
