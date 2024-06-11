import { Component, signal, computed, effect, inject, Injector } from '@angular/core';
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
    // {
    //   id: Date.now(),
    //   title: 'do something 1',
    //   finished: false
    // },
    // {
    //   id: Date.now(),
    //   title: 'do something 2',
    //   finished: false
    // },
    // {
    //   id: Date.now(),
    //   title: 'do something 3',
    //   finished: false
    // },
  ]);

  filterTasks = signal<'allTasks' | 'finished' | 'pending'>('allTasks');

  tasksFiltered = computed(() => {
    const filter = this.filterTasks();
    const tasks = this.tasks();
    if (filter === "pending") {
      return tasks.filter(task => !task.finished);
    }
    if (filter === "finished") {
      return tasks.filter(task => task.finished);
    }
    return tasks;
  });

  tasksFinished = computed(() => {
    return this.tasks().filter(task => task.finished);
  });



  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  // constructor() {
  //     effect(() => {
  //       const tasks = this.tasks();
  //       console.log(tasks , "run each time task change");
  //       localStorage.setItem('tasks', JSON.stringify(tasks));
  //     });
  //   };

  // We will use the injector above to use the effect() in another method ==>trackTasks() called in the ngOnInit().
  // IMPORTANT this is not "REALLY" needed. But could happend in contructor the effect will set tasks with an empty string (line 15 here). Then set them in local storage.
  // So we will save an empty array in localStorage. Not the idea ;)

  injector = inject(Injector);

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks , "run each time task change");
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  }



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

  changeFilterTasks(filter: 'allTasks' | 'finished' | 'pending') {
    this.filterTasks.set(filter);
  }

  deleteAllFinished() {
    if (this.tasksFinished().length > 0) {
      if(confirm("Are you sure to delete all finished tasks?")) {
      this.tasks.update((tasks) => tasks.filter(task => !task.finished));
      }
    }
  }

}
