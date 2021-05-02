import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UpdateUser, User} from '../General';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8595/api/getUser');
  }

  public getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8595/api/getUserById/' + id);
  }

  public saveUser(user: User): Observable<User[]> {
    return this.http.post<User[]>('http://localhost:8595/api/saveUser', user);
  }

  public updateUser(update: UpdateUser): Observable<UpdateUser[]> {
    return this.http.put<UpdateUser[]>('http://localhost:8595/api/updateUser', update);
  }
}
