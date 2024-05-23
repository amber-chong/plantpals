import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { IndividualPage } from '../individual/individual.page';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})

export class DatabasePage implements OnInit {

  plantName = ''; // Blanks for later
  plantSeason = '';
  scientificName = '';
  plantType = '';
  plantNotes = '';
  plantImage = '';
  plants = [
    {
      plantName: 'strawberry',
      plantSeason: 'summer',
      scientificName: 'Fragaria',
      plantType: 'Berry',
      plantNotes: 'ripens too fast',
      plantImage: 'assets/placeholderSquare.png'
    },
  ]; // Temp string

  constructor(
    private modalController: ModalController,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    const storedPlants = await this.storage.get('plants');
    if (storedPlants) {
      this.plants = storedPlants;
      for (let i = 0; i < this.plants.length; i++) {
        const storedImage = await this.storage.get(`plantImage_${i}`);
        if (storedImage) {
          this.plants[i].plantImage = storedImage;
        }
      }
    }
  }

  async addPlant() {
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: {
        plantName: this.plantName,
        plantSeason: this.plantSeason,
        scientificName: this.scientificName,
        plantType: this.plantType,
        plantNotes: this.plantNotes,
        isNew: true,
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        const { plantName, plantSeason, scientificName, plantType, plantNotes, plantImage } = retval.data;
        const newIndex = this.plants.length;
        this.plants.push({ plantName, plantSeason, scientificName, plantType, plantNotes, plantImage });
        await this.storage.set('plants', this.plants);
        await this.storage.set(`plantImage_${newIndex}`, plantImage);
      }
    });

    return await modal.present();
  }

  async openPlantModal(index: number) {
    const plant = this.plants[index];
    const modal = await this.modalController.create({
      component: IndividualPage,
      componentProps: {
        plantName: plant.plantName,
        plantSeason: plant.plantSeason,
        scientificName: plant.scientificName,
        plantType: plant.plantType,
        plantNotes: plant.plantNotes,
        plantImage: plant.plantImage,
        index: index,
        isNew: false,
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        const { plantName, plantSeason, scientificName, plantType, plantNotes, plantImage, isDeleted } = retval.data;
        if (isDeleted) {
          this.plants.splice(index, 1);
          await this.storage.remove(`plantImage_${index}`);
        } else {
          this.plants[index].plantName = plantName;
          this.plants[index].plantSeason = plantSeason;
          this.plants[index].scientificName = scientificName;
          this.plants[index].plantType = plantType;
          this.plants[index].plantNotes = plantNotes;
          this.plants[index].plantImage = plantImage;
          await this.storage.set(`plantImage_${index}`, plantImage);
        }
        await this.storage.set('plants', this.plants);
      }
    });

    return await modal.present();
  }
}
  /*

  async editPlant(index: number) {
    const plant = this.plants[index]; // Get the current plant details
    const modal = await this.modalController.create({
      //creates same modal, but for editing
      component: IndividualPage,
      componentProps: {
        plantName: plant.plantName,
        plantSeason: plant.plantSeason,
      },
    });

    modal.onDidDismiss().then(async (retval) => {
      if (retval.data) {
        const { plantName, plantSeason } = retval.data; //replaces original data with edited
        this.plants[index].plantName = plantName;
        this.plants[index].plantSeason = plantSeason;
        await this.storage['set']('plants', this.plants); // Use bracket notation
      }
    });

    return await modal.present();
  }*/
