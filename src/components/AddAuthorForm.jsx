import React, { useState } from "react";

const addAuthorForm = ({ fetchAuthors }) => {
  const [name, setName] = useState();
  const [dob, setDOB] = useState();
  const [nationality, setNationality] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      "http://ec2-3-110-87-83.ap-south-1.compute.amazonaws.com:3000/authors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          dob,
          nationality,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.Error) {
          setErrorMessage(res.Error);
        } else {
          fetchAuthors();
          setName("");
          setDOB("");
          setNationality("");
          setErrorMessage("");
        }
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label for="name">name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <br />
      <label for="dob">dob:</label>
      <input
        type="text"
        value={dob}
        onChange={(e) => setDOB(e.target.value)}
        placeholder="1999-01-20"
      />
      <br />
      <label for="nationality">nationality:</label>
      <input
        type="text"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
        placeholder="American"
      />
      <br />
      <button type="submit">Add Author</button>

      <span style={{ color: "red" }}>{errorMessage ? errorMessage : ""}</span>
    </form>
  );
};
export default addAuthorForm;
