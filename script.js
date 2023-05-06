"use strict";
(function () {
    const searchKeyword = document.getElementById("search");
    const suggestionsContainer = document.getElementById("card-container");
    const favMoviesContainer = document.getElementById("fav-movies-container");
    const emptyText = document.getElementById("empty-search-text");
    const showFavourites = document.getElementById("favorites-section");
    const emptyFavText = document.getElementById("empty-fav-text");
    const loader = document.getElementById("loader-main");

    addToFavDOM();
    showEmptyText();
    let suggestionList = [];
    let favMovieArray = [];

    //showing loader when the data is being fetched
    function showLoading(loading) {
        console.log(loading);
        if (loading == true) {
            loader.style.display = "block";
            console.log(loader.style.display);
        } else {
            loader.style.display = "none";
            console.log(loader.style.display);
        }
    }
    searchKeyword.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            event.preventDefault();
        }
    });

    function showEmptyText() {
        if (favMoviesContainer.innerHTML == "") {
            emptyFavText.style.display = "block";
        } else {
            emptyFavText.style.display = "none";
        }
    }


    // Event listner on search
    searchKeyword.addEventListener("keyup", function () {
        let search = searchKeyword.value;
        console.log(search);
        if (search === "") {
            emptyText.style.display = "block";
            suggestionsContainer.innerHTML = "";
            // clears the previous movies from array
            suggestionList = [];
        } else {
            emptyText.style.display = "none";
            (async () => {
                let data = await fetchMovies(search);
                addToSuggestionContainerDOM(data);
            })();

            suggestionsContainer.style.display = "grid";
        }
    });

    // Fetches data from api and calls function to add it in
    async function fetchMovies(search) {
        const url = `https://www.omdbapi.com/?t=${search}&apikey=4edc9c6a`;
        try {
            console.log('fetch');
            showLoading(true); // start showing the loader
            const response = await fetch(url);
            const data = await response.json();
            showLoading(false); // stop showing the loader
            return data;
        } catch (err) {
            console.log(err);
        }
    }



    // Shows in suggestion container DOM
    function addToSuggestionContainerDOM(data) {
        document.getElementById("empty-fav-text").style.display = "none";
        let isPresent = false;

        // to check if the movie is already present in the suggestionList array
        suggestionList.forEach((movie) => {
            if (movie.Title == data.Title) {
                isPresent = true;
            }
        });

        if (!isPresent && data.Title != undefined) {
            if (data.Poster == "N/A") {
                data.Poster = "./not_found.png";
            }
            suggestionList.push(data);
            const movieCard = document.createElement("div");
            movieCard.setAttribute("class", "text-decoration");

            movieCard.innerHTML = `
        <div class="card my-2" data-id = " ${data.Title} ">
        <a href="movie.html" >
          <img
            src="${data.Poster}"

            class="card-img-top"
            alt="..."
            data-id = "${data.Title} "
          />
          <div class="card-body text-start">
            <h5 class="card-title" >
              <a href="movie.html" data-id = "${data.Title} "> ${data.Title}  </a>
            </h5>

            <p class="card-text">
              <i class="fa-solid fa-star">
                <span id="rating">&nbsp;${data.imdbRating}</span>
              </i>

              <button class="fav-btn">
                <i class="fa-solid fa-heart add-fav" data-id="${data.Title}"></i>
              </button>
            </p>
          </div>
        </a>
      </div>
    `;
            suggestionsContainer.prepend(movieCard);
        }
    }

    // Add to favourite of localStorage
    async function handleFavBtn(e) {
        const target = e.target;
        let data = await fetchMovies(target.dataset.id);

        let favMoviesLocal = localStorage.getItem("favMoviesList");

        if (favMoviesLocal) {
            favMovieArray = Array.from(JSON.parse(favMoviesLocal));
        } else {
            localStorage.setItem("favMoviesList", JSON.stringify(data));
        }

        // to check if movie is already present in the fav list
        let isPresent = false;
        favMovieArray.forEach((movie) => {
            if (data.Title == movie.Title) {
                notify("already added to fav list");
                isPresent = true;
            }

        });

        if (!isPresent) {
            favMovieArray.push(data);
        }

        localStorage.setItem("favMoviesList", JSON.stringify(favMovieArray));
        isPresent = !isPresent;
        addToFavDOM();
    }

    // Add to favourite list DOM
    function addToFavDOM() {
        favMoviesContainer.innerHTML = "";

        let favList = JSON.parse(localStorage.getItem("favMoviesList"));
        if (favList) {
            favList.forEach((movie) => {
                const div = document.createElement("div");
                div.classList.add(
                    "fav-movie-card",
                    "d-flex",
                    "justify-content-between",
                    "align-content-center",
                    "my-2"
                );
                div.innerHTML = `
   
    <img
      src="${movie.Poster == "N/A" ? "./not_found.png" : movie.Poster}"
      alt=""
      class="fav-movie-poster"
    />
    <div class="movie-card-details">
      <p class="movie-name mt-3 mb-0">
       <a href = "movie.html" class="fav-movie-name" data-id="${movie.Title}">${movie.Title}<a> 
      </p>
      <small class="text-muted">${movie.Year}</small>
    </div>

    <div class="delete-btn my-4">
        <i class="fa-solid fa-trash-can" data-id="${movie.Title}"></i>
    </div>
    `;

                favMoviesContainer.prepend(div);
            });
        }
    }

    // To notify
    function notify(text) {

    }

    // Delete from favourite list
    function deleteMovie(name) {
        let favList = JSON.parse(localStorage.getItem("favMoviesList"));
        let updatedList = Array.from(favList).filter((movie) => {
            return movie.Title != name;
        });

        localStorage.setItem("favMoviesList", JSON.stringify(updatedList));

        addToFavDOM();
        showEmptyText();
    }

    // Handles click events
    async function handleClickListner(e) {
        const target = e.target;

        if (target.classList.contains("add-fav")) {
            e.preventDefault();
            handleFavBtn(e);
        } else if (target.classList.contains("fa-trash-can")) {
            deleteMovie(target.dataset.id);
        } else if (target.classList.contains("fa-bars")) {
            if (showFavourites.style.display == "flex") {
                document.getElementById("show-favourites").style.color = "#8b9595";
                showFavourites.style.display = "none";
            } else {
                showFavourites.classList.add("animate__backInRight");
                document.getElementById("show-favourites").style.color =
                    "var(--logo-color)";
                showFavourites.style.display = "flex";
            }
        }

        localStorage.setItem("movieName", target.dataset.id);
    }

    // Event listner on whole document
    document.addEventListener("click", handleClickListner);
})();