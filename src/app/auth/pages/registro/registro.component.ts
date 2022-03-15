import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Una forma de trabajar con las validaciones que nos hemos creado es importarlas del fichero separado donde las hemos creado para usarlas
// donde las necesitemos. Otra forma es crearnos un servicio, definir ahí dichas validaciones, inyectarlo y tirar de él
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/custom-validators/validaciones';

import { CustomValidatorsService } from 'src/app/shared/custom-validators/custom-validators.service';
import { EmailValidatorService } from 'src/app/shared/custom-validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  // Además de los validadores del Validators, también podemos pasarle funciones propias que nos hayamos creado
  // IMPORTANTE: si hacemos esto último, no le ponemos los paréntesis (sólo le tenemos que dar la referencia a la función, nada más)
  // 
  // Así usaríamos las validaciones customizadas importándolas del fichero en el que hemos separado
  // public miFormulario: FormGroup = this._formBuilder.group({
  //   nombre: ['', [ Validators.required, Validators.pattern( nombreApellidoPattern )]],
  //   email: ['', [ Validators.required, Validators.pattern( emailPattern ) ]],
  //   username: ['', [ Validators.required, noPuedeSerStrider ]]
  // });

  // Pero vamos a usar mejor el servicio que nos hemos creado.
  // 
  // Además de las validaciones de cada campo, también podemos definir reglas de validación para el formulario entero. 
  // Para ello, en el this._formBuilder.group() podemos usar un segundo parámetro en el que vamos a definir un objeto validator que puede ser
  // síncrono o asíncrono.
  // Si nos fijamos, las validaciones que usamos como el Validators.required o this._customValidator.noPuedeSerStrider son funciones usadas/llamdas
  // por referencia (esto significa que no tenemos que ponerle el () al final, como cuando hemos hecho un console.log sin ponerle el ())
  // 
  // En el servicio que nos hemos creado hemos definido el validador de camposIguales(): es el que vamos a utilizar para validar las 
  // 2 passwords (ir al servicio para ver cómo está hecho).
  // 
  // Por último decir que vamos a hacer una validación asíncrona en el campo email para comprobar en el backend que no haya ningún
  // usuario con ese email ya. Las validaciones asíncronas sobre un campo se definen en el tercer parámetro del array de ese campo
  public miFormulario: FormGroup = this._formBuilder.group({
    nombre: ['', [ Validators.required, Validators.pattern( this._customValidator.nombreApellidoPattern )]],
    email: ['', [ Validators.required, Validators.pattern( this._customValidator.emailPattern ) ], [this._emailValidator.validate]],
    username: ['', [ Validators.required, this._customValidator.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.maxLength(6) ]],
    password2: ['', []]  // Esta password2 la vamos a validar en el this._customValidator.camposIguales()
  }, {
    validators: [ this._customValidator.camposIguales('password', 'password2') ]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _customValidator: CustomValidatorsService,
    private _emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {

    // Vamos a darle algunos valores por defecto a algunos campos del formulario
    this.miFormulario.reset({
      nombre: 'Victor Cilleruelo',
      email: 'test1@test.com',
      username: 'vic89',
      password: '123456',
      password2: '123456'
    });
  }

  campoEsInvalido( campo: string ): boolean | undefined
  { 
    // Esta es otra forma de hacer la validación
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  guardar(): void
  {
    this.miFormulario.markAllAsTouched();
    console.log(this.miFormulario.value);
    
  }

  // Estas funciones las usamos si elegimos la OPCIÓN 1 para mostrar los errores del campo email en el .html
  emailRequired() {
    return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  }

  emailNotPattern() {
    return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  }
  
  emailRepeated() {
    return this.miFormulario.get('email')?.errors?.emailRepetido && this.miFormulario.get('email')?.touched;
  }

  // Esta función la usamos si elegimos la OPCIÓN 2 para mostrar los errores del campo email en el .html
  get msgErrorEmail(): string {
    const errors = this.miFormulario.get('email')?.errors;

    // Acordarse de que es necesario ponerle el ? porque errors es opcional y puede no existir
    if ( errors?.required ) {
      return "El correo es obligatorio";
    } else if ( errors?.pattern ) {
      return "El valor introducido no parece un correo...";
    } else if ( errors?.emailRepetido ) {
      return "El email está repetido";
    }

    return '';
  }

}
