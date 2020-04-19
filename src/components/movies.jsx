import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

import Like from "./like";
import Pagination from "./pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
  };

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

  handlePageChange = (page) => {
    console.log("page");
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database</p>;

    return (
      <React.Fragment>
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
            {this.state.movies.map((movie) => (
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
            onPageChange={this.handlePageChange}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
