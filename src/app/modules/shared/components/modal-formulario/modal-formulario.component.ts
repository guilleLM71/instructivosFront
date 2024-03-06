import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  tipo!: number;
  archivo!: File;
  confidencia: string = '';
  codigo!: string;
  responsable!: string;
  tipos: Tipo[] = [];
  fileURL!: string;
  actualizar: boolean = false;
  defaultPdf!: File;
  fileForm!: FormGroup;

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    version: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    archivo: new FormControl('', [Validators.required]),
    confidencia: new FormControl('', [Validators.required]),

  });

  fechaInicio!: string;
  instructivo!: Instructivo;

  accion: string = '';

  constructor(
    private datosService: DataServiceService,
    private modalController: ModalController,
    private navParams: NavParams,
    private serviceScript: DataSharedService,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {
    this.instructivo = this.navParams.get('instructivo');
  }

  ngOnInit() {
    this.getTipos();
    this.esEditar();
    this.viewPdf(this.instructivo.id_instructivo , "instructivos_originales")
    this.setDefaultPdf(this.instructivo.id_instructivo, "instructivos_originales");
  }


  esEditar() {

    this.accion = this.navParams.get("accion");
    if (this.accion == "Editar") {
      this.nombre = this.instructivo.nombre;
      this.version = this.instructivo.version;
      this.tipo = this.instructivo.tipoInstructivo.id;
      this.confidencia = this.instructivo.clasificacion;
      this.codigo = this.instructivo.codigo;
      this.responsable = this.instructivo.responsable;
    } else {
      this.accion = "Agregar"
    }
  }

  async enviarDatos() {
    const formData = new FormData();
    // Agrega los datos del formulario según sea necesario
    formData.append('nombre', this.nombre);

    formData.append('version', this.version + '');

    formData.append('tipo', this.tipo + "");

    formData.append('file', this.archivo);

    formData.append('confidencia', this.confidencia);

    formData.append('codigo', this.codigo);

    formData.append('responsable', this.responsable);

    console.log(formData);

    // Llama al servicio para enviar los datos al backend
    await this.datosService.registrarInstructivo(formData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.actualizar = true;
        this.close();
        if (response) {
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
    formData.append('nombre', this.nombre);
    formData.append('version', this.version + '');
    formData.append('tipo', this.tipo+'');
    if (this.archivo == null || this.archivo == undefined){
      formData.append('file', this.defaultPdf);
    }else{
      formData.append('file', this.archivo);
    }
    formData.append('clasificacion', this.confidencia);
    formData.append('codigo', this.codigo);
    formData.append('responsable', this.responsable);
    await this.datosService
      .editarInstructivo(formData, this.instructivo.id_instructivo)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.actualizar = true;
          this.close();
          if (response) {
            this.mostrarToast('Se ha actualizado el instructivo');

          }
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
          this.mostrarToast('Ocurrio un error, no se ha podido actualizar el instructivo');

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

  viewPdf(pdfName: number, folder:string) {
    this.datosService.getPdf(pdfName, folder).subscribe(
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

  setDefaultPdf(pdfName: number, folder:string) {
    this.datosService.getPdf(pdfName, folder).subscribe(
      (data: any) => {
        // Crear un nuevo Blob a partir de los datos obtenidos
        const blob = new Blob([data], { type: 'application/pdf' });

        // Crear un nuevo archivo a partir del Blob
        this.defaultPdf = new File([blob], pdfName+'.pdf'); 

        console.log("defaultPdf " + this.defaultPdf);
      },
      error => {
        console.error('Error al obtener el archivo por defecto desde Minio:', error);
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

  close() {
    this.modalController.dismiss({
      actualizar: this.actualizar,
    });
  }
}
