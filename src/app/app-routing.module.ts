import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ROLES } from './core/models/roles';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },


  //modulo superAdmin

   {
    path: 'dashboard-superAdmin',
    canActivate: [AuthGuard],
    data: {roles: [ROLES.SUPER_ADMIN]},
    loadChildren:() => import('./modules/superadmin/dashboardSuperAdmin/dashboard-super-admin.module').then(m => m.DashboardSuperAdminModule )
  },

 

  // module admin

   {
    path: 'dashboard-admin',
   
    canActivate: [AuthGuard],
    data: {roles: [ROLES.ADMIN]},
    loadChildren:() => import('./modules/admin/dashboardAdmin/dashboard-admin.module').then(m => m.DashboardAdminModule )
  },


  // module user

  {
    path: 'dashboard-user',
    canActivate: [AuthGuard],
    data: {roles: [ROLES.USER]},
    loadChildren:() => import('./modules/user/dashboardUser/dashboard-user.module').then(m => m.DashboardUserModule )
  },

  
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
