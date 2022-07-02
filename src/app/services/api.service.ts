import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Response as ApiResponse } from 'src/app/api/response';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    request: any = null;

  protected apiServer = environment.server;

  constructor(private httpClient: HttpClient) {
  }

  get( path: string, options: any, callback: any ): Observable<any> {
    return this.httpClient.get<ApiResponse>(this._buildUrl(path), options)
       .pipe(callback || '');
  }

  post( path: string, options: {}, headers: {}, callback: any ): Observable<any> {

    return this.httpClient.post<ApiResponse>(this._buildUrl(path), options, headers)
      .pipe(callback || '');
  }

  put( path: string, options: {}, headers: {}, callback: any ): Observable<any> {

    return this.httpClient.put<ApiResponse>(this._buildUrl(path), options, headers)
      .pipe(callback || '');
  }

  delete( path: string, options: {}, callback: any ): Observable<any> {

    return this.httpClient.delete<ApiResponse>(this._buildUrl(path), options)
      .pipe(callback || '');
  }

  private _buildUrl( path: string ): string {
    if (path.includes('https://') || path.includes('http://')) {
      return path;
    }
    let baseUrl = this.apiServer.ssl === true ? 'https://' : 'http://';
    baseUrl += this.apiServer.host;
    if (this.apiServer.port !== '') {
      baseUrl += ':' + this.apiServer.port;
    }
    if (this.apiServer.prefix !== '') {
      baseUrl += '/' + this.apiServer.prefix;
    }
    return baseUrl + '/' + path;
  }
}
