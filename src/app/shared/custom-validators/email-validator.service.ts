import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

// Este es un servicio que vamos a usar para validar de manera asíncrona el campo email de un formulario reactivo.
// Para ello, debemos implementar la interfaz AsyncValidator y esto me obliga a definir una función validate() como la de abajo

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor( private _http: HttpClient ) {
    this.validate = this.validate.bind(this);   // Es necesario poner esto para que no de un error en la consola del navegador
   }

  // Esta función devolverá un Observable o una promesa con un objeto si no pasa la validación o con un null si la pasa
  // 
  // Esto de devolver un objeto si hay un error o un null si no lo hay es igual a lo que hemos hecho en el CustomValidatorsService
  // con las funciones noPuedeSerStrider() y camposIguales() solo que ahora irá dentro de un Observable/Promesa.
  // 
  // Nosotros trabajaremos con el Observable por lo que podríamos borrar el tipado de retorno de Promise<ValidationErrors | null>.
  // Lo dejaré sólo a modo ilustrativo...
  // 
  // Los métodos .get(), .post(), .put(), .delete(), etc... del http client devuelven Observables por lo que me vale como respuesta
  // para devolver en el return
  validate( control: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email: string = control.value?.trim().toLowerCase();
    
    // La api me devuelve un array vacío si no hay ninguna coincidencia o un array con un objeto si el email ya está siendo usado por alguien
    // 
    // Vamos a pasarle el filtro map() para en vez de devolver directamente la respuesta que me devuelve la api en caso de que haya alguien
    // con ese email, simplemente devolvamos un objeto con la respuesta emailRepetido: true
    // Si no hay nadie que tenga ese email devolveremos null
    // 
    // Vamos a simular también un delay a propósito para simular los casos en que la conexión no es muy buena y las peticones asíncronas
    // tardan en responder. Esto lo vamos a hacer para asegurarnos de que la validación del email se hace correctamente y que el formulario
    // no es válido hasta que dicha validación se pase 
    return this._http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
                     .pipe(
                        map( response => {
                          return ( response.length === 0 ) ? null : { emailRepetido: true }
                        }),
                        // delay(3000)  // En milisegundos
                     );
  }
}
