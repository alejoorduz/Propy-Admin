import * as $ from "jquery";
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { ToastController, AlertController } from '@ionic/angular';
import { MonthViewComponent} from 'ionic2-calendar/monthview'
import { WeekViewComponent} from 'ionic2-calendar/weekview'
import { DayViewComponent} from 'ionic2-calendar/dayview'
import { Step } from 'ionic2-calendar/calendar';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as moment from "moment";
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
 // @ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;
  proyecto:string;
  servicio: string;
  hora_inicial:number;
  hora_final:number;
  max_reserva:number;
  hora_restringida: number;
  periodo:number;
  lunes:number;
  martes:number;
  miercoles:number;
  jueves:number;
  viernes:number;
  sabado:number;
  domingo:number;

  boton_atras: boolean;
  boton_dia: boolean;

  hora_bloqueada:boolean;
  dia_seleccionado: string;
  hora_seleccionada: string;
  has_events: boolean;

  evento_tittle;
  evento_id;

  eliminar_evento: boolean;
  mostrar_add_event: boolean = false;

  lista_eventos = [];
  eventSource = [];
  viewTitle: string;
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    step: 15 as Step,  
    locale: 'en-US'
   // locale: 'reserv'
  };

  current_user_uid;
  current_user_name;

  user_info: any = {
    id: "",
    data: {}
};

