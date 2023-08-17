import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from '@angular/common';

@Pipe({ name: 'formatDate' })
export class CustomDatePipe implements PipeTransform {
  transform(deadlineDate: string | null, deadlineTime: { hour: number, minute: number }): string {
    if (!deadlineDate) {
      return '';
    }

    const date = new Date(`${deadlineDate} ${deadlineTime.hour}:${deadlineTime.minute}`);
    return new DatePipe('en-US').transform(date, 'medium') || '';
  }
}

@Pipe({name : 'dueDate'})
    export class DueDatePipe implements PipeTransform {
        transform(date: string): string {

            const dueDate = new Date(date);
            const currDate = new Date();
            const diffMonth = dueDate.getTime() - currDate.getTime();
            const diffDays = Math.floor(diffMonth / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor((diffMonth % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMonth % (1000 * 60 * 60)) / (1000 * 60));
            const diffSecs = Math.floor((diffMonth % (1000 * 60)) / 1000);
        
            return `${diffDays}d ${diffHours}h ${diffMins}m ${diffSecs}s`;
        
          }
        
    }

