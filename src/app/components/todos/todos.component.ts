import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos?: Todo[];
  deleteId?: number;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((retrievedTodos) => this.todos = retrievedTodos);
  }

  changeStatus(todo: Todo){
    todo.completed = !todo.completed;

    this.todoService.updateTodo(todo).subscribe();
  }

  setDeleteId(id: number){
    this.deleteId = id;
  }

  deleteTodo(){
    this.todoService.deleteTodo(this.deleteId).subscribe(() => this.todos = this.todos?.filter(
      (todo) => todo.id != this.deleteId
    ));
  }
}
