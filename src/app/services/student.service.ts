import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../student-add-edit/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/students';  // Base API URL

  constructor(private _http: HttpClient) { }

  // Add new student to the db.json (POST request)
  addStudent(data: Student): Observable<Student> {
    return this._http.post<Student>(this.apiUrl, data);
  }

  // Update existing student data in db.json (PUT request)
  updateStudent(data: Student): Observable<Student> {
    return this._http.put<Student>(`${this.apiUrl}/${data.id}`, data);
  }

  // Fetch the list of students from db.json (GET request)
  getStudentList(): Observable<Student[]> {
    return this._http.get<Student[]>(this.apiUrl);
  }

  // Delete student from db.json (DELETE request)
  deleteStudent(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
