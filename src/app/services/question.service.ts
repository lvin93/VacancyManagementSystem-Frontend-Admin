import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/Question';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = environment.baseUrl;

  private getQuestionsByVacancyIdApiUrl =this.baseUrl+ '/Question/GetByVacancyIdForAdmin?vacancyId=';

  
  private addQuestionApiUrl =this.baseUrl+ '/Question/Create';
  private questionDeleteApiUrl = this.baseUrl+ '/Question/Delete?id=';


  constructor(private http:HttpClient) { }


  getAllByVacancyId(id:number): Observable<any> {
    return this.http.get<any>(this.getQuestionsByVacancyIdApiUrl+id);
  }



  addQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.addQuestionApiUrl, question);
  }

  deleteQuestion(id:number): Observable<any> {
    return this.http.delete<any>(this.questionDeleteApiUrl+id);
  }
}
