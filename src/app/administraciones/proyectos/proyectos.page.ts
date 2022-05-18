import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController,AlertController } from "@ionic/angular";
import { AddingProyectPage } from "../../administraciones/adding-proyect/adding-proyect.page";
import { EditingProyectPage } from "../../administraciones/editing-proyect/editing-proyect.page";
import { InicioPage } from "../../inicio/inicio.page";
//import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { FirestoreService } from '../../firestore.service';
import { AuthService } from '../../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router, NavigationExtras } from "@angular/router";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PerfilPage } from "../../perfil/perfil.page";
import * as $ from "jquery";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {

  option = {
     slidesPerView: 1.4,
     centeredSlides: true,
     loop: false,
     spaceBetween: 5,
     autoplay:true,
  }
  // servicios_reservas = [ "Reservas",
  // "Pago Administracion",
  // "Comunicados",
  // "Ingreso Mascotas",
  // "Avisos de Obra",
  // "Monitoreo",
  // "Seguridad"]

  reservas:string;
  pagos:string;
  comunicados:string;
  documentos:string;
  aircall:string;

  lista_servicio = [];
  array_servicios_admin: string;
  account_config_ok: Boolean;
  profile_image_yes: boolean;

  new_user: boolean;
  activate_account: boolean;

  show_delete_button: boolean = false;

  current_user_uid;
  current_user_name;
  current_user_email;
  current_user_rol;
  current_user_activate;
  current_user_apto;
  current_user_image;
  
  constructor(
    private loadingController: LoadingController,
    public router: Router,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private storage: Storage,
    private fbs: FirestoreService ,
    private authSvc: AuthService,
    public afAuth:AngularFireAuth,
     private afs: AngularFirestore) { 
       
     }

  proyecto:string;

  lat;
  long;

  loading: HTMLIonLoadingElement;

  WeatherData:any = {
    main : {},
    isDay: true
  };

  wind_speed;

  day_mood: string;

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
    this.presentLoading();
    // setTimeout(() => {
    //  this.loading.dismiss();
    // }, 2000);
    //console.log("nombre: ", this.current_user_name)
    this.getuseruid();
    this.getLocation();
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
       this.lat = resp.coords.latitude;
       this.long = resp.coords.longitude;
       console.log("lat: " + this.lat + "   long: " + this.long)
      // setTimeout(()=>{
        this.getWeatherData();
      // },2000)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
     });
  }

  getWeatherData(){ 
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.long+'&appid=7985db256b85b778e9af4d7ea225aaeb')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data){
    this.WeatherData = data;
    console.log("data: ")
    console.log( this.WeatherData)
    this.wind_speed = this.WeatherData.wind.speed;
    this.day_mood = (this.WeatherData.weather[0].main)
    console.log("MOOOOOOD: " + this.day_mood)
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    if (this.day_mood === "Rain") {
      $("#lluvia").text("Esta lloviendo")
      $("#lluvia").css("color","red");
      console.log("si llueve")
    }else{
      $("#lluvia").text("No esta lloviendo")
      $("#lluvia").css("color","green");
    }
  }

  async getuseruid(){
    //try{
      var user_uid = localStorage.getItem("uid");
      //localStorage.clear();
      // console.log("traido de minibd: ", user_uid)
       if (!user_uid) {
        // console.log("No habia ningun uid guardado")
          var uid = await (await this.afAuth.currentUser).uid
          localStorage.setItem("uid",uid);
         // console.log("Se guardo el UID en la miniBD:)")
         // console.log(uid)
          this.current_user_uid = uid
         // console.log("uid:",this.current_user_uid)
          this.getName(uid);
       }else{
        // console.log("Ya habia valor gurdado y se uso ese")
         this.current_user_uid = user_uid
        //  console.log("uid:",this.current_user_uid)
          this.getName(user_uid);
       }
   // }
    // catch(error){
    //   console.log("Errorsuelo:",error)
    //   this.router.navigate(["/iniciosesion"])
    //   //this.presentAlert(error);
    // }
  }
  
  async getName(uid){
    this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
      }
      this.current_user_name = this.user_info.data.displayName;
      this.current_user_email = this.user_info.data.email;
      this.current_user_rol = this.user_info.data.rol;
      this.current_user_activate = this.user_info.data.habilitado
      this.current_user_apto = this.user_info.data.apto;
      this.current_user_image = this.user_info.data.image_url;
      console.log("el usuario esta activado? :",this.current_user_activate)
      //let email = this.user_info.data.email;
      //this.proyecto = this.user_info.data.proyecto
      this.consultar_lista_servicios()
      console.log("Apartamento, img url ",this.current_user_apto, this.current_user_image)

        //this.current_user_apto = "4048"
  if (this.current_user_apto) {
    console.log("si hay algo en 'apto'")
    this.account_config_ok = true;
  }else{
    console.log("No hay nada en 'apto'")
    this.account_config_ok = false;
  }
  if (this.current_user_image) {
    console.log("Si hay algo en 'image_url'")
    this.profile_image_yes = true;
  }else{
    console.log("No hay nada en 'image_url'")
    this.profile_image_yes = false;
  }
  });
  }

