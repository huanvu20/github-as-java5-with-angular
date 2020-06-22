import { Component, OnInit } from '@angular/core';
import { MotelService } from "../motel.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { data } from 'jquery';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-student-deitail',
  templateUrl: './student-deitail.component.html',
  styleUrls: ['./student-deitail.component.css']
})
export class StudentDeitailComponent implements OnInit {

  class = null;
  major = null;

  majors = [];
  classes = [];

  majorId = null;
  classId = null;
  studentId = null;

  majorSelected = null
  classSelected = null
  genderSelected = null

  valueStudents = []

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
    private router: Router,
  ) { }

  // loadIn4Student() {
  //   this.motelService.getStudentById(this.majorId, this.classId, this.studentId).subscribe(data => {
  //     this.student = data;
  //   });
  // }
  loadClasses(classId) {
    this.motelService.getClassesById(classId).subscribe(data => {
      this.classes = data
    })
  }
  loadClass() {
    this.motelService.getClassById(this.majorId, this.classId).subscribe(data => {
      this.class = data;
    });
  }
  loadMajor() {
    this.motelService.getMajorById(this.majorId).subscribe(data => {
      this.major = data;
    });
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.majorId = params.get("majorId");
      this.classId = params.get("classId");
      this.studentId = params.get("studentId");
      this.loadClass()
      this.loadMajor()
    });
    // this.loadIn4Student()
    this.editStudent(this.studentId)
  }

  editStudent(id) {
    if (this.majorId != null && this.classId && id != null) {
      this.motelService.getStudentById(this.majorId, this.classId, id).subscribe(data => {
        this.studentForm.setValue(data);
        this.genderSelected = (this.studentForm.value.gender == true) ? 1 : 2
      });
    }
  }

  updateStudent() {
    // cập nhật
    this.motelService.updateStudent(this.studentForm.value, this.majorId, this.classId).subscribe(data => {
      // this.loadIn4Student();
    });
    alert("Cập nhật thành công!")
  }

  //Chuyển lớp/ngành
  idMajorto = 0
  idClassto = 0

  onMajorSelected(val: any) {
    //Lấy tất cả lớp học theo ngành học
    //Lấy id ngành
    this.loadClasses(val)
    this.idMajorto = val
    this.idClassto = 0
  }
  onClassSelected(val: any) {
    //Lấy id lớp
    this.idClassto = val
  }
  forward() {
    //Láy tất cả ngành học
    this.motelService.getMajors().subscribe(data => {
      this.majors = data;
    });
    this.majorSelected = this.majorId;
    this.loadClasses(this.majorId)
    this.classSelected = this.classId
  }

  addStudent() {
    if (this.studentForm.value.id == null) {
      // thêm mới
      this.motelService.addStudent(this.studentForm.value, this.idMajorto, this.idClassto).subscribe(data => {
      });
    }
  }
  removeStudent() {
    this.motelService.removeStudentById(this.idMajorto, this.idClassto, this.studentId).subscribe(data => {
    });
  }
  chuyenNganh() {
    this.idMajorto = (this.idMajorto == 0) ? this.majorId : this.idMajorto
    if (this.idClassto == 0) {
      alert("Vui lòng chọn lớp")
      return
    }
    console.log(this.idClassto + this.idMajorto)
    this.studentForm.value.id = null
    let conf = confirm("Chọn OK để thực thi");
    if (conf) {
      //add student vào lớp/ngành mới
      this.addStudent()
      alert('Thành công!')
      this.removeStudent()
      this.router.navigate(['manager/students/'+this.idMajorto+"/"+this.idClassto])
    }
  }
}

