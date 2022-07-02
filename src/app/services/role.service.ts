import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    protected apiServerPaths = environment.server.paths.role;
    constructor(
        private apiService: ApiService
    ) {}

    list = () => {
        return this.apiService.get(this.apiServerPaths.list, {}, map(res => {
            return res;
        }));
    }

    create = (data: any) => {
        return this.apiService.post(this.apiServerPaths.create, data, {}, map(res => {
            return res;
        }));
    }

    update = (id: number, data: any) => {
        return this.apiService.put(`${this.apiServerPaths.delete}/${id}`, data, {}, map(res => {
            return res;
        }));
    }

    delete = (ids: Array<number>) => {
        return this.apiService.delete(`${this.apiServerPaths.delete}?ids=${ids}`, {}, map(res => {
            return res;
        }));
    }
}
