import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import * as $ from "jquery";
import { data } from 'jquery';
import { ModalController } from "@ionic/angular";
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-adding-proyect',
  templateUrl: './adding-proyect.page.html',
  styleUrls: ['./adding-proyect.page.scss'],
})
export class AddingProyectPage implements OnInit {

  @Input() uid
  @Input() nombre
  //-----------------datos del formulario--------------------------
  //servicio del edificio
  proyecto: string  //= "Piscina"
  password: string;
  //variables del picker de dias de la semana en los que el servicio esta habilitado
  lunes: boolean
  martes: boolean
  miercoles: boolean
  jueves: boolean
  viernes: boolean
  sabado: boolean
  domingo: boolean

  //Plan elegido por usuario
  plan: string = "";
  //servicios disponibles por la app
  // reservas: boolean
  // pagos: boolean = false
  // comunicados: boolean
  // documentos: boolean = false
  // monitoreo:boolean = false
  // aircall: boolean
  //Variables del picker de horas admitidas por reserva, hora inicial y final
  hora_inicial: number
  hora_final: number
  horas_reserva: number

  dias_habiles = [];
  lista_servicio  = [];
  lista_periodo: number;

  servicio;

//,public alertController: AlertController,public formModule: FormsModule
  constructor(public alertController: AlertController, private alertCtrl: AlertController,public navCtrl: NavController,private storage: Storage,private modalCtrl: ModalController,private firestoreService: FirestoreService) { }

  
  ngOnInit(): void {
     //this.storage.create();
  }

  async ionViewWillEnter() {
    await this.storage.create();
  }

  checkbasic(){
    console.log("Plan basico: ")
    console.log($("#basico").prop("checked"))
    if ($("#basico").prop("checked") === false) {
      // $("#estandar").prop("checked",false)
      // $("#pro").prop("checked",false)
      this.plan = "basico"
      console.log("plan basico seleccionado!")
    }
  }

  checkstandart(){
    console.log("Plan estandar")
    console.log($("#estandar").prop("checked"))
    if ($("#estandar").prop("checked") === false) {
      $("#basico").prop("checked",false)
      $("#pro").prop("checked",false)
      this.plan = "estandar"
    }
  }
  checkpro(){
    console.log("Plan pro")
    console.log($("#pro").prop("checked"))
    if ($("#pro").prop("checked") === false) {
      $("#estandar").prop("checked",false)
      $("#basico").prop("checked",false)
      this.plan = "pro"
    }
  }

  async presentBasic() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Plan Básico!',
      subHeader: 'Incluye los siguientes servicios',
      message: 'Reservas, AirCall, Comunicados, Mascotas, Aviso de trasteo, Directorio, Autorizaciones, Preguntas, Emergencia Ascensor, Eventos',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentStandart() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Plan Estandar!',
      subHeader: 'Incluye estos servicios',
      message: 'Plan Básico + Documentos, Clasificados, Encuestas, Controles de Acceso',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentPro() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Plan Pro!',
      subHeader: 'Incluye estos servicios',
      message: 'Plan Estándar + Pagos, Monitoreo, Finanzas, Beneficios, Seguridad, Citofonia',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

