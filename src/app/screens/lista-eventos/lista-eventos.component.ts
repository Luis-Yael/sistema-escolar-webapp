import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EditarEventoModalComponent } from 'src/app/modals/editar-evento-modal/editar-evento-component';
import { EventosAcademicosService } from 'src/app/services/eventos-academicos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { EliminarEventoModalComponent } from  'src/app/modals/eliminar-evento-modal/eliminar-evento-modal.component';

export interface Evento {
  id: number;
  nombre: string;
  tipo_evento: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  lugar: string;
  publico_objetivo: string;
  programa_educativo?: string;
  responsable: string;
  descripcion: string;
  cupo_maximo: number;
}

@Component({
  selector: 'app-lista-eventos-screen',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss']
})
export class ListaEventosComponent implements OnInit {

  public name_user: string = "";
  public lista_Eventos: Evento[] = [];
  public rol: string = "";
  dataSource = new MatTableDataSource<Evento>([]);
  displayedColumns = [
  'nombre', 'tipo_evento', 'fecha', 'hora_inicio', 'hora_fin',
  'lugar', 'es_publico', 'programa_educativo', 'responsable',
  'descripcion', 'cupo_maximo', 'editar', 'eliminar'
];



  

  constructor(
    private facadeService: FacadeService,
    private eventosAcademicosService: EventosAcademicosService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
     this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Lista de admins
    this.obtenerEventos();
  }

public obtenerEventos(){
  this.eventosAcademicosService.obtenerListaEventos().subscribe(
    (response)=>{
      this.lista_Eventos = response;
      this.dataSource.data = this.lista_Eventos; // <-- Esto es lo que faltaba
      console.log("Lista Eventos: ", this.lista_Eventos);
    }, (error)=>{
      alert("No se pudo obtener la lista de eventos");
    }
  );
}

  goEditar(idEvento: number) {
    const dialogRef = this.dialog.open(EditarEventoModalComponent, {
      data: { id: idEvento },
      height: '600px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.isEdit) {
        // Navega al formulario de edición con el id del evento
        this.router.navigate(['/registro-eventos', idEvento]);
      }
    });
  }
  
  public delete(idEvento: number): void {
  const dialogRef = this.dialog.open(EliminarEventoModalComponent, {
    data: { id: idEvento },
    height: '288px',
    width: '328px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.isDelete) {
      console.log("Evento eliminado");
      window.location.reload();
    } else {
      alert("Evento no eliminado");
    }
  });
}

  


}