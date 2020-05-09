import React from 'react'
import styles from './signup-form.module.css'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email_address : '', first_name: ''}

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (e) =>{ 
    this.setState({email_address: e.target.value});
  }

  handleSubmit = event => {
    event.preventDefault()
    // action="https://app.convertkit.com/forms/1246803/subscriptions" method="POST"

    fetch(
      `https://app.convertkit.com/forms/1246803/subscriptions`,
      {
        method: 'post',
        body: JSON.stringify(this.state, null, 2),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then(response => console.log(response))
    alert(`Welcome ${this.state.email_address}!`)
  }

  render() {
    return (
    <div className={styles.subscribe}>
      <h2 className={styles.header}>
        Follow our journey every step of the way
      </h2>
      <form className={styles.subscribeForm} onSubmit={this.handleSubmit}>
        {/* <input type="hidden" name="first_name" value="Lawrence" /> */}

        <input type="email" name="email_address" value={this.state.email_address} onChange={this.handleInputChange} className={styles.emailInput} autoCapitalize="off" autoCorrect="off" size="25" placeholder="Enter email address"/>

        <button type="submit" className={styles.submitBtn} disabled={!this.state.email_address}>Subscribe</button>
      </form>
    </div>

    )
  }
}

export default SignUpForm