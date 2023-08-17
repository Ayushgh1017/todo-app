import { Pipe,PipeTransform } from "@angular/core";
import { DatePipe } from '@angular/common';

@Pipe({name:'formatDate'})
export class CustomDatePipe implements PipeTransform{
    transform(value:Date) {
        return new DatePipe('en-us').transform(value,'medium');
    }
}
