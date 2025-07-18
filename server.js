const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const moviesPath = path.join(__dirname, "movies_metadata.json");
let movies = [];

try {
  const data = fs.readFileSync(moviesPath, "utf8");
  movies = JSON.parse(data);
  console.log(`Loaded ${movies.length} movies`);
} catch (error) {
  console.error("Failed to load movies_metadata.json:", error);
}



// A test route to make sure the server is up.
app.get("/api/movies/", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

app.get("/api/movies", (req, res) => {
  const movieList = movies.map(({ id, original_title, tagline, vote_average }) => ({
    id,
    original_title,
    tagline,
    vote_average
  }));
  res.json({ data: movieList });
});

app.get("/api/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const movie = movies.find(m => m.id.toString() === movieId);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json({ data: movie });
});

// A mock route to return some data.
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");
  response.json({ data: [{ id: 1, name: '1' }, { id: 2, name: '2' }] });
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
