import { Component, OnInit } from '@angular/core';
import { MotelService } from "../motel.service";
import { LoginService } from "../login.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-majors',
  templateUrl: './majors.component.html',
  styleUrls: ['./majors.component.css']
})
export class MajorsComponent implements OnInit {
  majors = [];
  account = null;
  majorForm = new FormGroup({
    id: new FormControl(null),
    majorName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀẾưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[ a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀẾưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*"),
    ]),
    majorCode: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+[ a-zA-Z ]*")
    ]),
    majorImg: new FormControl("", [
      Validators.required,
      Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
    ])
  });

  get majorName() { return this.majorForm.get('majorName'); }
  get majorCode() { return this.majorForm.get('majorCode'); }
  get majorImg() { return this.majorForm.get('majorImg'); }

  constructor(
    private motelService: MotelService,
    private loginService: LoginService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.motelService.getMajors().subscribe(data => {
      console.log(data);
      this.majors = data;
    });
  }

  removeMajor(id) {
    let conf = confirm("Bạn chắc chắn muốn xóa ngành này?");
    if (conf) {
      this.motelService.removeMajorById(id).subscribe(data => {
        this.ngOnInit();
      });
    }
  }

  editMajor(id) {
    if (id != null) {
      this.motelService.getMajorById(id).subscribe(data => {
        console.log(data);
        this.majorForm.setValue(data);
      });
    }
  }

  saveMajor() {
    if (this.majorForm.value.id == null) {
      // thêm mới
      this.motelService.addMajor(this.majorForm.value).subscribe(data => {
        console.log(data);
        this.ngOnInit();
      });
    } else {
      // cập nhật
      this.motelService.updateMajor(this.majorForm.value).subscribe(data => {
        console.log(data);
        this.ngOnInit();
      });
    }
  }

  cancel() {
    this.majorForm = new FormGroup({
      id: new FormControl(null),
      majorName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀẾưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[ a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀẾưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*"),
      ]),
      majorCode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+[ a-zA-Z ]*")
      ]),
      majorImg: new FormControl("", [
        Validators.required,
        Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i)
      ])
    });
  }
  name = 2019
  //test
}
