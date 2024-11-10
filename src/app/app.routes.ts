import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'student',
    component: HomeComponent,
  },
  {
    path: 'student/student-form',
    component: StudentAddEditComponent,
  },
  {
    path: 'student/student-form/:id',
    component: StudentAddEditComponent,
  },
  {
   path: '',
   redirectTo: 'student',
   pathMatch: 'full'
  },
];
