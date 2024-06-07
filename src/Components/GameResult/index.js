import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameResult = props => {
  const {
    score,
    unAttemptedQuestionList,
    incorrectAnswers,
    totalQuestions,
  } = props
  const percentage = (score / totalQuestions) * 100

  const checkQuizeReport = () => {
    const {history} = props
    history.push({
      pathname: '/game-report',
      state: {score, unAttemptedQuestionList, incorrectAnswers, totalQuestions},
    })
  }

  return percentage >= 60 ? (
    <>
      <Header />
      <div className="bg-container">
        <div className="game-result-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
            className="won-image"
            alt="won"
          />
          <h1 className="greetings-text">Congrats</h1>
          <h1 className="result-percentage-text">
            {percentage}% Correctly Answered
          </h1>
          <p className="description">Quiz completed successfully.</p>
          <p className="result-summary">
            You attempted {score} out of {totalQuestions} questions as correct.
          </p>
          <button
            className="report-button"
            onClick={checkQuizeReport}
            type="button"
          >
            Report
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <Header />
      <div className="bg-container">
        <div className="game-fail-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
            alt="lose"
            className="lose-image"
          />
          <h1 className="lose-heading">You lose!</h1>
          <h1 className="lose-result">{percentage}% Correctly Answered</h1>
          <p className="result-summary">
            You attempted {score} out of {totalQuestions} questions as correct.
          </p>
          <button
            type="button"
            className="report-button"
            onClick={checkQuizeReport}
          >
            Report
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(GameResult)
