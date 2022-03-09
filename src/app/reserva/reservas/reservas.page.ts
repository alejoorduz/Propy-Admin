import { Component, OnInit, Input } from '@angular/core';
import { NavController, RouterCustomEvent } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
import { AddingModalPage } from "../adding-modal/adding-modal.page";
import { CalendarReservasPage } from "../calendar-reservas/calendar-reservas.page";
//import { IonicStorageModule } from '@ionic/storage-angular';
 import { Storage } from '@ionic/storage-angular';
 import { FirestoreService } from '../../firestore.service';
 import { AuthService } from '../../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  option = {
    slidesPerView: 1.4,
    centeredSlides: true,
    loop: false,
    spaceBetween: 10,
    autoplay:true,
 }

  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() reserva

  lista_servicio = [];
  array_servicios_admin: string
  
  constructor( private router: Router, private modalCtrl: ModalController,private storage: Storage,private fbs: FirestoreService ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) { }

  //proyecto:string;

  services: any = {
    id: "",
    data: {}
};

  user_info: any = {
    id: "",
    data: {}
};

  ngOnInit() {
  }

  slide_change(){
    console.log("slide changed")
  }

   ionViewWillEnter() {
    // this.storage.create();
    // this.storage.get('servicio 1').then(res=>{
    //   console.log(res)
    // })
    this.getuseruid();
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
      let name = this.user_info.data.displayName;
      let email = this.user_info.data.email;
      this.consultar_lista_servicios()
      //console.log("usuario: ",name,email,this.proyecto)
  });
  }

  // consultar_lista_servicios(proyecto){
  //   console.log(proyecto)
  //   this.fbs.consultardos(proyecto+"/uso/Servicios","Piscina").subscribe((resultado) => {
  //     if (resultado.payload.data() != null) {
  //         this.services.id = resultado.payload.id;
  //         this.services.data = resultado.payload.data();
  //     }
  //     //this.link_db = this.link.data.Link;
  //     // let email = this.user_info.data.email;
  //     // let saldo = this.user_info.data.saldo;
  //     console.log("usuario: ",this.services)
  // });
  // }

  consultar_lista_servicios(){
    console.log(this.proyecto)
    this.fbs.consultar("Proyectos/"+this.proyecto+"/Servicios").subscribe((servicios) => {
      this.lista_servicio = [];
      servicios.forEach((datosTarea: any) => {
        this.lista_servicio.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      console.log(this.lista_servicio)
    });
  }

  // ionViewDidEnter() {
  //   //PRIMERO SE LEE LA BASE DE DATOS Y SE BUSCA SI YA EXISTEN SERVICIOS Y SE DESPLIEGAN
  //   //console.log("se guardo la prueba en local storage")
  //   this.storage.create();
  //  // localStorage.setItem("servicios",JSON.stringify(this.servicios_reservas));
  //   //this.setStatus('¡Bienvenido! Escoge el carro');
     
  
  // }

  elegir_servicio(){
 // this.array_servicios_admin = localStorage.getItem("servicios")
 // console.log("Este es el dato: " + this.array_servicios_admin)
  console.log("abrir modal con adicionar servicios: ")
  this.abrirmodal()
  }

  async abrirmodal(){
    const modal = await this.modalCtrl.create({
      component: AddingModalPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto
      }
    });
    modal.onDidDismiss()
    .then((data) => {
          this.storage.forEach((value, key, index) => {
          console.log(`ITEM - ${key} = ${value} [${index}]`);
        });
      
  });
    return await modal.present();
  }

  open_calendar_page(servicio){
    this.router.navigate(['calendar'], {
      state: {
         proyecto: this.proyecto,
         servicio: servicio.id,
         hora_inicial: servicio.data.horainicial,
         hora_final: servicio.data.horafinal,
      }
   });
   this.modalCtrl.dismiss(true);
  }

  async calendario(servicio){
  //   const modal = await this.modalCtrl.create({
  //     component: CalendarReservasPage,
  //     cssClass: 'adding_modal',
  //     componentProps: {
  //       uid: this.uid,
  //       nombre: this.nombre,
  //       proyecto: this.proyecto,
  //       servicio: servicio
  //     }
  //   });
  //   modal.onDidDismiss()
  //   .then((data) => {
  //       //   this.storage.forEach((value, key, index) => {
  //       //   console.log(`ITEM - ${key} = ${value} [${index}]`);
  //       // });
      
  // });
  //   return await modal.present();
  }

  dismiss(){
    this.modalCtrl.dismiss(false);
  }

  delete(servicio){
    console.log("borrando base de datos de",this.uid,  " del proyecto ", servicio)
     this.fbs.delete_doc("Proyectos/"+this.proyecto+"/Servicios",servicio).then(() => {
      // Actualizar la lista completa
      this.consultar_lista_servicios();
      // Limpiar datos de pantalla
      //this.tareaEditando = {} as Tarea;
    })
    
  }

}
