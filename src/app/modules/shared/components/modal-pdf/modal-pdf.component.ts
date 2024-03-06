import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Instructivo } from 'src/app/models/instructivos';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SafeHtmlPipe } from 'src/app/utils/safe-html.pipe';
//import { SafeHtmlPipe } from 'src/app/utils/safe-html.pipe';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.scss'],
})
export class ModalPDFComponent implements OnInit {
  //@Input() instructivo!: Instructivo;
  public instructivo!: Instructivo;
  url!:string ;
  folder!:string;
  fileURL!:string; 
 

  constructor(private modalController: ModalController, private navParams: NavParams, private dataService: DataServiceService ) {
    this.instructivo = this.navParams.get('instructivo');
    this.url = this.navParams.get('url');
    this.folder = this.navParams.get('folder');
    console.log(this.url);
  }
  
  ngOnInit() {
    this.viewPdf(this.instructivo.id_instructivo);
  }


  viewPdf(pdfName: number) {
    this.dataService.getPdf(pdfName, this.folder).subscribe(
      (response: any) => {
        const file = new Blob([response], { type: 'application/pdf' });
        this.fileURL = URL.createObjectURL(file);
        console.log("file URL "+this.fileURL);
        //window.open(this.fileURL);
      },
      error => {
        console.error('Error al obtener el PDF:', error);
      }
    );
  }

  
  close(){
    this.modalController.dismiss();
  }
}
