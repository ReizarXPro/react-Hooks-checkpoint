import React, { useState } from "react";
import dataList from "./MovieList";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState(dataList);
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    description: "",
    posterUrl: "",
    rating: "",
  });

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const dataSearch = movies.filter((item) => {
    const filterLower = filter.toLowerCase();
    return (
      item.title.toLowerCase().includes(filterLower) ||
      item.rating.toString().toLowerCase().includes(filterLower)
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieInfo({
      ...movieInfo,
      [name]: value,
    });
  };

  const addMovie = (e) => {
    e.preventDefault();
    if (
      movieInfo.title &&
      movieInfo.description &&
      movieInfo.posterUrl &&
      movieInfo.rating
    ) {
      setMovies([...movies, movieInfo]);
      setMovieInfo({
        title: "",
        description: "",
        posterUrl: "",
        rating: "",
      });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div style={{ backgroundColor: "grey", padding: "20px" }}>
      <form onSubmit={addMovie}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movieInfo.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={movieInfo.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={movieInfo.posterUrl}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={movieInfo.rating}
          onChange={handleChange}
        />
        <button type="submit">Add New Movie</button>
      </form>

      <Navbar className="bg-body-tertiary justify-content-center mb-4">
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search by title or rating"
            value={filter}
            onChange={searchText}
          />
        </Form>
      </Navbar>

      <div className="d-flex flex-wrap justify-content-center">
        {dataSearch.map((item, index) => (
          <Card
            key={index}
            style={{
              width: "30rem",
              backgroundColor: "skyblue",
              color: "white",
              border: "solid",
              borderRadius: "10px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card.Img
              variant="top"
              src={item.posterUrl}
              style={{
                height: 200,
                width: 200,
                margin: "10px",
                borderRadius: "150px",
              }}
            />
            <Card.Body>
              <Card.Title>
                <h1>{item.title}</h1>
                <h1>{item.rating}</h1>
              </Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Search;
