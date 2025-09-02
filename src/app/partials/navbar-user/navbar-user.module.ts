import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarUserComponent } from './navbar-user.component';

@NgModule({
	declarations: [NavbarUserComponent],
	imports: [CommonModule, RouterModule],
	exports: [NavbarUserComponent]
})
export class NavbarUserModule {}
