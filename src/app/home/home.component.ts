import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Description, Manager, Timesheet} from '../Core/General';
import {ManagerService} from '../Core/Services/manager.service';
import {TimesheetService} from '../Core/Services/timesheet.service';
import {MatSelect} from '@angular/material/select';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  descrip = true;
  timesheet: Timesheet[];
  manager: Manager[];

  description: Description[] = [{value: 'Weekend', viewValue: 'Weekend'}, {value: 'Festival', viewValue: 'Festival'},
    {value: 'Other', viewValue: 'Other'}];

  defaultDateGroup: FormGroup;
  isCapture: boolean; // toggle capture content using the capture button
  today = new Date(); // get today's date - LocateDate
  myDate: moment.MomentInput; // momentJs to manipulate dates when modified and saved to database.
  firstDate: Date;
  lastDate: Date;
  currentSeries: Date[];
  showDescription: boolean;

  constructor(private fb: FormBuilder, private managerService: ManagerService, private timesheetService: TimesheetService) {
    const month = this.today.getMonth(); // get the current month
    const year = this.today.getFullYear(); // get current year
    this.firstDate = new Date(year, month, 1); // first date of the month
    this.lastDate = new Date(year, month + 1, 0); // last date of the month
    this.firstDate.setDate(this.firstDate.getDate() + 15); // ad 15 days to get teh starting date of muse time-sheets
    this.lastDate.setDate(this.lastDate.getDate() + 15); // add 16 days to the last date of the moth to set the end of this interval

    /*Initialize Date FormGroup */
    this.defaultDateGroup = new FormGroup({
      start: new FormControl(this.firstDate), // Start Date
      end: new FormControl(this.lastDate) // End date
    });
  }

  @ViewChild('SelectedValue') SelectedValue: MatSelect;

  ngOnInit(): void {
    console.log(this.shuffleDates(this.firstDate, this.lastDate));
    this.timesheetService.getAllTimesheets().subscribe(data => {
      this.timesheet = data;
      console.log(this.timesheet);
    });
    this.managerService.getAllManagers().subscribe(data => {
      this.manager = data;
      console.log(this.manager);
    });
    this.currentSeries = this.shuffleDates(this.firstDate, this.lastDate); // instantiate currentSeries array
    console.log(this.currentSeries);
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

  captureTimesheet(): void {
    console.log(this.defaultDateGroup);
    const startDate = this.defaultDateGroup.value.start;
    const endDate = this.defaultDateGroup.value.end;
    console.log(startDate);
    console.log(endDate);
    this.firstDate = startDate;
    this.lastDate = endDate;
    console.log(this.firstDate);
    this.currentSeries = this.shuffleDates(this.firstDate, this.lastDate);
  }

  /* gets the value of the selected description option and returns a boolean*/

  // tslint:disable-next-line:typedef
  getValue(op: string) {
    return (op !== 'Other') ? this.showDescription = false : this.showDescription = !this.showDescription;
  }

  // tslint:disable-next-line:typedef
  descriptions($event: any) {
    this.SelectedValue.valueChange.subscribe(data => {
      console.log(data);
    });
    console.log(document.querySelector('data-option'));
    console.log($event.target.dataset.option);
    console.log($event.target.id);
    console.log($event.target.firstChild.data);
    /* if (op === 'Other') {
       this.descrip = !this.descrip;
     } else {
       this.descrip = true;

     }*/

  }
}
