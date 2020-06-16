import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const apiUrl1 = "https://5e79b4f917314d0016133401.mockapi.io/majors";
@Injectable()
export class MotelService {
  constructor(private http: HttpClient) { }

  getMajors(): Observable<any> {
    return this.http.get<any>(apiUrl1);
  }

  getMajorById(majorId): Observable<any> {
    let url = `${apiUrl1}/${majorId}`;
    return this.http.get<any>(url);
  }
  getClassesById(majorId): Observable<any> {
    const apiUrl2 =
      "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
      majorId +
      "/classes";
    return this.http.get<any>(apiUrl2);
  }
  getClassById(majorId, classId): Observable<any> {
    const apiUrl2 =
      "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
      majorId +
      "/classes/" +
      classId;
    return this.http.get<any>(apiUrl2);
  }
  getStudentsById(majorId, classId): Observable<any> {
    const apiUrl2 =
      "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
      majorId + "/classes/" + classId + "/students";
    return this.http.get<any>(apiUrl2);
  }
  getStudentById(majorId, classId, studentId): Observable<any> {
    const apiUrl2 =
      "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
      majorId + "/classes/" + classId + "/students/" + studentId;
    return this.http.get<any>(apiUrl2);
  }
  removeMajorById(majorId): Observable<any> {
    let url = `${apiUrl1}/${majorId}`;
    return this.http.delete<any>(url);
  }
  removeClassById(majorId, classId): Observable<any> {
    const apiUrl2 =
      "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
      majorId +
      "/classes/" +
      classId;
    return this.http.delete<any>(apiUrl2);
  }
  removeStudentById(majorId, classId, studentId): Observable<any> {
    const apiUrl2 =
      "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
      majorId + "/classes/" + classId + "/students/" + studentId;
    return this.http.delete<any>(apiUrl2);
  }
  addMajor(majorObject): Observable<any> {
    return this.http.post<any>(apiUrl1, majorObject);
  }
  updateMajor(majorObject): Observable<any> {
    let url = `${apiUrl1}/${majorObject.id}`;
    return this.http.put<any>(url, majorObject);
  }
  addClass(classObject): Observable<any> {
    let url = `${apiUrl1}/${classObject.id}/classes`;
    console.log(url)
    return this.http.post<any>(url, classObject);
  }
  updateClass(classObject, id): Observable<any> {
    let url = `${apiUrl1}/${id}/classes/${classObject.id}`;
    return this.http.put<any>(url, classObject);
  }
  addStudent(studentObject,majorId,classId): Observable<any> {
    const apiUrl2 =
    "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
    majorId + "/classes/" + classId + "/students";
    return this.http.post<any>(apiUrl2, studentObject);
  }
  updateStudent(studentObject,majorId,classId): Observable<any> {
    const apiUrl2 =
    "https://5e79b4f917314d0016133401.mockapi.io/majors/" +
    majorId + "/classes/" + classId + "/students/"+ studentObject.id;
    return this.http.put<any>(apiUrl2, studentObject);
  }
}
