import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Manager, UpdateManager} from '../General';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) {
  }

  public getAllManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>('http://localhost:8595/api/getManager');
  }

  public getManagerById(id: number): Observable<Manager[]> {
    return this.http.get<Manager[]>('http://localhost:8595/api/getManagerById/' + id);
  }

  public saveManager(manager: Manager): Observable<Manager[]> {
    return this.http.post<Manager[]>('http://localhost:8595/api/saveManager', manager);
  }

  public updateManager(update: UpdateManager): Observable<UpdateManager[]> {
    return this.http.put<UpdateManager[]>('http://localhost:8595/api/updateManager', update);
  }
}
