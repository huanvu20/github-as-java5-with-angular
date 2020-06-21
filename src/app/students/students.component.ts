import { Component, OnInit } from "@angular/core";
import { MotelService } from "../motel.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  class = null;
  students = [];
  majors = [];
  classes = [];

  majorId;
  classId;

  genderSelected = null
  classSelected = null

  term;
  studentForm = new FormGroup({
    id: new FormControl(null),
    classId: new FormControl(null),
    name: new FormControl(""),
    studentId: new FormControl(""),
    avatar: new FormControl(""),
    email: new FormControl(""),
    phoneNumber: new FormControl(""),
    address: new FormControl(""),
    gender: new FormControl(""),
    birtDate: new FormControl("")
  });

  constructor(
    private motelService: MotelService,
    private activeRoute: ActivatedRoute,
    private route: Router,
  ) { }

  loadDSStudent() {
    this.motelService.getStudentsById(this.majorId, this.classId).subscribe(data => {
      console.log(data);
      this.students = data;
    });
  }
  loadDSClass(){
    this.motelService.getClassesById(this.majorId).subscribe(data => {
      this.classes = data;
    });
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.majorId = params.get("majorId");
      this.classId = params.get("classId");
      this.loadDSStudent()
      this.motelService.getClassById(this.majorId, this.classId).subscribe(data => {
        this.class = data;
      });
      this.loadDSClass()
      this.classSelected = this.classId
    });
  }

  editStudent(id) {
    if (this.majorId != null && this.classId && id != null) {
      this.motelService.getStudentById(this.majorId, this.classId, id).subscribe(data => {
        console.log(data);
        this.studentForm.setValue(data);
        this.genderSelected = (this.studentForm.value.gender == true) ? 1 : 2
      });
    }
  }
  onClassSelected(val: any) {
    this.classId = val
    this.loadDSStudent()
    this.motelService.getClassById(this.majorId, this.classId).subscribe(data => {
      this.class = data;
    });
  }

  saveStudent() {
    if (this.studentForm.value.id == null) {
      // thêm mới
      this.motelService.addStudent(this.studentForm.value, this.majorId, this.classId).subscribe(data => {
        console.log(data);
        this.loadDSStudent();
      });
    }
  }

  removeStudent(id) {
    let conf = confirm("Bạn chắc chắn muốn xóa Student này?");
    if (conf) {
      this.motelService.removeStudentById(this.majorId, this.classId, id).subscribe(data => {
        this.loadDSStudent()
      });
    }
  }
  cancel() {
    this.studentForm = new FormGroup({
      id: new FormControl(null),
      classId: new FormControl(null),
      name: new FormControl(""),
      studentId: new FormControl(""),
      avatar: new FormControl(""),
      email: new FormControl(""),
      phoneNumber: new FormControl(""),
      address: new FormControl(""),
      gender: new FormControl(""),
      birtDate: new FormControl("")
    });
  }
}
