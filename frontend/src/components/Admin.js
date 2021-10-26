import React, { useEffect } from 'react';
import UserDetails from './UserDetails';
import { Link } from 'react-router-dom';

const Admin = (props) => {
    
    useEffect(() => {
        props.passAllUsers();
    }, []);

    const renderUserList = props.allUsers.map((user) => {
        return (
            <UserDetails user={user} key={user.id}/>
        )
    })

    return (
        <div style={{margin: '80px'}}>
            <div className="ui breadcrumb">
                <Link to={{ pathname: "/"}}>
                    <div className="section">Back to Catalog</div>
                </Link>
            </div>
            <div className="ui celled list">
                {renderUserList}
            </div>
        </div>
    )
}

export default Admin;