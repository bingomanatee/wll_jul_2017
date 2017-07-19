import React from 'react'
import {Link} from 'jumpsuit'
//
export default class Home extends React.Component {

  onComponentDidMount () {
    this.props.auth.handleAuthentication(this.props);
  }

  render () {
    return (
      <div className='Callback'>
        <p>
          Where you end up after you log on
        </p>
        <Link to='/'>Go To Home</Link>
      </div>
    )
  }
}
