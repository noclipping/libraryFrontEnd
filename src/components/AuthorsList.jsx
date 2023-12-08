import React from "react";
import Author from "./Author";

const AuthorsList = ({ authors, fetchAuthors }) => {
  return (
    <div>
      {authors.map((author) => (
        <Author key={author.id} author={author} fetchAuthors={fetchAuthors} />
      ))}
    </div>
  );
};

export default AuthorsList;
