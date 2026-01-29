import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //   registroForm!: FormGroup;
  //   isLoading: boolean = false;
  //   successMessage: string = '';
  //   errorMessage: string = '';

  //    constructor(
  //     private fb: FormBuilder,
  //     private router: Router
  //   ) { }


  //  ngOnInit(): void {
  //     this.registroForm = this.fb.group({
  //       nombres: ['', [Validators.required, Validators.minLength(3)]],
  //       correo: ['', [Validators.required, Validators.email]],
  //       nroCelular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
  //       clave: ['', [Validators.required, Validators.minLength(6)]],
  //       confirmarClave: ['', [Validators.required]]
  //     }, {
  //       validators: this.passwordsMatch
  //     });


  //   }



  //    passwordsMatch(form: FormGroup) {
  //     const clave = form.get('clave')?.value;
  //     const confirmarClave = form.get('confirmarClave')?.value;

  //     if (clave !== confirmarClave) {
  //       form.get('confirmarClave')?.setErrors({ passwordMismatch: true });
  //       return { passwordMismatch: true };
  //     }
  //     return null;
  //   }

  //   get nombresInvalido(): boolean {
  //     return this.registroForm.get('nombres')!.invalid && 
  //            this.registroForm.get('nombres')!.touched;
  //   }

  //   get correoInvalido(): boolean {
  //     return this.registroForm.get('correo')!.invalid && 
  //            this.registroForm.get('correo')!.touched;
  //   }

  //   get nroCelularInvalido(): boolean {
  //     return this.registroForm.get('nroCelular')!.invalid && 
  //            this.registroForm.get('nroCelular')!.touched;
  //   }

  //   get claveInvalida(): boolean {
  //     return this.registroForm.get('clave')!.invalid && 
  //            this.registroForm.get('clave')!.touched;
  //   }

  //   get confirmarClaveInvalida(): boolean {
  //     return this.registroForm.get('confirmarClave')!.invalid && 
  //            this.registroForm.get('confirmarClave')!.touched;
  //   }

  //   registro(): void {
  //     if (this.registroForm.invalid) {
  //       this.registroForm.markAllAsTouched();
  //       return;
  //     }

  //     this.isLoading = true;
  //     this.errorMessage = '';
  //     this.successMessage = '';


  //     console.log('Datos de registro:', this.registroForm.value);


  //     setTimeout(() => {
  //       this.isLoading = false;
  //       this.successMessage = 'Registro exitoso. Redirigiendo al login...';
  //       setTimeout(() => {
  //         this.router.navigate(['/auth/login']);
  //       }, 2000);
  //     }, 1500);
  //   }

  //   volverLogin(): void {
  //     this.router.navigate(['/auth/login']);
  //   }


volverLogin(): void {
      this.router.navigate(['/auth/login']);
    }






    


  registroForm!: FormGroup;
  step: number = 1;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      nroCelular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      confirmarClave: ['', Validators.required]
    }, {
      validators: this.passwordsMatch
    });

  }


  passwordsMatch(form: FormGroup) {
    const clave = form.get('clave')?.value;
    const confirmar = form.get('confirmarClave')?.value;
    return clave === confirmar ? null : { passwordMismatch: true };
  }

  nextStep(): void {
    if (this.isStepInvalid()) {
       this.markStepAsTouched();
      return;
    } 
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  isStepInvalid(): boolean {
    if (this.step === 1) {
      return this.registroForm.get('nombres')?.invalid ||
             this.registroForm.get('apellidos')?.invalid || false;
    }

    if (this.step === 2) {
      return this.registroForm.get('correo')?.invalid ||
             this.registroForm.get('nroCelular')?.invalid || false;
    }

    return false;
  }

  registrar(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    console.log(this.registroForm.value);

    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/auth/login']);
    }, 1500);
  }



  get titulo(): string {
  if (this.step === 1) return 'Crear una cuenta';
  if (this.step === 2) return 'Datos de contacto';
  return 'Protege tu cuenta';
}

get subtitulo(): string {
  if (this.step === 1) return 'Introduce tu nombre';
  if (this.step === 2) return 'Introduce tu correo y número';
  return 'Crea una contraseña segura';
}

markStepAsTouched(): void {
  if (this.step === 1) {
    this.registroForm.get('nombres')?.markAsTouched();
    this.registroForm.get('apellidos')?.markAsTouched();
  }

  if (this.step === 2) {
    this.registroForm.get('correo')?.markAsTouched();
    this.registroForm.get('nroCelular')?.markAsTouched();
  }

  if (this.step === 3) {
    this.registroForm.get('clave')?.markAsTouched();
    this.registroForm.get('confirmarClave')?.markAsTouched();
  }
}


}
