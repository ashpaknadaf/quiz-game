import {Component} from 'react'
import Loader from 'react-loader-spinner'
import QuestionView from '../QuestionView'
import Header from '../Header'
import GameResult from '../GameResult'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class QuizeGame extends Component {
  state = {
    questionData: [],
    apiStatus: apiStatusConstants.initial,
    currentQuestionindex: 0,
    unAttemptedQuestionList: [],
    countDown: 15,
    score: 0,
    wrongAnswerScore: 0,
  }

  componentDidMount() {
    this.getQuestionData()
    this.startCounting()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startCounting = () => {
    this.interval = setInterval(this.startCountdown, 1000)
  }

  getQuestionData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.questions.map(eachQuetion => ({
        id: eachQuetion.id,
        optionsType: eachQuetion.options_type,
        questionText: eachQuetion.question_text,
        optionsData: eachQuetion.options.map(eachOption => ({
          id: eachOption.id,
          imageUrl: eachOption.image_url,
          text: eachOption.text,
          isCorrect: eachOption.is_correct,
        })),
      }))
      this.setState({
        questionData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  startCountdown = () => {
    const {questionData, currentQuestionindex} = this.state
    const currentQuestion = questionData[currentQuestionindex]
    this.setState(prevState => {
      if (prevState.countDown > 0) {
        return {countDown: prevState.countDown - 1}
      }
      clearInterval(this.interval)
      return {
        countDown: 0,
        unAttemptedQuestionList: [
          ...prevState.unAttemptedQuestionList,
          currentQuestion,
        ],
      }
    })
  }

  onClickNextQuestion = () => {
    const {currentQuestionindex, questionData} = this.state
    if (currentQuestionindex < questionData.length) {
      this.setState(
        prevState => ({
          currentQuestionindex: prevState.currentQuestionindex + 1,
          countDown: 15,
        }),
        this.startCounting,
      )
    }
  }

  buttonActiveStatus = () => {
    this.setState()
  }

  updatedScore = () => {
    this.setState(prevState => ({score: prevState.score + 1}))
  }

  updatedWrongAnswerScore = () => {
    this.setState(prevState => ({
      wrongAnswerScore: prevState.wrongAnswerScore + 1,
    }))
  }

  stopCountdown = () => {
    clearInterval(this.interval)
  }

  apiSuccessView = () => {
    const {
      questionData,
      currentQuestionindex,
      countDown,
      wrongAnswerScore,
      score,
      unAttemptedQuestionList,
    } = this.state

    const currentuQuestion = questionData[currentQuestionindex]

    const buttonText =
      currentQuestionindex < questionData.length - 1
        ? 'Next Question'
        : 'Submit'

    return currentQuestionindex < questionData.length ? (
      <>
        <Header />
        <div className="bg-container">
          <div className="quiz-game-container">
            <div className="question-top-container">
              <div className="question-index-container">
                <p className="question-counter-heading">Question</p>
                <p className="question-counter">
                  {currentQuestionindex + 1}/{questionData.length}
                </p>
              </div>
              <div className="timer-circle">
                <p className="countdown">{countDown}</p>
              </div>
            </div>
            <QuestionView
              key={currentuQuestion.id}
              question={currentuQuestion}
              onClickNextQuestion={this.onClickNextQuestion}
              buttonText={buttonText}
              updateScore={this.updatedScore}
              updatedWrongAnswerScore={this.updatedWrongAnswerScore}
              stopCountdown={this.stopCountdown}
              startCounting={this.startCounting}
              countDown={countDown}
            />
          </div>
        </div>
      </>
    ) : (
      <GameResult
        score={score}
        unAttemptedQuestionList={unAttemptedQuestionList}
        incorrectAnswers={wrongAnswerScore}
        totalQuestions={questionData.length}
      />
    )
  }

  apiLoadingView = () => (
    <>
      <Header />
      <div className="bg-container">
        <div className="quiz-game-container">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#263868" height={50} width={50} />
          </div>
        </div>
      </div>
    </>
  )

  onRetry = () => {
    this.getQuestionData()
  }

  apiFailureView = () => (
    <>
      <Header />
      <div className="bg-container">
        <div className="quiz-game-container">
          <div className="failure-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
              alt="failure view"
              className="failure-view-image"
            />

            <h1 className="failure-heading">Something Went Wrong</h1>
            <p className="failure-description">
              Our servers are busy please try again
            </p>
            <button
              type="button"
              onClick={this.onRetry}
              className="retry-button"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </>
  )

  renderQuizeGameViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.apiLoadingView()
      case apiStatusConstants.success:
        return this.apiSuccessView()
      case apiStatusConstants.failure:
        return this.apiFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderQuizeGameViewBasedOnApiStatus()}</>
  }
}

export default QuizeGame
