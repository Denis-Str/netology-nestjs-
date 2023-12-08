export abstract class IBookRepository {
  // создание книги
  abstract createBook(book:object):object;
  // получение книги по id
  abstract getBook(id: string):object;
  // получение всех книг
  abstract getBooks(): Array<object>;
  // обновление книги
  abstract updateBook(id:string):void;
  // удаление книги
  abstract deleteBook(id:string):void;
}
