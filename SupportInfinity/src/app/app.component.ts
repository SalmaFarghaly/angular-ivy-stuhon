import { Component } from '@angular/core';
import {Router}      from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SupportInfinity';


  ngOnInit(): void {
    console.log(this.router.url)
    if(this.router.url==='/profile'){
      console.log("Init Profile")
      this.addActiveProfile()
      
    }
    else{
      console.log("Init Home")
      this.addActiveHome()
     
    }

  }
  constructor(private router:Router){
    
  }
  home(){
    console.log("Homee")
    this.router.navigate([''])
    this.addActiveHome()
  }
  profile(){
    console.log('Profile')
    this.router.navigate(['/profile'])
    this.addActiveProfile()
  }
  addActiveHome(){
    var home=document.getElementById("home");
    home.className="active"
    var profile=document.getElementById("profile");
    profile.className="inactive"

  }
  addActiveProfile(){
    var home=document.getElementById("home");
    home.className="inactive"
    var profile=document.getElementById("profile");
    profile.className="active"

  }
}
