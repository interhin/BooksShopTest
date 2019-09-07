
export default class BookstoreService {

  getBooks = async () => {
    const res = await fetch("http://5d22b7fd4e05c600146ef4dd.mockapi.io/cupcake/books");
    const json = await res.json();
    return json.books.map(this.mapResToBook);
  }

  mapResToBook = (book) => {
    return {
      id: book.isbn13,
      title: book.title,
      image: book.image,
      price: book.price,
      subtitle: book.subtitle,
      url: book.url
    }
  }
}