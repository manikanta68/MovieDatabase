import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {input: ''}

  changInput = event => {
    this.setState({input: event.target.value})
  }

  onSearch = () => {
    const {input} = this.state
    const {onChangeInput} = this.props
    onChangeInput(input)
  }

  render() {
    const {input} = this.state
    return (
      <nav className="navBar">
        <h1>movieDB</h1>
        <div className="searchBarContainer">
          <input
            value={input}
            onChange={this.changInput}
            type="search"
            className="searchInput"
          />
          <button
            onClick={this.onSearch}
            type="button"
            className="searchButton"
          >
            Search
          </button>
        </div>
        <div className="navigationButton">
          <Link to="/">
            <button className="navButton" type="button">
              Popular
            </button>
          </Link>
          <Link to="/top-rated">
            <button className="navButton" type="button">
              Top Rated
            </button>
          </Link>
          <Link to="/upcoming">
            <button className="navButton" type="button">
              Upcoming
            </button>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Header
