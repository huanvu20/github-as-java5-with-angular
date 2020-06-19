import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { MotelService } from "./motel.service";
import { LoginService} from "./login.service";
import { HelloComponent } from './hello/hello.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MajorsComponent } from './majors/majors.component';
import { ClassesComponent } from './classes/classes.component';
import { StudentsComponent } from './students/students.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { ManagerComponent } from './manager/manager.component';
import { HomeComponent } from './home/home.component';
import { StudentDeitailComponent } from './student-deitail/student-deitail.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      { path: "", redirectTo: 'hello', pathMatch: 'full'},
      { path: "hello", component: HelloComponent},
      { path: "login", component: LoginComponent},
      { path: "manager", component: ManagerComponent,
        children: [
          { path: '',redirectTo: 'home',pathMatch: 'full'},
          { path: "home", component: HomeComponent},
          { path: "majors", component: MajorsComponent},
          { path: "classes/:majorId", component: ClassesComponent },
          { path: "students/:majorId/:classId", component: StudentsComponent},
          { path: "student-detail/:studentId", component: StudentDeitailComponent},
        ]
      }
    ]),
    NgbModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    MajorsComponent,
    ClassesComponent,
    StudentsComponent,
    LoginComponent,
    ManagerComponent,
    HomeComponent,
    StudentDeitailComponent,
  ],
  bootstrap: [AppComponent],
  providers: [MotelService, LoginService]
})
export class AppModule {}
