import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  public persona: Persona = {
    nombre: 'Víctor',
    favoritos: [
      {
        id: 1,
        nombre: 'Metal Gear'
      },
      {
        id: 2,
        nombre: 'Death Stranding'
      }
    ]
  };

  public nuevoFavorito: string = '';

  agregarFavorito(): void
  {
    const favorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoFavorito
    };

    this.persona.favoritos.push({ ...favorito });
    this.nuevoFavorito = '';
  }

  borrarFavorito( index: number ): void
  {
    this.persona.favoritos.splice( index, 1 );
  }

  guardar()
  {
    console.log('Formulario enviado!!');
  }
}
