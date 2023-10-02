import { useState } from "react";
import Movie from "./components/Movie";

import "./styles/App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchingMovie, setSearchingMovie] = useState("");

  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchKey}&country=us&show_type=movie&output_language=en`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9d8d045e64msha24ceb55d4dd45ap174ff0jsn88bd6ee49532",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  const onChange = (e) => {
    setSearchKey(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setSearchingMovie(searchKey);

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const parsedData = JSON.parse(result);

        parsedData.result.sort((a, b) => b.year - a.year);

        setData(parsedData);
        console.log(parsedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  return (
    <div>
      <video
        class="bg-video"
        playsinline="playsinline"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source src="/videos/bg-video.mp4" alt="Wrong Path" type="video/mp4" />
      </video>

      <h1 className="search-heading">Hey! Try to search movies here</h1>
      <Form className="search-form" onSubmit={onSubmit}>
        <Form.Control
          type="text"
          placeholder="Movie Title"
          onChange={onChange}
          required
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {data.length === 0 ? null : (
        <div>
          <h1>Movie List for "{searchingMovie}"</h1>
          {data.result.map((movie, index) => (
            <Movie
              key={index}
              id={movie.tmdbId}
              title={movie.title}
              year={movie.year}
              posterURL={movie.posterURLs.original}
              streamingInfo={
                movie.streamingInfo.us != null ? movie.streamingInfo.us : null
              }
              overview={movie.overview}
              tagline={movie.tagline}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
