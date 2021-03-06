import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

/**
 * Provides templates and models for adding a description to a listing.
 */
@Component({
  selector: 'form-element-expiry-date',
  templateUrl: './expiry-date.component.html',
  styleUrls: [ './expiry-date.component.css' ]
})
export class ExpiryDateFormComponent {

  public isModelAvailable : boolean = false;

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
      if (!this.model.expiryDate) {
        this.model.expiryDate = null;
      }
      this.form.addControl('day', new FormControl('day'));
      this.form.addControl('month', new FormControl('month'));
      this.form.addControl('year', new FormControl('year'));
      this.isModelAvailable = true;
    })
  }

  public addExpiryDateToModel() : void {
    if (this.day && this.month && this.year) {
      let unixDate : number = new Date(this.year, this.month, this.day).getTime();
      this.model.expriyDate = unixDate;
    }
  }

  private createNumberArrayAscending(from : number, to : number) : number[] {
    let numbers : number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    return numbers;
  }

}
