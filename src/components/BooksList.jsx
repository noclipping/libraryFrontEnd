import React from "react";
import Book from "./Book";

const BooksList = ({ books, fetchBooks }) => {
  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} book={book} fetchBooks={fetchBooks} />
      ))}
    </div>
  );
};

export default BooksList;