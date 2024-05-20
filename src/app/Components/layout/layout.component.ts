import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu'; 
import { MenuService } from 'src/app/Services/menu.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  listaMenu: Menu[] = [];
  correoUsuario: string = '';
  rolUsuario: string = '';
  

  constructor(
    private router: Router,
    private _menuService: MenuService,
    private _utilidadesService: UtilidadService
  ){

  }

  ngOnInit(): void{

    const usuario = this._utilidadesService.obtenerSesionUsuario();
    console.log(usuario);

    if(usuario != null){
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;

      this._menuService.lista(usuario.idUsuario).subscribe({
        next:(data)=> {
          if(data.status)this.listaMenu = data.value;
        },
        error:(e)=> {}
      })

    }
  }


  cerrarSesion(){
    this._utilidadesService.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }



}
