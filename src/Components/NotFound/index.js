import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dgzuznaxk/image/upload/v1717569702/Group_7504_tjhntp.svg"
      className="notFound-image"
      alt="not found"
    />
    <h1 className="notfound-text">Page Not Found</h1>
    <p className="notfound-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
