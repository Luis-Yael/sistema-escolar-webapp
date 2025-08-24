// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { FacadeService } from './services/facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  // inyecta PUBLIC para poder usarlo en la plantilla si quieres
  constructor(public facadeService: FacadeService) {}

  // opcional: evita llamar métodos en el template
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = !!this.facadeService.getSessionToken();
  }

  // alternativa elegante: un getter
  get loggedIn(): boolean {
    return !!this.facadeService.getSessionToken();
  }
}
