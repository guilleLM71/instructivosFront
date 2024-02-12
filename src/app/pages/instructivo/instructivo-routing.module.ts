import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructivoPage } from './instructivo.page';
import { InstructivoDetalleComponent } from '../../modules/shared/components/instructivo-detalle/instructivo-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: InstructivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructivoPageRoutingModule {}
