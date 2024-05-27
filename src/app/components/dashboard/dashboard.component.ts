import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/interfaces/Book';
import { User } from 'src/app/interfaces/User';
import { CreateBookService } from 'src/app/services/book-service/create-book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookList: Book[] = [];
  user!: User;
  filter: string = '';
  featuredBook!: Book;

  constructor(private service: CreateBookService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    const userJson = localStorage.getItem("user");
    this.user = userJson ? JSON.parse(userJson) : null;

    this.service.getAll(this.filter).subscribe((list) => {
      this.bookList = list;
      this.setRandomFeaturedBook();
    });
  }

  searchProduct() {
    this.service.getAll(this.filter).subscribe((list) => {
      this.bookList = list;
    });
  }

  setRandomFeaturedBook() {
    const randomIndex = Math.floor(Math.random() * this.bookList.length);
    this.featuredBook = this.bookList[randomIndex];
  }

  handleLogout() {
    this.toastr.success("Logout realizado");
    localStorage.removeItem("user");
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000)
  }

}