//   markDisabled = (date: Date) => {
//     var current = new Date();
//     var someDate = moment(current).format('D')
//     var somemonth = moment(current).format('M')
//     var day = parseInt(someDate)
//     var mes = parseInt(somemonth)
//     console.log(typeof(this.periodo))
//     var ti = day + this.periodo; 
//    //var tie =  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);|| date.getMonth() > mes-1|| date.getDay()==4 
//     //console.log("periodo",tie)
//     return  (date.getDate()>ti || date < current)  || date.getDay()==this.lunes || date.getDay()==this.martes
//     || date.getDay()==this.miercoles || date.getDay()==this.jueves || date.getDay()==this.viernes || date.getDay()==this.sabado
//     || date.getDay()==this.domingo || date.getHours()==13;
// };

  selectedDate = new Date();

  constructor(private alertCtrl: AlertController, private storage: Storage, private router: Router,private fbs: FirestoreService ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) {
    // console.log(this.router.getCurrentNavigation().extras.state.periodo);
    // console.log(this.router.getCurrentNavigation().extras.state.hora_inicial);
    // console.log(this.router.getCurrentNavigation().extras.state.hora_final);
    this.proyecto = this.router.getCurrentNavigation().extras.state.proyecto
    this.servicio = this.router.getCurrentNavigation().extras.state.servicio
    this.periodo = parseInt(this.router.getCurrentNavigation().extras.state.periodo) 
    this.hora_inicial = parseInt(this.router.getCurrentNavigation().extras.state.hora_inicial) 
    this.hora_final = parseInt(this.router.getCurrentNavigation().extras.state.hora_final) 
    this.hora_restringida = parseInt(this.router.getCurrentNavigation().extras.state.hora_restringida) 
    this.max_reserva = parseInt(this.router.getCurrentNavigation().extras.state.hora_max_reserva) 
    this.lunes = parseInt(this.router.getCurrentNavigation().extras.state.lunes) 
    this.martes = parseInt(this.router.getCurrentNavigation().extras.state.martes) 
    this.miercoles = parseInt(this.router.getCurrentNavigation().extras.state.miercoles) 
    this.jueves = parseInt(this.router.getCurrentNavigation().extras.state.jueves)
    this.viernes = parseInt(this.router.getCurrentNavigation().extras.state.viernes) 
    this.sabado = parseInt(this.router.getCurrentNavigation().extras.state.sabado) 
    this.domingo = parseInt(this.router.getCurrentNavigation().extras.state.domingo)  

    console.log("tipo de verda: ",this.proyecto,this.servicio ,this.hora_inicial, this.hora_final, this.lunes,this.martes,this.miercoles,this.jueves,this.viernes,this.sabado,this.domingo)
   }

   ionViewWillEnter() {
    this.getuseruid();
    this.consultar_lista_eventos();
    this.boton_atras = false;
    this.boton_dia = true;
  }

  show_button(){
    this.boton_atras = true;
    this.boton_dia = false;
  }

  hide_button(){
    this.boton_atras = false;
    this.boton_dia = true;
  }

  cal_mode(dia){
    this.calendar.mode = dia;
    console.log("cambiando segment button")
    if ( dia === "month") {
      console.log("--------------------------mes")
      console.log(this.boton_atras)
      $(".boton_month").css("background-color","rgba(112, 51, 204, 0.1)")
      $(".boton_week").css("background-color","rgba(112, 51, 204, 0.6)")
      $(".boton_day").css("background-color","rgba(112, 51, 204, 0.6)")
      this.boton_atras = false;
    }
    if (dia === "week") {
      this.boton_atras = true;
      console.log("semana-------------------------")
      console.log(this.boton_atras)
      $(".boton_month").css("background-color","rgba(112, 51, 204, 0.6)")
      $(".boton_week").css("background-color","rgba(112, 51, 204, 0.1)")
      $(".boton_day").css("background-color","rgba(112, 51, 204, 0.6)")
    }
    if ( dia === "day" ) {
      console.log(this.boton_atras)
      this.boton_atras = true;
      console.log("dia-------------------------")
      $(".boton_month").css("background-color","rgba(112, 51, 204, 0.6)")
      $(".boton_week").css("background-color","rgba(112, 51, 204, 0.6)")
      $(".boton_day").css("background-color","rgba(112, 51, 204, 0.1)")
    } 
  }

  consultar_lista_eventos(){
    console.log(this.current_user_uid, this.current_user_name,this.proyecto)
    this.fbs.consultar("Proyectos/"+this.proyecto+"/Servicios/"+this.servicio+"/reservas").subscribe((lista) => {
      this.eventSource = [];
      lista.forEach((ev: any) => {
        let event:any = ev.payload.doc.data();
        event.id = ev.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
        // this.lista_eventos.push({
        //   id: ev.payload.doc.id,
        //   data: ev.payload.doc.data()
        // });
      })
     console.log("lista de eventos: ")
     console.log(this.eventSource)
     
    });
  }

  async getuseruid(){
    let uid = await (await this.afAuth.currentUser).uid
    this.current_user_uid = uid
    this.getName(uid);
  }
  
  async getName(uid){
    this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
      }
      this.current_user_name = this.user_info.data.displayName;
      let email = this.user_info.data.email;
      //let edificio = this.user_info.data.proyecto
      //console.log("usuario: ",name,email,this.proyecto)
  });
  }
  
  ngOnInit() {
  //   this.storage.create();
  //   this.storage.get('calendar').then(res=>{
  //     console.log(res)
  //     this.servicio = res.id
  //     this.hora_inicial = res.data.horainicial
  //     this.hora_final = res.data.horafinal
  //     this.hora_reserva = res.data.horareserva
  //     this.periodo = res.data.periodo
  //     this.lunes = res.data.lunes
  //     this.martes = res.data.martes
  //     this.miercoles = res.data.miercoles
  //     this.jueves = res.data.jueves
  //     this.viernes = res.data.viernes
  //     this.sabado = res.data.sabado
  //     this.domingo = res.data.domingo
  //     this.dias_reserva = res.data.diasreserva
  //   })
  //   this.storage.get('edificio').then(res=>{
  //     console.log(res)
  //     this.edificio = res
  //   })
  //   // $('#calendar').fullCalendar({
  //   //   startHour: "4",
  //   //   endHour: "18"
  //   // })
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.id + '-' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.evento_id = event.id;
    this.eliminar_evento = true;
    this.boton_atras = false;
    var day_hour_string = event.startTime;
    var dia_selec = day_hour_string.toString().slice(16,21);
    this.evento_tittle = "Reserva de " + event.title + "a las " + dia_selec; // + " - " + event.startTime + ' - ' + event.endTime;
    console.log("titulo evento_ " , this.evento_tittle)  
  }

  delete(){
    console.log("eliminando: " + this.evento_id) + '- ' + this.evento_tittle
    this.fbs.delete_doc("Proyectos/"+this.proyecto+"/Servicios/"+ this.servicio+"/reservas",this.evento_id).then(() => {
      // Actualizar la lista completa
     // this.consultar_lista_servicios();
      // Limpiar datos de pantalla
      //this.tareaEditando = {} as Tarea;
    })
  }

