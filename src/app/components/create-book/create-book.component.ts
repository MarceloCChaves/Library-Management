import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { User } from 'src/app/interfaces/User';
import { CreateBookService } from 'src/app/services/book-service/create-book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  form!: FormGroup;
  user!: User;
  book!: Book;

  constructor(
    private fb: FormBuilder,
    private service: CreateBookService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['', Validators.required],
      description: ['', Validators.required],
      year:['', Validators.required],
      type: ['', Validators.required],
    });
  }

  createBook() {
    if (this.form.valid) {
      this.service.createBook(this.form.value).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
