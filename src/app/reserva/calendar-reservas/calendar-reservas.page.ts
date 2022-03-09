import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
import { AddingModalPage } from "../adding-modal/adding-modal.page";;
//import { IonicStorageModule } from '@ionic/storage-angular';
 import { Storage } from '@ionic/storage-angular';
 import { FirestoreService } from '../../firestore.service';
 import { AuthService } from '../../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-calendar-reservas',
  templateUrl: './calendar-reservas.page.html',
  styleUrls: ['./calendar-reservas.page.scss'],
})
export class CalendarReservasPage implements OnInit {

  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() servicio


  
  constructor(private modalCtrl: ModalController,private storage: Storage,private fbs: FirestoreService ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) { }

  ngOnInit() {
  console.log(this.uid,this.nombre,this.proyecto,this.servicio)
  }


}
