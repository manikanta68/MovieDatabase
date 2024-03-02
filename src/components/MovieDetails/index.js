import {Component} from 'react'
import Header from '../Header'

import './index.css'

class MovieDetails extends Component {
  state = {MovieDetailsObj: {}, apiStatus: false, castDetails: []}

  componentDidMount() {
    this.getData()
    this.getCastData()
  }

  getCastData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${'02e21fa6c9e1fbf8591dcc5c93266bc8'}&language=en-US

`
    const response = await fetch(url)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok === true) {
      const updateData = responseData.cast.map(each => ({
        profilePath: each.profile_path,
        character: each.character,
        originalName: each.original_name,
        id: each.id,
      }))
      console.log(updateData)
      this.setState({castDetails: updateData, apiStatus: true})
    }
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${'02e21fa6c9e1fbf8591dcc5c93266bc8'}&language=en-US
`
    const response = await fetch(url)
    const responseData = await response.json()

    if (response.ok === true) {
      const updateData = {
        adult: responseData.adult,
        backdropPath: responseData.backdrop_path,
        belongsToCollection: responseData.belongs_to_collection,
        budget: responseData.budget,
        genres: responseData.genres,
        homepage: responseData.homepage,
        id: responseData.id,
        imdbId: responseData.imdb_id,
        originalLanguage: responseData.original_language,
        originalTitle: responseData.original_title,
        overview: responseData.overview,
        popularity: responseData.popularity,
        posterPath: responseData.poster_path,
        productionCompanies: responseData.production_companies,
        productionCountries: responseData.production_countries,
        releaseDate: responseData.release_date,
        revenue: responseData.revenue,
        runtime: responseData.runtime,
        spokenLanguages: responseData.spoken_languages,
        status: response.status,
        tagline: response.tagline,
        title: responseData.title,
        video: responseData.video,
        voteAverage: responseData.vote_average,
        voteCount: responseData.vote_count,
      }
      this.setState({MovieDetailsObj: updateData, apiStatus: true})
    }
  }

  render() {
    const {MovieDetailsObj, apiStatus, castDetails} = this.state

    return (
      <div className="MoviesDetailsContainer">
        <Header />
        <div className="content">
          {apiStatus && (
            <div className="eachMovieDetails">
              <div>
                <img
                  className="eachMovieDetailsImage"
                  src={`https://image.tmdb.org/t/p/w500${MovieDetailsObj.posterPath}`}
                  alt="none"
                />
              </div>
              <div className="detailsContainer">
                <h1 className="movieTitle">
                  {' '}
                  <span className="span"> Title : </span>{' '}
                  {MovieDetailsObj.title}
                </h1>
                <p className="para">
                  <span className="span"> Rating : </span>{' '}
                  {MovieDetailsObj.voteAverage.toFixed(1)}
                </p>
                <p className="para">
                  {' '}
                  <span className="span"> Runtime : </span>{' '}
                  {MovieDetailsObj.runtime}
                </p>
                <p className="para">
                  {' '}
                  <span className="span"> ReleaseDate: </span>{' '}
                  {MovieDetailsObj.releaseDate}
                </p>
                <p className="para overView">{MovieDetailsObj.overview}</p>
              </div>
            </div>
          )}
          <div className="castDetailsContainer">
            {apiStatus && (
              <ul className="castDetails">
                {apiStatus &&
                  castDetails.map(cast => (
                    <li key={cast.id}>
                      <div className="card">
                        <img
                          className="castImage"
                          src={`https://image.tmdb.org/t/p/w500${cast.profilePath}`}
                          alt="none"
                        />
                        <p className="castChar">
                          <span className="span"> Character: {}</span>{' '}
                          {cast.character}
                        </p>
                        <p className="castName">
                          <span className="span"> Name: {}</span>{' '}
                          {cast.originalName}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetails
