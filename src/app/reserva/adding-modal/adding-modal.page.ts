import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import * as $ from "jquery";
import { data } from 'jquery';
import { ModalController } from "@ionic/angular";
import { FirestoreService } from '../../firestore.service';
import * as moment from 'moment';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx'
import { ELocalNotificationTriggerUnit } from '@awesome-cordova-plugins/local-notifications';
//ionic 6.16.1, angular 13.0.4, Node 16.13.1 , npm 8.3.0, rxjs 6.6.7

@Component({
  selector: 'app-adding-modal',
  templateUrl: './adding-modal.page.html',
  styleUrls: ['./adding-modal.page.scss'],
})
export class AddingModalPage implements OnInit{  

  @Input() uid
  @Input() nombre
  @Input() proyecto
  //-----------------datos del formulario--------------------------
  //servicio del edificio
  servicio: string  //= "Piscina"
  //variables del picker de dias de la semana en los que el servicio esta habilitado
  lunes: boolean
  martes: boolean
  miercoles: boolean
  jueves: boolean
  viernes: boolean
  sabado: boolean
  domingo: boolean

  //Variables del picker de horas admitidas por reserva, hora inicial y final
  hora_inicial: number
  hora_final: number
  max_reserva: number
  hora_restringida: number
  periodo: number

  //Hora y dia a la que se hizo la configuracion
  dia_guardado
  hora_guardado
  
//,public alertController: AlertController,public formModule: FormsModule
  constructor(private alertCtrl: AlertController,private localNotifications: LocalNotifications, public navCtrl: NavController,private storage: Storage,private modalCtrl: ModalController,private firestoreService: FirestoreService) { }

  
  ngOnInit(): void {
     //this.storage.create();
  }

  async ionViewWillEnter() {
    await this.storage.create();
  }

 //funcion que guarda los dias de la semana habilitados en un array
  submitForm() {
   // this.update_notification();
          if ($("#hora_restringida").val() == "" || $("#servicio").val() == "" || $("#hora_inicial").val() == "" || $("#hora_final").val() == "" || $("#max_reserva").val() == "" || $("#periodo").val() == "") {
            console.log("vacioo")
           this.presentAlert("Todos los campos deben estar llenos")
          }else{
              this.hora_inicial = parseInt($("#hora_inicial").val())
              this.hora_final = parseInt($("#hora_final").val())
              //console.log(this.hora_inicial,typeof(this.hora_inicial),this.hora_final, typeof(this.hora_final), typeof(3))
              if(this.hora_inicial > this.hora_final){
                console.log("la hora inicial no puede ser menor a la final")
                this.presentAlert("La Hora final no puede ser menor a la hora inicial")
              }else{
                  console.log("entre")
                  this.servicio = $("#servicio").val()
                  this.lunes = $("#lunes").prop("checked")
                  this.martes = $("#martes").prop("checked")
                  this.miercoles = $("#miercoles").prop("checked")
                  this.jueves = $("#jueves").prop("checked")
                  this.viernes = $("#viernes").prop("checked")
                  this.sabado = $("#sabado").prop("checked")
                  this.domingo = $("#domingo").prop("checked")
                  this.hora_inicial = $("#hora_inicial").val()
                  this.hora_final = $("#hora_final").val()
                  this.max_reserva = $("#max_reserva").val()
                  this.periodo = $("#periodo").val()
                  this.hora_restringida = $("#hora_restringida").val()
                  //this.storage.set('servicio 1', this.martes);
                  console.log(this.servicio,this.lunes , this.martes, this.miercoles,this.jueves, this.viernes, this.sabado, this.domingo , this.hora_inicial , this.hora_final,this.max_reserva,this.periodo)
                  this.upload_reservation_data()
                  setTimeout(()=>{
                    this.modalCtrl.dismiss();
                  },300)
        }
     }
  }

  async presentAlert(mensaje) {
    const alert = await this.alertCtrl.create({
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

  update_notification(){
    console.log("sending notification in 10 seconds")
    this.localNotifications.schedule({
      title: 'Alerta de Reservas',
      text: 'Recuerda configurar los horarios de esta semana',
      trigger: { in: 10, unit: ELocalNotificationTriggerUnit.SECOND },
      //trigger: { every: ELocalNotificationTriggerUnit.HOUR}
      //trigger: { every: {hour: 9, minute:0}},
      led: 'FF0000',
      sound: null
   });
  }



  upload_reservation_data(){
    var timei = new Date(Date.now());
    this.dia_guardado = timei;
    var ti = moment(this.dia_guardado).format('h:mm:ss a'); // var ti = moment(this.tiempoinicial).format('DD MM YYYY, h:mm:ss a');
     var dt = moment(this.dia_guardado).format('DD-MM-YYYY'); // var ti = moment(this.tiempoinicial).format('DD MM YYYY, h:mm:ss a');
   console.log("AHSHAJWSasasJDJA")
      console.log(ti,dt)
    this.firestoreService.insertardos("Proyectos",this.proyecto,"Servicios", this.servicio, {"horainicial": this.hora_inicial} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"horafinal": this.hora_final} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"maxreserva": this.max_reserva} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"periodo": this.periodo} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"hora_restringida": this.hora_restringida} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"lunes": this.lunes} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"martes": this.martes} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"miercoles": this.miercoles})
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"jueves": this.jueves})
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"viernes": this.viernes}  )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"sabado": this.sabado} )
    this.firestoreService.updatedos("Proyectos",this.proyecto,"Servicios", this.servicio,  {"domingo": this.domingo} )

    //this.firestoreService.insertardos("Proyectos/"+this.proyecto+"/Servicios",this.servicio,"reservas", dt, {"7": this.hora_inicial} )
    //this.firestoreService.updatedos("Proyectos/"+this.proyecto+"/Servicios",this.servicio,"reservas", dt, {"7": this.hora_inicial}  )
    // .then(() => {
    //   console.log('Datos subidos correctamente!');
    //   //this.tareaEditando= {} as Tarea;
    // }, (error) => {
    //   console.error(error);
    // });
  }
  
  conarg(){
    this.modalCtrl.dismiss({
    /*  id: this.id,
      uuid: this.uuid,
      marca: this.marca,
      color: this.color,
      viajes: this.viajes,
      tiempo: this.tiempo,
      producido: this.tiempo*/
    })
  }
  
  dismiss(){
    this.modalCtrl.dismiss()
  }
}
