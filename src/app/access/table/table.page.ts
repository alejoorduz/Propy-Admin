import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
//import { Carro } from "../../models/carros";
//import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from '../../firestore.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {

  statusMessage: string;
  public cancelado = true;
  public producido;

  @Input() uid;
  @Input() nombre; 
  @Input() proyecto;
  @Input() puerta;
  @Input() dia;
  
  arrayColeccionTareas: any = [{
    id: "",
    data: {} 
   }];

  constructor( private modalCtrl: ModalController, private firestoreService: FirestoreService) { }
  

  ngOnInit() {
    console.log(this.uid,this.nombre,this.proyecto,this.puerta,this.dia)
    this.consultarviajes();
  }

consultarviajes(){
  this.cancelado = false;
  this.firestoreService.consultar("Proyectos/"+this.proyecto+"/accesshistory/"+this.puerta+"/dias/"+this.dia+"/movimientos").subscribe((resultadoConsultaTareas) => {
    this.arrayColeccionTareas = [];
    resultadoConsultaTareas.forEach((datosTarea: any) => {
      this.arrayColeccionTareas.push({
        id: datosTarea.payload.doc.id,
        data: datosTarea.payload.doc.data()
      });
    }) 
    console.log(this.arrayColeccionTareas)
    this.producido = this.arrayColeccionTareas.reduce(function (r, a) {
      console.log(a.data.plata) 
      return r + a.data.plata;
      }, 0);
    console.log(this.producido) 
  });
  }

  back(){
    this.modalCtrl.dismiss(
      false
    )
  }

}
