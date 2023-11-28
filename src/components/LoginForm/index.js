import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    const userDetails = {user_id: userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showSubmitError: true})
    }
  }

  renderUserIdInputField = () => (
    <div className="input-container">
      <label htmlFor="userID">User ID</label>
      <input
        type="text"
        placeholder="Enter User ID"
        id="userID"
        onChange={e => this.setState({userId: e.target.value})}
      />
    </div>
  )

  renderPinInputField = () => (
    <div className="input-container">
      <label htmlFor="pin">PIN</label>
      <input
        type="password"
        placeholder="Enter PIN"
        id="pin"
        onChange={e => this.setState({pin: e.target.value})}
      />
    </div>
  )

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-page">
        <div className="img-form-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              className="login-image"
              alt="website login"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="welcome">Welcome Back</h1>
            {this.renderUserIdInputField()}
            {this.renderPinInputField()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
