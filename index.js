const apikey = 'a436ae2f';
const movie_details=document.querySelector(".movie-details");
function Search() {
    const name = document.getElementById("nameMovie");
    const nameMovie = name.value.trim(); 
    if (nameMovie === '') {
        window.alert("Enter the movie name");
        return; 
    }
    const apiurl = `https://www.omdbapi.com/?t=${nameMovie}&apikey=${apikey}`;

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                const movie = data; 
                display(movie);
            } else {
                window.alert("Movie not found. Please try another name.");
            }
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
            window.alert("Error fetching movie data. Please try again later.");
        });
}

function display(movie) {
    movie_details.textContent=" ";
    movie_details.style.display="flex";
    const img_display=document.createElement("img");
    img_display.src=movie.Poster;
    img_display.alt = movie.Title || "Movie Poster";
    img_display.classList.add("img_display");
    movie_details.appendChild(img_display);
    const movie_name=document.createElement("h1");
    movie_name.textContent=movie.Title;
    movie_name.classList.add("movie_name");
    movie_details.appendChild(movie_name);
    const year=document.createElement("h2");
    year.textContent=`Year : ${movie.Year}`;
    year.classList.add("year");
    movie_details.appendChild(year);
    const gern=document.createElement("h4");
    gern.textContent=`Genre: ${movie.Genre}`;
    gern.classList.add("gern");
    movie_details.appendChild(gern);
    const Directors=document.createElement("h4");
    Directors.textContent=`Directors : ${movie.Director}`;
    Directors.classList.add("Directors");
    movie_details.appendChild(Directors);
    const actors=document.createElement("h3");
    actors.textContent=`Actors: ${movie.Actors}`;
    actors.classList.add("actors");
    movie_details.appendChild(actors);
    const detail=document.createElement("p");
    detail.textContent=movie.Plot;
    detail.classList.add("detail");
    movie_details.appendChild(detail);
}







