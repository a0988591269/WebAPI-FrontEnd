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

  ngOnInit(): void {
    this.EmployeeId = this.emp.EmployeeId;
    this.EmployeeName = this.emp.EmployeeName;
  }

  addEmployee = () => {
    let model = {
      EmployeeId: this.emp.EmployeeId,
      EmployeeName: this.EmployeeName
    };
    this.service.addEmployee(model).subscribe(resp => {
      this.ActiveEmpEmit.emit(false);
      Swal.fire(resp.Message, '', resp.IsSuccess ? 'success' : 'error');
    });
  }

  editEmployee = () => {
    let model = {
      EmployeeId: this.emp.EmployeeId,
      EmployeeName: this.EmployeeName
    };
    this.service.updEmployee(model).subscribe(resp => {
      this.ActiveEmpEmit.emit(false);
      Swal.fire(resp.Message, '', resp.IsSuccess ? 'success' : 'error');
    });
  }

}
