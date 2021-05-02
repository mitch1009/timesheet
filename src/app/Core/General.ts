export interface Description {
  value: string;
  viewValue: string;
}

export interface Manager {
  managerId: number;
  name: string;
  email: string;
  cellPhoneNumber: number;
  status: boolean;
}

export interface User {
  userId: number;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhoneNumber: number;
  status: boolean;
  manager: Manager[];
}

export interface Timesheet {
  timesheetId?: number;
  duration?: number;
  date?: number;
  description?: string;
  status?: boolean;
  user?: User[];
}

export interface  RawTimesheetData{
  hours?: number;
  minutes?: number;
  description?: string;
}
export interface UpdateManager {
  id: number;
  action: string;
}

export interface UpdateUser {
  id: number;
  action: string;
}

export interface UpdateTimesheet {
  id: number;
  action: string;
}
