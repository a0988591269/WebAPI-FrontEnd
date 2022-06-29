import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { DepListComponent } from './department/dep-list/dep-list.component';
import { DepFormComponent } from './department/dep-form/dep-form.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmpListComponent } from './employee/emp-list/emp-list.component';
import { EmpFormComponent } from './employee/emp-form/emp-form.component';

//新增Service元件
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
//Form表單
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    DepListComponent,
    EmployeeComponent,
    EmpListComponent,
    EmpFormComponent,
    DepFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
