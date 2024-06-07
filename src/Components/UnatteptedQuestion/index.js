import './index.css'

const UnatteptedQuestion = props => {
  const {question} = props
  const {optionsType, questionText, optionsData} = question
  console.log(optionsData)

  const optionTypeIndex = {
    defaultType: 'DEFAULT',
    singleSelectType: 'SINGLE_SELECT',
    imageType: 'IMAGE',
  }

  const renderDefaultTypeQuestion = () => (
    <div className="unattemt-question-container">
      <h1 className="question-text">{questionText}</h1>
      <ul className="list-container">
        {optionsData.map(eachOption => {
          const highlightRightOption =
            eachOption.isCorrect === 'true' ? 'right-answer' : 'wrong-answer'
          const iconHighlight =
            eachOption.isCorrect === 'true' ? 'show-icon' : 'hide-icon'
          const textColor = eachOption.isCorrect === 'true' ? 'white' : 'grey'

          return (
            <div className="option-item-container" key={eachOption.optionsType}>
              <div className={`list-item-container ${highlightRightOption}`}>
                <li className={`list-item ${textColor}`}>
                  <p className="option-text">{eachOption.text}</p>
                </li>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                className={`icon ${iconHighlight}`}
                alt="correct checked circle"
              />
            </div>
          )
        })}
      </ul>
    </div>
  )

  const renderImageTypeQuestion = () => (
    <div className="unattemt-question-container">
      <h1 className="question-text">{questionText}</h1>
      <ul className="list-container">
        {optionsData.map(eachOption => {
          const iconShow =
            eachOption.isCorrect === 'true' ? 'show-icon' : 'hide-icon'
          return (
            <li className="list-item" key={eachOption.optionsType}>
              <img src={eachOption.imageUrl} className="image" alt="option" />
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                className={`right-icon ${iconShow}`}
                alt="correct checked circle"
              />
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSingleSelectTypeQuestion = () => (
    <div className="unattemt-question-container">
      <h1 className="question-text">{questionText}</h1>
      <ul className="single-select-options-list-container">
        {optionsData.map(eachOption => {
          const iconShow =
            eachOption.isCorrect === 'true' ? 'show-icon' : 'hide-icon'

          return (
            <li className="single-select-list" key={eachOption.optionsType}>
              <input
                type="radio"
                className="radio-option"
                checked={eachOption.isCorrect === 'true'}
                id={eachOption.id + eachOption.text}
                disabled
              />
              <label
                htmlFor={eachOption.id + eachOption.text}
                className="single-select-option-text"
              >
                {eachOption.text}
              </label>
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                className={`right-icon ${iconShow}`}
                alt="correct checked circle"
              />
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderQuestionlistBasedOnType = () => {
    switch (optionsType) {
      case optionTypeIndex.defaultType:
        return renderDefaultTypeQuestion()
      case optionTypeIndex.singleSelectType:
        return renderSingleSelectTypeQuestion()
      case optionTypeIndex.imageType:
        return renderImageTypeQuestion()
      default:
        return null
    }
  }

  return <>{renderQuestionlistBasedOnType()}</>
}

export default UnatteptedQuestion
