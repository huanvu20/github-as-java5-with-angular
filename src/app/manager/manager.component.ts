import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../login.service";
import { data } from 'jquery';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

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
    this.activeRoute.paramMap.subscribe(params => {
      this.accountId = params.get("accountId");
      this.loginService.getAccountById(this.accountId).subscribe(data => {
        this.account = data;
      });
    });
    //js
    $(document).ready(function () {
      $("#sidebar").mCustomScrollbar({
        theme: "minimal"
      });

      $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
    });
  }
}

