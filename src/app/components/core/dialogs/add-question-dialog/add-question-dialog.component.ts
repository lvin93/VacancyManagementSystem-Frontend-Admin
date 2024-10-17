import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from '../../../../services/question.service';

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrl: './add-question-dialog.component.scss'
})
export class AddQuestionDialogComponent {
  question: string = ''; 
  difficultyLevel: number = 0; 

  constructor(
    public dialogRef: MatDialogRef<AddQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vacancyId: number },
    private questionService:QuestionService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  addQuestion(): void {
    if (this.question) {
      const questionData = {
        questionText: this.question,
        vacancyId: this.data.vacancyId,
        difficultyLevel : this.difficultyLevel
      };
      console.log(this.question,this.data.vacancyId)
      this.questionService.addQuestion(questionData).subscribe(
        response => {
          console.log('succesfully added', response);
          this.dialogRef.close({ question: this.question });
        },
        error => {
          console.error('error', error);
        }
      );
    }
  }
}
