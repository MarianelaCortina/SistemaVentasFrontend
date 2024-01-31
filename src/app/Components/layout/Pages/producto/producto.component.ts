import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modeles/modal-producto/modal-producto.component'; 
import { Producto } from 'src/app/Interfaces/producto'; 
import { ProductoService } from 'src/app/Services/producto.service'; 
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
//import { filter } from 'rxjs/operators';
import { filter as rxjsFilter } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, AfterViewInit{



  columnasTabla: string[]=['nombre', 'descripcionCategoria', 'stock', 'precio', 'estado', 'acciones'];
  dataInicio: Producto[]=[];
  dataListaProductos= new MatTableDataSource(this.dataInicio); 
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _productoService:ProductoService,
    private _utilidadService: UtilidadService
  ){}

  obtenerProductos(){
    this._productoService.lista().subscribe({
      next: (data) => {
        if(data.status)
          this.dataListaProductos.data = data.value;
        else
          this._utilidadService.mostrarAlerta("No se encontraron datos", "Oops!")  
      },
      error:(e)=>{}
    })
  }

  ngOnInit(): void{
    this.obtenerProductos();
    
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator=this.paginacionTabla;
  }
  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
  }
  nuevoProducto(){
    this.dialog.open(ModalProductoComponent, {
      disableClose:true
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")
        this.obtenerProductos();
    });
  }
  editarProducto(producto: Producto){
    this.dialog.open(ModalProductoComponent, {
      disableClose:true,
      data: producto
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true")
        this.obtenerProductos();
    });
  }

  eliminarProducto(producto: Producto){
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre,
      icon:"warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) =>{
      if(resultado.isConfirmed){
        this._productoService.eliminar(producto.idProducto).subscribe({
          next:(data) =>{
            if(data.status){
              this._utilidadService.mostrarAlerta("El producto fue eliminado", "Listo!");
              this.obtenerProductos();
            }else{
              this._utilidadService.mostrarAlerta("No se pudo eliminar el producto", "Error");
            }
          },
          error:(e)=>{}
        })
      }
    })
  }
 

}


