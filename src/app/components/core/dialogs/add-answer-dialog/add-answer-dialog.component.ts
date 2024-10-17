import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../../../services/question.service';
import { AnswerService } from '../../../../services/answer.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-answer-dialog',
  templateUrl: './add-answer-dialog.component.html',
  styleUrl: './add-answer-dialog.component.scss',
  standalone:true,
  imports:[
    MatFormField,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,

  ]
})
export class AddAnswerDialogComponent {
  answer: string = '';
  isCorrect: boolean =false; 

  constructor(
    public dialogRef: MatDialogRef<AddAnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { questionId: number },
    private answerService:AnswerService
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }



  addAnswer(): void {
    if (this.answer) {
      const answerData = {
        answerText: this.answer,
        questionId: this.data.questionId,
        isCorrect:this.isCorrect
      };
      console.log(this.answer,this.data.questionId)
      this.answerService.addAnswer(answerData).subscribe(
        response => {
          console.log('succesfully added', response);
          this.dialogRef.close({ answer: this.answer });
        },
        error => {
          console.error('error:', error);
        }
      );
    }
  }
}
