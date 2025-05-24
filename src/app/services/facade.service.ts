import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//Estas son variables para las cookies
const session_cookie_name = 'sistema-escolar-token';
const user_email_cookie_name = 'sistema-escolar-email';
const user_id_cookie_name = 'sistema-escolar-user_id';
const user_complete_name_cookie_name = 'sistema-escolar-user_complete_name';
const group_name_cookie_name = 'sistema-escolar-group_name';
const codigo_cookie_name = 'sistema-escolar-codigo';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService, 
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  //Funcion para validar login
  public validarLogin(username: String, password: String){
    var data = {
      "username": username,
      "password": password
    }
    console.log("Validando login... ", data);

    let error: any = [];//arreglo de erorres

    if(!this.validatorService.required(data["username"])){
      error["username"] = this.errorService.required;
    }else if(!this.validatorService.max(data["username"], 40)){
      error["username"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['username'])) {
      error['username'] = this.errorService.email;
    }
 
    if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorService.required;
    }

    return error;
  }

  // Funciones básicas, petición http 
  //Iniciar sesión
  login(username:String, password:String): Observable<any> {
    var data={
      username: username,
      password: password
    }
    return this.http.post<any>(`${environment.url_api}/token/`,data);
  }

  //Cerrar sesión
  logout(): Observable<any> {
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/logout/`, {headers: headers});
  }

  //Funciones para utilizar las cookies en web
  retrieveSignedUser(){//recuperar
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/me/`,{headers:headers});
  }

  getCookieValue(key:string){//obtener el valor 
    return this.cookieService.get(key);
  }

  saveCookieValue(key:string, value:string){ //guardar los datos
    var secure = environment.url_api.indexOf("https")!=-1;
    this.cookieService.set(key, value, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }

  getSessionToken(){ //obtener el token de inicio de sesioón 
    return this.cookieService.get(session_cookie_name);
  }


 saveUserData(user_data: any) {
  const secure = environment.url_api.includes("https");
  const user = user_data.user || user_data; // ⬅️ Maneja ambos casos

  this.cookieService.set(user_id_cookie_name, user.id, { secure, sameSite: secure ? 'None' : 'Lax' });
  this.cookieService.set(user_email_cookie_name, user.email, { secure, sameSite: secure ? 'None' : 'Lax' });
  this.cookieService.set(
    user_complete_name_cookie_name, 
    `${user.first_name} ${user.last_name}`, 
    { secure, sameSite: secure ? 'None' : 'Lax' }
  );
  this.cookieService.set(session_cookie_name, user_data.token, { secure, sameSite: secure ? 'None' : 'Lax' });
  this.cookieService.set(group_name_cookie_name, user_data.rol, { secure, sameSite: secure ? 'None' : 'Lax' });
}
  destroyUser(){ //eliminar los valores de las cookies 
    this.cookieService.deleteAll();
  }

  getUserEmail(){ //obtener el email
    return this.cookieService.get(user_email_cookie_name);
  }

  getUserCompleteName(){ 
    return this.cookieService.get(user_complete_name_cookie_name);
  }

  getUserId(){ //obtiene el id 
    return this.cookieService.get(user_id_cookie_name);
  }

  getUserGroup(){ //obtener el rol 
    return this.cookieService.get(group_name_cookie_name);
  }
}
