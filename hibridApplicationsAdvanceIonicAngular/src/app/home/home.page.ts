import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  cost = {
    totalImport: "",
    numberPeople: "",
    propPrefPercentage: "",
    propRangePercentage: "",
    costPerPerson: ""
  }

  constructor() {}

  showSpecificDivProp(typeOperation){
    switch(typeOperation.detail.value){
      case 'propPref':
        console.log('propPref');
        document.getElementById('propRef').style.display = 'block';
        document.getElementById('propRange').style.display = 'none';
        this.cost.propRangePercentage = "";
        break;
      case 'propRange':
        console.log('propRange');
        document.getElementById('propRef').style.display = 'none';
        document.getElementById('propRange').style.display = 'block';
        this.cost.propPrefPercentage = "";
        break;
    }
  }

  calculate()
  {
    var percentage;
    var extraSalary;
    var totalImport: number = parseInt(this.cost.totalImport);
    var numberPeople: number = parseInt(this.cost.numberPeople);

    if(this.cost.propPrefPercentage != "")
    {
      percentage = parseInt(this.cost.propPrefPercentage);
      extraSalary = (percentage * totalImport) / 100;
    }

    console.log(this.cost);
  }

}
