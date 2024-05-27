import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class CreateBookService {

  private readonly API = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) { }

  getAll(filter: string): Observable<Book[]>{

    let params = new HttpParams().set("q", filter);

    return this.http.get<Book[]>(this.API, {params: params});
  }

  findById(id: number): Observable<Book> {
    const url = `${this.API}/${id}`
    return this.http.get<Book>(url);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API, book);
  }

  editBook(book: Book): Observable<Book> {
    const url = `${this.API}/${book.id}`
    return this.http.put<Book>(url, book);
  }

  deleteBook(id: number): Observable<Book>{
    const url = `${this.API}/${id}`;
    return this.http.delete<Book>(url);
  }
}
