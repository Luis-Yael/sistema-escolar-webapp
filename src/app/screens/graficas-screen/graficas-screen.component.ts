import { Component, OnInit } from '@angular/core';
import { AdministradoresService } from 'src/app/services/administradores.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit{

  public total_user: any={};

  lineChartData=
  {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89,34,43,54,28,74,93],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption={
    responsive: false
  }
  lineChartPlugins=[DatalabelsPlugin ];

  barChartData={
    labels: ["Congreso", "FePro", "Presentación Doctoral", "Feria Matemáticas", "T-System"],
    datasets: [
      {
        data: [34,43,54,28,24],
        label: 'Registro de materias',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5', 
          '#2AD84A'
        ]
      }
    ]
  }
  barChartOption={
    responsive: false
  }
  barChartPlugins=[DatalabelsPlugin ];
  //circular
  pieChartData={
    labels:["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [89,34,43],
        label:'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }
  pieChartOption=
  {
    responsive: false
  }
  pieChartPlugins=[DatalabelsPlugin];
  //doughnut
  doughnutChartData={
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets:  [
    {
    data:[89,34,43],
    labels: 'Registro de Usuarios',
    backgroundColor:[
      '#F88406',
      '#FCFF44',
      '#31E7E7'
    ]
    }
    ]
  }
  doughnutChartOption={
    responsive:false
  }
  doughnutChartPlugins=[DatalabelsPlugin]


  constructor(
    private administadoresService: AdministradoresService
  ){
    
}
  ngOnInit(): void {
    this.obtenerTotalUsers();
    console.log("Data: ", this.doughnutChartData);
    
  }

  public obtenerTotalUsers(){
    this.administadoresService.getTotalUsuarios().subscribe(
      (response) => {
        this.total_user = response;
  
        const dataArray = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos
        ];
  
        // Reasignar para refrescar gráficos
        this.pieChartData = {
          ...this.pieChartData,
          datasets: [{
            ...this.pieChartData.datasets[0],
            data: dataArray
          }]
        };
  
        this.doughnutChartData = {
          ...this.doughnutChartData,
          datasets: [{
            ...this.doughnutChartData.datasets[0],
            data: dataArray
          }]
        };
  
      },
      (error) => {
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }
}
