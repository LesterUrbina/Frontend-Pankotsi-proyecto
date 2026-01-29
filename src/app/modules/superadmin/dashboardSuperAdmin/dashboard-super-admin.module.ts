import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSuperAdminRoutingModule } from './dashboard-super-admin-routing.module';
import { DashboardSuperadminComponent } from './dashboard-layout/dashboard-superadmin.component';
import { InicioSuperAdminComponent } from './pages/inicio-super-admin/inicio-super-admin.component';


@NgModule({
  declarations: [
    DashboardSuperadminComponent,
    InicioSuperAdminComponent

  ],
  imports: [
    CommonModule,
    DashboardSuperAdminRoutingModule
  ]
})
export class DashboardSuperAdminModule { }
