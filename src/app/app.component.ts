import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  helper: JwtHelperService =  new JwtHelperService();
  token!:string| null;
  decoded!: any; 
  constructor(private router: Router, private oauthService: OAuthService) {
    this.configure();
    this.token= sessionStorage.getItem('access_token');
    this.decoded = this.helper.decodeToken(this.token!);
    console.log(this.decoded);
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/servicios',    
    redirectUri: window.location.origin + "/admin",
    clientId: 'instructivos',
    scope: 'openid profile email',
    responseType: 'code',
    // at_hash is not present in JWT token
    disableAtHashCheck: true,
    showDebugInformation: true
  }
  
  public login() {
    this.oauthService.initLoginFlow();
  }
  
  public logoff() {
    this.oauthService.revokeTokenAndLogout();

  }
  
  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new  NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
