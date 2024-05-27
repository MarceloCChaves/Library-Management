import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/interfaces/Book';
import { User } from 'src/app/interfaces/User';
import { CreateBookService } from 'src/app/services/book-service/create-book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book = {
    id: 0,
    title: 'teste',
    author: 'teste',
    cover: 'teste'
  }

  bookList: Book[] = [];
  user!: User

  constructor(
    private service: CreateBookService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem("user");
    this.user = userJson ? JSON.parse(userJson) : null;
  }
  

  deleteBook() {
    if (this.book.id) {
      if (confirm("Tem certeza que deseja deletar este livro?")) {
        try {
          this.service.deleteBook(this.book.id).subscribe(() => {
            this.toastr.success(`Livro ${this.book.title} deletado com sucesso!`);
            setTimeout(() => {
              window.location.reload();
            }, 3000)
          });
        } catch (error) {
          this.toastr.error(`Livro ${this.book.title} não foi deletado`);
        }
      }
    }
  }

}
