import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


// Los formularios que vamos a ver en este módulo 'template' son formularios donde toda la lógica, la definición de dicho formulario,
// las reglas de validación, etc. se hace en el template (.html)
// 
// La otra opción que existe a la hora de trabajar con formularios es la de desarrollar todo en el lado del componente (.ts). 
// Eso lo veremos en el módulo 'reactive' 

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // Para recoger en el componente referencias locales de la plantilla (variables con el '#' delante como es el caso de #miFormulario)
  // utilizamos el ViewChild. 
  @ViewChild('miFormulario') miFormulario!: NgForm;

  // Si quisiéramos darle unos valores por defecto a los campos de nuestro formulario podríamos matchear el ngModel de cada campo del
  // formulario con las propiedades de un objeto como el siguiente:
  public initForm = {
    producto: 'RTX 4080ti',
    precio: 10,
    existencias: 100
  }

  constructor() { }

  ngOnInit(): void {
  }

  // Como ya estamos recogiendo el formulario de la plantilla con el ViewChild, no necesitamos pasárselo como argumento al guardar()
  // guardar( miFormulario: NgForm ): void
  guardar(): void
  {
    // Para que el formulario recoja los valores de los campos es necesario que a cada uno de ellos le pongamos el atributo ngModel y name
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.controls);

    // Podemos resetear los valores del formulario y dejar los campos vacíos
    // this.miFormulario.resetForm();

    // O, podemos reseta¡earlos y darles un valor por defecto
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });
      
  }

  validarProducto(): boolean 
  { 
    // Nótese que esta validación difiere un poquito a la que hacíamos en la plantilla porque aquí también hay que preguntar si
    // el formulario existe con el '?' además de preguntar por el campo en cuestión (producto?)
    return this.miFormulario?.controls.producto?.invalid && this.miFormulario?.controls.producto?.touched;
  }

  validarPrecio(): boolean
  {
    // Como el input del precio ya lleva el min="0" ya estamos controlando que el valor sea >=0.
    // Otra opción que podemos utilizar para controlar estas cosas son las directivas customizadas (así vemos cómo se hacen y cómo se usan).
    // Ambas formas son sustitutivas. 
    // En este caso, para validar el precio usaremos el min.
    return this.miFormulario?.controls.precio?.invalid && this.miFormulario?.controls.precio?.touched;
  }

  validarExistencias(): boolean
  {
    // Para validar que las existencias sean >=0 vamos a usar una directiva personalizada (custom-min.directive.ts)
    return this.miFormulario?.controls.existencias?.invalid && this.miFormulario?.controls.existencias?.touched;
  }

}
