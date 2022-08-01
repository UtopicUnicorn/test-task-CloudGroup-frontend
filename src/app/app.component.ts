import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryInterface } from './interfaces/category.interface';
import { AppService } from './services/app.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  categories!: CategoryInterface[];
  constructor(private appService: AppService, public dialog: MatDialog) {}

  title = 'test-task-cloud-frontend';
  modal = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250',
    });

    //Заменить вложенный subscribe
    dialogRef.afterClosed().subscribe(() => {
      this.appService
        .getCategories()
        .subscribe((resp: CategoryInterface[]) => (this.categories = resp));
    });
  }

  ngOnInit(): void {
    this.appService
      .getCategories()
      .subscribe(
        (categories: CategoryInterface[]) => (this.categories = categories)
      );
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  onChangeStatus($event: any) {
    console.log($event.target);
    const id = $event.target.value;
    const value = $event.target.checked;
    console.log(`${value}  ${id} `);
    const obj = {
      id: id,
      isCompleted: value,
    };

    //заменить вложенный subscribe
    this.appService
      .updateTodoStatus(obj)
      .subscribe(
        pipe(() =>
          this.appService
            .getCategories()
            .subscribe((res: CategoryInterface[]) => (this.categories = res))
        )
      );
  }
}

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['./app.component.scss'],
})
export class DialogComponent implements OnInit {
  todoForm!: FormGroup;
  categories!: CategoryInterface[];
  defaultOption: CategoryInterface = {
    title: 'Новая категория',
    id: 0,
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    private readonly appService: AppService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //init stage to download categories and create form
  ngOnInit(): void {
    this.appService.getCategories().subscribe(
      pipe(
        (categories: CategoryInterface[]) => (this.categories = categories),
        () => this.categories.push({ title: 'Добавить категорию', id: 0 })
      )
    );
    this.createForm();
  }

  // create form function
  createForm() {
    this.todoForm = this.fb.group({
      text: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      title: new FormControl('', Validators.nullValidator),
    });
  }

  //send form
  onSubmit(): void {
    let categoryNew: CategoryInterface;

    if (this.todoForm.value.title != '' && this.todoForm.value.id == 0) {
      const obj = {
        title: this.todoForm.value.title,
      };

      //заменить вложенные subscribe
      this.appService.createCategory(obj).subscribe(
        pipe(
          (resp: CategoryInterface) => (categoryNew = resp),
          () =>
            this.appService
              .createTodo({
                text: this.todoForm.value.text,
                categoryId: categoryNew.id,
              })
              .subscribe(() => {
                this.onNoClick();
              })
        )
      );
      return;
    }

    let obj = {
      text: this.todoForm.value.text,
      categoryId: this.todoForm.value.category,
    };
    this.appService.createTodo(obj).subscribe(() => {
      this.onNoClick();
    });
  }
}
