import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { Instructivo } from 'src/app/models/instructivos';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ModalPDFComponent } from '../modal-pdf/modal-pdf.component';

import { ModalFormularioComponent } from '../modal-formulario/modal-formulario.component';

@Component({
  selector: 'app-tabla-admin',
  templateUrl: './tabla-admin.component.html',
  styleUrls: ['./tabla-admin.component.scss'],
})
export class TablaAdminComponent  implements OnInit {

  public instructivos: Instructivo[] = [];
  instructivoSeleccionado: Instructivo = {} as Instructivo;
  isModalOpen = false;
  @Input() urlSeleccionado!:boolean;
  url!: ArrayBuffer;
  @ViewChild(IonModal) modal!: IonModal;
  valor: string = "";
  dtOptions: DataTables.Settings = {};
  campo!: keyof Instructivo;
  archivo!: File;


  constructor(private dataService: DataServiceService, private modalController: ModalController, private toastController: ToastController) { }


  getData(): void {
    this.dataService.getData().subscribe((response: Instructivo[]) => {
      this.instructivos = response;
      console.log(response);

    });
  }

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      },
      scrollX: true,
    };
    this.getData();
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

  async openFormulario() {
    let modal = await this.modalController.create({
      component: ModalFormularioComponent,
      cssClass: 'modal-pdf'
    });

    return modal.present();
  }


  async openInstructivo(instructivo: Instructivo, accion:string) {
    let modal = await this.modalController.create({
      component: ModalFormularioComponent,
      cssClass: 'modal-pdf',
      componentProps: {
        instructivo,
        accion
      },
    });
    console.log(instructivo);
    return modal.present();
  }


  restarFechas(fechaInicial: string) : string {
    const tiempoInicial = fechaInicial.split("/");
    const dia = +tiempoInicial[0];
    const mes = +tiempoInicial[1]-1;
    const año = +tiempoInicial[2];
    const fecha = new Date(año, mes, dia).getTime();    
    const tiempoFinal = new Date().getTime();
    let resultado!: string;
    let dias: number = Math.floor((tiempoFinal - fecha) / (1000 * 60 * 60 * 24));
    if(dias > 30){
      resultado = "Hace "+ Math.trunc(dias/30)+" meses";
    }else if(dias > 365){
      resultado = "Hace "+ Math.trunc(dias/365)+" años" ;
    }else if(!Number.isNaN(dias) ){
      resultado ="Hace "+ dias+" días";
    } else{ 
      resultado = "hoy";
    }
    return resultado
  }

  recibirDatos(datos:string){
    this.valor = datos;
    this.instructivos = this.instructivos.filter((instructivo: Instructivo) => instructivo[this.campo] === this.valor);
  }
  recibirCampo(campo:string){
    this.campo = campo as keyof Instructivo;
  }

  onFileUpload(event: any) {
    this.archivo = event.target.files[0];
    console.log(this.archivo);
  }

  aprobarInstructivo(instructivo: Instructivo) {
    const formData = new FormData();
    formData.append('file', this.archivo);
    console.log(formData);

    this.dataService.aprobarInstructivo(instructivo.id_instructivo, formData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        // Maneja la respuesta del servidor según sea necesario
        if(response.status==200){
          this.mostrarToast('Se ha aprobado correctamente el instructivo');
        }
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
        this.mostrarToast('Ocurrio un error, no se ha podido aprobar el instructivo');
      },
    });
  }

  async anularInstructivo(instructivo: Instructivo) {
    await this.dataService.anularInstructivo(instructivo.id_instructivo).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        // Maneja la respuesta del servidor según sea necesario
        if(response.status==200){
          this.mostrarToast('Se ha anulado correctamente el instructivo');
        }
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
        this.mostrarToast('Ocurrio un error, no se ha podido anular el instructivo');
      },
    });
  }

  async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000 // Duración del toast en milisegundos
    });
    toast.present();
  }

}
