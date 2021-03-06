import { Component, OnInit } from "@angular/core";
import { MotelService } from "../motel.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})

export class ClassesComponent implements OnInit {

  classes = [];
  major = null;
  majors = [];
  majorId = null;
  term;
  message;
  majorSelected = null;

  classForm = new FormGroup({
    id: new FormControl(null),
    majorId: new FormControl(null),
    className: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+[ a-zA-Z ]+[0-9]*")
    ]),
  });

  get className() { return this.classForm.get('className'); }

  constructor(
    private motelService: MotelService,
    private activeRoute: ActivatedRoute,
  ) {

  }

  loadDSClass() {
    this.motelService.getClassesById(this.majorId).subscribe(data => {
      console.log(data);
      this.classes = data;
    });
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.majorId = params.get("majorId");
      this.loadDSClass()
      this.motelService.getMajorById(this.majorId).subscribe(data => {
        console.log(data);
        this.major = data;
      });
    });
    this.motelService.getMajors().subscribe(data => {
      console.log(data);
      this.majors = data;
    });
    this.majorSelected = this.majorId;
  }

  onMajorSelected(val: any) {
    // this.router.navigate(['manager/classes/' + val])
    this.majorId = val
    this.loadDSClass();
    this.motelService.getMajorById(this.majorId).subscribe(data => {
      console.log(data);
      this.major = data;
    });
  }

  removeClass(id) {
    let conf = confirm("Bạn chắc chắn muốn xóa Student này?");
    if (conf) {
      this.motelService.removeClassById(this.majorId, id).subscribe(data => {
        this.loadDSClass()
      });
    }
  }

  editClass(id) {
    if (this.majorId != null && id != null) {
      this.motelService.getClassById(this.majorId, id).subscribe(data => {
        console.log(data);
        this.classForm.setValue(data);
      });
    }
  }




  saveClass() {
    for(var c of this.classes){
      if(c.className == this.classForm.value.className){
        alert('Tên lớp đã tồn tại!')
        return
      }
    }
    if (this.classForm.value.id == null) {
      // thêm mới
      this.classForm.value.id = this.majorId;
      this.motelService.addClass(this.classForm.value).subscribe(data => {
        console.log(data);
        this.loadDSClass();
      });
    } else {
      // cập nhật
      this.motelService.updateClass(this.classForm.value, this.majorId).subscribe(data => {
        console.log(data);
        this.loadDSClass();
      });
    }
  }

  cancel() {
    this.classForm = new FormGroup({
      id: new FormControl(null),
      majorId: new FormControl(null),
      className: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+[ a-zA-Z ]+[0-9]*")
      ]),
    });
  }


  //test

} 