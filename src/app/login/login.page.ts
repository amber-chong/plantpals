import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { WelcomePage } from '../welcome/welcome.page';
import { NavController } from '@ionic/angular'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private navParams: NavParams, private modalController: ModalController, private router: Router, private navCtrl: NavController) {}

  async loginButton() {
    if (this.username && this.password) {
      this.modalController.dismiss(this.username);
      //console.log(this.username)
      //this.router.navigateByUrl('tabs/home');
    } else {
      console.log('Please fill in both username and password.');
    }
  }

  onDismiss() {
    // Assuming `this.username` contains the username
    this.navCtrl.navigateForward('/home', {
        state: {
            username: this.username
        }
    })
  }
}