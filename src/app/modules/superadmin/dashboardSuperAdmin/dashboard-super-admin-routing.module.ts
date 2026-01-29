import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSuperadminComponent } from './dashboard-layout/dashboard-superadmin.component';
import { InicioSuperAdminComponent } from './pages/inicio-super-admin/inicio-super-admin.component';

const routes: Routes = [

  {
      path:'',
      component: DashboardSuperadminComponent,
      children:[
        {path:'inicio-superAdmin',component: InicioSuperAdminComponent},
        {path:'**', redirectTo: 'inicio-superAdmin'}
      ]
  
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSuperAdminRoutingModule { }
