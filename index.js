const apikey = 'a436ae2f';
const movie_details = document.querySelector(".movie-details");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("nameMovie");

searchForm.addEventListener("submit", function (e) {
e.preventDefault();
const nameMovie = searchInput.value.trim();

if (nameMovie === '') {
window.alert("Enter the movie name");
movie_details.style.display = "none";
return;
}

const apiurl = `https://www.omdbapi.com/?t=${encodeURIComponent(nameMovie)}&apikey=${apikey}`;

// Optional: show a loading message
movie_details.innerHTML = `<p class="detail" style="color:#4f8cff;">Loading...</p>`;
movie_details.style.display = "flex";

fetch(apiurl)
.then(response => response.json())
.then(data => {
    if (data.Response === "True") {
    display(data);
    } else {
    movie_details.innerHTML = `<p class="detail" style="color:#fa5252;">Movie not found. Please try another name.</p>`;
    // Optionally, hide after a few seconds
    setTimeout(() => {
        movie_details.style.display = "none";
        movie_details.innerHTML = "";
    }, 2000);
    }
})
.catch(error => {
    console.error("Error fetching movie data:", error);
    movie_details.innerHTML = `<p class="detail" style="color:#fa5252;">Error fetching movie data. Please try again later.</p>`;
    setTimeout(() => {
    movie_details.style.display = "none";
    movie_details.innerHTML = "";
    }, 2000);
});
});

function display(movie) {
movie_details.innerHTML = ""; // Clear previous details
movie_details.style.display = "flex";

// Poster
const img_display = document.createElement("img");
img_display.src = (movie.Poster && movie.Poster !== "N/A")
? movie.Poster
: "https://via.placeholder.com/180x240?text=No+Image";
img_display.alt = movie.Title || "Movie Poster";
img_display.classList.add("img_display");
movie_details.appendChild(img_display);

// Title
const movie_name = document.createElement("h1");
movie_name.textContent = movie.Title || "No Title";
movie_name.classList.add("movie_name");
movie_details.appendChild(movie_name);

// Year
if (movie.Year) {
const year = document.createElement("h2");
year.textContent = `Year : ${movie.Year}`;
year.classList.add("year");
movie_details.appendChild(year);
}

// Genre
if (movie.Genre) {
const gern = document.createElement("h4");
gern.textContent = `Genre: ${movie.Genre}`;
gern.classList.add("gern");
movie_details.appendChild(gern);
}

// Directors
if (movie.Director) {
const Directors = document.createElement("h4");
Directors.textContent = `Directors : ${movie.Director}`;
Directors.classList.add("Directors");
movie_details.appendChild(Directors);
}

// Actors
if (movie.Actors) {
const actors = document.createElement("h3");
actors.textContent = `Actors: ${movie.Actors}`;
actors.classList.add("actors");
movie_details.appendChild(actors);
}

// Plot
if (movie.Plot) {
const detail = document.createElement("p");
detail.textContent = movie.Plot;
detail.classList.add("detail");
movie_details.appendChild(detail);
}
}
