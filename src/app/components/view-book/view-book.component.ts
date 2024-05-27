import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interfaces/Book';
import { CreateBookService } from 'src/app/services/book-service/create-book.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  form: FormGroup;
  bookId: number | null = null;
  book: Book = {
    id: 0,
    title: '',
    author: '',
    cover: '',
    description: '',
    type: '',
    year: 0
  };

  constructor(
    private fb: FormBuilder,
    private service: CreateBookService,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookId = parseInt(id, 10);
      this.service.findById(this.bookId).subscribe((item) => {
        this.book = item;
        this.form.patchValue({
          id: item.id,
          title: item.title,
          author: item.author,
          cover: item.cover,
          description: item.description,
          year: item.year,
          type: item.type,
        });
      });
    }
  }

}
