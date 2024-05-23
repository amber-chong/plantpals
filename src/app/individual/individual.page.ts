import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Storage } from '@ionic/storage';

//==========icons============
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.page.html',
  styleUrls: ['./individual.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  providers: [ImagePicker], //cried because of this one line
})

export class IndividualPage implements OnInit {
  plantName = '';
  plantSeason = '';
  scientificName = '';
  plantType = '';
  plantNotes = '';
  plantImage: string = '';
  x: number | null = null; //number | null = null is because itll get angry + a friend gave me this solution (im not looking into it its 9pm im going to bed)
  y: number | null = null;
  index: number | null = null;

  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private imagePicker: ImagePicker
  ) {
    addIcons({ close });
  }

  async ngOnInit() {
    await this.storage.create();

    //loads image
    if (this.index !== null) {
      this.plantImage =
        (await this.storage.get(`plantImage_${this.index}`)) || ''; //either loads image or a string
    }
  }

//=====================
  //janky way of letting files be loaded
  imageSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          this.plantImage = fileReader.result;
          if (this.index !== null) {
            //if its not nothing
            this.storage.set(`plantImage_${this.index}`, this.plantImage); //different images
          }
        }
      };
      fileReader.readAsDataURL(file); // base 64 string yay
    }
  }

//=====================
  //will be copied and pasted between individual, database and maps, no im not redoing it
  saveModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
      scientificName: this.scientificName,
      plantType: this.plantType,
      plantNotes: this.plantNotes,
      plantImage: this.plantImage,
      x: this.x,
      y: this.y,
    });
  }

//=====================
  closeModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
      scientificName: this.scientificName,
      plantType: this.plantType,
      plantNotes: this.plantNotes,
      plantImage: this.plantImage,
      x: this.x,
      y: this.y,
    });
  }
  
//=====================
  //deletes it from the database, nothing fancy
  async deletePlant() {
    if (this.index !== null) {
      await this.storage.remove(`plantImage_${this.index}`);
    }
    this.modalController.dismiss({
      isDeleted: true,
    });
  }
}
