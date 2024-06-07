import './index.css'
import {useState} from 'react'

const QuestionView = props => {
  const {
    question,
    onClickNextQuestion,
    buttonText,
    updateScore,
    stopCountdown,
    updatedWrongAnswerScore,
    countDown,
  } = props

  const optionTypeIndex = {
    defaultType: 'DEFAULT',
    singleSelectType: 'SINGLE_SELECT',
    imageType: 'IMAGE',
  }

  const {optionsType, questionText, optionsData} = question
  const [isActive, setIsActive] = useState(false)
  const [selectSingleOption, onSetSingleOption] = useState('')
  const [isShowIconId, setClikedOptionId] = useState(null)

  const onClickIsCorrect = id => {
    const selectedOption = optionsData.find(eachOption => eachOption.id === id)
    const correctOption = optionsData.find(each => each.isCorrect === 'true')
    setIsActive(true)
    setClikedOptionId(id)
    stopCountdown()
    if (selectedOption === correctOption) {
      updateScore()
    } else {
      updatedWrongAnswerScore()
    }
  }

  const nextQuestionButtonColor =
    isActive || countDown === 0 ? 'active-button' : 'inActive-button'

  const renderImageOptionView = () => (
    <ul className="image-list">
      {optionsData.map(eachOption => {
        let isShow
        if (isShowIconId !== null) {
          if (eachOption.id === isShowIconId) {
            isShow = true
          } else {
            isShow = false
          }
        } else {
          isShow = false
        }

        const imageIcon =
          eachOption.isCorrect === 'true'
            ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'

        let imageShowOrHide
        let altText
        if (isActive && (eachOption.isCorrect === 'true' || isShow)) {
          if (eachOption.isCorrect === 'true') {
            imageShowOrHide = 'show-right-answer'
            altText = 'correct checked circle'
          } else {
            imageShowOrHide = 'show-wrong-answer'
            altText = 'incorrect close circle'
          }
        } else {
          imageShowOrHide = 'hide-icon'
        }

        return (
          <li
            className="image-option-list"
            key={eachOption.id}
            data-testid="option"
          >
            <button
              type="button"
              className="option-btn"
              onClick={() => onClickIsCorrect(eachOption.id)}
              disabled={isActive || countDown === 0}
            >
              <img
                src={eachOption.imageUrl}
                className="option-image"
                alt={eachOption.text}
              />
            </button>
            <img
              src={imageIcon}
              className={`answer-icon ${imageShowOrHide}`}
              alt={altText}
            />
          </li>
        )
      })}
    </ul>
  )

  const renderDefaultOptionsView = () => (
    <ul className="default-options-container">
      {optionsData.map(eachOption => {
        let isShow
        if (isShowIconId !== null) {
          if (eachOption.id === isShowIconId) {
            isShow = true
          } else {
            isShow = false
          }
        } else {
          isShow = false
        }

        const imageIcon =
          eachOption.isCorrect === 'true'
            ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'

        let imageShowOrHide
        let resultBtnBgColor
        let textColor
        let altText

        if (isActive && (eachOption.isCorrect === 'true' || isShow)) {
          if (eachOption.isCorrect === 'true') {
            imageShowOrHide = 'show-right-answer'
            resultBtnBgColor = 'show-right-answer-color'
            textColor = 'bg-change-text'
            altText = 'correct checked circle'
          } else {
            imageShowOrHide = 'show-wrong-answer'
            resultBtnBgColor = 'show-wrong-answer-color'
            textColor = 'bg-change-text'
            altText = 'incorrect close circle'
          }
        } else {
          imageShowOrHide = 'hide-icon'
          resultBtnBgColor = 'hide-answer-color'
          textColor = 'bg-hide-text'
        }

        return (
          <div className="default-option-list-container" key={eachOption.id}>
            <div className="default-option-item">
              <button
                type="button"
                className={`default-option-button ${resultBtnBgColor}`}
                onClick={() => onClickIsCorrect(eachOption.id)}
                disabled={isActive || countDown === 0}
              >
                <li key={eachOption.id}>
                  <h1 className={`option-text ${textColor}`}>
                    {eachOption.text}
                  </h1>
                </li>
              </button>

              <img
                src={imageIcon}
                className={`answer-icon ${imageShowOrHide}`}
                alt={altText}
              />
            </div>
          </div>
        )
      })}
    </ul>
  )

  const onChangeRadioInput = event => {
    onSetSingleOption(event.target.value)
    onClickIsCorrect(event.target.value)
  }

  const renderSingleSelectOptionView = () => (
    <ul className="radio-list-container">
      {optionsData.map(eachOption => {
        let isShow
        if (isShowIconId !== null) {
          if (eachOption.id === isShowIconId) {
            isShow = true
          } else {
            isShow = false
          }
        } else {
          isShow = false
        }

        const imageIcon =
          eachOption.isCorrect === 'true'
            ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'

        let imageShowOrHide
        let altText
        if (isActive && (eachOption.isCorrect === 'true' || isShow)) {
          if (eachOption.isCorrect === 'true') {
            imageShowOrHide = 'show-right-answer'
            altText = 'correct checked circle'
          } else {
            imageShowOrHide = 'show-wrong-answer'
            altText = 'incorrect close circle'
          }
        } else {
          imageShowOrHide = 'hide-icon'
        }

        return (
          <li key={eachOption.id} className="single-select-list">
            <input
              type="radio"
              name="option"
              value={eachOption.id}
              checked={eachOption.id === selectSingleOption}
              id={eachOption.id}
              onChange={onChangeRadioInput}
              disabled={isActive || countDown === 0}
              className="radio-input"
            />
            <label
              htmlFor={eachOption.id}
              className="radio-option-label"
              key={eachOption.text}
            >
              {eachOption.text}
            </label>
            <img
              src={imageIcon}
              className={`answer-icon ${imageShowOrHide}`}
              alt={altText}
            />
          </li>
        )
      })}
    </ul>
  )

  const optionViewBasedOnType = () => {
    switch (optionsType) {
      case optionTypeIndex.defaultType:
        return renderDefaultOptionsView()
      case optionTypeIndex.singleSelectType:
        return renderSingleSelectOptionView()
      case optionTypeIndex.imageType:
        return renderImageOptionView()
      default:
        return null
    }
  }

  const onClickNext = () => {
    onClickNextQuestion()
  }

  return (
    <div className="question-container">
      <div className="question-option-container" data-testid="questionItem">
        <p className="question-text" key="question_text">
          {questionText}
        </p>
        <div>{optionViewBasedOnType()}</div>
      </div>
      <button
        type="button"
        className={`next-question-button ${nextQuestionButtonColor}`}
        onClick={onClickNext}
        disabled={countDown === 0 ? false : !isActive}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default QuestionView
