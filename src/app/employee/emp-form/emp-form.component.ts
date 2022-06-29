import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ContentChild
} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css']
})
export class EmpFormComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() emp: any;
  @Output() private ActiveEmpEmit = new EventEmitter<boolean>();

  EmployeeId: string = '';
  EmployeeName: string = '';
  Department: string = '';
  DateOfJoin: string = '';
  PhotoFileName: string = '';
  PhotoFilePath: string = '';

  DepartmentsList: any = [];

  ngOnInit(): void {
    this.gtAllDepartment();

    this.EmployeeId = this.emp.EmployeeId;
    this.EmployeeName = this.emp.EmployeeName;
    this.Department = this.emp.Department;
    this.DateOfJoin = this.emp.DateOfJoin;
    this.PhotoFileName = this.emp.PhotoFileName;
    this.PhotoFilePath = this.service.PhotoUrl + this.emp.PhotoFileName;
  }

  gtAllDepartment = () => {
    this.service.getAllDepartment().subscribe(resp => {
      if (resp.IsSuccess) {
        this.DepartmentsList = resp.Data;
      }
    });
  }

  addEmployee = () => {
    let model = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoin: this.DateOfJoin,
      PhotoFileName: this.PhotoFileName
    };
    this.service.addEmployee(model).subscribe(resp => {
      this.ActiveEmpEmit.emit(false);
      Swal.fire(resp.Message, '', resp.IsSuccess ? 'success' : 'error');
    });
  }

  editEmployee = () => {
    let model = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoin: this.DateOfJoin,
      PhotoFileName: this.PhotoFileName
    };
    this.service.updEmployee(model).subscribe(resp => {
      this.ActiveEmpEmit.emit(false);
      Swal.fire(resp.Message, '', resp.IsSuccess ? 'success' : 'error');
    });
  }

  uploadPhoto = (event: any) => {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.uploadPhoto(formData).subscribe(resp => {
      this.PhotoFileName = resp.toString();
      this.PhotoFilePath = this.service.PhotoUrl + resp.toString();
    });

  }

}
