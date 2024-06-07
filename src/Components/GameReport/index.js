import {withRouter} from 'react-router-dom'
import Header from '../Header'
import UnatteptedQuestion from '../UnatteptedQuestion'
import './index.css'

const GameReport = props => {
  const {location} = props
  const {state} = location
  const {
    score,
    incorrectAnswers,
    unAttemptedQuestionList,
    totalQuestions,
  } = state
  const unattempted = unAttemptedQuestionList.length
  return (
    <>
      <Header />
      <div className="report-bg-container">
        <div className="report-main-container">
          <div className="result-report-container">
            <div className="score-container-circle">
              <p className="score-result">
                <span className="score">{score}</span>/
                <span className="out-of-score">{totalQuestions}</span>
              </p>
            </div>
            <div className="summary-chart-container">
              <div className="summary-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  className="result-icon"
                  alt="correct"
                />
                <p className="result-text">{score} Correct answers</p>
              </div>
              <div className="summary-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  className="result-icon"
                  alt="inCorrect"
                />
                <p className="result-text">
                  {incorrectAnswers} Incorrect answers
                </p>
              </div>
              <div className="summary-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  className="result-icon"
                  alt="unAttempted"
                />
                <p className="result-text">{unattempted} Unattempted answers</p>
              </div>
            </div>
          </div>
          {unAttemptedQuestionList.length > 0 ? (
            <div className="unAttempted-que-list-container">
              <h1 className="unattempted-que-list-heading">
                Unattempted Questions
              </h1>
              <ul className="unattempt-que-list">
                {unAttemptedQuestionList.map(eachQuestion => (
                  <UnatteptedQuestion question={eachQuestion} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="attempted-list-contrainer">
              <h1 className="attempt-all-text">Attempted all the questions</h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default withRouter(GameReport)
