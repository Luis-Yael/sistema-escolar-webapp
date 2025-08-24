import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() rol: 'administrador' | 'maestro' | 'alumno' | string = '';
  @Input() token: string | null = null;

  collapsed = false;     // mini–sidebar en desktop
  mobileOpen = false;    // sidebar visible en móvil

  constructor(private router: Router, private facade: FacadeService) {}

closeOnMobile() {
  if (window.innerWidth < 992) this.mobileOpen = false;
}


  logout() {
    // tu lógica actual
    this.facade.logout(); // si ya tienes algo similar
    this.router.navigate(['/']);
  }
}
