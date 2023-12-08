import React from "react";
import { useState } from "react";
const Book = ({ book, fetchBooks }) => {
  const [title, setTitle] = useState(book.title);
  const [authorid, setAuthorId] = useState(book.author_id);
  const [publication_year, setPublicationYear] = useState(
    book.publication_year
  );
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    await fetch(
      `http://ec2-3-110-87-83.ap-south-1.compute.amazonaws.com:3000/${book.id}`,
      {
        method: "DELETE",
      }
    ).then((res, err) => {
      console.log(res, err);
    });
    fetchBooks();
  };
  const handleUpdate = async () => {
    fetch(
      `http://ec2-3-110-87-83.ap-south-1.compute.amazonaws.com:3000/${book.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author_id: authorid,
          publication_year,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => fetchBooks());
    setEditing(!editing);
  };
  const handleEdit = async () => {
    setEditing(!editing);
    setTitle(book.title);
    setAuthorId(book.author_id);
    setPublicationYear(book.publication_year);
  };
  return (
    <div class="Book">
      {!editing ? (
        <>
          <h3>{book.title}</h3>
          <span>
            author_id: {book.author_id} | year published:{" "}
            {book.publication_year}
          </span>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <label>Title:</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <label>Author Id:</label>
          <input
            onChange={(e) => {
              setAuthorId(e.target.value);
            }}
            value={authorid}
          />
          <label>Publication Year:</label>
          <input
            onChange={(e) => {
              setPublicationYear(e.target.value);
            }}
            value={publication_year}
          />
          <button onClick={handleUpdate}>Update</button>
        </>
      )}

      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default Book;
