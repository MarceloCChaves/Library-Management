import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBookService } from 'src/app/services/book-service/create-book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  form: FormGroup;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: CreateBookService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['', Validators.required],
      description: ['', Validators.required],
      year:['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookId = parseInt(id, 10);
      this.service.findById(this.bookId).subscribe((item) => {
        this.form.patchValue({
          id: item.id,
          title: item.title,
          author: item.author,
          cover: item.cover,
          description: item.description,
          year: item.year,
          type: item.type
        });
      });
    }
  }

  editBook() {
    if (this.bookId !== null) {
      this.service.editBook(this.form.value).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

}
