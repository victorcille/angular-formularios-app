import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

// Las directivas, para poder ser usadas han de ser incluidas en el fichero module.ts del correspondiente módulo donde van a ser usadas
// (en el apartado declarations)

@Directive({
    // Con esto le estamos diciendo a la directiva que para poder usarla, es necesario que el elemento que utilice la directiva lo llame
    // por su nombre (customMin) y además tenga un ngModel (esto se cumple porque estamos llamando a esta directiva desde el input de 
    // existencias del basicos.component.html (ver el fichero para verlo))
    selector: '[customMin][ngModel]',

    // Como esta directiva la vamos a usar para validar un input de un formulario, la clase ha de implementar el Validator y definir todo
    // el apartado de providers del decorador tal y como está
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator {

    @Input() minimo!: number;   // Recogemos el valor que le estamos pasando en el padre (el input de existencias del basicos.component.html)

    constructor() {}

    // Esta función ha de llamarse así y recibir el argumento 'control' de tipo FormControl obligatoriamente al estar esta clase implementando
    // el Validator. Si pasa la validación debe devolver un null, si no, debemos devolver un objeto especificando qué validación está fallando
    // (si es la de requerido sería "required", si es esta de >=0 pues "customMin", etc.) con el valor true
    validate( control: FormControl ): { customMin: boolean } | null
    {
        const inputValue = control.value;

        return ( inputValue < this.minimo) ? { 'customMin': true } : null;
    }
}