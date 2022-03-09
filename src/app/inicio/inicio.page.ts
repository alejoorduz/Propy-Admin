import { Component, OnInit, Input } from '@angular/core';
//import { Servicios_np } from '../servicios/servicios-np'
import { Router, NavigationExtras } from "@angular/router";
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { FirestoreService } from "../firestore.service";
import { ModalController } from "@ionic/angular";
import {ReservasPage  } from "../reserva/reservas/reservas.page";
import { ComunicadosPage } from "../comunicados/comunicados.page";
import { PagoadminPage } from "../pagoadmin/pagoadmin.page";
import { MonitoreoPage } from "../monitoreo/monitoreo.page";
import { UsuariosPage } from "../usuarios/usuarios.page";
import { BotoneraPage } from "../aircall/botonera/botonera.page";
import { NotificationsComponent } from '../notifications/notifications.component';
import { PopoverController } from '@ionic/angular';
import { EmergenciasPage } from "../emergencias/emergencias.page";


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() reserva
  @Input() pagos
  @Input() comunicado
  @Input() documento
  @Input() monitoreo

    //estas dos de abajo hay que revisarlas si vienen del modal o que onda
    seguridad = true;
    aircall = true;
    
  usuarios:boolean = true;
  emergencias:boolean = true;
  //proyecto:string;

  user_info: any = {
    id: "",
    data: {}
};

option = {
  slidesPerView: 1.4,
  centeredSlides: true,
  loop: false,
  spaceBetween: 10,
  autoplay:true,
}

