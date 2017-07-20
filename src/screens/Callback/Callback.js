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
                    Where you end up after you log on
                </p>
                <Link to='/'>Go To Home</Link>
            </div>
        )
    }
}
