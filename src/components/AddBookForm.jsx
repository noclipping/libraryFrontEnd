import React, { useState } from "react";

const AddBookForm = ({ fetchBooks }) => {
  const [title, setTitle] = useState();
  const [authorid, setAuthorId] = useState();
  const [publicationYear, setPublicationYear] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length <= 0) {
      setErrorMessage("error length too low for title");
      return;
    }
    await fetch("https://d2khx3lr92llqj.cloudfront.net/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author_id: authorid,
        publication_year: publicationYear,
      }), // Include other book attributes
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.Error) {
          setErrorMessage(res.Error);
        } else {
          console.log(res);
          setAuthorId("");
          setErrorMessage("");
          setPublicationYear("");
          setTitle("");
        }
      });
    fetchBooks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="title">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <label for="title">AuthorId:</label>
      <input
        type="text"
        value={authorid}
        onChange={(e) => setAuthorId(e.target.value)}
        placeholder="1"
      />
      <br />
      <label for="title">Publication Year:</label>
      <input
        type="text"
        value={publicationYear}
        onChange={(e) => setPublicationYear(e.target.value)}
        placeholder="1999"
      />
      <br />
      <button type="submit">Add Book</button>

      <span style={{ color: "red" }}>{errorMessage ? errorMessage : ""}</span>
    </form>
  );
};

export default AddBookForm;
