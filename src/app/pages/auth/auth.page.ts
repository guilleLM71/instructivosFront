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

  loginAdmin(){
    console.log("loginAdmin");
    this.router.navigate(['/admin']);
  }


}
