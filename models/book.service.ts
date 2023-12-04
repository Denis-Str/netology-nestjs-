import { injectable } from "inversify";
import { IBookRepository } from "./book.repository";

@injectable()
export class UserService {
  constructor(private readonly repo: IBookRepository) {}

  createBook(book:object) {
    return this.repo.createBook(book);
  }
  fetchBook(id:string) {
    return this.repo.getBook(id);
  }
  fetchBooks() {
    return this.repo.getBooks();
  }
  updateBook(id:string) {
    this.repo.updateBook(id);
    console.log(`book ${id} update`);
  }
  deleteBook(id:string){
    this.repo.deleteBook(id);
    console.log(`book ${id} delete`);
  }
}
