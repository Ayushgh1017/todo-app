import { Component, Input } from '@angular/core';
import { IUser } from '../post-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() selectedPost: IUser | null = null;
}
