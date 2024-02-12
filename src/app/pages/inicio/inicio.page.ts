import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { Observable } from 'rxjs';
import { Instructivo } from 'src/app/models/instructivos';
import { ModalPDFComponent } from 'src/app/modules/shared/components/modal-pdf/modal-pdf.component';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  
  constructor(private router: Router) {}

  ngOnInit(): void {
   
  }

  irLogin(){
    console.log("irLogin");
    this.router.navigate(['/auth']);
  }

}
