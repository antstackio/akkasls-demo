import React from 'react';

class Login extends React.Component {
    state = {
        id: '',
        name: '',
        emailAddress: ''
    };

    validateForm = () => {
        return this.state.id.length > 0 && this.state.name.length > 0 && this.state.emailAddress.length > 0;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.props);
        if (!this.validateForm()) {
            alert('All fields are compulsory');
            return;
        }
        // console.log(this.state);
        this.props.checkUser(this.state);
        // this.setState({id: '', name: '', emailAddress: ''});
        // this.props.history.push('/shop');
    };

    render () {
        return (
            <div className="ui main" style={{margin: "80px"}}>
                <h2>Login/Sign-in</h2>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>ID</label>
                        <input type="text" name="ID" placeholder="ID" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })}/>
                    </div>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
                    </div>
                    <div className="field">
                        <label>Email Address</label>
                        <input type="email" placeholder="dodo@example.com" value={this.state.emailAddress} onChange={(e) => this.setState({ emailAddress: e.target.value })}/>
                    </div>
                    <button className="ui button" type="submit">Log In</button>
                </form>
            </div>
        );
    }
}

export default Login;
