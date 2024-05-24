import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';

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
    private imagePicker: ImagePicker
  ) {
    addIcons({ close });
  }

  async ngOnInit() {}

    //=============

  imageSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          this.plantImage = fileReader.result;
        }
      };
      fileReader.readAsDataURL(file);
    }
  }

  //saves modal and anything in it
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

  //closes modal
  closeModal() {
    this.modalController.dismiss();
  }

  async deletePlant() {
    this.modalController.dismiss({
      isDeleted: true,
    });
  }
}