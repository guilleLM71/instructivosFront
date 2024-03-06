import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructivo } from 'src/app/models/instructivos';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-instructivo',
  templateUrl: './instructivo.page.html',
  styleUrls: ['./instructivo.page.scss'],
})
export class InstructivoPage implements OnInit {
  instructivoSeleccionado: Instructivo = {} as Instructivo;
  urlOriginal: any = '';
  urlEscaneado: any = '';
  fileURL: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) 
  {}

  ngOnInit() {
    this.getID();    
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.viewPdf(id, "instructivos_escaneados");
    this.downloadOriginal(id);
    this.downloadEscaneado(id);
  }

  getID(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.dataService
      .getInstructivo(id)
      .subscribe((instructivo: Instructivo) => {
        this.instructivoSeleccionado = instructivo;
      });
  }

  downloadOriginal(id: number) {
    this.dataService
      .downloadInstructivoOriginal(id)
      .subscribe((data: any) => {
        this.urlOriginal = data.url;  
        console.log(this.urlOriginal);      
      });
  }
  downloadEscaneado(id: number){
    this.dataService
      .downloadInstructivoEscaneado(id)
      .subscribe((data: any) => {
        this.urlEscaneado = data.url;   
        console.log(this.urlEscaneado);     
      });

  }

  viewPdf(pdfName: number, folder: string) {
    this.dataService.getPdf(pdfName, folder).subscribe(
      (response: any) => {
        const file = new Blob([response], { type: 'application/pdf' });
        this.fileURL = URL.createObjectURL(file);
        console.log("file URL " + this.fileURL);
        //window.open(this.fileURL);
      },
      error => {
        console.error('Error al obtener el PDF:', error);
      }
    );
  }
}
