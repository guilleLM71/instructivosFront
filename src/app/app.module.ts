import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { SafeHtmlPipe } from './utils/safe-html.pipe';
import { SharedModule } from './modules/shared/shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import {DataTablesModule} from 'angular-datatables'


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:9090/api'],
          sendAccessToken: true
      }}),
    
  ],

  providers: [
    { 

    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy, 
    
  }, provideHttpClient(withFetch())
],
  bootstrap: [AppComponent],
})
export class AppModule {}
