import { Component } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent {

  // Con el ngModel enlazamos los radioButtons con la propiedad genero. Como género es un string vacío, no aparece marcado por defecto ninguno 
  // de los radioButtons. Si quisiéramos marcar alguno por defecto, tendríamos que darle alguno de los 2 valores que pueden tener (M o F)

  // Con el ngModel enlazamos el switch con la propiedad notificaciones. Como el switch no deja de ser un checkbox y sus values sólo pueden ser 
  // booleanos, ahora mismo como le estamos dando el valor true aparecerá marcado por defecto
  public persona = {
    genero: '',
    notificaciones: true
  }

  public terminosYCondiciones: boolean = false;

  guardar()
  {
    console.log('Formulario enviado!!');
  }

}
