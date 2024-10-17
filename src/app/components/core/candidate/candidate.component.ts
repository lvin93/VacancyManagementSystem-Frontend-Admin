import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { GetCandidateDto } from '../../../models/GetCandidateDto';
import { CandidateService } from '../../../services/candidate.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss',
  standalone:true,
  imports:[
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule

  ]
})
export class CandidateComponent {
  displayedColumns: string[] = ['id', 'fullName','fin','email','phone','correctAnswerCount','wrongAnswerCount','percentage','vacancyId','actions']; 
  dataSource: GetCandidateDto[] = []; 

  constructor(private candidateService: CandidateService,public dialog: MatDialog)  { }


  

  ngOnInit(): void {
    this.candidateService.getAll().subscribe(
      (response) => {
        console.log('API Yanıtı:', response);
        this.dataSource = response.candidates;
        console.log('auuuu',this.dataSource)
      },
      (error) => {
        console.error('Error!!!!:', error);
      }
    );
  }



  downloadResume(id: number) {
    console.log(id);
    this.candidateService.downloadResume(id).subscribe((response: Blob) => {
      console.log(response);
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, (error) => {
      console.error('Error denied', error);
    });
  }


  gotoQuizResult(vacancyId:number){
    
  }

}
