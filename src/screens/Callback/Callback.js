import React from 'react'
import {Link, Actions, Goto} from 'jumpsuit'
//
export default class Home extends React.Component {

    componentDidMount() {
        Actions.parseAuth();
        Goto({path: '/'})
    }

    render() {
        return (
            <div className='Callback'>
                <p>
                    Logging In....
                </p>
                <Link to='/'>Go To Home</Link>
            </div>
        )
    }
}
