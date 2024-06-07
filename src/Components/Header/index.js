import './index.css'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {IoLogOutOutline} from 'react-icons/io5'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        src="https://res.cloudinary.com/dgzuznaxk/image/upload/v1717084654/Frame_8004_thuwru.svg"
        className="game-logo"
        alt="game logo"
      />

      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
      <IoLogOutOutline className="logout-icon" onClick={onClickLogout} />
    </div>
  )
}

export default withRouter(Header)
