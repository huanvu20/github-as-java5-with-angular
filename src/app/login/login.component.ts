import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accounts = []
  account = null;
  accountId = null;

  accountForm = new FormGroup({
    id: new FormControl(null),
    username: new FormControl("",[
      Validators.required,
    ]),
    password: new FormControl("",[
      Validators.required
    ]),
    name: new FormControl(""),
    avatar: new FormControl(""),
    status: new FormControl(false)
  });
   get username() { return this.accountForm.get('username'); }
   get password() { return this.accountForm.get('password'); }

  constructor(
    private loginService: LoginService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.getAccounts().subscribe(data => {
      console.log(data);
      this.accounts = data;
    });
  }
  
  update(id,boolean){
    this.accountForm.value.status = boolean
    this.loginService.updateAccount(this.accountForm.value,id).subscribe(data => {
      console.log(data);
    });
  }

  login(){
 if(this.accountForm.invalid){
   alert("Vui lòng điền đầy đủ thông tin tài khoản và mật khẩu")
 }else{
  // for(var i = 0;i<this.accounts.length;i++){
  //   if(this.accounts[i].username == this.accountForm.value.username && this.accounts[i].password == this.accountForm.value.password){
  //     this.accountId = i+1
  //     //Lấy thông tin tài khoản
  //     this.loginService.getAccountById(this.accountId).subscribe(data => {
  //       this.accountForm.setValue(data);
  //       this.update(this.accountId,true)
        alert("Đăng nhập thành công")
        this.router.navigate(['manager'])
      // });
    }
  }
}
