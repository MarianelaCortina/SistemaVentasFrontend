import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import * as XLSX from "xlsx";

import { Reporte } from 'src/app/Interfaces/reporte';
import { VentaService } from 'src/app/Services/venta.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';


export const MY_DATA_FORMATS={
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [
    { provide:MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})
export class ReporteComponent {

  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[]=[];
  columnasTabla: string[]=['fechaRegistro', 'numeroDocumento', 'tipoPago', 'total', 'producto', 'cantidad', 'precio', 'totalProducto'];
  dataVentaReporte= new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator)paginacionTabla!: MatPaginator;

  constructor(
    private fb : FormBuilder,
    private _ventaService: VentaService,
    private _utilidadService: UtilidadService
  ) {
    this.formularioFiltro = this.fb.group({
      fechaInicio:['', Validators.required],
      fechaFin:['', Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator=this.paginacionTabla;
  }

  buscarVentas(){
  const  _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format('DD/MM/YYYY');
  const  _fechaFin = moment(this.formularioFiltro.value.fechaFin).format('DD/MM/YYYY');

    if(_fechaInicio === "Invalid date" || _fechaFin === "Invalid date"){
      this._utilidadService.mostrarAlerta("Debe ingresar ambas fechas", "Oops!")
      return;
    }
    this._ventaService.reporte(
      _fechaInicio,
      _fechaFin
    ).subscribe({
      next: (data)=>{
        if(data.status){
          this.listaVentasReporte = data.value;
          this.dataVentaReporte.data = data.value;
        }else{
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadService.mostrarAlerta("No se encontraron datos", "Oops!")
        }
      },
      error:(e)=>{}
    })
  }

exportarExcel(){
  //crear un nuevo libro
  const wb = XLSX.utils.book_new();
  //dentro del libro se publica nuestra hoja con la lista de ventas
  const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte);

//poner la hoja creada, junto con el libro
  XLSX.utils.book_append_sheet(wb,ws,"Reporte");
  //como se va a descargar el archivo excel
  XLSX.writeFile(wb, "Reporte Ventas.xlsx");
}




}
