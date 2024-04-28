import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

import { WelcomePage } from '../welcome/welcome.page';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class HomePage implements OnInit {
  username = '';
  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.welcome(); //shows welcome modal
  }

  //creates modal
  async welcome() {
    const modal = await this.modalController.create({
      component: WelcomePage,
    });

    //WHERE DOES THIS GO
    modal.onWillDismiss().then((retval) => {
      this.username = retval.data;
      console.log(this.username);
    });

    return await modal.present();
  }
  databaseClick() {
    //sends user to database (separate page)
    let database = '/database';
    this.router.navigateByUrl(database);
  }
}
