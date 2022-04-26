import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  //Se obtienen los datos de la página anterior para luego introducirlos en la actual para que se muestren en la página de resultado
  @Input() totalImport: number;
  @Input() numberPeople: number;
  @Input() percentage: number;
  @Input() costPerUser: number;
  @Input() extraPay: number;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  //Establece el cierre de la página
  close() {
    this.modalController.dismiss();
  }
}
