import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = ' ';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth) {
    this.loginForm = formBuilder.group({
      email: ['',Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  goToLogin()
  {
    this.error = '';
    const {email, pass} = this.loginForm.value;
    this.afAuth.signInWithEmailAndPassword(email, pass).then(user =>{
      console.log(user);
      this.router.navigate(['home']);
    }).catch(err => {
     this.error = err.message;
    }
    );
  }

}
