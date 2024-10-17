import { Component } from '@angular/core';
import { VacancyGroupService } from '../../../services/vacancy-group.service';
import { VacancyGroup } from '../../../models/VacancyGroup';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { response } from 'express';
import { VacancyGroupUpdateDialogComponent } from '../dialogs/vacancy-group-update-dialog/vacancy-group-update-dialog.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vacancy-group',
  templateUrl: './vacancy-group.component.html',
  styleUrl: './vacancy-group.component.scss',
  standalone:true,
  imports:[
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class VacancyGroupComponent {
  displayedColumns: string[] = ['id', 'vacancyGroupName','actions']; 
  dataSource: VacancyGroup[] = []; 
  newVacancyGroup: VacancyGroup = { id: 0, vacancyGroupName: '' }; 

  constructor(private vacancyGroupService: VacancyGroupService,public dialog: MatDialog)  { }


  

  ngOnInit(): void {
    this.vacancyGroupService.getAll().subscribe(
      (response) => {
        this.dataSource = response;
      },
      (error) => {
        console.error('Error!!!!:', error);
      }
    );
  }


  deleteVacancyGroup(id:number){
    this.vacancyGroupService.delete(id).subscribe({
      next:(response:any)=>
        this.ngOnInit()
    });
  }

  updateVacancyGroup(id: number) {
    const vacancyGroup = this.dataSource.find(v => v.id === id) || { id: 0 }; 
    const dialogRef = this.dialog.open(VacancyGroupUpdateDialogComponent, {
      width: '400px',
      data: vacancyGroup 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id === 0) {
          this.vacancyGroupService.create(result).subscribe(response => {
            this.ngOnInit(); 
          });
        } else {
          this.vacancyGroupService.update(result).subscribe(response => {
            this.ngOnInit(); 
          });
        }
      }
    });
  }
}
