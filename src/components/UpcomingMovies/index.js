import {Component} from 'react'
import Header from '../Header'
import EachMovie from '../EachMoviePoster'

import './index.css'

class UpcomingMovies extends Component {
  state = {UpcomingMoviesList: [], inputValue: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {inputValue} = this.state
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${'02e21fa6c9e1fbf8591dcc5c93266bc8'}&language=en-US&page=1
`
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${'02e21fa6c9e1fbf8591dcc5c93266bc8'}&language=en-US&query=${inputValue}&page=1
`

    const finalUrl = inputValue === '' ? url : searchUrl
    console.log(finalUrl)
    const response = await fetch(finalUrl)
    const responseData = await response.json()
    console.log('yento', responseData)
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
      this.setState({UpcomingMoviesList: updateData})
    }
  }

  onChangeInput = value => {
    this.setState({inputValue: value}, this.getData)
  }

  render() {
    const {UpcomingMoviesList} = this.state
    console.log('hi')
    return (
      <div className="upcomingMoviesContainer">
        <Header onChangeInput={this.onChangeInput} />
        {UpcomingMoviesList.length > 0 && (
          <ul className="moviesListUl">
            {UpcomingMoviesList.map(eachObj => (
              <EachMovie key={eachObj.id} eachObj={eachObj} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default UpcomingMovies
