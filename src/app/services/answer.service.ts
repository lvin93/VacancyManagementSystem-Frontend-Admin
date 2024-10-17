import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/Question';
import { environment } from '../../environment'; 

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private baseUrl = environment.baseUrl;

  private getAnswersByQuestionIdApiUrl = this.baseUrl+ '/Answer/GetByQuestionIdForAdmin?questionId=';
  private addAnswerApiUrl = this.baseUrl+ '/Answer/Create';
  private deleteAnswerApiUrl = this.baseUrl+ '/Answer/Delete?id=';


  constructor(private http:HttpClient) { }


  getAllByQuestionId(id:number): Observable<any> {
    return this.http.get<any>(this.getAnswersByQuestionIdApiUrl+id);
  }

  addAnswer(answer: any): Observable<any> {
    return this.http.post<any>(this.addAnswerApiUrl, answer);
  }

  deleteAnswer(id:number): Observable<any> {
    return this.http.delete<any>(this.deleteAnswerApiUrl+id);
  }
}
