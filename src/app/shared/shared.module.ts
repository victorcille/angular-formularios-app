import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidemenuComponent } from './sidemenu/sidemenu.component';



@NgModule({
  declarations: [
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule  // Necesario importarlo para poder utilizar el routerLink en el sidemenu.component.html
  ],
  exports: [
    SidemenuComponent
  ]
})
export class SharedModule { }
