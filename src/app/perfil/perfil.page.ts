import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  @Input() uid;
  @Input() nombre;
  @Input() email;
  @Input() rol;

  selectedFile: any;

  constructor(private loadingController: LoadingController,
    private db: AngularFirestore,
    private storage: AngularFireStorage, 
    private fbs: FirestoreService,
    private modalCtrl: ModalController,
     private router: Router) { }

  ngOnInit() {
    console.log(this.uid,this.nombre,this.email,this.rol)
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  dismiss(){
    console.log("cerrando modal de perfil")
    this.modalCtrl.dismiss();
    //this.router.navigate(["/proyectos"])
  }
}
