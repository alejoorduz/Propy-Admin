import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {

  constructor(private fbs: FirestoreService,private callNumber: CallNumber,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto

  nombre_numero;
  numero;
 
  numeros = [];
  comunicados  = [

    {"titulo":"Linea de Emergencia",
    "subtitulo":"123",
    "icon":"call-outline"},

    {"titulo":"Policia Nacional",
    "subtitulo":"112",
    "icon":"call-outline"},

    {"titulo":"Policia de Tránsito",
    "subtitulo":"127",
    "icon":"call-outline"},

    {"titulo":"Defensa Civil",
    "subtitulo":"144",
    "icon":"call-outline"},

    {"titulo":"Bomberos",
    "subtitulo":"119",
    "icon":"call-outline"},

    {"titulo":"Cruz Roja",
    "subtitulo":"132",
    "icon":"call-outline"},

    {"titulo":"Ambulancias",
    "subtitulo":"125",
    "icon":"call-outline"},

    {"titulo":"Gaula",
    "subtitulo":"165",
    "icon":"call-outline"},

    {"titulo":"Atención Desastres",
    "subtitulo":"111",
    "icon":"call-outline"},

    {"titulo":"Violencia a Mujeres",
    "subtitulo":"155",
    "icon":"call-outline"},

    {"titulo":"DirecTv",
    "subtitulo":"6015185656",
    "icon":"call-outline"},

    {"titulo":"Vanti",
    "subtitulo":"6013078121",
    "icon":"call-outline"},

    {"titulo":"ETB",
    "subtitulo":"6013777777",
    "icon":"call-outline"},

    {"titulo":"Movistar",
    "subtitulo":"3152333333",
    "icon":"call-outline"},

    {"titulo":"TIGO",
    "subtitulo":"018000422222",
    "icon":"call-outline"},

    {"titulo":"CLARO",
    "subtitulo":"6017441818",
    "icon":"call-outline"}
  ]

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
   this.get_comunicados();
  }

  upload_publication(){
    if ($("#nombre_numero").val() == "" || $("#numero").val() == "") {
      this.presentAlert("Debes rellenar todos los espacios")
    } else {
       var timei = new Date(Date.now());
   // var ti = moment(timei).format('h:mm:ss a'); 
   // var dt = moment(timei).format('DD-MM-YYYY'); 
    let numero = {
      nombre: this.nombre_numero,
      numero: this.numero
    };

    var id = Math.floor(Math.random() * 3213546846468435454) + 1
    console.log("random",id)
    var sid = id.toString()
    this.fbs.insertar("Proyectos/"+this.proyecto+"/directorio/", sid, numero )
    //this.fbs.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/mascotas/", sid, numero )
    $("#nombre_numero").val("");
    $("#numero").val("");
    this.presentAlertdone();
    }
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Verifica el error',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  get_comunicados(){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/directorio").subscribe((servicios) => {
      this.numeros = [];
      servicios.forEach((datosTarea: any) => {
        this.numeros.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de comunicados")
      console.log(this.numeros)
    });
}

  async presentAlertdone() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Listo!',
      subHeader: 'Registro exitoso',
      message: 'Número guardado',
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  llamar(number){
    console.log("Entre a la llamada de emergencia")
    this.callNumber.callNumber(number, true)
   .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  delete(comunicado){
    const res = confirm("¿Estás seguro que quieres borrar este número?");
    if(res){
       this.fbs.delete_doc("Proyectos/"+this.proyecto+"/directorio", comunicado).then(() => {
     })
    }
   }
}

