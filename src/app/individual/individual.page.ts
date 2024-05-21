import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavParams, ModalController } from '@ionic/angular';
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

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    addIcons({ close });
  }

  ngOnInit() {
  }

  saveModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
    });
  }
  //sends info to database when modal closes
  closeModal() {
    this.modalController.dismiss({
      plantName: this.plantName,
      plantSeason: this.plantSeason,
    });
  }
}
