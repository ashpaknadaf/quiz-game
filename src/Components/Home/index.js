import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="bg-container">
        <div className="home-container">
          <div className="content-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
              alt="start quiz game"
              className="start-quize-image"
            />
            <h1 className="heading">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="description">
              Test yourself with these easy quiz questions and answers
            </p>
            <Link to="/Quiz-Game">
              <button className="start-quize-btn" type="button">
                Start Quize
              </button>
            </Link>

            <div className="warning-message-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
                className="warning-icon"
                alt="warning icon"
              />
              <p className="warning">
                All the progress will be lost, if you reload during the quiz
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
