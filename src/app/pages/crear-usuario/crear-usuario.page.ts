import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  usuario:Persona;
  nombreUser:string;
  editar:boolean = false;
  titulo:string = "Registro de Usuario";

  constructor( private personaService:PersonasService,
                private router:Router,
                private route:ActivatedRoute,
                private alertCtrl: AlertController){}

  ngOnInit() {

    this.nombreUser = this.route.snapshot.params["user"];
    
    if( this.nombreUser ){
      this.titulo="Edición de Usuario";
      this.editar = true;
      this.usuario = this.personaService.buscarUsuario( this.nombreUser);
    } else{
      this.usuario = {
        nombre: '',
        apellido: '',
        nombreUsuario: '',
        edad: null,
        contrasena:'',
        email:'',
        telefono:''
        
      }
    }

    
    
  }

  guardarDatos(){

    if( this.editar == true){
      this.personaService.editarUsuario( this.nombreUser, this.usuario );
      this.presentAlert("editó");
    } else{
      this.personaService.guardarUsuario(this.usuario);
      this.presentAlert("guardó");
    }

    this.router.navigate([ "/usuarios" ]);

  }

  async presentAlert( info:string ) {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      // subHeader: 'Subtitle',
      message: 'El usuario ' + this.usuario.nombreUsuario + " se " + info + " correctamente",
      buttons: [
        // {
        //   text: 'Cancelar',
        //   role: 'cancel',
        //   handler: (blah) => {
        //     console.log('Se seleccionó Cancelar');
        //   }
        // },
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