 //funcion que guarda los dias de la semana habilitados en un array
  submitForm() {
    if ($("#servicio").val() == "" || $("#hora_inicial").val() == "" || $("#password").val() == "" || $("#hora_final").val() == "") {
      console.log("vacioo")
      this.presentAlert("Todos los campos deben estar llenos")
     // this.presentAlert()
    }else{
      if (this.plan == "") {
        console.log("no seleccionaste plan")
        this.presentAlert("Debes seleccionar un Plan")
      }else{
      this.hora_inicial = parseInt($("#hora_inicial").val())
      this.hora_final = parseInt($("#hora_final").val())
      //console.log(this.hora_inicial,typeof(this.hora_inicial),this.hora_final, typeof(this.hora_final), typeof(3))
      // if(this.hora_inicial > this.hora_final){
      //      console.log("la hora inicial no puede ser menor a la final")
      //     this.presentAlert("La Hora final no puede ser menor a la hora inicial")
      // }else{
          console.log("entre")
          this.proyecto = $("#servicio").val()
          this.password = $("#password").val()
          // this.dias_habiles = $("#dias_habiles").val()
          //this.lista_servicio = $("#lista_servicio").val()
          this.lunes = $("#lunes").prop("checked")
          this.martes = $("#martes").prop("checked")
          this.miercoles = $("#miercoles").prop("checked")
          this.jueves = $("#jueves").prop("checked")
          this.viernes = $("#viernes").prop("checked")
          this.sabado = $("#sabado").prop("checked")
          this.domingo = $("#domingo").prop("checked")

          // this.lista_periodo = $("#lista_periodo").val()
          this.hora_inicial = $("#hora_inicial").val()
          this.hora_final = $("#hora_final").val()
          // this.reservas = $("#reservas").prop("checked")
          //this.pagos = $("#pagos").prop("checked")
          // this.comunicados = $("#comunicados").prop("checked")
          // this.documentos = $("#documentos").prop("checked")
          //this.monitoreo = $("#monitoreo").prop("checked")
          // this.aircall = $("#aircall").prop("checked")

          //  this.horas_reserva = $("#horas_reserva").val()
          //this.storage.set('servicio 1', this.martes)
          // console.log("los datos: " ,this.aircall, this.proyecto, this.hora_inicial , this.hora_final, this.reservas, this.pagos, this.lunes, this.domingo)
          this.upload_reservation_data()
          // let horaenvio = new Date(Date.now());
          // var ti = moment(horaenvio).format('h:mm a');
          // var dt = moment(horaenvio).format('DD-MM-YY')
          // this.firestoreService.insertar("mejoras/"+dt+"/"+nombre,"/"+edificio,{"timestamp": ti,"reporte": reporte})
     // } 
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

  upload_reservation_data(){
    console.log("plan elegido:", this.plan)
    this.firestoreService.insertardos("Admins",this.uid,"proyectos", this.proyecto, {"horainicial": this.hora_inicial} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"horafinal": this.hora_final} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"lunes": this.lunes} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"martes": this.martes} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"miercoles": this.miercoles})
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"jueves": this.jueves})
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"viernes": this.viernes}  )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"sabado": this.sabado} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"domingo": this.domingo} )
    
    if(this.plan === "basico"){
      console.log("si, basico")
      this.firestoreService.insertar("Proyectos", this.proyecto, {"horainicial": this.hora_inicial} )
      this.firestoreService.update("Proyectos", this.proyecto, {"horafinal": this.hora_final} )
      this.firestoreService.update("Proyectos", this.proyecto, {"lunes": this.lunes} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"martes": this.martes} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"miercoles": this.miercoles})
      this.firestoreService.update("Proyectos", this.proyecto,  {"jueves": this.jueves})
      this.firestoreService.update("Proyectos", this.proyecto,  {"viernes": this.viernes}  )
      this.firestoreService.update("Proyectos", this.proyecto,   {"sabado": this.sabado} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"domingo": this.domingo} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"key": this.password} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"reservas": true})
      this.firestoreService.update("Proyectos", this.proyecto,  {"aircall": true}  )
      this.firestoreService.update("Proyectos", this.proyecto,  {"comunicados": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"mascotas": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"trasteo": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"directorio": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"autorizaciones": true})
      this.firestoreService.update("Proyectos", this.proyecto, {"preguntas": true}  )
      this.firestoreService.update("Proyectos", this.proyecto,   {"emergencias": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"eventos": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"documentos": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"clasificados": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"encuestas": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"acceso": false} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"pagos": false} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"monitoreo": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"finanzas": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"beneficios": false} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"seguridad": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"citofonia": false} )
    }

    if(this.plan === "estandar"){
      console.log("si, estandar")
      this.firestoreService.insertar("Proyectos", this.proyecto, {"horainicial": this.hora_inicial} )
      this.firestoreService.update("Proyectos", this.proyecto, {"horafinal": this.hora_final} )
      this.firestoreService.update("Proyectos", this.proyecto, {"lunes": this.lunes} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"martes": this.martes} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"miercoles": this.miercoles})
      this.firestoreService.update("Proyectos", this.proyecto,  {"jueves": this.jueves})
      this.firestoreService.update("Proyectos", this.proyecto,  {"viernes": this.viernes}  )
      this.firestoreService.update("Proyectos", this.proyecto,   {"sabado": this.sabado} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"domingo": this.domingo} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"key": this.password} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"reservas": true})
      this.firestoreService.update("Proyectos", this.proyecto,  {"aircall": true}  )
      this.firestoreService.update("Proyectos", this.proyecto,  {"comunicados": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"mascotas": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"trasteo": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"directorio": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"autorizaciones": true})
      this.firestoreService.update("Proyectos", this.proyecto, {"preguntas": true}  )
      this.firestoreService.update("Proyectos", this.proyecto,   {"emergencias": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"eventos": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"documentos": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"clasificados": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"encuestas": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"acceso": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"pagos": false} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"monitoreo": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"finanzas": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"beneficios": false} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"seguridad": false} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"citofonia": false} )
      
    }

    if(this.plan === "pro"){
      console.log("si, pro")
      this.firestoreService.insertar("Proyectos", this.proyecto, {"horainicial": this.hora_inicial} )
      this.firestoreService.update("Proyectos", this.proyecto, {"horafinal": this.hora_final} )
      this.firestoreService.update("Proyectos", this.proyecto, {"lunes": this.lunes} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"martes": this.martes} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"miercoles": this.miercoles})
      this.firestoreService.update("Proyectos", this.proyecto,  {"jueves": this.jueves})
      this.firestoreService.update("Proyectos", this.proyecto,  {"viernes": this.viernes}  )
      this.firestoreService.update("Proyectos", this.proyecto,   {"sabado": this.sabado} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"domingo": this.domingo} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"key": this.password} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"reservas": true})
      this.firestoreService.update("Proyectos", this.proyecto,  {"aircall": true}  )
      this.firestoreService.update("Proyectos", this.proyecto,  {"comunicados": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"mascotas": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"trasteo": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"directorio": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"autorizaciones": true})
      this.firestoreService.update("Proyectos", this.proyecto, {"preguntas": true}  )
      this.firestoreService.update("Proyectos", this.proyecto,   {"emergencias": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"eventos": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"documentos": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"clasificados": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"encuestas": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"acceso": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"pagos": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"monitoreo": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"finanzas": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"beneficios": true} )
      this.firestoreService.update("Proyectos", this.proyecto,   {"seguridad": true} )
      this.firestoreService.update("Proyectos", this.proyecto,  {"citofonia": true} )
    }
    setTimeout(()=>{
    this.modalCtrl.dismiss()
    },500)
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
    console.log("cerrar el modal")
    this.modalCtrl.dismiss()
  }

}
