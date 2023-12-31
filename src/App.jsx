import React, { useState, useEffect } from "react";
import BooksList from "./components/BooksList";
import AddBookForm from "./components/AddBookForm";
import AuthorsList from "./components/AuthorsList";
import AddAuthorForm from "./components/AddAuthorForm";
function App() {
  const [toggleBooks, setToggleBooks] = useState(true);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("https://d2khx3lr92llqj.cloudfront.net/books");
    const data = await response.json();
    console.log(data, "response");
    setBooks(data);
  };
  const fetchAuthors = async () => {
    const response = await fetch(
      "https://d2khx3lr92llqj.cloudfront.net/authors"
    );
    const data = await response.json();
    console.log(data, "response");
    setAuthors(data);
  };

  return (
    <div class="App">
      <h1>Book Library</h1>
      <button
        onClick={() => {
          setToggleBooks(true);
        }}
      >
        Books
      </button>
      <button
        onClick={() => {
          setToggleBooks(false);
        }}
      >
        Authors
      </button>
      {toggleBooks ? (
        <div>
          <AddBookForm fetchBooks={fetchBooks} />
          <BooksList books={books} fetchBooks={fetchBooks} />
        </div>
      ) : (
        <>
          <AddAuthorForm fetchAuthors={fetchAuthors} />
          <AuthorsList authors={authors} fetchAuthors={fetchAuthors} />
        </>
      )}
    </div>
  );
}

export default App;
