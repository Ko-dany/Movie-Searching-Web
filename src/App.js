import { useState } from "react";
import { Router, Routes } from "react-router-dom";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

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
    <div className="body">
      {/* <video
        class="bg-video"
        playsinline="playsinline"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source src="/videos/bg-video.mp4" alt="Wrong Path" type="video/mp4" />
      </video> */}

      <img className="bg-img" src="/images/Clapboard.jpg" alt="Clapboard" />
      <div className="main-div">
        <div className="main-div-content col-7 col-lg-6">
          <h1 className="main-tagline">Search your movie!</h1>
          <p className="main-intro">
            Welcome to our movie search experience, where you can enhance your
            movie exploration journey. Simply search by the movie title, and
            you'll discover valuable information such as posters, realese date,
            taglines, overviews, and streaming details. Explore the detailed
            information of your favorit movies and enjoy your time here!
          </p>
          <Form className="search-form mt-4 mb-4" onSubmit={onSubmit}>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Movie Title"
              onChange={onChange}
              required
            />
            <Button
              className="form-btn btn btn-primary mt-4"
              variant="primary"
              type="submit"
            >
              Search
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