name: any 
 // Servicios_np : any = this.Servicios_np

 constructor(public popoverController: PopoverController,public  router: Router,private modalCtrl: ModalController,private fbs: FirestoreService ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) {
}

  servicios = [ 
    {"nombre":"Reservas",
    icon:'calendar-outline'},
    {"nombre": "Pago Administracion",
    icon:"cash-outline"},
    {"nombre":"Comunicados",
    icon:"newspaper-outline"},
    {"nombre":"Ingreso Mascotas",
    icon:"paw-outline"},
    {"nombre":"Avisos de Obra",
    icon:"construct-outline"},
    {"nombre":"Monitoreo",
    icon:"business-outline"},
    {"nombre":"Seguridad",
    icon:"shield-half-outline"}
  ]

  ngOnInit() {
  }

  ionViewDidEnter() {
    //console.log('ionViewDidEnter');
    console.log("Aviso de incio de app, estos son los servicios del usuario: " + this.servicios )
    console.log("servicio 1: " + this.servicios[0])
    console.log(this.uid,this.nombre,this.proyecto,this.reserva,this.pagos,this.documento,this.comunicado)
    //this.getuseruid();
    //this.setStatus('¡Bienvenido! Escoge el carro');
    //this.className = 'clase1';
  }

  slide_change(){
    console.log("slide changed")
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: NotificationsComponent,
      cssClass: 'popover',
      event: event,
      translucent: true
    });
    return await popover.present();
  }

  elegir_servicio(servicio){
    console.log("Vamos a elegir que ventana abrir dependiendo del servicio oprimido, este es el servicio: " + servicio)
    if (servicio == "reservas") {
      console.log("reservas if")
      this.modal_reservas();
     // this.modalCtrl.dismiss();
    }
    if (servicio == "pagos") {
      console.log("Pago admin if")
      this.modal_pagos();
    }
    if (servicio == "comunicados") {
      console.log("comunicados if")
      this.modal_comunicados();
    }
    if (servicio == "aircall") {
      this.modal_aircall();
    }
    if (servicio == "usuarios") {
      this.modal_usuarios();
    }
    if (servicio == "documentos Mascotas") {
      this.modalCtrl.dismiss();
     // this.router.navigate(['reservas']);
    }
    if (servicio == "mascotas") {
      this.modalCtrl.dismiss();
      this.router.navigate(['reservas']);
    }
    if (servicio == "monitoreo") {
      this.modal_monitoreo();
    }
    if (servicio == "seguridad") {
      this.router.navigate(['reservas']);
    }
    if (servicio == "emergencias") {
      this.modal_emergencias();
      //this.router.navigate(['reservas']);
    }
  }

  async getuseruid(){
    let uid = await (await this.afAuth.currentUser).uid
    this.getName(uid);
  }
  
  async getName(uid){
    this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
      }
      this.name = this.user_info.data.displayName;
      let email = this.user_info.data.email;
      let saldo = this.user_info.data.saldo;
      this.proyecto = this.user_info.data.proyecto
      console.log("usuario: ",this.name,email,saldo)
  });
  }
  
    // cerrarsesion(){
    //   this.authSvc.logout();
    //   this.router.navigate(["/iniciosesion"])
    // }
    async modal_emergencias(){
      const modal = await this.modalCtrl.create({
        component: EmergenciasPage,
        cssClass: 'emergencias_modal',
        componentProps: {
          uid: this.uid,
          nombre: this.nombre,
          proyecto: this.proyecto,
          //reserva: this.reserva
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        console.log("esta es la data que devuelve el modal")
        console.log(data)
        var closing = data['data'];
        if (closing) {
          this.modalCtrl.dismiss()
        }else{
          console.log("no me cierro")
        } 
    });
      return await modal.present();
    }

    async modal_aircall(){
      const modal = await this.modalCtrl.create({
        component: BotoneraPage,
        cssClass: 'adding_modal',
        componentProps: {
          uid: this.uid,
          nombre: this.nombre,
          proyecto: this.proyecto,
          //reserva: this.reserva
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        console.log("esta es la data que devuelve el modal")
        console.log(data)
        var closing = data['data'];
        if (closing) {
          this.modalCtrl.dismiss()
        }else{
          console.log("no me cierro")
        } 
    });
      return await modal.present();
    }

    async modal_usuarios(){
      const modal = await this.modalCtrl.create({
        component: UsuariosPage,
        cssClass: 'adding_modal',
        componentProps: {
          uid: this.uid,
          nombre: this.nombre,
          proyecto: this.proyecto,
          //reserva: this.reserva
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        console.log("esta es la data que devuelve el modal")
        console.log(data)
        var closing = data['data'];
        if (closing) {
          this.modalCtrl.dismiss()
        }else{
          console.log("no me cierro")
        } 
    });
      return await modal.present();
    }

    
    async modal_monitoreo(){
      const modal = await this.modalCtrl.create({
        component: MonitoreoPage,
        cssClass: 'adding_modal',
        componentProps: {
          uid: this.uid,
          nombre: this.nombre,
          proyecto: this.proyecto,
          //reserva: this.reserva
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        console.log("esta es la data que devuelve el modal")
        console.log(data)
        var closing = data['data'];
        if (closing) {
          this.modalCtrl.dismiss()
        }else{
          console.log("no me cierro")
        } 
    });
      return await modal.present();
    }

    async modal_pagos(){
      const modal = await this.modalCtrl.create({
        component: PagoadminPage,
        cssClass: 'adding_modal',
        componentProps: {
          uid: this.uid,
          nombre: this.nombre,
          proyecto: this.proyecto,
          //reserva: this.reserva
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        console.log("esta es la data que devuelve el modal")
        console.log(data)
        var closing = data['data'];
        if (closing) {
          this.modalCtrl.dismiss()
        }else{
          console.log("no me cierro")
        } 
    });
      return await modal.present();
    }
    

    async modal_comunicados(){
      const modal = await this.modalCtrl.create({
        component: ComunicadosPage,
        cssClass: 'adding_modal',
        componentProps: {
          uid: this.uid,
          nombre: this.nombre,
          proyecto: this.proyecto,
          //reserva: this.reserva
        }
      });
      modal.onDidDismiss()
      .then((data) => {
        console.log("esta es la data que devuelve el modal")
        console.log(data)
        var closing = data['data'];
        if (closing) {
          this.modalCtrl.dismiss()
        }else{
          console.log("no me cierro")
        } 
    });
      return await modal.present();
    }


    async modal_reservas(){
      const modal = await this.modalCtrl.create({
        component: ReservasPage,
        cssClass: 'adding_modal',
        componentProps: {
          uid: this.uid,
          nombre: this.nombre,
          proyecto: this.proyecto,
          reserva: this.reserva
        }
      });
      modal.onDidDismiss()
      .then((data) => {

        console.log("esta es la data que devuelve el modal")
      console.log(data)
      var closing = data['data'];
      if (closing) {
        this.modalCtrl.dismiss()
      }else{
        console.log("no me cierro")
      }
          
    });
      return await modal.present();
    }
  
    dismiss(){
      console.log("dismiss")
      this.modalCtrl.dismiss();
    }

}


