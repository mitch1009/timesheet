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

  selectedValue: string;
  /* gets the value of the selected description option and returns a boolean*/

  // tslint:disable-next-line:typedef
  selectedDevice: any;


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

  captureTimesheet(): void {
    const startDate = this.defaultDateGroup.value.start;
    const endDate = this.defaultDateGroup.value.end;
    this.firstDate = startDate;
    this.lastDate = endDate;
    this.currentSeries = this.shuffleDates(this.firstDate, this.lastDate);
  }
  onChange(e: any): void {
    // set the target element
    const target = e.target;
    // grab the data attribute from the target element
    const selectedSection = e.target.dataset.dateSelect;
    // grab the innerText from the target element
    const text = target.options[target.options.selectedIndex].innerText;
    // get the text area inside the current element given its dataset value
    const textAreaElement = document.getElementById(selectedSection);
    if (text === 'Other'){ // if the selected option is Other show the text area
      textAreaElement.dataset.hidden = String(false);
    }else { // else keep it in its hidden state.
      textAreaElement.dataset.hidden = String(true);
    }
  }
  cloudSave(e: any): void{
    alert(e.target.dataset.label);
    return null;
  }
}
