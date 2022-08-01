// import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import {CategoryInterface} from "../interfaces/category.interface";
//
// // interface Category {
// //   id: string;
// //   title: string;
// // }
//
//
// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.scss']
// })
//
//
// export class FormComponent implements OnInit {
//
//   todoForm!: FormGroup;
//
//   categories!: CategoryInterface[];
//
//   @Output() close = new EventEmitter<void>();
//
//   constructor(
//     private fb: FormBuilder,
//     // private readonly categoryService: CategoryService,
//   ) { }
//
//   ngOnInit(): void {
//
//     this.createForm();
//   }
//
//   createForm(){
//     this.todoForm = this.fb.group({
//       text: new FormControl('', Validators.required),
//       category: new FormControl('', Validators.required),
//     });
//   }
//
//   onSubmit():void{
//     console.log('хуй');
//   }
// }
