import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Storage } from '@ionic/storage';

import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.page.html',
  styleUrls: ['./individual.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  providers: [ImagePicker]
})
export class IndividualPage implements OnInit {
  plantName = '';
  plantSeason = '';
  scientificName = '';
  plantType = '';
  plantNotes = '';
  plantImage: string = '';
  index: number | null = null; // For identifying the plant

  constructor(
    private modalController: ModalController, private storage: Storage, private imagePicker: ImagePicker) {
    addIcons({ close });
  }

  async ngOnInit() {
    await this.storage.create();
    if (this.index !== null) {
      // Load plant image if it's an existing plant
      this.plantImage = await this.storage.get(`plantImage_${this.index}`) || '';
    }
  }

  imageSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          this.plantImage = fileReader.result;
          if (this.index !== null) {
            this.storage.set(`plantImage_${this.index}`, this.plantImage);
          }
        }
      };
      fileReader.readAsDataURL(file); // This will produce a base64 string
    }
  }

  saveModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
      scientificName: this.scientificName,
      plantType: this.plantType,
      plantNotes: this.plantNotes,
      plantImage: this.plantImage
    });
  }

  closeModal() {
    this.modalController.dismiss(null); // Return null to indicate no changes
  }
  
  async deletePlant() {
    if (this.index !== null) {
      await this.storage.remove(`plantImage_${this.index}`);
    }
    this.modalController.dismiss({
      isDeleted: true
    });
  }
}
/*
  async deletePlant(index: number) {
    //deletes it
    if (index !== -1) {
      this.plants.splice(index, 1);
      await this.storage.set('plants', this.plants);
    }
  }*/
