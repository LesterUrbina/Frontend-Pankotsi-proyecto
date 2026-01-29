import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {


    constructor(private authService: AuthService,
              private themeservice: ThemeService,
              )
   { }


  ngOnInit(): void {


  }

  // userName: string = '';
  // userRole: string = '';
  // isModeDark: boolean= false;

  // constructor(private authService: AuthService,
  //             private themeservice: ThemeService,
  //             )
  //  { }
 

  // ngOnInit(): void {
    
  //   const userData = this.authService.userData;
  //   if (userData) {
  //     this.userName = userData.nombres;
  //     this.userRole = userData.roles[0];
  //   }

  //   this.themeservice.darkMode$.subscribe( (isDarck) =>{
  //     this.isModeDark = isDarck;
  //   })

  //   this.asignarModeDark();
        

  //  }


  // asignarModeDark():void{
  //   this.themeservice.darkMode$.subscribe( (isDarck) =>{
  //     this.isModeDark = isDarck;
  //   })
  // }

  // toogleLightDark():void{
  //   this.themeservice.toggleDarkMode();
  // }

  // logout(): void {
  //   this.authService.logout();
  // }




}
