import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUserComponent } from './dashboard-layout/dashboard-user.component';
import { InicioUserComponent } from './pages/inicio-user/inicio-user.component';

const routes: Routes = [

   {
      path:'',
      component: DashboardUserComponent,
      children:[
        {path:'inicio-user',component: InicioUserComponent},
        {path:'**', redirectTo: 'inicio-user'}
      ]
  
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
