import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssociateManagementService {

  constructor() { }

  getOldestDate(actualStartDate: string) {


    const oldestDate = actualStartDate;
    var monthAndYear = oldestDate.split("-");

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month_index = parseInt(monthAndYear[1], 10) - 1;


    const month = months[month_index];
    const year = monthAndYear[0];

    return month + '-' + year + ' to till date';

  }

  getMonthAndYear(actualStartDate: Date) {


   

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    const month = months[actualStartDate.getMonth()];

    return month + '-' + actualStartDate.getFullYear() + ' to till date';

  }



}
