import { Injectable } from '@angular/core';
//已再 AppModule 下註冊 HttpClient模組
import { HttpClient } from '@angular/common/http';
//rxjs 觀測者、被觀測者、Subject
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //建構值
  readonly APIUrl = 'https://localhost:44300/api';
  readonly PhotoUrl = 'https://localhost:44300/Photos/'

  constructor(private http: HttpClient) { }

  //#region Department
  getDepList = (): Observable<any> => {
    return this.http.get<any>(this.APIUrl + '/department');
  }

  addDepartment = (data: any) => {
    return this.http.post<any>(this.APIUrl + '/department', data);
  }

  updDepartment = (data: any) => {
    return this.http.put<any>(this.APIUrl + '/department', data);
  }

  delDepartment = (data: any) => {
    return this.http.delete<any>(this.APIUrl + '/department/' + data);
  }
  //#endregion

  //#region Employee
  getEmpList = (): Observable<any> => {
    return this.http.get<any>(this.APIUrl + '/Employee');
  }

  addEmployee = (data: any) => {
    return this.http.post<any>(this.APIUrl + '/Employee', data);
  }

  updEmployee = (data: any) => {
    return this.http.put<any>(this.APIUrl + '/Employee', data);
  }

  delEmployee = (data: any) => {
    return this.http.delete<any>(this.APIUrl + '/Employee/' + data);
  }
  //#endregion

  uploadPhoto = (data: any) => {
    return this.http.post<any>(this.APIUrl + '/Employee/SaveFile', data);
  }

  getAllDepartment = (): Observable<any> => {
    return this.http.get<any>(this.APIUrl + '/Employee/GetAllDepartment');
  }

}
