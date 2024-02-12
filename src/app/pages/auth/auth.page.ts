import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private serviceData:DataServiceService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    const formdata = new FormData();
    formdata.append('usuario', "guille");
    formdata.append('password', '1234');
    formdata.append('grant_type', 'password');
    formdata.append('client_id', 'qrinstructivos');
    formdata.append('client_secret', 'KSd0LHkdlLyKNsRpmp2xUpFlJ5wiUwSL');    

    return this.serviceData.authUser(formdata)
    .subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('token', response.access_token);
    });
    console.log(this.form.value.usuario);
  }

  loginAdmin(){
    console.log("loginAdmin");
    this.router.navigate(['/admin']);
  }


}
