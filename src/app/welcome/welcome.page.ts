import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';
import { addIcons } from 'ionicons';
import { logoGithub } from 'ionicons/icons';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class WelcomePage implements OnInit {
  username = '';
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {
    addIcons({ logoGithub }); //adds github logo for this project's repo
  }

  ngOnInit() {}

  //creates modal
  async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
    });

    //WHERE DOES THIS GO
    modal.onDidDismiss().then((retval) => {
      this.username = retval.data;
      console.log(this.username);
    });
    this.modalController.dismiss(this.username);
    return await modal.present();
  }

  async register() {
    const modal = await this.modalController.create({
      component: RegisterPage,
    });
    this.modalController.dismiss();
    return await modal.present();
  }
}
