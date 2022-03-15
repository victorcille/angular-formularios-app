import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  // El campo favoritos va a ser un array de elementos, por eso usamos el .array()
  // Dentro del array definimos primero el array de valores si queremos definir algunos ya por defecto, y su correspondiente validación
  // Los elementos que comforman el array van a ser del tipo control, por eso vamos a usar la función .control()
  // Este control sigue la misma estructura que el group: primero el valor del campo, luego las validaciones síncronas y luego las asíncronas
  // 
  // Esta sería una forma:
  // 
  // public miFormulario: FormGroup = this._fb.group({
  //   nombre: [ '' , [ Validators.required, Validators.minLength(3) ] ],
  //   favoritos: this._fb.array( [
  //     this._fb.control('Metal Gear', Validators.required),
  //     this._fb.control('Death Stranding', Validators.required)
  //   ], Validators.required )
  // });

  // Aunque se puede simplificar así:
  public miFormulario: FormGroup = this._fb.group({
    nombre: [ '' , [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this._fb.array( [
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding', Validators.required ]
    ], Validators.required )
  });

  // Nos vamos a crear un formControl independiente para cuando vayamos a agregar un nuevo favorito. 2 formas de hacerlo y ambas son válidas:
  // OPCIÓN 1: usando el new FormControl():
  // public nuevoFavorito: FormControl = new FormControl('', Validators.required);

  // OPCIÓN 2: usando el formBuilder.control()
  public nuevoFavorito: FormControl = this._fb.control('', Validators.required);


  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  campoEsInvalido( campo: string ): boolean | null
  { 
    return this.miFormulario.controls[ campo ].errors && this.miFormulario.controls[ campo ].touched;
  }

  // Nos creamos este getter para ayudar al template a la hora de hacer el *ngFor que me saque los distintos elementos del array de favoritos
  get favoritosArray()
  {
    return this.miFormulario.get('favoritos') as FormArray;
  }


  agregarFavorito(){
    // Si no escribimos nada en el input y le damos al enter o al botón de agregar no hacemos nada
    if ( this.nuevoFavorito.invalid ) { return; }
    
    // Agregamos un nuevo elemento al array de favoritos:
    // Recordar que cada elemento del array es de tipo control por lo que o bien usamos el formBuilder.control() (como vamos a hacer),
    // o bien hacemos un new FormConrol(). Lo que queramos, ambas formas son válidas
    // 
    // OPCIÓN 1: usando el new FormControl():
    // this.favoritosArray.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );

    // OPCIÓN 2: usando el formBuilder.control()
    this.favoritosArray.push( this._fb.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();
  }

  borrarFavorito( index: number ){
    this.favoritosArray.removeAt(index);
  }

  guardar(){
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched(); 
      return;
    }

    console.log('Formulario enviado!!');

    // this.miFormulario.reset({
    //   producto: 'RTX 4080ti',
    //   precio: 1500
    // });
  }

}
