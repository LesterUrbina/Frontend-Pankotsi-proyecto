import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';
import { DashboardAdminComponent } from './dashboard-layout/dashboard-admin.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    InicioAdminComponent
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule
  ]
})
export class DashboardAdminModule { }
