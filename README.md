# IMDb Movie Suggestion Project

This project utilizes the IMDb API to provide movie suggestions based on user input. It features a search bar where users can enter their queries, view the suggested movies, and add them to their favorites list. The favorites list is stored locally using the browser's local storage feature. Users can also remove movies from their favorites list.

## Getting Started

To run this project locally, follow the steps below:

1. Clone the project repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd imdb-movie-suggestion
   ```
3. Open the project in a code editor of your choice.

## API Key

This project requires an IMDb API key to function properly. To obtain an API key, follow these steps:

1. Visit the [IMDb API](https://developer.imdb.com/) website.
2. Sign up for an account and generate an API key.
3. Copy the API key.

## Configuring the Project

1. Replace the value for `IMDB_API_KEY` with your IMDb API key obtained earlier.

## Running the Project

To run the project, open the `index.html` file in a web browser of your choice. The application will load, and you can start using it immediately.

## Features

### Movie Search

The search bar allows users to enter keywords or movie titles to find relevant suggestions. As the user types, the application dynamically fetches data from the IMDb API and displays matching movie suggestions.

### Adding Movies to Favorites

Users can click on a suggested movie to view its details and choose to add it to their favorites list. The selected movies are stored in the browser's local storage so that they persist even after refreshing or closing the application.

### Removing Movies from Favorites

Within the favorites list, users can remove movies they no longer wish to keep. When a movie is removed, it is deleted from the local storage, ensuring that the user's preferences are up to date.

## Technologies Used

This project is built using the following technologies:

- HTML
- CSS
- JavaScript
- IMDb API

## Contributing

Contributions to this project are welcome. If you find any bugs or have suggestions for improvements, please open an issue on the project repository.

When contributing to this project, please follow the existing coding style and guidelines. Make sure to test any changes thoroughly before submitting a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code for personal or commercial purposes.

## Acknowledgements

- [IMDb API](https://developer.imdb.com/) for providing the movie data and search functionality.
- The developers and maintainers of the libraries and resources used in this project.
