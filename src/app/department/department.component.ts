import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnChanges {

  constructor(private service: SharedService) { }

  //如果為true，則在運行更改檢測之前解析查詢結果.
  //如果為false，則在更改檢測之後解析。默認false.
  @ViewChild('modelClose') modelClose!: ElementRef;
  Modaltitle: string = '';
  ActiveDepartment: boolean = false;
  //屬性綁定宣告變數
  dep: any;
  DepList: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  refreshDepList = () => {
    //rxjs Observable
    this.service.getDepList().subscribe(resp => {
      this.DepList = resp.Data;
    });
  }

  addClick = () => {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ''
    }
    this.Modaltitle = '新增部門';
    this.ActiveDepartment = true;
  }

  editClick = (item: any) => {
    this.dep = item;
    this.Modaltitle = '編輯部門';
    this.ActiveDepartment = true;
  }

  delClick = (item: any) => {
    Swal.fire({
      title: `是否要刪除 ${item.DepartmentName}?`,
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
              this.refreshDepList();
            } else {
              Swal.fire(resp.Message, '', 'error');
            }
          })
      }
    })
  }

  closeClick = () => {
    this.modelClose.nativeElement.click();
    this.ActiveDepartment = false;
    this.refreshDepList();
  }

}
