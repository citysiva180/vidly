import React, { Component } from "react";
import ListGroup from "./listGroup";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "./utils/paginate";
import Like from "./like";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  //  +------------------------------------+
  //    Here is the logic for Delete button
  //  +------------------------------------+

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  //  +----------------------------------+
  //    Here is the logic for like button
  //  +----------------------------------+

  handleLike = (movie) => {
    //console.log("its clicked", movie);
    const movies = [...this.state.movies]; //Copy from the current movies array
    const index = movies.indexOf(movie); //Just copy the index of that movies array alone/
    movies[index] = { ...movies[index] }; //Now create a new array with that index.
    movies[index].liked = !movies[index].liked; //Update the index where the button is liked.
    this.setState({ movies }); //Set the state as this new array.
  };

  //  +----------------------------------------------+
  //    Here is the logic for handling page changes
  //  +----------------------------------------------+

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            textProperty="name"
            valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Favourites</th>
                <th>Remove Movie</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <Pagination
              itemsCount={count}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </table>
        </div>
      </div>
    );
  }
}

export default Movies;
