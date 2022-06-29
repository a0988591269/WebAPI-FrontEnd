import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit, OnChanges {

  constructor(private service: SharedService) { }

  //如果為true，則在運行更改檢測之前解析查詢結果.
  //如果為false，則在更改檢測之後解析。默認false.
  @ViewChild('modelClose') modelClose!: ElementRef;
  Modaltitle: string = '';
  ActiveEmployee: boolean = false;
  //屬性綁定宣告變數
  emp: any;
  EmpList: any = [];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  refreshEmpList = () => {
    //rxjs Observable
    this.service.getEmpList().subscribe(resp => {
      this.EmpList = resp.Data;
    });
  }

  addClick = () => {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: ''
    }
    this.Modaltitle = '新增員工';
    this.ActiveEmployee = true;
  }

  editClick = (item: any) => {
    this.emp = item;
    this.Modaltitle = '編輯員工';
    this.ActiveEmployee = true;
  }

  delClick = (item: any) => {
    Swal.fire({
      title: `是否要刪除 ${item.EmployeeName}?`,
      showCancelButton: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.delDepartment(item.DepartmentId)
          .subscribe(resp => {
            if (resp.IsSuccess) {
              Swal.fire(resp.Message, '', 'success');
              this.refreshEmpList();
            } else {
              Swal.fire(resp.Message, '', 'error');
            }
          })
      }
    })
  }

  closeClick = () => {
    this.modelClose.nativeElement.click();
    this.ActiveEmployee = false;
    this.refreshEmpList();
  }

}
