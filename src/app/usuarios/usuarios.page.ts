import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from "moment";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor(private fbs: FirestoreService,private firestoreService: FirestoreService,private modalCtrl: ModalController , public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto

  tittle: string
  tema: string
  reporte: string
  usuarios = [];

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
    this.get_comunicados();
  }

  get_comunicados(){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/usuarios").subscribe((servicios) => {
      this.usuarios = [];
      servicios.forEach((datosTarea: any) => {
        this.usuarios.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de comunicados")
      console.log(this.usuarios)
    });
}

  upload_publication(){
    if ($("#tittle").val() == "" || $("#tema").val() == "" || $("#reporte").val() == "") {
      this.presentAlert("Debes rellenar todos los espacios")
    console.log("rellena todo maldito")
    } else {
       var timei = new Date(Date.now());
    var ti = moment(timei).format('h:mm:ss a'); 
    var dt = moment(timei).format('DD-MM-YYYY'); 
    console.log("AHSHAJWSasasJDJA")
    let comunicado = {
      titulo: this.tittle,
      tema: this.tema,
      reporte: this.reporte,
      dia: dt,
      hora: ti
    };
    this.firestoreService.add("Proyectos/"+this.proyecto+"/comunicados", comunicado )
    $("#tittle").val("")
    $("#tema").val("")
    $("#reporte").val("")
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

  async presentAlertdone() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!',
      subHeader: 'Formulario enviado con exito',
      message: 'Gracias por tus sugerencias.',
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  delete(usuario){
    //console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
    this.fbs.delete_doc("Proyectos/"+this.proyecto+"/usuarios", usuario).then(() => {
      // Actualizar la lista completa
     // this.consultar_lista_servicios();
      // Limpiar datos de pantalla
      //this.tareaEditando = {} as Tarea;
    })
  
    // this.fbs.delete_doc("Admins/"+this.current_user_uid+"/proyectos",proyecto).then(() => {
    //   // Actualizar la lista completa
    //   this.consultar_lista_servicios();
    //   // Limpiar datos de pantalla
    //   //this.tareaEditando = {} as Tarea;
    // })
    
  }
}
