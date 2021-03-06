import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterLink } from '@angular/router';
import { Router, NavigationExtras } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {

  contra_escrita: String;
  
  user;
  password;

  constructor(private storage: Storage,private alertCtrl: AlertController,
    public router: Router,private authSvc: AuthService) { }

  ngOnInit() {
    this.user =localStorage.getItem("user")
    this.password = localStorage.getItem("password")
    console.log("credential: ",this.user,this.password)
    $("#email").val(this.user);
    $("#password").val(this.password);
    if (this.user) {
      $("#basico").prop("checked",true)
    }
  }

async onlogin(email,password){
      console.log("iniciando sesion")
    try {
      const user = await this.authSvc.login(email.value,password.value);
      if (user){
       // console.log("y aca?")
        const isverified = this.authSvc.isEmailVerified(user);
       // console.log("entre sisass perro" + user)
        this.redirectUser(isverified)
      }
    } catch (error) {
      console.log("el error es: " + error);
      this.presentAlert(error)
    }
}

checkbasic(){
  console.log("Plan basico")
  console.log($("#basico").prop("checked"))
  if ($("#basico").prop("checked") === false) {
    var usr = $("#email").val();
    var pswrd = $("#password").val();
    console.log("cedentials in checkbox: ", usr, pswrd)
    localStorage.setItem("user",usr)
    localStorage.setItem("password",pswrd)
  }else{
    localStorage.clear();
  }
}

async presentAlert(error) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Errorsito!',
    subHeader: 'Verifica el error',
    message: error,
    buttons: ['OK']
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}


redirectUser(isverified:boolean = true){
  if(isverified){
    this.router.navigate(['proyectos']);
  }else{
    console.log("verificar email")
  }
}

crear_cuenta(){
  console.log("Crear Cuenta")
  this.router.navigate(['register']);
}

recuperacion(){
  this.router.navigate(['recuperacion']);
}

  }
