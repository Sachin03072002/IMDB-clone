"use strict";
(function () {
    const searchKeyword = document.getElementById("search");
    const suggestionsContainer = document.getElementById("card-container");
    const favMoviesContainer = document.getElementById("fav-movies-container");
    const emptyText = document.getElementById("empty-search-text");
    const showFavourites = document.getElementById("favorites-section");
    const emptyFavText = document.getElementById("empty-fav-text");
    const loader = document.getElementById("loader-main");
    const notificationContainer = document.getElementById('notification-container');

    addToFavDOM();
    showEmptyText();
    let suggestionList = [];
    let favMovieArray = [];

    //showing loader when the data is being fetched
    function showLoading(loading) {

        if (loading == true) {
            loader.style.display = "block";
            suggestionsContainer.style.opacity = 0.4;

        } else {
            loader.style.display = "none";
            suggestionsContainer.style.opacity = 1;
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
                notify("Already added to fav list");
                isPresent = true;
            }

        });

        if (!isPresent) {
            favMovieArray.push(data);
            notify("Added to fav list");
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

    // To notify
    // To notify
    function notify(message) {
        const notification = document.createElement('div');
        notification.className = "notification";
        notification.classList.add('animate__animated', 'animate__backInRight');
        notification.textContent = message;

        notificationContainer.appendChild(notification);

        // Make sure the notification is initially hidden
        notification.style.display = "none";

        // Show the notification
        notification.style.display = "block";

        setTimeout(() => {
            // Hide the notification after 5 seconds
            setTimeout(() => {
                notification.style.display = "none";
            }, 3000);
            notification.classList.remove('animate__backInRight');
            notification.classList.add('animate__backOutLeft')
        }, 3005);
    }



    // Delete from favourite list
    function deleteMovie(name) {
        let favList = JSON.parse(localStorage.getItem("favMoviesList"));
        let updatedList = Array.from(favList).filter((movie) => {
            return movie.Title != name;
        });

        localStorage.setItem("favMoviesList", JSON.stringify(updatedList));
        notify("Deleted from fav list");
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