import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  isLoading: boolean = false;
  hidePassword: boolean = true;
  errorMessage: string = '';

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  public myForm: FormGroup = this.fb.group({

    //user
    // nroCelular: ['998956587', [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ] ],
    // clave     : ['100solesperu', [ Validators.required, Validators.minLength(3), Validators.maxLength(50)]],


    // nroCelular: ['997214736', [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ] ],
    // clave     : ['NetJessi25', [ Validators.required, Validators.minLength(3), Validators.maxLength(50)]],


    //admin
    nroCelular: ['995252538', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    clave: ['Gucci2023', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

    // nroCelular: ['999555222', [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ] ],
    // clave     : ['12345', [ Validators.required, Validators.minLength(3), Validators.maxLength(50)]],



    //superAdmin
    //  nroCelular: ['995254769', [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ] ],
    //  clave     : ['123456', [ Validators.required, Validators.minLength(3), Validators.maxLength(50)]],


  });


  login() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { nroCelular, clave } = this.myForm.value;

    const loginSubs = this.authService
      .signin({ nroCelular, clave })
      .subscribe({
        next: () => {

          const url = this.authService.getDefaultRouteByRole();
          this.router.navigateByUrl(url);
        
        },
        error: (messageERROR) => {
          console.log("QUE PASO :", messageERROR);
        }      
      });
  }



  navegarRegistro(): void {
    this.router.navigate(['/auth/registro']);
  }


  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }



}