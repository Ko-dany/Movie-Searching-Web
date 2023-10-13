import Movie from "./components/Movie";

function Result() {
  return (
    <div>
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

export default Result;
