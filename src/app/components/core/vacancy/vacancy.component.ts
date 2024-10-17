import { Component } from '@angular/core';
import { Vacancy } from '../../../models/Vacancy';
import { VacancyService } from '../../../services/vacancy.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VacancySaveDialogComponent } from '../dialogs/vacancy-save-dialog/vacancy-save-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetVacancyDto } from '../../../models/GetVacancyDto';
import { response } from 'express';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.scss',
  standalone:true,
  imports:[
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class VacancyComponent {
  displayedColumns: string[] = ['id', 'title','description','startDate','endDate','vacancyGroupName','statusName','questionCount','actions']; 
  dataSource: GetVacancyDto[] = []; 
  dataSourcePost:Vacancy|undefined;
  newVacancy: Vacancy | undefined ; 
  today: Date = new Date();

  constructor(private vacancyService: VacancyService,public dialog: MatDialog,private snackBar: MatSnackBar)  { }


  

  ngOnInit(): void {
    this.vacancyService.getAll().subscribe(
      (response) => {
        console.log('start', response);
        this.dataSource = response.vacancies;
        console.log(this.dataSource)
      },
      (error) => {
        console.error('Error!!!!:', error);
      }
    );


    
  }





  deleteVacancy(id:number){
    console.log('delete started');
    this.vacancyService.delete(id).subscribe({
      next:(response:any)=>
        this.ngOnInit()
    });
  }

  

  updateVacancy(id: number) {
    const vacancy = this.dataSource.find(v => v.id === id) || { id: 0 };
    this.vacancyService.getById(id).subscribe((vacancyPost: Vacancy) => {
      const dialogRef = this.dialog.open(VacancySaveDialogComponent, {
        width: '400px',
        data: vacancyPost 
      });


      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.id === 0) {
            this.vacancyService.create(result).subscribe(response => {
              this.ngOnInit(); 
            },
            (error) => {
              this.handleValidationErrors(error.error.errorMessage);
            }
          );
          } else {
            this.vacancyService.update(result).subscribe(response => {
              this.ngOnInit();
            },
            (error) => {
              this.handleValidationErrors(error.error.errorMessage);
            }
          );
          }
        }
      });
    });

  
  

  }


  handleValidationErrors(errorMessage: string) {
      console.log('erroremsa',errorMessage);
  
      this.snackBar.open(errorMessage, 'bağla', {
        duration: 5000,
      });
  }
}
