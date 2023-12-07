import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  inputHandler() {
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value !== '') {
        this.addOneTask(value);
        this.newTaskControl.setValue('');
      }
    }
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

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            finished: !task.finished
          }
        }
        return task;
      })
    })
  }

  updateTaskTitle(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }

  updateTaskTitleInputText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }



}
