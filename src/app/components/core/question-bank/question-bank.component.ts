import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { VacancyService } from '../../../services/vacancy.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetVacancyDto } from '../../../models/GetVacancyDto';
import { QuestionService } from '../../../services/question.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { AnswerService } from '../../../services/answer.service';
import { Question } from '../../../models/Question';
import {MatRadioButton, MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from '../dialogs/add-question-dialog/add-question-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { AddAnswerDialogComponent } from '../dialogs/add-answer-dialog/add-answer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss',
  imports:[
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatExpansionModule,
    MatRadioModule,
    MatRadioButton,
    MatButtonModule,
    MatIconModule
  ],
  standalone:true
})
export class QuestionBankComponent {
  vacancies: GetVacancyDto[] = []; 
  questions:any[]=[];
  questionsWithAnswer!: Question[]; 
  selectedAnswers: number[] = []; 
  vacancyState:number=0;
  selectedVacancy!: number ;
  readonly panelOpenState = signal(false);

  
  constructor(private vacancyService: VacancyService,private answerService: AnswerService,
    private questionService:QuestionService,public dialog: MatDialog,private snackBar: MatSnackBar)
  {}



  ngOnInit() {
    this.loadVacancies(); 
  }


  loadVacancies() {
    this.vacancyService.getAll().subscribe((vacancies) => {
      this.vacancies = vacancies.vacancies;
      console.log('asfa',this.vacancies);
    });
  }


  loadQuestions(vacancyId: number) {

    this.questionService.getAllByVacancyId(vacancyId).subscribe({
      next: (response) => {
        console.log('isledi',response);
      this.questions=response.questions;
        this.questions.forEach((question: any) => {
          console.log('questionid',question.id);
          this.answerService.getAllByQuestionId(question.id).subscribe({
            next: (answersResponse) => {
              console.log('answer',answersResponse);
              question.answers = answersResponse.answers;
              console.log('isledi', question.answers);

            },
            error: (error) => {
              console.error('', error);
            }
          });
        });console.log('',this.questions)
      },
      error: (error) => {
        console.error('', error);
      }
    });

  }



  
  onVacancyChange(vacancyId: number) {
    this.selectedVacancy = vacancyId;
    this.loadQuestions(vacancyId); 
    console.log('',this.questions);
    this.vacancyState=vacancyId;
    // this.loadQuestions(vacancyId);
  }



  openDialog(vacancyId: number): void {
    const dialogRef = this.dialog.open(AddQuestionDialogComponent, {
      width: '250px',
      data: { vacancyId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQuestions(vacancyId);
    }},
    (error) => {
      this.handleValidationErrors(error.error.errorMessage);
    });
  }

  openAddAnswerDialog(questionId:number){
    const dialogRef = this.dialog.open(AddAnswerDialogComponent, {
      width: '250px',
      data: { questionId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQuestions(this.vacancyState);
      }},
      (error) => {
        this.handleValidationErrors(error.errorMessage);
      }
    );
  }

  deleteAnswer(id:number){
    this.answerService.deleteAnswer(id).subscribe((vacancies) => {
         this.loadQuestions(this.vacancyState);
    }); 
  }

  
  deleteQuestion(id:number){
    console.log('silindiiiiii',id);
    this.questionService.deleteQuestion(id).subscribe((vacancies) => {
      this.loadQuestions(this.vacancyState);
    }); 
  }

  handleValidationErrors(errorMessage: string) {
    this.snackBar.open(errorMessage, 'bağla', {
      duration: 5000,
    });
    }

  

}
