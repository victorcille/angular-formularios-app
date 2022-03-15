import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // Esta es una forma de crear formulario reactivos
  // 
  // public miFormulario: FormGroup = new FormGroup({
  //   producto   : new FormControl('RTX 4080ti'),
  //   precio     : new FormControl(1500),
  //   existencias: new FormControl(5)
  // });


  // Otra forma es usando el formBuilder:
  // El primer elemento del array sería el valor que le vamos a dar por defecto al campo. Podemos dejarlo vacío si no queremos darle ninguno.
  // El segundo elemento son las validaciones SÍNCRONAS que queremos aplicarle al campo, que si es sólo una no hace falta ponerlo entre corchetes
  // El tercer elemento son las validaciones ASÍNCRONAS 
  public miFormulario: FormGroup = this._fb.group({
    producto   : [ , [ Validators.required, Validators.minLength(3) ] ],
    precio     : [ , [ Validators.required, Validators.min(0) ] ],
    existencias: [ , [ Validators.required, Validators.min(0) ] ]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  campoEsInvalido( campo: string ): boolean | null
  { 
    return this.miFormulario.controls[ campo ].errors && this.miFormulario.controls[ campo ].touched;
  }

  guardar(): void
  {
    if ( this.miFormulario.invalid ) {
      // Activamos este método para que todos los campos se marquen como tocados y así se muestren todos los errores (si nos fijamos en 
      // la condición que valida si un campo tiene errores, hay una primera parte que comprueba si el campo tiene error y una segunda
      // parte que comprueba si el campo ha sido tocado).
      this.miFormulario.markAllAsTouched(); 
      return;
    }

    console.log('Formulario enviado!!');

    // Con esto podemos definirle a los campos del formulario los valores que queramos. Lo malo que tiene el setValue() es que
    // debo definidos los valores de TODOS los campos que tenga el formulario. Si falta alguno salta un error.
    // 
    // this.miFormulario.setValue({
    //   producto: 'RTX 4080ti',
    //   precio: 1500,
    //   existencias: 5
    // });

    // Esto, aparte de resetear los valores del formulario, me permite asignarle nuevos igual que el setValue() pero nos da más flexibilidad 
    // ya que no es obligatorio pasarle todos los campos del formulario
    this.miFormulario.reset({
      producto: 'RTX 4080ti',
      precio: 1500
    });

  }

}
