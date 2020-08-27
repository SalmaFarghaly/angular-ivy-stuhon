import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from '../shared/filter.pipe';
import {ClickOutsideDirective} from '../shared/dropdown.directive';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [  SearchFilterPipe , ClickOutsideDirective]
})

export class ProfileComponent implements OnInit {

  
  myForm:FormGroup;
  message:string=""
  titleAlert:string="Error:Skill is selected twice"
  firstName:string="";
  lastName:string="";
  firstSkill:string="";
  secondSkill:string="";
  thirdSkill:string="";
  showDropDown:boolean=false;
  showSecondDropDown:boolean=false;
  showThirdDropDown:boolean=false;
  duplicateSkill:boolean=false;

  options:string[]=['Java', 'C++', 'Python', 'Matlab', 'Git', 'VsCode', 'DataStructure', 'Communication Skills'];


  constructor(private fb:FormBuilder,public searchFilter:SearchFilterPipe,public clickOutside:ClickOutsideDirective) { 
    this.myForm=fb.group({
      'FirstName':['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]] ,
      'LastName':['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      'FirstSkill':['',Validators.required],
      'SecondSkill':['',Validators.required],
      'ThirdSkill':['',Validators.required],
     })

  }

  ngOnInit(): void {
    //get Data from local storage
    this.firstName=localStorage.getItem('firstName')
    this.lastName=localStorage.getItem('lastName')
    this.firstSkill=localStorage.getItem('firstSkill')
    this.secondSkill=localStorage.getItem('secondSkill')
    this.thirdSkill=localStorage.getItem('thirdSkill')
  }


  submit(){
    //Check if all fields are valid then save them in local storage
    if(this.firstSkill===this.secondSkill||this.secondSkill===this.thirdSkill||this.firstSkill===this.thirdSkill){
        this.duplicateSkill=true;
        return;
      }
    else
      {
        if(this.firstName.length>=2&&this.firstName.length<=20&&this.lastName.length>=2&&this.lastName.length<=20){
          localStorage.setItem('firstName',this.firstName)
          localStorage.setItem('lastName',this.lastName)
          localStorage.setItem('firstSkill',this.firstSkill)
          localStorage.setItem('secondSkill',this.secondSkill)
          localStorage.setItem('thirdSkill',this.thirdSkill)
        }

      }
  }

  get FirstName(){
    return this.myForm.get('FirstName');
  }
  get LastName(){
    return this.myForm.get('LastName');
  }
  get SecondSkill(){
    return this.myForm.get('SecondSkill')
  }
  get FirstSkill(){
    return this.myForm.get('FirstSkill')
  }
  toggleDropDown(){
    this.showDropDown=!this.showDropDown;
  }
  closeDropDown() {
    this.showDropDown = false;
  }

  closeSecondDropDown() {
    this.showSecondDropDown = false;
  }
  closeThirdDropDown() {
    this.showThirdDropDown = false;
  }
  toggleSecondDropDown(){
    this.showSecondDropDown=!this.showSecondDropDown;

  }
  toggleThirdDropDown(){
    this.showThirdDropDown=!this.showThirdDropDown;

  }
  getSearchValue() {
    return this.myForm.value.FirstSkill;
  }
  getSecondSearchValue() {
    return this.myForm.value.SecondSkill;
  }
  getThirdSearchValue() {
    return this.myForm.value.ThirdSkill;
  }
  selectValue(option){
    this.myForm.patchValue({"FirstSkill":option})
    this.showDropDown = false;
  }
  selectSecondValue(option){
    this.myForm.patchValue({"SecondSkill":option})
    this.showSecondDropDown=false
  }
  selectThirdValue(option){
    this.myForm.patchValue({"ThirdSkill":option})
    this.showThirdDropDown=false
  }

}
