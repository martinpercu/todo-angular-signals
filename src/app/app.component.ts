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

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'do something 1',
      finished: false
    },
    {
      id: Date.now(),
      title: 'do something 2',
      finished: false
    },
    {
      id: Date.now(),
      title: 'do something 3',
      finished: false
    },
    {
      id: Date.now(),
      title: 'do something 4',
      finished: false
    },
    {
      id: Date.now(),
      title: 'do something 5',
      finished: false
    }
  ]);

  inputHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addOneTask(newTask);
  }

  addOneTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      finished: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }


}
