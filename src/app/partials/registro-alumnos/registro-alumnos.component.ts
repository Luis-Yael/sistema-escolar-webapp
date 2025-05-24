import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service'; // Importa el servicio de alumnos
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any; 



@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit {
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  // Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public alumno: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public token: string = "";
  public idUser: Number = 0;


  constructor(
    private location: Location,
    private AlumnosService: AlumnosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService

  ) {}

  ngOnInit(): void {
      //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.alumno = this.datos_user;
    }else{
      this.alumno = this.AlumnosService.esquemaAlumno();
      this.alumno.rol = this.rol;
      this.token = this.facadeService.getSessionToken();

     } // Asigna el rol si es necesario
      console.log("Datos del alumno:", this.alumno);
  }

  // Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    } else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    } else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar() {
    this.location.back();
  }

  public registrar() {
    this.errors = this.AlumnosService.validarAlumno(this.alumno, this.editar);

    // Si hay errores, detener el proceso
    if (Object.keys(this.errors).length > 0) {
      console.log("Errores de validación:", this.errors);
      return false;
    }

    // Validar la contraseña
    if (this.alumno.password == this.alumno.confirmar_password) {
      // Llamar al servicio para registrar al alumno
      this.AlumnosService.registrarAlumno(this.alumno).subscribe(
        (response) => {
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          if (this.token != "") {
            this.router.navigate(["home"]);
          } else {
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          alert("No se pudo registrar usuario");
        }
      );
    } else {
      alert("Las contraseñas no coinciden");
      this.alumno.password = "";
      this.alumno.confirmar_password = "";
    }
  }

  public actualizar() {
    //Validación
  this.errors = [];

  this.errors = this.AlumnosService.validarAlumno(this.alumno, this.editar);
  if(!$.isEmptyObject(this.errors)){
    return false;
  }
  console.log("Pasó la validación");

  this.AlumnosService.editarAlumno(this.alumno).subscribe(
    (response)=>{
      alert("Alumno editado correctamente");
      console.log("Alumno editado: ", response);
      //Si se editó, entonces mandar al home
      this.router.navigate(["home"]);
    }, (error)=>{
      alert("No se pudo editar el alumno");
    }
    );
  }

  public changeFecha(event: any) {
    const fecha = new Date(event.value);
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    
    this.alumno.fecha_nacimiento = `${year}-${month}-${day}`;
    console.log("Fecha corregida: ", this.alumno.fecha_nacimiento);
  }


  public soloLetras(event: KeyboardEvent) {
    if (!event.key) {
      return; // Si no hay evento, salimos de la función
    }
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
}