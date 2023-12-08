export default abstract class Book {
  // создание книги
  createBook(book:object){
    return book;
  };
  // получение книги по id
  getBook(id: string):object{
    return {id};
  }
  // получение всех книг
  getBooks(): Array<object>{
    return [{}];
  }
  // обновление книги
  updateBook(id:string){
    console.log(`book ${id} update`);
  }
  // удаление книги
  deleteBook(id:string){
    console.log(`book ${id} delete`);
  }
}