addNewEvent() {
  this.has_events = false;
  if (this.has_events) {
    //console.log("no puedes reservas a esta hora")
    this.presentAlertBlock("Hora con Reserva","No puedes reservar porque alguien ya tiene esta hora reservada")
  } else {
    if(this.hora_bloqueada){
        console.log("no puedes reservas a esta hora")
        this.presentAlertBlock("Hora Restringida","Esta hora esta bloqueada por el Administrador, elige otra que este disponible")
      }else{
        console.log("añadir evento")
            // this.eventSource = [];
            console.log(this.selectedDate)
            var selectedYear = this.selectedDate.getFullYear();
            var selectedMonth = this.selectedDate.getMonth();
            var selectedDay = this.selectedDate.getDate();
            var selectHour = this.selectedDate.getHours();
            console.log(selectedYear, selectedMonth , selectedDay, selectHour)

            var startTime = new Date(selectedYear, selectedMonth, selectedDay,selectHour)
            var endTime = new Date(selectedYear, selectedMonth, selectedDay, selectHour+1)
            var a_nombre_de = $("#a_nombre").val();
            console.log(startTime,endTime)
            let event = {
              title: a_nombre_de,
              startTime: startTime,
              endTime: endTime,
              allDay: false,
            };
            this.presentAlert(event)
      }
  }
      
  }

  onTimeSelected(ev) {
    //this.calendar.mode  = "day";
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
      this.hora_bloqueada = ev.disabled;
      var day_hour_string = ev.selectedTime;
      this.dia_seleccionado = day_hour_string.toString().slice(0,15);
      this.hora_seleccionada = day_hour_string.toString().slice(16,24);
      if ((ev.events !== undefined && ev.events.length !== 0)) {
        this.has_events = true
       // this.eliminar_evento = true
      }else{
        this.has_events = false
        this.eliminar_evento = false
      }

    //this.selectedDate = ev.selectedTime;
    this.selectedDate = new Date(ev.selectedTime);
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  dismiss(){
    this.router.navigate(["proyectos/"])
  }

  async presentAlertBlock(header,text) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      subHeader: header,
      message: text,
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert(event) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Estas seguro?',
      subHeader: 'Confirma el dia y la hora de tu reserva',
      message: "Reserva para el dia " +  this.dia_seleccionado  + " a las " + this.hora_seleccionada ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            $("#a_nombre").val() == "";
            this.mostrar_add_event = false;
            console.log(this.eventSource);
            this.fbs.add("Proyectos/"+this.proyecto+"/Servicios/"+ this.servicio+"/reservas", event )
            //this.router.navigate(["proyectos"])
          }
        }
      ]
    });
    await alert.present();

  // const { role } = await alert.onDidDismiss();
  // console.log('onDidDismiss resolved with role', role);
}

open_add_reservas(){
  if (this.calendar.mode === "month") {
    console.log("no se peude hacer eserva en vista de mes")
  } else {
     if (this.mostrar_add_event) {
    this.mostrar_add_event = false;
    console.log("cerrando reservas")
    $(".icono_mas").css('color', 'black');
    $("#plus").css('display','flex')
    $("#minus").css('display','none')
  }else{
    this.mostrar_add_event = true;
    console.log("abriendo reservas")
    $(".icono_mas").css('color', 'orange');
    $("#plus").css('display','none')
    $("#minus").css('display','flex')
  }
  }

 
}

}
