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
  selector: 'app-dep-form',
  templateUrl: './dep-form.component.html',
  styleUrls: ['./dep-form.component.css']
})
export class DepFormComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() dep: any;
  @Output() private ActiveDepEmit = new EventEmitter<boolean>();

  DepartmentId: string = '';
  DepartmentName: string = '';

  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
  }

  addDepartment = () => {
    let model = {
      DepartmentId: this.dep.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(model).subscribe(resp => {
      this.ActiveDepEmit.emit(false);
      Swal.fire(resp.Message, '', resp.IsSuccess ? 'success' : 'error');
    });
  }

  editDepartment = () => {
    let model = {
      DepartmentId: this.dep.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.updDepartment(model).subscribe(resp => {
      this.ActiveDepEmit.emit(false);
      Swal.fire(resp.Message, '', resp.IsSuccess ? 'success' : 'error');
    });
  }

}
