import { Component} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ResultPage } from '../result/result.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {}
  values = [
    {value: 0, label: '0%'},
    {value: 5, label: '5%'},
    {value: 10, label: '10%'},
    {value: 15, label: '15%'},
    {value: 20, label: '20%'},
    {value: 25, label: '25%'},
    {value: 30, label: '30%'},
    {value: 35, label: '35%'},
    {value: 40, label: '40%'},
    {value: 45, label: '45%'},
    {value: 50, label: '50%'},
    {value: 55, label: '55%'},
    {value: 60, label: '60%'},
    {value: 65, label: '65%'},
    {value: 70, label: '70%'},
    {value: 75, label: '75%'},
    {value: 80, label: '80%'},
    {value: 85, label: '85%'},
    {value: 90, label: '90%'},
    {value: 95, label: '95%'},
    {value: 100, label: '100%'}
  ];
  costForm = this.formBuilder.group({
    totalImport: ['', 
      [
        Validators.required, 
        Validators.min(0), 
        Validators.max(100000),
        Validators.pattern('^[0].[0]?[1-9][0-9]?|[1-9][0-9]*(.[0]?[1-9][0-9]?)?$')
      ]
    ],
    numberPeople: ['',
      [
        Validators.required, 
        Validators.min(1), 
        Validators.max(200),
        Validators.pattern('^[1-9][0-9]?[0-9]?$')
      ]
    ],
    selectedProp: ['',
      [
        Validators.required, 
        Validators.pattern('^(propPref|propRange)$')
      ]
    ],
    propPrefPercentage: ['',
      [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('^1?[0-9]?[0|5]$')
      ]
    ],
    propRangePercentage: ['',
      [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('^[0-1]?[0-9]?[0-9]$')
      ]
    ],
  });

  get totalImport() {
    return this.costForm.get('totalImport');
  }

  get numberPeople() {
    return this.costForm.get('numberPeople');
  }

  get selectedProp() {
    return this.costForm.get('selectedProp');
  }

  get propPrefPercentage() {
    return this.costForm.get('propPrefPercentage');
  }

  get propRangePercentage() {
    return this.costForm.get('propRangePercentage');
  }

  public errorMessages = {
    totalImport: [
      { type: 'required', message: 'El campo del importe total es un campo obligatorio' },
      { type: 'min', message: 'El importe total debe ser superior a 0' },
      { type: 'max', message: 'El importe total debe ser inferior a 10000' }
    ],
    numberPeople: [
      { type: 'required', message: 'El campo del número de comensales es un campo obligatorio' },
      { type: 'min', message: 'El número de comensales debe ser mayor a 1' },
      { type: 'max', message: 'El número de comensales debe ser menor a 200' }
    ],
    selectedProp: [
      { type: 'required', message: 'Es necesario haber seleccionado la forma en la que se desea introducir la propina' }
    ],
    propPrefPercentage: [
      { type: 'pattern', message: 'El porcentaje de la propina tiene que encontrarse entre 0 y 100 y entre las opciones disponibles para seleccionar' }
    ],
    propRangePercentage: [
      { type: 'pattern', message: 'El porcentaje de la propina tiene que encontrarse entre 0 y 100' }
    ]
  }

  showSpecificDivProp(typeOperation){
    switch(typeOperation.detail.value){
      case 'propPref':
        document.getElementById('propRef').style.display = 'block';
        document.getElementById('propRange').style.display = 'none';
        break;
      case 'propRange':
        document.getElementById('propRef').style.display = 'none';
        document.getElementById('propRange').style.display = 'block';
        break;
    }
  }

  calculate() {
    const totalImport = this.totalImport.value;
    const numberPeople = this.numberPeople.value;
    const selectedProp = this.selectedProp.value;
    const propPrefPercentage = this.propPrefPercentage.value;
    const propRangePercentage = this.propRangePercentage.value;
    var percentage = 0;
    var costPerUser = 0;
    var extraPay = 0;

    this.showValidationMessage(this.costForm);

    if(!this.costForm.valid){
      alert('El importe total, el número de comensales o la opción para seleccionar como se desea introducir el porcentaje de propina no han sido rellenados. Por favor, revise los campos marcados en rojo.');
    }
    else if(this.costForm.valid && (selectedProp === 'propPref' && propPrefPercentage === '')){
      alert('No se ha introducido el porcentaje de propina. Por favor, seleccione un porcentaje para poder continuar.');
    }
    else if(this.costForm.valid && (selectedProp === 'propRange' && propRangePercentage === '')){
      alert('No se ha introducido el porcentaje de propina. Por favor, seleccione un porcentaje para poder continuar.');
    }
    else{
      if(selectedProp === 'propPref'){
        extraPay = Math.round(totalImport * (propPrefPercentage))/100;
        percentage = propPrefPercentage;
      }
      else if(selectedProp === 'propRange'){
        extraPay = Math.round(totalImport * (propRangePercentage))/100;
        percentage = propRangePercentage;
      }
      costPerUser = Math.round((totalImport + extraPay)*100/numberPeople)/100;
      var extraPayText = extraPay + '';
      var costPerUserText = costPerUser + '';
      if(Math.floor(extraPay*100%100).toString().charAt(1) === '0'){//Si el número solo tiene un decimal
        extraPayText += '0';
        console.log(extraPayText);
      }
      if(Math.floor(costPerUser*100%100).toString().charAt(1) === '0'){//Si el número solo tiene un decimal
        costPerUserText += '0';
        console.log(costPerUserText);
      }
      console.log(extraPayText, costPerUserText);
      this.sendDataResultModal(totalImport, numberPeople, percentage, costPerUserText, extraPayText);
    }
  } 

  reset() {
    this.costForm.reset();
  }

  getErrorMessage(control: string) {
    return this.errorMessages[control];
  }

  showValidationMessage(formGroup: FormGroup) {
    for (const key in formGroup.controls) 
    {
      if (formGroup.controls.hasOwnProperty(key)) 
      {
        const control: FormControl = <FormControl>formGroup.controls[key];
        if (Object.keys(control).includes('controls')) 
        {
          const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
          this.showValidationMessage(formGroupChild);
        }
        control.markAsTouched();
      }
    }
  }

  async sendDataResultModal(totalImport, numberPeople, percentage, costPerUser, extraPay) {
    const modal = await this.modalController.create({
      component: ResultPage,
      componentProps: {
        'totalImport': totalImport,
        'numberPeople': numberPeople,
        'percentage': percentage,
        'costPerUser': costPerUser,
        'extraPay': extraPay
      }
    });
    return await modal.present();
  }
}
