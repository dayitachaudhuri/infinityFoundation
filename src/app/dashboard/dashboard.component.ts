import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 
  formValue !:FormGroup;
  constructor(private formbuilder: FormBuilder) { }
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id : [''],
      name : [''],
      email : [''],
      contact : [''],
      salary : ['']
    })
  }

}
