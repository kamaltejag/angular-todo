import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  id?: number;
  content?: any;
  edit?: boolean = false;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.route.params.subscribe((parameters) =>
        this.todoService
          .getTodo(parameters.id)
          .subscribe(
            (retrievedTodo: any) => {this.id = retrievedTodo.id;this.content = retrievedTodo.content; this.edit = true;}
          )
      );
    }
  }

  onSubmit(){
    if(this.edit){
      const updatedTodo = {
        id: this.id,
        content: this.content,
        completed: false,
      };
      this.todoService.updateTodo(updatedTodo).subscribe(() => this.router.navigate(['']));
    }
    else{
      const newTodo = {
        content: this.content,
        completed: false,
      };
      this.todoService.createTodo(newTodo).subscribe(() => this.router.navigate(['']));
    }
  }

}
