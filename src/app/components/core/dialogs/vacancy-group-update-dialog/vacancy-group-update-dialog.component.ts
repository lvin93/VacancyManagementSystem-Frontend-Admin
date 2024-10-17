import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VacancyGroupService } from '../../../../services/vacancy-group.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacancyGroup } from '../../../../models/VacancyGroup';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vacancy-group-update-dialog',
  templateUrl: './vacancy-group-update-dialog.component.html',
  styleUrl: './vacancy-group-update-dialog.component.scss',
  standalone:true,
  imports:[
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatLabel,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule

  ],
})
export class VacancyGroupUpdateDialogComponent {
  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VacancyGroupUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VacancyGroup
  ) {
    this.updateForm = this.fb.group({
      id: [data.id], 
      vacancyGroupName: [data.vacancyGroupName]
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
