import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  usuarios:Map<string, Persona> = new Map();
  personas:Persona[];
  
  constructor( private http:HttpClient ){

    // this.personas.forEach(persona => {
    //   this.usuarios.set( persona.nombreUsuario, persona );
    // });

    this.http.get<Persona[]>('/assets/Json/personas.json').subscribe(
      data => {
        data.forEach(usuario => {
          this.usuarios.set( usuario.nombreUsuario, usuario );
        });
      }
    );
  }

  getPersonas() {
    return this.usuarios;
    
  }

  guardarUsuario( persona:Persona ){
   this.usuarios.set(persona.nombreUsuario, persona);
  }

  editarUsuario( nombreUsuario:string, persona:Persona ){
    this.eliminarUsuario( nombreUsuario);
    this.guardarUsuario( persona);
  }

  eliminarUsuario( nombreUsuario:string ){
    this.usuarios.delete(nombreUsuario);
  }

  buscarUsuario( nombreUsuario:string ){
    return this.usuarios.get( nombreUsuario);
  }

}
