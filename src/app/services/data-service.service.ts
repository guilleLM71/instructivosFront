import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Instructivo } from '../models/instructivos';
import { Tipo } from '../models/tipos';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  instructivo: Instructivo[] = [];
  seleccionado = new BehaviorSubject<Instructivo | null>(null);
  url: string = "";
  accessToken!: string | null;

  private apiUrl = 'http://127.0.0.1:5050'; // Reemplaza esto con tu URL

  constructor(private http: HttpClient) {
    this.accessToken = sessionStorage.getItem('access_token');
   }



  getDataVigentes(): Observable<Instructivo[]> {
    
    return this.http.get<Instructivo[]>(`${this.apiUrl}/instructivos/vigentes`).pipe(map((data: any) => {
      return this.instructivo = data;
    }));
  }
  getData(): Observable<Instructivo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get<Instructivo[]>(`${this.apiUrl}/instructivos`,{headers}).pipe(map((data: any) => {
      return this.instructivo = data;
    }));
  }
  getInstructivo(id: number): Observable<Instructivo> {
    return this.http.get<Instructivo>(`${this.apiUrl}/instructivos/${id}`).pipe();
  }

  enviarInstructivoSeleccionado(instructivo: Instructivo) {
    return this.seleccionado.next(instructivo);
  }

  obtenerInstructivoSeleccionado(id: number): Observable<Instructivo> {
    //return this.seleccionado.asObservable();
    return of(this.instructivo.find(instructivo => instructivo.id_instructivo === id) as Instructivo);
  }

  registrarInstructivo(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post<any>(`${this.apiUrl}/instructivos`, formData, {headers});

  }

  editarInstructivo(formData: FormData, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.put<any>(`${this.apiUrl}/instructivos/${id}`, formData, {headers});
  }

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo>(`${this.apiUrl}/tipo-instructivos`).pipe(map((data: any) => {
      return data;
    }));
  }

  registrarTipo(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tipo-instructivos`, formData);
  }

  aprobarInstructivo(id: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.put<any>(`${this.apiUrl}/instructivos/vigencia_aprobado/${id}`, formData, {headers});
  }

  downloadInstructivoOriginal(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/instructivos/download_originales/${id}`).pipe();
  }

  downloadInstructivoEscaneado(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/instructivos/download_escaneados/${id}`).pipe();
  }

  anularInstructivo(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.put<any>(`${this.apiUrl}/instructivos/anular/${id}`, null, {headers});
  }

  getPdf(pdfName: number, folder: string ): Observable<any> {
    return this.http.get(`${this.apiUrl}/instructivos/${folder}/${pdfName}`, { responseType: 'blob' });
  }
}
