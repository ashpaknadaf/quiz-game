import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    isShowPassword: false,
    isShowSubmitError: false,
  }

  renderOnSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  renderOnSubmitFailure = errorMessage => {
    this.setState({isShowSubmitError: true, errorMessage})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.renderOnSubmitSuccess(data.jwt_token)
    } else {
      this.renderOnSubmitFailure(data.error_msg)
    }
  }

  onShowAndHidePassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  render() {
    const {
      isShowSubmitError,
      errorMessage,
      username,
      password,
      isShowPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-page-container">
          <img
            src="https://res.cloudinary.com/dgzuznaxk/image/upload/v1717084654/Frame_8004_thuwru.svg"
            className="quize-game-logo"
            alt="login website logo"
          />
          <form onSubmit={this.submitLoginForm} className="login-form">
            <div className="form-input-label-container">
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="text-input"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Enter Username"
              />
            </div>
            <div className="form-input-label-container">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                className="text-input"
                id="password"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Enter Password"
              />
            </div>
            <div className="checkbox-container">
              <input
                className="checkbox-input"
                type="checkbox"
                id="showPasswordCheckbox"
                checked={isShowPassword}
                onChange={this.onShowAndHidePassword}
              />
              <label htmlFor="showPasswordCheckbox" className="checkbox-label">
                Show Password{' '}
              </label>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {isShowSubmitError && (
              <p className="error-message">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
