import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
isLogainMode = true;
isLoading = false
error :string = null
constructor( private authService:AuthService, private router: Router){}

onSwitchMode(){
  this.isLogainMode = !this.isLogainMode
}
onSubmit(form: NgForm){
  if(!form.valid){
    return
  }
  const email = form.value.email;
  const password = form.value.password;

  let authObs : Observable<AuthResponseData>;
  // if it start to load form
  this.isLoading = true
  if(this.isLogainMode){
   authObs=  this.authService.login(email,password)
  }
  else{
   authObs = this.authService.signUp(email,password)
  }
   authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes'])

      // after end loading form
    },errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false
    })
  }

  onHandleError(){
    this.error =null
  }

  //  form.reset(){}
}

