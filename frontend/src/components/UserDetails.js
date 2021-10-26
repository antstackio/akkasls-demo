import React from 'react';
import { Link } from 'react-router-dom';

class UserDetails extends React.Component {
    render () {
        return (
            <div className="item" style={{margin: "10px"}}>
                <div className="right floated content">
                    <Link to={{ pathname: `/eekeekai/carts/${this.props.user.id}`, state: {user: this.props.user}}}>
                        <div className="ui button">Cart</div>
                    </Link>
                </div>
                <div className="content">
                    <div className="header">
                        {this.props.user.name}
                    </div>
                    <div className="description">
                        {this.props.user.emailAddress}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDetails;