import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Instructivo } from 'src/app/models/instructivos';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ModalPDFComponent } from '../modal-pdf/modal-pdf.component';

@Component({
  selector: 'app-tabla-vigentes',
  templateUrl: './tabla-vigentes.component.html',
  styleUrls: ['./tabla-vigentes.component.scss'],
})
export class TablaVigentesComponent implements OnInit {
  public instructivos: Instructivo[] = [];
  instructivoSeleccionado: Instructivo = {} as Instructivo;
  isModalOpen = false;
  @Input() urlSeleccionado!:boolean;
  url!: ArrayBuffer;
  @ViewChild(IonModal) modal!: IonModal;
  dtOptions: DataTables.Settings = {};
  constructor(private dataService: DataServiceService, private modalController: ModalController) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };
    this.getData();
  }

  getData(): void {
    this.dataService.getDataVigentes().subscribe((response: Instructivo[]) => {
      this.instructivos = response;
      console.log(response);
    });
  }

  verDetalle(id: number) {
    //this.dataService.enviarInstructivoSeleccionado(instructivo);
    this.dataService
      .obtenerInstructivoSeleccionado(id)
      .subscribe((instructivo) => {
        this.instructivoSeleccionado = instructivo;

      });
  }
  close() {
    this.modal.dismiss(null, 'cancel');
  }


  async open(instructivo: Instructivo, url: string) {
    let modal = await this.modalController.create({
      component: ModalPDFComponent,
      cssClass: 'modal-pdf',
      componentProps: {
        instructivo, 
        url
      },
    });
    return modal.present();
  }

}
