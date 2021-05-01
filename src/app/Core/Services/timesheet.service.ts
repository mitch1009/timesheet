import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Timesheet, UpdateTimesheet} from '../General';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient) {
  }

  public getAllTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>('http://localhost:8595/api/getTimesheet');
  }

  public getTimesheetById(id: number): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>('http://localhost:8595/api/getTimesheetById/' + id);
  }

  public saveTimesheet(timesheet: Timesheet): Observable<Timesheet[]> {
    return this.http.post<Timesheet[]>('http://localhost:8595/api/saveTimesheet', timesheet);
  }

  public updateTimesheet(update: UpdateTimesheet): Observable<UpdateTimesheet[]> {
    return this.http.put<UpdateTimesheet[]>('http://localhost:8595/api/updateTimesheet', update);
  }
}
