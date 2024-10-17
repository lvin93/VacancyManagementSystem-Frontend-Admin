import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacancyGroupComponent } from './components/core/vacancy-group/vacancy-group.component';
import { VacancyComponent } from './components/core/vacancy/vacancy.component';
import { CandidateComponent } from './components/core/candidate/candidate.component';
import { QuestionBankComponent } from './components/core/question-bank/question-bank.component';

const routes: Routes = [
  { path: '', component: VacancyGroupComponent }, 
  { path: 'vacancy-group', component: VacancyGroupComponent }, 
  { path: 'vacancy', component: VacancyComponent } ,
  { path: 'candidate', component: CandidateComponent } ,
  { path: 'question-bank', component: QuestionBankComponent } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
