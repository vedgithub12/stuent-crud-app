import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from './student.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule],

  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: string | null = null;
  newStudent : Student = {
    id: Date.now().toString(),
    firstName : "",
    lastName: "",
    email: "",
    phone: "",
  }

  isEdit = false

  constructor(
    private _fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.studentForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.studentId = idParam ? idParam : null;
      console.log(this.studentId)
      if (this.studentId) {
        // If there's an ID, fetch the existing student data
        this.studentService.getStudentList().subscribe((students: Student[]) => {
          const student = students.find((s: Student) => s.id === this.studentId);
          console.log("fetch", student)
          if (student) {
            // this.studentForm.patchValue(student);  // Populate the form with student data
            this.newStudent =  student
            console.log("Saved!!",this.newStudent)
            this.isEdit = true
          }
        });
      }
    });
  }

  handleSubmit(){
    if(!this.isEdit){
      this.studentService.addStudent(this.newStudent).subscribe((res:any)=>{
        console.log(res)
        alert("Student record Added!")
        this.router.navigateByUrl('/student')
      })
    }else{
      this.studentService.updateStudent(this.newStudent).subscribe(()=>{
        alert("Student record Updated!")
        this.router.navigateByUrl('/student')
      })
    }
  }
}
