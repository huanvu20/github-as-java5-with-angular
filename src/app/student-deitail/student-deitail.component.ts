import { Component, OnInit } from '@angular/core';
import { MotelService } from "../motel.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';

@Component({
  selector: 'app-student-deitail',
  templateUrl: './student-deitail.component.html',
  styleUrls: ['./student-deitail.component.css']
})
export class StudentDeitailComponent implements OnInit {

  class = null;
  major = null;
  student = null;

  majors = [];
  classes = [];

  majorId = null;
  classId = null;
  studentId = null;
  term;

  majorSelected = null
  classSelected = null
  genderSelected = null

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
    config: NgbModalConfig, private modalService: NgbModal
  ) { }

  loadIn4Student() {
    this.motelService.getStudentById(this.majorId, this.classId, this.studentId).subscribe(data => {
      console.log(data);
      this.student = data;
    });
  }
  loadClass(classId) {
    this.motelService.getClassesById(classId).subscribe(data => {
      this.classes = data
    })
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.majorId = params.get("majorId");
      this.classId = params.get("classId");
      this.studentId = params.get("studentId");
      this.loadIn4Student()
      this.motelService.getClassById(this.majorId, this.classId).subscribe(data => {
        this.class = data;
      });
      this.motelService.getMajorById(this.majorId).subscribe(data => {
        this.major = data;
      });
    });
    this.editStudent(this.studentId)


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

  updateStudent() {
    // cập nhật
    this.motelService.updateStudent(this.studentForm.value, this.majorId, this.classId).subscribe(data => {
      console.log(data);
      this.loadIn4Student();
    });
    alert("Cập nhật thành công!")
  }

  onMajorSelected(val: any) {
    //Lấy tất cả lớp học theo ngành học
    //Lấy id ngành
    this.loadClass(val)
  }
  onClassSelected(val: any) {
    //Lấy id lớp
  }
  forward() {
    //Láy tất cả ngành học
    this.motelService.getMajors().subscribe(data => {
      this.majors = data;
    });
    this.majorSelected = this.majorId;
    this.loadClass(this.majorId)
    this.classSelected = this.classId
  }
}
