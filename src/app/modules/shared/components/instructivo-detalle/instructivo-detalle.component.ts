import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructivo } from 'src/app/models/instructivos';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-instructivo-detalle',
  templateUrl: './instructivo-detalle.component.html',
  styleUrls: ['./instructivo-detalle.component.scss'],
})
export class InstructivoDetalleComponent  implements OnInit {

  instructivoSeleccionado: Instructivo = {} as Instructivo;

  constructor(private compartirDatosService: DataServiceService, private route: ActivatedRoute, private location:Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      // Hacer lo que necesites con el parámetro 'id'
    });
    //this.getInstructivo();
  }

  getInstructivo(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.compartirDatosService.getInstructivo(id)
      .subscribe(response => this.instructivoSeleccionado = response);
  }

}
