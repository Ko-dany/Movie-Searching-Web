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
      <img
        src={posterURL}
        alt={title}
        style={{ width: "300px", height: "auto" }}
      />
      <h3>{tagline}</h3>
      {streamingInfo === null ? null : (
        <ul>
          {Object.keys(streamingInfo).map((key) => (
            <li key={id}>{key}</li>
          ))}
        </ul>
      )}
      <p>{overview}</p>
    </article>
  );
}

export default Movie;
