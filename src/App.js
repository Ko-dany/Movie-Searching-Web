import { useState } from "react";
import axios from "axios";

import Movie from "./components/Movie";

function App() {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchingMovie, setSearchingMovie] = useState("");

  const options = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/v2/search/title",
    params: {
      title: searchKey,
      country: "us",
      show_type: "movie",
      output_language: "en",
    },
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
        const response = await axios.request(options);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  return (
    <div>
      <h1>Hey! Try to search movies here</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Movie Title" onChange={onChange} />
        <button type="submit">Search</button>
      </form>
      {data.length === 0 || searchKey === "" ? null : (
        <div>
          <h1>Movie List for {searchingMovie}</h1>
          {data.result.map((movie) => (
            <Movie
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
