import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { InstructivoDetalleComponent } from 'src/app/modules/shared/components/instructivo-detalle/instructivo-detalle.component';

const routes: Routes = [
  { path: '', component: AdminPage },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
