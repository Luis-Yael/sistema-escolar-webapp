import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit{

  public username:string = "";
  public password:string = "";
  public type: string = "password";
  public errors:any = {};
  public load:boolean = false;

  constructor(
    private router: Router,
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {

  }

  public login(){
     //Validar
   this.facadeService.login(this.username, this.password).subscribe(
  (response) => {
    this.facadeService.saveUserData(response);

    // Guarda el rol del usuario logueado
    localStorage.setItem('rol', response.rol);

    this.router.navigate(["home"]);
  },
  (error) => {
    alert("No se pudo iniciar sesión");
  }
);
  }

  public showPassword(){
    if(this.type == "password"){
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }
  }

  public registrar(){
    this.router.navigate(["registro-usuarios"]);
  }
}