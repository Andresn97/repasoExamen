import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario:Persona = {};
  usuarios:Map<string, Persona>;

  constructor( private menuCtrl:MenuController,
                private personaServicio:PersonasService,
                private router:Router,
                private alertCtrl:AlertController){}

  ngOnInit() {

    this.usuarios = this.personaServicio.getPersonas();

  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  iniciarSesion(){
    // let valido:boolean = false;
    if( this.personaServicio.buscarUsuario( this.usuario.nombreUsuario )){
      this.presentAlert(" Correcto");
      this.router.navigate(["/usuarios"]);
      this.usuario = {};

    } else{
      this.presentAlert(" Incorrecto");
      this.usuario = {};
    }
  }

  async presentAlert( info:string ) {
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      message: "Usuario " + info,
      buttons: [
         {
          text: 'Ok',
          handler: () => {
            console.log('Se seleccionó Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
