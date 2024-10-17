import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Vacancy } from '../../../../models/Vacancy';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { VacancyGroup } from '../../../../models/VacancyGroup';
import { MatSelectModule } from '@angular/material/select';
import { VacancyGroupService } from '../../../../services/vacancy-group.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-vacancy-save-dialog',
  templateUrl: './vacancy-save-dialog.component.html',
  styleUrl: './vacancy-save-dialog.component.scss', 
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
    MatError

  ]
})
export class VacancySaveDialogComponent {
  updateForm: FormGroup;
  vacancyGroups: VacancyGroup[]=[]



  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VacancySaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vacancy,
    private vacancyGroupService:VacancyGroupService
  ) {
    this.updateForm = this.fb.group({
      id: [data.id], 
      title: [data.title],
      description: [data.description],
      questionCount: [data.questionCount],
      startDate: [null], 
      endDate: [null], 
      status: [data.status], 
      vacancyGroupId: [data.vacancyGroupId], 
    });
  }

  ngOnInit(){
  this.vacancyGroupService.getAll().subscribe(data => {
    this.vacancyGroups = data;
    console.log(this.vacancyGroups);
  });
  }

  onUpdate() {
    if (this.updateForm.valid) {
      this.dialogRef.close(this.updateForm.value); 
    }
  }

  onCancel() {
    this.dialogRef.close(); 
  }


}
