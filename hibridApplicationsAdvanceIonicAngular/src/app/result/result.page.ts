import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  @Input() costPerUser: number;
  @Input() extraPay: number;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
