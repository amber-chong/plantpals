import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage';
import { IndividualPage } from '../individual/individual.page';

@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class DatabasePage implements OnInit {
  constructor(private modalController: ModalController, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }
}
//https://forum.ionicframework.com/t/how-to-edit-the-content-of-the-page-using-a-modal-page/157788/2