async consultar_lista_servicios(){
  if (this.current_user_activate === false) {
    console.log("non activated false: ", this.current_user_activate)
    this.activate_account = false; 
    this.new_user = false;
  } else {
    console.log("activated")
    this.activate_account = true; 
   // await this.presentLoading();
    this.fbs.consultar("Admins/"+this.current_user_uid+"/proyectos").subscribe((servicios) => {
      this.lista_servicio = [];
      servicios.forEach((datosTarea: any) => {
        this.lista_servicio.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    //  this.loading.dismiss();
      console.log("lista de servicios: " , this.lista_servicio)
       if (this.lista_servicio.length === 0) { 
     // console.log("usuario nuevo sin negocio")
      this.new_user = true;      
    } else {
      this.new_user = false;
      console.log("usuario nuevo viejo")
    }
    setTimeout(() => {
      this.loading.dismiss();
     }, 800);
    });
    
  }
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    message: 'Obteniendo datos, por favor espere...'
  });
  return this.loading.present();
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
  console.log("abrir modal con adicionar servicios: " )
  this.abrirmodal()
  }

  async perfil(){
    const modal = await this.modalCtrl.create({
      component: PerfilPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        email: this.current_user_email,
        rol: this.current_user_rol,
        apto: this.current_user_apto,
        image_url: this.current_user_image
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log("esta es la data que devuelve el modal")
      console.log(data)
      var closing = data['data'];
      if (closing) {
        console.log("volvi de perfil con bandera en true",closing)
       // this.modalCtrl.dismiss()
      }else{
        console.log("Volvi con bandera en false,", closing)
      }       
  });
    return await modal.present();
  }

  async abrirmodal(){
    const modal = await this.modalCtrl.create({
      component: AddingProyectPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        email: this.current_user_email
      }
    });
    modal.onDidDismiss()
    .then((data) => {
        //   this.storage.forEach((value, key, index) => {
        //   console.log(`ITEM - ${key} = ${value} [${index}]`);
        // });
      
  });
    return await modal.present();
  }

  async modal_proyecto(id,reserva,pago,comunicados,documentos,monitoreo,aircall){
    console.log(id,reserva,pago)
    const modal = await this.modalCtrl.create({
      component: InicioPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: id,
        reserva: reserva,
        pagos: pago,
        comunicado :comunicados,
        documento: documentos,
        monitoreo: monitoreo,
        aircall: aircall
      }
    });
    modal.onDidDismiss()
    .then((data) => {
        //   this.storage.forEach((value, key, index) => {
        //   console.log(`ITEM - ${key} = ${value} [${index}]`);
        // });
      
  });
    return await modal.present();
  }

   cerrarsesion(){
     localStorage.setItem("uid","")
      this.authSvc.logout();
      this.router.navigate(["/iniciosesion"])
    }

delete(proyecto){
  console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
  this.fbs.delete_doc("Proyectos", proyecto).then(() => {
    // Actualizar la lista completa
   // this.consultar_lista_servicios();
    // Limpiar datos de pantalla
    //this.tareaEditando = {} as Tarea;
  })

  this.fbs.delete_doc("Admins/"+this.current_user_uid+"/proyectos",proyecto).then(() => {
    // Actualizar la lista completa
    this.consultar_lista_servicios();
    // Limpiar datos de pantalla
    //this.tareaEditando = {} as Tarea;
  })
  
}

show_delete(){
  if (this.show_delete_button) {
    this.show_delete_button = false;
    $(".show_delete").css('color', 'black');
  } else {
    this.show_delete_button = true;
    $(".show_delete").css('color', 'orange');
  }
}

// perfil(){
//   this.router.navigate(["/perfil"])
// }
}
