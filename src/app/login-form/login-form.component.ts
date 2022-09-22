import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { error } from 'protractor';
import { map } from 'rxjs/operators';
import { MainService } from '../main.service';
import { LoginUser,Response } from '../models/LoginUser';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
 reponse: Response
  loginFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  isLoading:boolean = false

  constructor(private router: Router, private dataService: MainService, private toastCtrl:ToastController, private fb: FormBuilder) { }

  

  Login = ( form: FormGroup) => {
    if(form.valid)
    {
      this.dataService.LoginUser(this.loginFormGroup.value).subscribe((data) => {
        
          this.reponse =data;
         
          this.loginFormGroup.reset();
          this.router.navigate(["tabs"]);
        },
        (err: HttpErrorResponse) => { if (err.status === 404) {
          this.toastCtrl.create({
      
            message: 'Invalid User Login Details',
            position: 'middle',
            duration: 2100,
            buttons: [
              {
                side: 'end',
                text: 'Close',
                role: 'cancel',
                handler: () => {
                  console.log('Close clicked');
                }
              }
            ]
          }).then((obj) => {
            obj.present();
          });
       
          this.loginFormGroup.reset();
         
          return;
        }
        if (err.status === 500) {
          this.toastCtrl.create({
      
            message: 'Internal Server Error',
            position: 'middle',
            duration: 2100,
            buttons: [
              {
                side: 'end',
                text: 'Close',
                role: 'cancel',
                handler: () => {
                  console.log('Close clicked');
                }
              }
            ]
          }).then((obj) => {
            obj.present();
          });
       
          this.loginFormGroup.reset();
         
          return;}}
        
      )
    }
  }
  ngOnInit(): void {
  }

}
