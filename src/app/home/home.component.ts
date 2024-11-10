import { Component, inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'action'];
  dataSource: any[] = [];
  isModalOpen: boolean = false;
  studentForm: FormGroup;
  editMode: boolean = false;
  currentStudentId: number | null = null;
  router = inject(Router)



  constructor(private _studentService: StudentService, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id: [{ value: '', disabled: false }], // ID is read-only in edit mode
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStudentList();
  }

  openAddEditStudentForm(student: any = null) {
    this.isModalOpen = true;
    if (student) {
      this.editMode = true;
      this.currentStudentId = student.id;
      this.studentForm.patchValue(student);
    } else {
      this.editMode = false;
      this.currentStudentId = null;
      this.studentForm.reset();
    }
  }

  getStudentList() {
    this._studentService.getStudentList().subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.studentForm.reset();
  }



  deleteStudent(id: number) {
    this._studentService.deleteStudent(id).subscribe({
      next: () => {
        alert("Student record deleted!");
        this.getStudentList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleEdit(studentId: number){
    this.router.navigateByUrl(`student/student-form/${studentId}`)
  }
}
