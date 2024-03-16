import {Link} from 'react-router-dom'
import './index.css'

const EachMovie = props => {
  const {eachObj} = props

  return (
    <li className="eachMovieItem">
      <div>
        <img
          className="moviePoster"
          src={`https://image.tmdb.org/t/p/w500${eachObj.posterPath}`}
          alt={eachObj.title}
        />
        <h1 className="movieTitleName">{eachObj.title}</h1>
        <p className="movieRating">
          Rating {} {eachObj.voteAverage.toFixed(1)}
        </p>
        <Link to={`/movie-details/${eachObj.id}`}>
          <button className="viewDetailsButton" type="button">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default EachMovie
