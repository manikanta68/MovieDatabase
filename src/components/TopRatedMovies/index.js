import {Component} from 'react'
import Header from '../Header'
import EachMovie from '../EachMoviePoster'

import './index.css'

class TopRatedMovies extends Component {
  state = {TopRatedMoviesList: [], inputValue: '', pageNumber: 1}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {inputValue, pageNumber} = this.state
    console.log(inputValue)
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${'02e21fa6c9e1fbf8591dcc5c93266bc8'}&language=en-US&page=${pageNumber}`
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${'02e21fa6c9e1fbf8591dcc5c93266bc8'}&language=en-US&query=${inputValue}&page=${pageNumber}
`

    const finalUrl = inputValue === '' ? url : searchUrl
    console.log(finalUrl)
    const response = await fetch(finalUrl)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok === true) {
      const updateData = responseData.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.title,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({TopRatedMoviesList: updateData})
    }
  }

  onChangeInput = value => {
    this.setState({inputValue: value}, this.getData)
  }

  onPrevPage = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber - 1}),
        this.getData,
      )
    }
  }

  onNxtPage = () => {
    this.setState(
      prevState => ({pageNumber: prevState.pageNumber + 1}),
      this.getData,
    )
  }

  render() {
    const {TopRatedMoviesList, pageNumber} = this.state

    return (
      <div className="topRatedMoviesContainer">
        <Header onChangeInput={this.onChangeInput} />
        <div className="pageNavigation">
          <button onClick={this.onPrevPage} type="button">
            Prev
          </button>
          <p className="pageNumber">{pageNumber}</p>
          <button onClick={this.onNxtPage} type="button">
            Next
          </button>
        </div>
        {TopRatedMoviesList.length > 0 && (
          <ul className="moviesListUl">
            {TopRatedMoviesList.map(eachObj => (
              <EachMovie key={eachObj.id} eachObj={eachObj} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default TopRatedMovies
