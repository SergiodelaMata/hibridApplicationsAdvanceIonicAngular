import { Component} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  constructor(private formBuilder: FormBuilder) {}
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
      { type: 'required', message: 'Total import is required' },
      { type: 'min', message: 'Total import must be greater than 0' },
      { type: 'max', message: 'Total import must be less than 10000' }
    ],
    numberPeople: [
      { type: 'required', message: 'Number of people is required' },
      { type: 'min', message: 'Number of people must be greater than 1' },
      { type: 'max', message: 'Number of people must be less than 200' }
    ],
    selectedProp: [
      { type: 'required', message: 'Property type is required' }
    ],
    propPrefPercentage: [
      { type: 'pattern', message: 'Percentage must be between 0 and 100' }
    ],
    propRangePercentage: [
      { type: 'pattern', message: 'Percentage must be between 0 and 100' }
    ]
  }

  showSpecificDivProp(typeOperation){
    switch(typeOperation.detail.value){
      case 'propPref':
        console.log('propPref');
        document.getElementById('propRef').style.display = 'block';
        document.getElementById('propRange').style.display = 'none';
        break;
      case 'propRange':
        console.log('propRange');
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
    var costPerUser = 0;
    var extraPay = 0;

    if(!this.costForm.valid){
      alert('Please fill all the fields correctly');
    }
    else if(this.costForm.valid && (selectedProp === 'propPref' && propPrefPercentage === '')){
      alert('Please fill the percentage of the property preference');
    }
    else if(this.costForm.valid && (selectedProp === 'propRange' && propRangePercentage === '')){
      alert('Please fill the percentage of the property range');
    }
    else{
      if(selectedProp === 'propPref'){
        extraPay = totalImport * (propPrefPercentage/100);
      }
      else if(selectedProp === 'propRange'){
        extraPay = totalImport * (propRangePercentage/100);
      }
      costPerUser = (totalImport + extraPay)/numberPeople;
    }
    console.log(totalImport, numberPeople, selectedProp, propPrefPercentage, propRangePercentage);
    console.log(costPerUser, extraPay);
  } 

  reset() {
    this.costForm.reset();
  }

  getErrorMessage(control: string) {
    return this.errorMessages[control];
  }
}
