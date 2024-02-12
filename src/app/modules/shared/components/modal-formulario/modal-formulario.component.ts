import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { event } from 'jquery';
import { Instructivo } from 'src/app/models/instructivos';
import { Tipo } from 'src/app/models/tipos';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DataSharedService } from 'src/app/services/data-shared.service';

@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.scss'],
})
export class ModalFormularioComponent implements OnInit {
  nombre!: string;
  version!: number;
  fecha_inicio!: any;
  tipo!: Tipo;
  archivo!: File;
  confidencia: string = '';
  tipos: Tipo[] = [];
  fileURL!:string;

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    version: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    archivo: new FormControl('', [Validators.required]),
    confidencia: new FormControl('', [Validators.required]),

  });

  fechaInicio!: string;
  instructivo!: Instructivo;

  accion:string = '';

  constructor(
    private datosService: DataServiceService,
    private modalController: ModalController,
    private navParams: NavParams,
    private serviceScript: DataSharedService,
    private toastController: ToastController
  ) {
    this.instructivo = this.navParams.get('instructivo');
  }

  ngOnInit() {    
    this.getTipos();
    this.esEditar();
    this.viewPdf(this.instructivo.id_instructivo)

  }
  esEditar() {
    
      this.accion = this.navParams.get("accion");
      console.log(this.accion)     
    
      if(this.accion=="Editar"){
      this.nombre = this.instructivo.nombre;
      this.version = this.instructivo.version;
      this.tipo = this.instructivo.tipoInstructivo;
      console.log(this.tipo);
      this.confidencia = this.instructivo.clasificacion;
      }else{
      this.accion = "Agregar"
      }
  }

  async enviarDatos() {
    const formData = new FormData();
    // Agrega los datos del formulario según sea necesario
    formData.append('nombre', this.nombre);

    formData.append('version', this.version + '');

    //formData.append('fecha_inicio', this.fecha_inicio);

    formData.append('id_tipo', this.tipo.id+"");

    formData.append('file', this.archivo);

    formData.append('confidencia', this.confidencia);

    console.log(formData);

    // Llama al servicio para enviar los datos al backend
    await this.datosService.registrarInstructivo(formData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if(response.status==200){
          this.mostrarToast('Se ha registrado el instructivo');
        }
        // Maneja la respuesta del servidor según sea necesario
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
        this.mostrarToast('Ocurrio un error, no se ha podido registrar el instructivo');
        // Maneja el error según sea necesario
      },
    });
  }

  async editarDatos() {
    const formData = new FormData();
    // Agrega los datos del formulario según sea necesario
    formData.append('nombre', this.nombre);

    formData.append('version', this.version + '');

    formData.append('id_tipo', this.tipo.id+"");

    formData.append('file', this.archivo);

    formData.append('clasificacion', this.confidencia);


    console.log(formData);

    // Llama al servicio para enviar los datos al backend
    await this.datosService
      .editarInstructivo(formData, this.instructivo.id_instructivo)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if(response.status==200){
            this.mostrarToast('Se ha actualizado el instructivo');
          }
          // Maneja la respuesta del servidor según sea necesario
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
          this.mostrarToast('Ocurrio un error, no se ha podido actualizar el instructivo');
          // Maneja el error según sea necesario
        },





      });
  }


  onFileUpload(event: any) {
    this.archivo = event.target.files[0];
  }

  obtenerTipoDocumento(event: any) {
    this.tipo = event.detail.value;
    console.log(this.tipo);
  }

  obtenerConfidencia(event: any) {
    this.confidencia = event.detail.value;
  }

  obtenerFechaSeleccionada(event: any) {
    this.fecha_inicio = event.detail.value; 
  }

  viewPdf(pdfName: number) {
    this.datosService.getPdf(pdfName).subscribe(
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


  getTipos(): void {
    this.datosService.getTipos().subscribe((response: Tipo[]) => {
      this.tipos = response;
    });
  }

  async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000 // Duración del toast en milisegundos
    });
    toast.present();
  }

  compareWithFn = (o1:Tipo) => {
    return o1.id === this.tipo.id;
  };

  compareWith = this.compareWithFn;

  close() {
    this.modalController.dismiss();
  }
}
