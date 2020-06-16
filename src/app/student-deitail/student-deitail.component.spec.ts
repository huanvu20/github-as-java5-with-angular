import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeitailComponent } from './student-deitail.component';

describe('StudentDeitailComponent', () => {
  let component: StudentDeitailComponent;
  let fixture: ComponentFixture<StudentDeitailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDeitailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDeitailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
