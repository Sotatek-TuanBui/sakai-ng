import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
  ) { }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['admin/login']);
            return false;
        }

        return true;
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('accessToken') ?? '';
        console.log(token);

        return !!token;
    }
}
