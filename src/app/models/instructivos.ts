import { Tipo } from "./tipos";

export interface Instructivo {
    id_instructivo: number;
    nombre: string;
    version: number;
    vigencia: boolean;
    estado: boolean;    
    clasificacion: string;
    fecha_inicio: string;
    fecha_fin: string;
    codigo: string;
    responsable: string;
    tipoInstructivo: Tipo;

}