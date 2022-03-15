import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  // Para validar booleanos es mejor usar el requiredTrue porque si usamos el required me marca como válido aunque el campo sea false
  public miFormulario: FormGroup = this._fb.group({
    genero        : [ 'M', Validators.required ],
    notificaciones: [ false, Validators.requiredTrue ],
    condiciones: [ false, Validators.requiredTrue ]
  });

  public persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    // Vamos a asignarle los valores de la persona al formulario cuando carguemos el componente
    // 
    // Como el objeto persona tiene las mismas propiedades que el formulario, con el .setValue() podemos pasarle el objeto entero que él ya 
    // se encarga sólo de hacer todo y no hace falta que le indiquemos campo por campo
    // 
    // OJO: esto sólo vale si el objeto y el formulario tienen los mismos campos y se llaman igual. En el momento en que alguno tenga algún
    // campo más esto revienta y devuelve un error, por lo que es mejor utilizar el .reset() que es más flexible
    // 
    // En cualquier caso, si necesitamos añadir algún valor al formulario que no cubra el objeto persona podemos hacerlo así:
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });

    // Así sería si sólo queremos usar el objeto persona
    // this.miFormulario.reset( this.persona );


    // Otra cosa buena que tienen los formularios reactivos es que existe la función .valueChanges() que es un observable al que podemos
    // subscribirnos para controlar si hay algún cambio en algún campo del formulario
    // this.miFormulario.valueChanges.subscribe( form => {
    //   console.log(form);
    // });

    // Vamos a ver una variante de la forma de arriba muy interesante para desestructurar un campo del formulario sin perder la
    // información del resto
    this.miFormulario.valueChanges.subscribe( ({ condiciones, ...resto}) => {
      // Si no estuviésemos extrayendo las condiciones del formulario tendríamos que hacer un delete como el de la línea 75
      this.persona = resto;

      console.log(this.persona);
    });

    // Incluso si en vez de controlar todo el formulario lo que queremos es controlar los cambios de un campo en concreto, podemos hacerlo
    // así:
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
    //   console.log(newValue);
    // });
  }

  guardar(): void
  {
    if ( this.miFormulario.invalid ) { return; }
    
    const formValue = { ...this.miFormulario.value };

    // Si por ejemplo queremos asignar a la persona los valores que se hayan enviado en el formulario, como dicho formulario tiene el
    // campo 'condiciones' y la persona no, deberíamos quitar ese campo que me sobra. Para hecer esto podemos borrar el campo así:
    // delete formValue.condiciones;
    // 
    // this.persona = formValue;

    console.log(this.persona);
  }

}
