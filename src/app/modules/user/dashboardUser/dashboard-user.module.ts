import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { InicioUserComponent } from './pages/inicio-user/inicio-user.component';
import { DashboardUserComponent } from './dashboard-layout/dashboard-user.component';


@NgModule({
  declarations: [
    DashboardUserComponent,
    InicioUserComponent
  ],
  imports: [
    CommonModule,
    DashboardUserRoutingModule
  ]
})
export class DashboardUserModule { }
