import React from 'react'
import { Link } from 'jumpsuit'
//
export default class Home extends React.Component {
  render() {
    const body = [];
    for (let i = 0; i < 100; ++i) {
      let words = '';
      for (let i = 0; i < 50; ++i) {
        words += 'lorem ipsum ';
      }
     body.push(<p key={`par${i}`}>{words}</p>)
    }

    return (
      <div className='Welcome'>
        <Link to='/counter'>Go To Counter</Link>
        {body}
      </div>
    )
  }
}
