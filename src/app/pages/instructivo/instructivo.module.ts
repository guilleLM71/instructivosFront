import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructivoPageRoutingModule } from './instructivo-routing.module';

import { InstructivoPage } from './instructivo.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SafeHtmlPipe } from 'src/app/utils/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructivoPageRoutingModule,
    SharedModule

  ],
  declarations: [InstructivoPage]
})
export class InstructivoPageModule {}
