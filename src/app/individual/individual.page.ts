import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.page.html',
  styleUrls: ['./individual.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class IndividualPage implements OnInit {
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
}