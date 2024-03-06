import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  token: string = "";

  constructor(private router: Router,) { 
    
  }

  ngOnInit() {
    
  }

  irLogin(){
    console.log("irLogin");
    this.router.navigate(['/inicio']);
  }

}
