import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from './../models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'todoapp';

}
