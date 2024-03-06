import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si el token de acceso está presente en el Local Storage
    const accessToken = sessionStorage.getItem('access_token');

    if (accessToken) {
      // Token de acceso presente, permitir el acceso a la ruta protegida
      return true;
    } else {
      // No hay token de acceso, redirigir al inicio
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}