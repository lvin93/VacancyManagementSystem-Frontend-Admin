import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { VacancyGroup } from '../models/VacancyGroup';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyGroupService {

  private baseUrl = environment.baseUrl;

  private getVacancyGroupApiUrl = this.baseUrl+ '/VacancyGroup/GetAll';
  private deleteVacancyGroupApiUrl = this.baseUrl+ '/VacancyGroup/Delete?id=';
  private updateVacancyGroupApiUrl = this.baseUrl+ '/VacancyGroup/Update';
  private addVacancyGroupApiUrl = this.baseUrl+ '/VacancyGroup/Create';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.getVacancyGroupApiUrl);
  }

  delete(id:number): Observable<any> {
    console.log('in delete service'+id);
    return this.http.delete<any>(this.deleteVacancyGroupApiUrl+id);
  }


  update(vacancyGroup: VacancyGroup): Observable<any> {
    console.log(vacancyGroup);
    return this.http.post<any>(this.updateVacancyGroupApiUrl, vacancyGroup);
  }
  
  create(vacancyGroup: VacancyGroup): Observable<any> {
    return this.http.post<any>(this.addVacancyGroupApiUrl, vacancyGroup);
  }

}
