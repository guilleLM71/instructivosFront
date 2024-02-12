import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe } from 'src/app/utils/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  declarations: [InicioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InicioPageModule {}
