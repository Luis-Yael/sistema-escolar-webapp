import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MatTableDataSource } from '@angular/material/table';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit, AfterViewInit {
  public name_user: string = "";
  public lista_admins: any[] = [];

  displayedColumns: string[] = ['clave_admin', 'nombre', 'email', 'rfc', 'ocupacion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    public facadeService: FacadeService,
    private administradoresService: AdministradoresService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.obtenerAdmins();
    this.configurarPaginatorEspañol();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private configurarPaginatorEspañol() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Registros por página';
    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 / ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
    paginatorIntl.firstPageLabel = 'Primera página';
    paginatorIntl.lastPageLabel = 'Última página';
    paginatorIntl.previousPageLabel = 'Página anterior';
    paginatorIntl.nextPageLabel = 'Página siguiente';
    
    if (this.paginator) {
      this.paginator._intl = paginatorIntl;
    }
  }

  public obtenerAdmins() {
  this.administradoresService.obtenerListaAdmins().subscribe(
    (response) => {
      this.lista_admins = response;
      this.dataSource.data = this.lista_admins; // Asigna los datos al dataSource
      console.log("Lista admins: ", this.lista_admins);
    }, 
    (error) => {
      alert("No se pudo obtener la lista de admins");
    }
  );
}

  public goEditar(idUser: number) {
    this.router.navigate(["registro-usuarios/administrador/"+idUser]);
  }

  public delete(idUser: number) {
    // Implementar lógica de eliminación
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser, rol: 'administrador'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
  });
  dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Admin eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Administrador no eliminado ");
        console.log("No se eliminó el admin");
      }
    });
}
}
export interface DatosUsuario {
  id: number,
  matricula: number;
  first_name: string;
  last_name: string;
  email: string;
  rfc: string;
}

