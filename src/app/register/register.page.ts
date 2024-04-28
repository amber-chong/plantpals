import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  email: string = '';
  agreeTerms: boolean = false; //default is false for t&cs

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  loginButton() {
    //if all these == true/filled, itll continue
    if (this.username && this.password && this.email && this.agreeTerms) {
      this.modalController.dismiss();
      this.router.navigateByUrl('tabs/home');
    } else {
      console.log('Please fill in the respective fields.');
    }
  }
}
