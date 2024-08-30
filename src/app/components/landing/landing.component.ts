import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  isAuthenticated= signal<boolean>(false); // Simulando la autenticación
  isMenuOpen = false;

  login() {
    this.isAuthenticated.set(true);
  }

  logout() {
    this.isAuthenticated.set(false);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
