import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

export interface DateProperty {
  name : string,
  display : string
}

@Component({
  selector: 'form-element-date',
  templateUrl: './date.component.html',
  styleUrls: [ './date.component.css' ]
})
export class DateFormComponent implements OnInit {

  @Input() dateProperty : DateProperty;

  public datePropertyName : string;

  public datePropertyDisplay : string;

  public isModelAvailable : boolean = false;

  public isInputAvailable : boolean = false;

  form : FormGroup;

  model : any;

  data : any;

  public days : number[] = this.createNumberArrayAscending(1, 31);
  public months : number[] = this.createNumberArrayAscending(1, 12);
  public years : number[] = this.createNumberArrayAscending(new Date().getFullYear(), new Date().getFullYear() + 20);

  public day : number;

  public month : number;

  public year : number;

  constructor(
    private formContextService : FormContextService
  ) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      this.form.addControl('day', new FormControl('day'));
      this.form.addControl('month', new FormControl('month'));
      this.form.addControl('year', new FormControl('year'));
      this.isModelAvailable = true;
    })
  }

  public addDateToModel() : void {
    if (this.day && this.month && this.year) {
      let unixDate : number = new Date(this.year, this.month, this.day).getTime();
      this.model[this.datePropertyName] = unixDate;
    }
  }

  private createNumberArrayAscending(from : number, to : number) : number[] {
    let numbers : number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  public ngOnInit() : void {
    if (this.dateProperty) {
      this.datePropertyName = this.dateProperty.name;
      this.datePropertyDisplay = this.dateProperty.display;
      this.isInputAvailable = true;
    }
  }

}
