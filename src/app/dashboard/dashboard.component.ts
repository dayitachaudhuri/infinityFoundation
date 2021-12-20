import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service' ;
import { EmployeeModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 
  formValue !:FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id : [''],
      name : [''],
      email : [''],
      contact : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModelObj.id= this.formValue.value.id;
    this.employeeModelObj.name= this.formValue.value.name;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.contact= this.formValue.value.contact;
    this.employeeModelObj.salary= this.formValue.value.salary;
  
    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref= document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong. Please try again.");
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
    })
  }

  onEdit(row : any){
    this.formValue.controls["id"].setValue(row.id);
    this.formValue.controls["name"].setValue(row.name);
    this.formValue.controls["email"].setValue(row.contact);
    this.formValue.controls["contact"].setValue(row.email);
    this.formValue.controls["salary"].setValue(row.salary);
  }

}
