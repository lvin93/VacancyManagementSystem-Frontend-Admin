import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = environment.baseUrl;

  private getAllCandidateApiUrl =this.baseUrl+ '/Candidate/GetAll';
  private downloadResumeApiUrl =this.baseUrl+ '/Candidate/DownloadResume?id=';

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(this.getAllCandidateApiUrl);
  }


  

  downloadResume(id: number): Observable<Blob> {
    return this.http.get(`${this.downloadResumeApiUrl}${id}`, {
      responseType: 'blob' 
    });
  }

}
