import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    protected apiServerPaths = environment.server.paths.auth;
    constructor(
        private apiService: ApiService
    ) {}

    login = (data: any) => {
        return this.apiService.post(this.apiServerPaths.login, data, {}, map(res => {
            return res;
        }));
    }
}
