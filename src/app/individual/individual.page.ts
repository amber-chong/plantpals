import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavParams, ModalController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker';
import { Storage } from '@ionic/storage';

import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.page.html',
  styleUrls: ['./individual.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class IndividualPage implements OnInit {
  plantName = '';
  plantSeason = '';
  scientificName = '';
  plantType = '';
  plantNotes = '';

  constructor(
    private modalController: ModalController, private storage: Storage) {
    addIcons({ close });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  saveModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
      scientificName: this.scientificName,
      plantType: this.plantName,
      plantNotes: this.plantNotes
    });
  }
  //sends info to database when modal closes
  closeModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
      scientificName: this.scientificName,
      plantType: this.plantName,
      plantNotes: this.plantNotes
    });
  }
/*
  async deletePlant(index: number) {
    //deletes it
    if (index !== -1) {
      this.plants.splice(index, 1);
      await this.storage.set('plants', this.plants);
    }
  }*/
}
/*


  saveModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
      scientificName: this.scientificName,
      plantType: this.plantName,
      plantNotes: this.plantNotes
    });
  }
  //sends info to database when modal closes
  closeModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
      scientificName: this.scientificName,
      plantType: this.plantName,
      plantNotes: this.plantNotes
    });
  }
  
  async deletePlant(index: number) {
    //deletes it
    if (index !== -1) {
      this.plants.splice(index, 1);
      await this.storage.set('plants', this.plants);
    }
  }*/
