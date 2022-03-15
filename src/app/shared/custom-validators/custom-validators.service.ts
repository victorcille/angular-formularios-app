import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  // Nos vamos a hacer una expresión regular para validar que sea 'nombre apellido'
  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  // Lo mismo para validar el email
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  // Además de expresiones regulares, también podemos crearnos funciones de validación
  // Las funciones de validación devuelven un objeto si no pasa la validación o un null si la pasan
  noPuedeSerStrider( control: FormControl ): ValidationErrors | null
  {
    const valor: string = control.value?.trim().toLowerCase();
    
    // Cuando usamos una función como validador (como es este caso), si devolvemos un objeto se considera un error 
    if (valor === 'strider') {
      return {
        noStrider: true
      }
    }

    // Si devolvemos un null, considera que ha pasado la validación
    return null;
  }

  // Esta función que usamos como validador de campos iguales, devuelve a su vez una función como la de arriba
  // La diferencia entre esta función y la de arriba es que la de arriba se usa como regla de validación de un campo del formulario
  // y esta como regla de validación de dicho formulario 
  camposIguales( campo1: string, campo2: string )
  {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      // Tomamos los valores de password y password2
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if ( !pass2 ){

        // Le asignamos el error del required a la password2 para luego poder mostrar el texto en el .html
        formGroup.get(campo2)?.setErrors({ required: true })

        return {
          required: true
        }
      }
      
      if ( pass1 !== pass2 ) {

        // Le asignamos el error de los campos iguales a la password2 para luego poder mostrar el texto en el .html
        formGroup.get(campo2)?.setErrors({ noIguales: true })

        return {
          passwordsNoIguales: true
        }
      }

      // Si pasamos las validaciones le quitamos el error de los campos iguales a la password2 si tuviese alguno
      formGroup.get(campo2)?.setErrors(null)

      return null;
    }
  }
}
