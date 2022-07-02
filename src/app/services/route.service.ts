import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

    protected apiServerPaths = environment.server.paths.routes;
    constructor(
        private apiService: ApiService
    ) {}

    list = () => {
        return this.apiService.get(this.apiServerPaths.list, {}, map(res => {
            return res;
        }));
    }
}
