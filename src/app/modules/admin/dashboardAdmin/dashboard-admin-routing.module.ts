import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-layout/dashboard-admin.component';
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';

const routes: Routes = [

  {
    path:'',
    component: DashboardAdminComponent,
    children:[
      {path:'inicio-admin',component: InicioAdminComponent},
      {path:'**', redirectTo: 'inicio-admin'}
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
