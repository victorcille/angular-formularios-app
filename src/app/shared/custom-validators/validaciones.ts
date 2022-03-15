import { FormControl } from "@angular/forms";


// Nos vamos a hacer una expresión regular para validar que sea 'nombre apellido'
export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

// Lo mismo para validar el email
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

// Además de expresiones regulares, también podemos crearnos funciones de validación
// Para poder exportar una función tenemos que hacer una serie de transformaciones
// 
// ORIGINAL
// noPuedeSerStrider( control: FormControl )
// {
//   const valor: string = control.value?.trim().toLowerCase();
  
//   // Cuando usamos una función como validador (como es este caso), si devolvemos un objeto se considera un error 
//   if (valor === 'strider') {
//     return {
//       noStrider: true
//     }
//   }

//   // Si devolvemos un null, considera que ha pasado la validación
//   return null;
// }

// ADAPTADA PARA PODER SER EXPORTADA
export const noPuedeSerStrider = ( control: FormControl ) => {
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





