import "./Movie.css";

function Movie({
  id,
  title,
  year,
  posterURL,
  streamingInfo,
  overview,
  tagline,
}) {
  return (
    <article>
      <h2>
        {title} ({year})
      </h2>
      <h3>"{tagline}"</h3>
      <img
        src={posterURL}
        alt={title}
        style={{ width: "300px", height: "auto" }}
      />
      {streamingInfo === null ? null : (
        <div>
          <h4>Streaming Service</h4>
          <ul>
            {Object.keys(streamingInfo).map((key, index) => (
              <li key={index}>{key}</li>
            ))}
          </ul>
        </div>
      )}
      <p>{overview}</p>
    </article>
  );
}

export default Movie;
