import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  loginButton() {
    if (this.username && this.password) {
      this.modalController.dismiss();
      this.router.navigateByUrl('tabs/home');
    } else {
      console.log('Please fill in both username and password.');
    }
  }
}