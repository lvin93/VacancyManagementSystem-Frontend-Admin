import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Vacancy } from '../models/Vacancy';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private baseUrl = environment.baseUrl;

  private getVacancyApiUrl =this.baseUrl+'/Vacancy/GetAll';
  private getByIdVacancyApiUrl = this.baseUrl+'/Vacancy/Get?id=';
  private deleteVacancyApiUrl = this.baseUrl+'/Vacancy/Delete?id=';
  private updateVacancyApiUrl = this.baseUrl+'/Vacancy/Update';
  private addVacancyApiUrl = this.baseUrl+'/Vacancy/Create';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    console.log(this.http.get<any>(this.getVacancyApiUrl)); 
    return this.http.get<any>(this.getVacancyApiUrl);
  }


  getById(id:number): Observable<any> {
    return this.http.get<Vacancy>(this.getByIdVacancyApiUrl+id);
  }

  delete(id:number): Observable<any> {
    console.log('in delete service'+id);
    return this.http.delete<any>(this.deleteVacancyApiUrl+id);
  }


  update(vacancy: Vacancy): Observable<any> {
    console.log(vacancy);
    return this.http.post<any>(this.updateVacancyApiUrl, vacancy);
  }
  
  create(vacancy: Vacancy): Observable<any> {
    console.log(vacancy);
    return this.http.post<any>(this.addVacancyApiUrl, vacancy);
  }


 
}
