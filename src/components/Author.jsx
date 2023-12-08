import React from "react";
import { useState } from "react";
const Author = ({ author, fetchAuthors }) => {
  const [name, setName] = useState(author.name);
  const [dob, setDob] = useState(author.dob);
  const [nationality, setNationality] = useState(author.nationality);
  const [editing, setEditing] = useState(false);
  const handleDelete = async () => {
    await fetch(`https://d2khx3lr92llqj.cloudfront.net/authors/${author.id}`, {
      method: "DELETE",
    }).then((res, err) => {
      console.log(res, err);
    });
    fetchAuthors();
  };
  const handleUpdate = async () => {
    await fetch(`https://d2khx3lr92llqj.cloudfront.net/authors/${author.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        dob,
        nationality,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setEditing(!editing);
        fetchAuthors();
        console.log(res);
      });
  };
  return (
    <div class="Book">
      {!editing ? (
        <>
          <h3>{author.name}</h3>
          <span>
            author date of birth: {new Date(author.dob).toDateString()} |
            nationality: {author.nationality}
          </span>
          {/* Add more book details here */}
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <label for="name">Name:</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label for="dob">dob:</label>
          <input
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
          <label for="nationality">nationality:</label>
          <input
            value={nationality}
            onChange={(e) => {
              setNationality(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </button>
        </>
      )}
      <button
        onClick={() => {
          setEditing(!editing);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Author;
