import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm : FormGroup;
  forbiddenUsers = ['anna', 'jack'];


  get hobbyControls() {
    return (this.signupForm.get('hubbies') as FormArray).controls;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({'username' : new FormControl(null,[Validators.required, this.forbiddenUserValidation.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmailsValidation)
      }),
      'gender': new FormControl('male'),
      'hubbies': new FormArray([])
    });
    this.signupForm.patchValue({
     userData: {
       username : 'anna'
     }
    })
  }
  onSubmit(){
    console.log(this.signupForm)
    this.signupForm.reset({gender: 'male'})
  }

  onAddHubby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hubbies')).push(control)
  }
  forbiddenUserValidation(control:FormControl):{[s:string]: boolean}{
    if (this.forbiddenUsers.indexOf(control.value) !== -1) {
      return {invalidName: true}
    }
        return null
    }
  forbiddenEmailsValidation(control:FormControl): Observable<any> | Promise<any>{
    return new Promise(resolve => {
      setTimeout(()=>{
        if (control.value === 'test@test.com'){
          resolve ({'invalidEmail': true})
        }else {
          resolve(null)
        }
      },2000)
    })
  }



}
