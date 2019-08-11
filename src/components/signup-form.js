import React from 'react'
import styles from './signup-form.module.css'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email : ''}

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) =>{ 
    this.setState({email: e.target.value});
  }

  render() {
    return (
    <div className={styles.subscribe}>
      <h2 className={styles.header}>
        Follow our journey every step of the way
      </h2>
      <form className={styles.subscribeForm} action="https://doinglifewithyou.us18.list-manage.com/subscribe/post" method="POST">
        <input type="hidden" name="u" value="ae0bc520f23a9515883686286" />
        <input type="hidden" name="id" value="8d58c8f146" />

        <input type="email" value={this.state.email} onChange={this.handleChange} className={styles.emailInput} autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" placeholder="Enter email address"/>

        <button type="submit" className={styles.submitBtn} name="submit" disabled={!this.state.email}>Subscribe</button>
      </form>
    </div>

    )
  }
}

export default SignUpForm