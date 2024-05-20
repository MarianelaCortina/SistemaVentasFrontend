import { Component } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { DashBoardService } from 'src/app/Services/dash-board.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {

  totalIngresos: string = "0";
  totalVentas: string = "0";
  totalProductos: string = "0";

  constructor(
    private _dashboardService: DashBoardService
  ){}

  mostrarGrafico(labelGrafico: any[], dataGrafico:any[]){
    const chartBarras = new Chart('chartBarras', {
      type:'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: "# de Ventas",
          data: dataGrafico,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false, 
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ngOnInit():void {
    this._dashboardService.resumen().subscribe({
      next:(data) => {
        if(data.status){
          this.totalIngresos = data.value.totalIngresos;
          this.totalVentas = data.value.totalVentas;
          console.log(this.totalVentas)
          this.totalProductos = data.value.totalProductos;

          const arrayData: any[] = data.value.ventasUltimaSemana; 
          console.log(arrayData);

          const labelTemporal = arrayData.map((value) => value.fecha);
          const dataTemporal = arrayData.map((value) => value.total);
          console.log(labelTemporal, dataTemporal)

          this.mostrarGrafico(labelTemporal, dataTemporal);
        }
      },
      error:(e)=>{}
    })
  }






}
