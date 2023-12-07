# To do app... angular 17 using signals

## starting-structure
- Here is just add all the structure without logic.
- Wi will use just one component. ===> app.component
- Create the full html + css structure of the app. This means the differens looks of parts: (active imputs toggles etc).
- Add styles.css for html body 
- In the app.component.html create all the base to work with. 
- In the app.component.css add all the styles needed. 
- New folder 'models' then add the 'taskmodel'. 
- Import the task model in the app.component.ts. (this will help in the future).
- Also I make a favicon ;)

## Task list (static)
- Create a list of task with signal in the TS.
- @for to show this list.
- Comment the html useless. (then we will use it).

## Input implementation
- New method inputHandler(). This will get the new task and then add it into the signal tasks array state.
- In the html add (change)="inputHandler($event)"

## Delete Task
- New method deleteTask().
- In html add a (click in the button class"destroy"). Important in Click deleteTask(i). "i" is the index generated in the @for.

## List Task Objects
- In TS tranform the array of task adding object. ===> like we have in models task.model.ts
- Add new method addOneTask(). This will be invoke from the inputHandler()
- In inputHandler() call the addOneTask() with the newTask.
- In html change {{ task }} for {{ task.title }}.

## Updating tasks
- In TS new Method updateTask().
- In Html the input checkbox for each task add [checked]="task.finished". This will change the style depending in how is the task state. Also add ===> (change)="updateTask(i)" just to call the method.
- Also in HTML in the footer in the task counter add something like {{ tasks().length }} to show tasks quantities.












# Todoapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
