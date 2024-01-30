import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modeles/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service'; 
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
//import { filter } from 'rxjs/operators';
import { filter as rxjsFilter } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit{

  columnasTabla: string[]=['nombreCompleto', 'correo', 'rolDescripcion', 'estado', 'acciones'];
  dataInicio: Usuario[]=[];
  dataListaUsuarios= new MatTableDataSource(this.dataInicio); //fuente de datos de la página
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _usuarioService:UsuarioService,
    private _utilidadService: UtilidadService
  ){}

  obtenerUsuario(){
    this._usuarioService.lista().subscribe({
      next: (data) => {
        if(data.status)
          this.dataListaUsuarios.data = data.value;
        else
          this._utilidadService.mostrarAlerta("No se encontraron datos", "Oops!")  
      },
      error:(e)=>{}
    })
  }

  ngOnInit(): void{
    this.obtenerUsuario();
    
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator=this.paginacionTabla;
  }
  aplicarFiltroTabla(event: Event){
    console.log('Método aplicarFiltroTabla llamado');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }
  nuevoUsuario(){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")
        this.obtenerUsuario();
    });
  }
  editarUsuario(usuario: Usuario){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose:true,
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")
        this.obtenerUsuario();
    });
  }

  eliminarUsuario(usuario: Usuario){
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: usuario.nombreCompleto,
      icon:"warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) =>{
      if(resultado.isConfirmed){
        this._usuarioService.eliminar(usuario.idUsuario).subscribe({
          next:(data) =>{
            if(data.status){
              this._utilidadService.mostrarAlerta("El usuario fue eliminado", "Listo!");
              this.obtenerUsuario();
            }else{
              this._utilidadService.mostrarAlerta("No se pudo eliminar el usuario", "Error");
            }
          },
          error:(e)=>{}
        })
      }
    })
  }
 




}
