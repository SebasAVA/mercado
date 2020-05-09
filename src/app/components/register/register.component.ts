import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupName } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';

  constructor(private router: Router,
    formBuilder: FormBuilder, private sfAuth: AngularFireAuth) {
    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {

  }
  registerUser()
  {
    this.error = '';
    const {email,password} = this.registerForm.value;
    this.sfAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() =>
    {      this.router.navigate(['home']);}
    )
    .catch(({message}) => {
      this.error = message;
    }) ;
  }


}
