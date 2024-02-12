import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Instructivo } from '../models/instructivos';
import { Tipo } from '../models/tipos';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  instructivo: Instructivo[]=[];
  seleccionado = new BehaviorSubject<Instructivo|null>(null);
  url: string ="";

  private apiUrl = 'http://127.0.0.1:5050'; // Reemplaza esto con tu URL
  
  constructor(private http: HttpClient) { }

  getDataVigentes(): Observable<Instructivo[]> {
    return this.http.get<Instructivo[]>(`${this.apiUrl}/instructivos/vigentes`).pipe(map((data:any)=> {
      return this.instructivo = data;} ));
  }
  getData(): Observable<Instructivo[]> {
    return this.http.get<Instructivo[]>(`${this.apiUrl}/instructivos`).pipe(map((data:any)=> {
      return this.instructivo = data;} ));
  }
  getInstructivo(id: number): Observable<Instructivo> {
    return this.http.get<Instructivo>(`${this.apiUrl}/instructivos/${id}`).pipe();
  }

  enviarInstructivoSeleccionado(instructivo: Instructivo) {
    return this.seleccionado.next(instructivo);
  }

  obtenerInstructivoSeleccionado(id:number): Observable<Instructivo> {
    //return this.seleccionado.asObservable();
    return of(this.instructivo.find(instructivo => instructivo.id_instructivo === id) as Instructivo);
  }
  
  registrarInstructivo(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/instructivos`, formData);

  }

  editarInstructivo(formData: FormData, id: number): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/instructivos/${id}`, formData);
  }

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo>(`${this.apiUrl}/tipo-instructivos`).pipe(map((data:any)=> {
      return data;} ));
  }

  registrarTipo(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/tipo-instructivos`, formData);
  }

  aprobarInstructivo(id: number, formData: FormData): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/instructivos/vigencia_estado/${id}`, formData);
  }
  
  downloadInstructivoOriginal(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/instructivos/originales/${id}`).pipe();
  }

  downloadInstructivoEscaneado(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/instructivos/escaneados/${id}`).pipe();
  }

  anularInstructivo(id: number): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/instructivos/anular/${id}`,null);
  }


  authUser(formData: FormData): Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Access-Control-Allow-Origin', '*');  

    let urlencoded = new URLSearchParams();
    urlencoded.append("username", "guille");
    urlencoded.append("password", "1234");
    urlencoded.append("grant_type", "password");
    urlencoded.append("client_id", "qrinstructivos");
    urlencoded.append("client_secret", "KSd0LHkdlLyKNsRpmp2xUpFlJ5wiUwSL");

    return this.http.post<any>('https://keycloak.usecc.com/keycloak/realms/simacv2/protocol/openid-connect/token', urlencoded,{headers});
  }

  getPdf(pdfName: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/instructivos/instructivos_originales/${pdfName}`, { responseType: 'blob' });
  }
}
