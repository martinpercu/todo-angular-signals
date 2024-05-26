import { Component, signal } from '@angular/core';
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

  tasks = signal([
    'do something 1',
    'do something 2',
    'do something 3',
    'do something 4',
    'do something 5'
  ]);

  inputHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [...tasks, newTask]);
  }


}
