import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-page">
    <Header />
    <div className="home-container">
      <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
      <img
        className="digital-card"
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
      />
    </div>
  </div>
)
export default Home
