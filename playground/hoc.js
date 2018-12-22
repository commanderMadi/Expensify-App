import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>This is information</h1>
        <p>The info is: {props.info}</p>
    </div>
)

const requireAuth = (WrappedComponent) => {
    return (props) => (
        <div>
        {props.isAuthenticated && <WrappedComponent {...props}/>}
        {!props.isAuthenticated && <p>Please login to see info</p>}
        </div>
    )
}

const AuthInfo = requireAuth(Info);

ReactDOM.render(<AuthInfo info="kosomak" isAuthenticated={false}/>, document.getElementById('app'));