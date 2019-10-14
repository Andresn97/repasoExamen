import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: Map<string,Persona>;

  constructor( private personaService:PersonasService ){}

  ngOnInit( ) {

    // this.personaService.cargarUsuarios().subscribe(
    //   data => {
    //     this.usuarios = data;
    //     console.log(data);
        
    //   }
    // );

    this.usuarios = this.personaService.getPersonas();
    
    
  }

  eliminarUser( usuario:Persona){
    this.personaService.eliminarUsuario(usuario.nombreUsuario);
  }

}
