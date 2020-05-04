import React, { Component } from "react";
import ListGroup from "./listGroup";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "./utils/paginate";

import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genre = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genre });
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          ></MoviesTable>

          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
