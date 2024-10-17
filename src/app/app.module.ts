import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { VacancyGroupComponent } from './components/core/vacancy-group/vacancy-group.component';
import { RouterModule } from '@angular/router';
import { VacancyGroupUpdateDialogComponent } from './components/core/dialogs/vacancy-group-update-dialog/vacancy-group-update-dialog.component';
import { VacancySaveDialogComponent } from './components/core/dialogs/vacancy-save-dialog/vacancy-save-dialog.component';
import { VacancyComponent } from './components/core/vacancy/vacancy.component';
import { CandidateComponent } from './components/core/candidate/candidate.component';
import { QuestionBankComponent } from './components/core/question-bank/question-bank.component';
import { AddQuestionDialogComponent } from './components/core/dialogs/add-question-dialog/add-question-dialog.component';
import { AddAnswerDialogComponent } from './components/core/dialogs/add-answer-dialog/add-answer-dialog.component';
import { MatDatepicker } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    AddQuestionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatPaginator,
    HeaderComponent,
    BrowserAnimationsModule,
    MatToolbarModule,
    FooterComponent,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatError ,
    CommonModule,
    SidenavComponent,
    VacancyGroupComponent,
    RouterModule,
    VacancyComponent,
    VacancyGroupUpdateDialogComponent,
    ReactiveFormsModule,
    VacancySaveDialogComponent,
    BrowserAnimationsModule,
    CandidateComponent,
    QuestionBankComponent,
    MatDatepicker,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
