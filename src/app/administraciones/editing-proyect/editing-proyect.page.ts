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
  selector: 'app-editing-proyect',
  templateUrl: './editing-proyect.page.html',
  styleUrls: ['./editing-proyect.page.scss'],
})
export class EditingProyectPage implements OnInit {


  @Input() uid
  @Input() nombre
  //-----------------datos del formulario--------------------------
  //servicio del edificio
  proyecto: string  //= "Piscina"
  //variables del picker de dias de la semana en los que el servicio esta habilitado
  lunes: boolean
  martes: boolean
  miercoles: boolean
  jueves: boolean
  viernes: boolean
  sabado: boolean
  domingo: boolean

  servicio;

  //servicios disponibles por la app
  reservas: boolean
  pagos: boolean
  comunicados: boolean
  documentos: boolean
 
  //Variables del picker de horas admitidas por reserva, hora inicial y final
  hora_inicial: number
  hora_final: number
  horas_reserva: number

  dias_habiles = [];
  lista_servicio  = [];

//,public alertController: AlertController,public formModule: FormsModule
  constructor(public navCtrl: NavController,private storage: Storage,private modalCtrl: ModalController,private firestoreService: FirestoreService) { }

  
  ngOnInit(): void {
     //this.storage.create();
  }

  async ionViewWillEnter() {
    await this.storage.create();
  }

 //funcion que guarda los dias de la semana habilitados en un array
  submitForm() {
    if ($("#servicio").val() == "" || $("#hora_incial").val() == "" || $("#hora_final").val() == "") {
      console.log("vacioo")
     // this.presentAlert()
    }else{
     console.log("entre")
     this.proyecto = $("#servicio").val()
     this.dias_habiles = $("#dias_habiles").val()
     this.lista_servicio = $("#lista_servicio").val()
     this.lunes = $("#lunes").prop("checked")
     this.martes = $("#martes").prop("checked")
     this.miercoles = $("#miercoles").prop("checked")
     this.jueves = $("#jueves").prop("checked")
     this.viernes = $("#viernes").prop("checked")
     this.sabado = $("#sabado").prop("checked")
     this.domingo = $("#domingo").prop("checked")

     this.hora_inicial = $("#hora_inicial").val()
     this.hora_final = $("#hora_final").val()

     this.reservas = $("#reservas").prop("checked")
     this.pagos = $("#pagos").prop("checked")
     this.comunicados = $("#comunicados").prop("checked")
     this.documentos = $("#documentos").prop("checked")

    //  this.horas_reserva = $("#horas_reserva").val()
     //this.storage.set('servicio 1', this.martes)
    console.log(this.proyecto, this.hora_inicial , this.hora_final, this.reservas, this.pagos, this.lunes, this.domingo)
    this.upload_reservation_data()
    setTimeout(()=>{
      this.modalCtrl.dismiss();
    },300)
    // let horaenvio = new Date(Date.now());
    // var ti = moment(horaenvio).format('h:mm a');
    // var dt = moment(horaenvio).format('DD-MM-YY')
    // this.firestoreService.insertar("mejoras/"+dt+"/"+nombre,"/"+edificio,{"timestamp": ti,"reporte": reporte})
    }
  }

  upload_reservation_data(){
    this.firestoreService.insertardos("Admins",this.uid,"proyectos", this.proyecto, {"horainicial": this.hora_inicial} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"horafinal": this.hora_final} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"lunes": this.lunes} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"martes": this.martes} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"miercoles": this.miercoles})
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"jueves": this.jueves})
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"viernes": this.viernes}  )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"sabado": this.sabado} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"domingo": this.domingo} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"reservas": this.reservas})
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,  {"pagos": this.pagos}  )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"comunicados": this.comunicados} )
    this.firestoreService.updatedos("Admins",this.uid,"proyectos", this.proyecto,   {"documentos": this.documentos} )
 
    this.firestoreService.insertar("Proyectos", this.proyecto, {"horainicial": this.hora_inicial} )
    this.firestoreService.update("Proyectos", this.proyecto, {"horafinal": this.hora_final} )
    this.firestoreService.update("Proyectos", this.proyecto, {"lunes": this.lunes} )
    this.firestoreService.update("Proyectos", this.proyecto,  {"martes": this.martes} )
    this.firestoreService.update("Proyectos", this.proyecto,  {"miercoles": this.miercoles})
    this.firestoreService.update("Proyectos", this.proyecto,  {"jueves": this.jueves})
    this.firestoreService.update("Proyectos", this.proyecto,  {"viernes": this.viernes}  )
    this.firestoreService.update("Proyectos", this.proyecto,   {"sabado": this.sabado} )
    this.firestoreService.update("Proyectos", this.proyecto,  {"domingo": this.domingo} )
    this.firestoreService.update("Proyectos", this.proyecto,  {"reservas": this.reservas})
    this.firestoreService.update("Proyectos", this.proyecto,  {"pagos": this.pagos}  )
    this.firestoreService.update("Proyectos", this.proyecto,   {"comunicados": this.comunicados} )
    this.firestoreService.update("Proyectos", this.proyecto,   {"documentos": this.documentos} )
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

}
