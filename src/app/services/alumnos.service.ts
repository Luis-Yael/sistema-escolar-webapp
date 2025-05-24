import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  // Esquema de un alumno
  public esquemaAlumno() {
    return {
      'rol':'',
      'matricula': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'fecha_nacimiento': '',
      'curp': '',
      'rfc': '',
      'edad': '',
      'ocupación': ''
    };
  }

  public validarAlumno(data: any, editar: boolean) {
    let error: any = {};
  
    // Validar matrícula
    if (!this.validatorService.required(data["matricula"])) {
      error["matricula"] = this.errorService.required;
    }
  
    // Validar nombre
    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }
  
    // Validar apellido
    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }
  
    // Validar email
    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.email(data["email"])) {
      error["email"] = this.errorService.email;
    }
  
    // Validar contraseña (solo si no está en modo edición)
    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }
  
      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }
  
    // Validar CURP
    if (!this.validatorService.required(data["curp"])) {
      error["curp"] = this.errorService.required;
    } else if (!this.validatorService.min(data["curp"], 18)) {
      error["curp"] = this.errorService.min(18);
    } else if (!this.validatorService.max(data["curp"], 18)) {
      error["curp"] = this.errorService.max(18);
    }
  
    // Validar RFC
    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorService.required;
    } else if (!this.validatorService.min(data["rfc"], 12)) {
      error["rfc"] = this.errorService.min(12);
    } else if (!this.validatorService.max(data["rfc"], 13)) {
      error["rfc"] = this.errorService.max(13);
    }
  
    // Validar edad
    if (!this.validatorService.required(data["edad"])) {
      error["edad"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["edad"])) {
      error["edad"] = "El formato es solo números";
    } else if (data["edad"] < 18) {
      error["edad"] = "La edad debe ser mayor o igual a 18";
    }
  
    // Validar teléfono
    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    }
  
    // Validar ocupación
    if (!this.validatorService.required(data["ocupacion"])) {
      error["ocupacion"] = this.errorService.required;
    }
    
    if(!this.validatorService.required(data["fecha_nacimiento"])){
      error["fecha_nacimiento"] = this.errorService.required;
    }
    //Return arreglo
    return error;
  }

  // Registrar un alumno
  public registrarAlumno(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/alumnos/`, data, httpOptions);
  }

  // Actualizar un alumno
  public actualizarAlumno(data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/alumnos/${data.matricula}`, data, httpOptions);
  }

  public obtenerListaAlumnos (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-alumnos/`, {headers:headers});
  }

  
  public getAlumnoByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/alumnos/?id=${idUser}`,httpOptions);
  }
  
  public editarAlumno(data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders ({'Content-Type': 'application/json', 'Authorization': 'Bearer'+token});
    return this.http.put<any>(`${environment.url_api}/alumnos-edit/`, data, {headers:headers});
  }

  public eliminarAlumno(idUser: number): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.delete<any>(`${environment.url_api}/alumnos-edit/?id=${idUser}`,{headers:headers});
  }
}