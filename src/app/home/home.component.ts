import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  defaultDateGroup: FormGroup;
  isCapture: boolean; // toggle capture content using the capture button
  today = new Date(); // get today's date - LocateDate
  myDate: moment.MomentInput; // momentJs to manipulate dates when modified and saved to database.
  firstDate: Date;
  lastDate: Date;
  currentSeries: Date[];
  showDescription: boolean;
  constructor(private fb: FormBuilder) {
    const month = this.today.getMonth(); // get the current month
    const year = this.today.getFullYear(); // get current year
    this.firstDate = new Date(year, month, 1); // first date of the month
    this.lastDate = new Date(year, month + 1, 0); // last date of the month
    this.firstDate.setDate(this.firstDate.getDate() - 15); // ad 15 days to get teh starting date of muse time-sheets
    this.lastDate.setDate(this.lastDate.getDate() + 16); // add 16 days to the last date of the moth to set the end of this interval

    /*Initialize Date FormGroup */
    this.defaultDateGroup = new FormGroup({
      start: new FormControl(this.firstDate), // Start Date
      end: new FormControl(this.lastDate) // End date
    });
  }

  ngOnInit(): void {
    this.currentSeries = this.shuffleDates(this.firstDate, this.lastDate); // instantiate currentSeries array
  }

  shuffleDates(startDate: Date, endDate: Date): Date[] {
    let dates = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    return dates;
  }

  /* gets the value of the selected description option and returns a boolean*/
  // tslint:disable-next-line:typedef
  getValue(op: string) {
    return (op !== 'Other') ? this.showDescription = false :  this.showDescription = !this.showDescription;
  }
}
